"""File Manager MCP Server.

This server exposes a small collection of file-management tools that Claude can
call through the Model Context Protocol (MCP). It allows the assistant to
inspect files, list directory contents, and write updates within the permitted
workspace.
"""

import asyncio
import os
from collections.abc import Callable
from mcp.server import Server
from mcp.types import Tool, TextContent
from mcp.server.stdio import stdio_server

DEFAULT_DIRECTORY = os.path.expanduser("~")

# Create the MCP server instance that will host the tool endpoints.
server = Server("file-manager")

@server.list_tools()
async def list_tools() -> list[Tool]:
    """Return the metadata for every tool that this server exposes."""
    return [
        Tool(
            name="read_file",
            description="Read the content of a text file",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string", 
                        "description": "Absolute or relative path to the file to read"
                    }
                },
                "required": ["path"]
            }
        ),
        Tool(
            name="write_file",
            description="Write content to a file, creating it when needed",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Absolute or relative path to the file to create or overwrite"
                    },
                    "content": {
                        "type": "string",
                        "description": "Content to persist to the target file"
                    }
                },
                "required": ["path", "content"]
            }
        ),
        Tool(
            name="list_files",
            description="List the folders and files within a directory",
            inputSchema={
                "type": "object",
                "properties": {
                    "directory": {
                        "type": "string",
                        "description": "Directory path to inspect (defaults to the user's home directory)",
                        "default": DEFAULT_DIRECTORY
                    }
                }
            }
        ),
        Tool(
            name="get_current_directory",
            description="Return the working directory of the server process",
            inputSchema={
                "type": "object",
                "properties": {}
            }
        )
    ]

def _handle_read_file(arguments: dict) -> list[TextContent]:
    """Return the text content of the requested file, if it can be read."""
    file_path = arguments["path"]
    full_path = os.path.abspath(file_path)

    try:
        # Read the file with UTF-8 encoding so text data renders correctly.
        with open(file_path, "r", encoding="utf-8") as file_handle:
            content = file_handle.read()

        return [TextContent(
            type="text",
            text=(
                f"File: {full_path}\n\n"
                f"Content\n{'-' * 50}\n{content}\n{'-' * 50}"
            )
        )]

    except FileNotFoundError:
        return [TextContent(
            type="text",
            text=f"File not found: {full_path}"
        )]
    except UnicodeDecodeError:
        return [TextContent(
            type="text",
            text=f"Unable to read file (possibly binary data): {full_path}"
        )]
    except Exception as exc:
        return [TextContent(
            type="text",
            text=f"Unexpected error while reading file: {exc}"
        )]


def _handle_write_file(arguments: dict) -> list[TextContent]:
    """Persist the provided content to disk and confirm the absolute path."""
    file_path = arguments["path"]
    content = arguments["content"]
    full_path = os.path.abspath(file_path)

    try:
        # Ensure the parent directory exists before writing the file.
        os.makedirs(os.path.dirname(full_path), exist_ok=True)

        with open(file_path, "w", encoding="utf-8") as file_handle:
            file_handle.write(content)

        return [TextContent(
            type="text",
            text=f"Successfully wrote file: {full_path}"
        )]

    except Exception as exc:
        return [TextContent(
            type="text",
            text=f"Unexpected error while writing file: {exc}"
        )]


def _handle_list_files(arguments: dict) -> list[TextContent]:
    """Describe the contents of the requested directory, grouping folders and files."""
    directory = arguments.get("directory") or DEFAULT_DIRECTORY
    full_dir_path = os.path.abspath(directory)

    try:
        entries = os.listdir(directory)

        if not entries:
            return [TextContent(
                type="text",
                text=f"Directory is empty: {full_dir_path}"
            )]

        # Gather folders and files separately to make the output easier to scan.
        folders = [name for name in entries if os.path.isdir(os.path.join(directory, name))]
        files_only = [name for name in entries if os.path.isfile(os.path.join(directory, name))]

        result_lines = [f"Directory: {full_dir_path}", ""]

        if folders:
            result_lines.append("Subdirectories:")
            result_lines.extend(f"  {folder}/" for folder in sorted(folders))
            result_lines.append("")

        if files_only:
            result_lines.append("Files:")
            for file_name in sorted(files_only):
                file_path = os.path.join(directory, file_name)
                size = os.path.getsize(file_path)
                result_lines.append(f"  {file_name} ({size} bytes)")

        return [TextContent(type="text", text="\n".join(result_lines))]

    except Exception as exc:
        return [TextContent(
            type="text",
            text=f"Unexpected error while listing directory: {exc}"
        )]


def _handle_get_current_directory(arguments: dict) -> list[TextContent]:
    """Report the server's current working directory."""
    current_dir = os.getcwd()
    return [TextContent(
        type="text",
        text=f"Server working directory: {current_dir}"
    )]


TOOL_HANDLERS: dict[str, Callable[[dict], list[TextContent]]] = {
    "read_file": _handle_read_file,
    "write_file": _handle_write_file,
    "list_files": _handle_list_files,
    "get_current_directory": _handle_get_current_directory,
}


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Dispatch the requested tool call to the associated handler."""
    handler = TOOL_HANDLERS.get(name)

    if handler is None:
        return [TextContent(
            type="text",
            text=f"Unknown tool: {name}"
        )]

    return handler(arguments)

async def main():
    """Entrypoint that binds the server to standard input/output streams."""
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    print('File Server is running...')
    asyncio.run(main())
