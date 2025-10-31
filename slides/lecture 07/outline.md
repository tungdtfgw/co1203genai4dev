## Slide 1 Title Slide

### **An Introduction to the Model Context Protocol (MCP)**

### A standardized protocol for AI applications to interact with external tools, data sources, and systems.

### Your Name/Team Name

### Date

-----

## Slide 2 Introduction to MCP

### The Model Context Protocol (MCP) is an open protocol introduced by Anthropic.

### It standardizes how AI applications communicate with external tools and data.

### Envisioned as the "USB-C for AI applications," it enables seamless integration and rich context for Large Language Models (LLMs).

### As Anthropic's Mahesh Murag states, "a model is only as good as the context we give it."

-----

## Slide 3 The Problem MCP Solves: The M x N Problem

### Before MCP: The "M x N" Problem

#### If you have **M** AI applications and **N** external tools, you need to build **M x N** separate integrations.

#### This leads to fragmentation, duplicated effort, and inconsistent implementations.

#### Prof. Ross Mike compared this to every tool speaking a "different language," making management a "nightmare."

### After MCP: The "M + N" Solution

#### MCP transforms the problem by standardizing communication.

#### Tool developers build **N** MCP servers, and app developers build **M** MCP clients.

-----

## Slide 4 MCP Architecture: Client-Server Model

### MCP Server

#### Lightweight programs that wrap external tools, resources, and prompts (APIs, databases, local files).

#### They expose these capabilities in a standardized format, acting as a bridge to the external system.

#### Can be built in various languages (Python, TypeScript) and communicate via `stdio` or `HTTP`.

### MCP Client

#### Part of a host application (e.g., Claude Desktop, IDE) that manages connections to MCP servers.

#### It handles connection management, capability discovery, and request/response forwarding.

### MCP Protocol

#### The standardized layer between clients and servers, ensuring seamless and consistent communication, much like a "USB-C cable."

-----

## Slide 5 Core Capabilities of an MCP Server

### Tools (Model-Controlled)

#### Functions the LLM can invoke to perform actions, like retrieving data or writing a file.

#### The LLM decides when it's best to call these tools based on the user's request.

### Resources (Application-Controlled)

#### Data exposed to the application, similar to GET endpoints in a REST API.

#### Examples include text files, JSON data, or images that provide context without side effects.

### Prompts (User-Controlled)

#### Pre-defined templates for common interactions that are invoked directly by the user.

#### These are essentially "tools that the user invokes instead of the model invoking."

-----

## Slide 6 How MCP Works: A Simplified Flow

### **Initialization:** The host app starts MCP clients, which perform a handshake with servers to exchange capabilities.

### **Discovery:** The client requests the list of available Tools, Resources, and Prompts from the server.

### **Context Provision:** The app displays Resources/Prompts to the user or makes Tools available to the LLM.

### **Invocation:** The LLM decides to use a Tool and instructs the client to send an invocation request to the server.

### **Execution & Response:** The server executes the logic (e.g., calls the GitHub API) and sends the result back to the client.

### **Completion:** The client forwards the result to the LLM, which uses this new external information to generate its final response.

-----

## Slide 7 Why MCP is Important: "Designed for AI"

### It's more than a technical upgrade; it's a "strategic growth lever."

### **Designed for AI:** Unlike older standards (OpenAPI, GraphQL), MCP is tailored for modern AI agents, formalizing patterns of Tools, Resources, and Prompts.

### **Open Standard:** It's an open, detailed specification from Anthropic, giving it a strong foundation.

### **Proven Foundation:** Adapted from the successful Language Server Protocol (LSP), using technologies like JSON-RPC 2.0.

### **Strong Ecosystem:** Launched with extensive internal use ("dogfooding"), reference clients (Claude Desktop), and SDKs.

### **Network Effects:** Its open nature has spurred a large community, with integrations from Cursor, Windsurf, and even support announced by OpenAI.

-----

## Slide 8 Advanced Feature: Sampling

### What is Sampling?

#### A feature that allows an MCP server to request an LLM inference call *from the client*.

#### This means the server itself doesn't need to host or pay for an LLM.

### Why is it Important?

#### The client retains full control over the LLM interaction, managing privacy, cost, and model choice.

#### Mahesh Murag describes it as a "very clever way for servers to request intelligence" without needing their own.

-----

## Slide 9 Advanced Feature: Composability

### Any application, API, or agent can act as both an MCP client and an MCP server simultaneously.

### This enables the creation of complex, multi-layered architectures.

### Agents can call sub-agents or other services, forming a chain of interactions.

### It creates a "Lego-like" system where AI capabilities can be stacked and combined.

-----

## Slide 10 Advanced Feature: Remote Servers & Auth

### MCP now supports remote servers over HTTP, not just local `stdio` connections.

### This significantly lowers the barrier to entry for developing and deploying servers.

### It enables publicly hosted and easily discoverable servers.

### Built-in support for OAuth 2.0 provides a standard way to handle authentication securely.

-----

## Slide 11 The Roadmap: Registry & Discovery

### Official Registry

#### An official, hosted MCP registry API is in development.

#### It will provide a unified metadata service for servers.

### Solving Key Problems

#### **Discovery:** How do agents find new tools? The registry will make servers discoverable.

#### **Verification & Versioning:** The registry will handle server verification, version control, and manage API changes.

#### This allows agents to "evolve" by automatically discovering new capabilities in real time.

-----

## Slide 12 Challenges and Considerations

### **Maturity:** The protocol is still new, and some aspects like authorization are still being finalized.

### **Initial Setup Complexity:** Setting up a local MCP server can be somewhat complex for beginners.

### **Server Trust:** With remote servers, verifying the trustworthiness of the servers you connect to is critical.

### **Naming Conflicts:** Tools with the same name from different servers can currently conflict (to be solved by namespaces).

-----

## Slide 13 The Future Vision

### To create a "connectivity layer" for AI.

### Allow AI agents to autonomously discover and use new capabilities.

### Lead to more powerful, personalized, and efficient AI systems.

### Drive the transition to "AI-native" applications and **"contextual fusionism"** - the art of merging diverse data contexts into a unified, actionable intelligence layer for AI models.

-----

## Slide 14 Theory Q\&A

### **Theory & Concepts**

### Questions?

-----

## Slide 15 Hands-On: Practical MCP

### Let's put theory into practice.

### We will cover:

### 1\. Connecting MCP servers to AI clients (VS Code, Cursor, Claude).

### 2\. Exploring 7 powerful MCP servers for developers.

### 3\. A deep dive into building AI agents, from a simple example to a complex system.

-----

## Slide 16 Add MCP to VS Code Copilot

### Enable MCP in Settings

#### VS Code Copilot has experimental support for MCP.

#### You can enable it by editing your `settings.json` file.

### Configuration

#### Add the `github.copilot.experimental.mcp` object to your settings.

#### Inside, provide the path to your MCP server's executable command.

### Code minh họa

```json
{
  "github.copilot.experimental.mcp": {
    "my-local-server": {
      "command": "/path/to/your/mcp/server/executable"
    }
  }
}
```

-----

## Slide 17 Add MCP Server to Cursor

### Configure `settings.json`

#### Cursor, an AI-first code editor, natively supports MCP for providing context and tools.

#### You add servers by modifying the `mcp.servers` object in Cursor's `settings.json`.

### Server Definition

#### For each server, you provide a key (e.g., "docker") and a value specifying the launch command.

#### The command is an array containing the executable and any necessary arguments.

### Code minh họa

```json
// In .cursor-settings.json
{
  "mcp.servers": {
    "docker": [
      "/path/to/your/venvs/mcp-docker/bin/mcp-server-docker"
    ],
    "another-server": [
      "node",
      "/path/to/another/server.js"
    ]
  }
}
```

-----

## Slide 18 Connect a Local MCP Server to Claude Desktop

### Prerequisites

#### You need to have the Claude Desktop application installed.

#### You also need a local MCP server running on your machine.

### Connection Steps

#### 1\. Open Claude Desktop's settings.

#### 2\. Navigate to the "MCP Servers" section.

#### 3\. Click "Add Server" and provide the full path to your server's executable file. Claude will then manage the server process for you.

-----

## Slide 19 MCP Servers for Developers: An Overview

### The MCP ecosystem provides powerful tools to integrate AI directly into your development workflow.

### Let's explore 7 high-impact servers every developer should know.

-----

## Slide 20 Dev Server: Figma MCP (\#2)

### **Figma MCP**

### Streamlines the design-to-code process by allowing direct AI access to design details, reducing interruptions.

### **What You Can Do With It:**

#### **Access assets & styles:** Pull icons, images, spacing, colors, and typography in seconds.

#### **Review changes:** See what's different in the latest design update before coding.

#### **Generate snippets:** Turn design tokens into usable CSS or components.

-----

## Slide 21 Dev Server: Context7 MCP (\#3)

### **Context7 MCP**

### Solves the "missing context" problem by giving AI direct access to relevant project documentation, code, and chat history.

### **Where It Adds Value:**

#### **Provide accurate context:** Ensures AI responses are grounded and accurate.

#### **Support RAG workflows:** Powers retrieval-augmented generation for stronger results.

#### **Stay current:** Draws from the latest project data, not outdated notes.

-----

## Slide 22 Dev Server: GitHub MCP (\#4)

### **GitHub MCP**

### Cuts through the minor pain points of GitHub by allowing you to handle repository actions quickly from your AI assistant.

### **What It Can Do For You:**

#### **Create issues instantly** without leaving your editor.

#### **Check pull request status** and see if tests have passed.

#### **Summarize open PRs** to know what needs immediate attention.

-----

## Slide 23 Dev Server: Playwright MCP (\#5)

### **Playwright MCP**

### Brings testing closer to your workflow by linking Playwright with AI, making it easier to write, run, and analyze tests.

### **Practical Actions It Supports:**

#### **Run browser tests:** Execute end-to-end tests on demand.

#### **Debug failures:** Get clear explanations of why a test failed and how to fix it.

#### **Generate new tests:** Automatically create test cases for features or edge cases.

-----

## Slide 24 Dev Server: Supabase MCP (\#8)

### **Supabase MCP**

### Simplifies database work by making backend tasks less of a roadblock, allowing you to interact with your DB from your editor.

### **Key Things You Can Do:**

#### **Run queries:** Fetch, filter, and test data without juggling consoles.

#### **Manage tables:** Create, modify, or drop tables and columns on the fly.

#### **Check authentication:** View or adjust user roles and permissions.

-----

## Slide 25 Dev Server: Postman MCP (\#11)

### **Postman MCP**

### Brings your API workflow into one place with AI, allowing you to test, monitor, and debug using natural language.

### **How You Can Use It:**

#### **Send requests:** Call endpoints directly and see responses right away.

#### **Run test suites:** Execute saved Postman collections on demand.

#### **Inspect responses:** Get clear explanations of status codes, errors, or payloads.

-----

## Slide 26 Dev Server: Docker MCP (\#12)

### **Docker MCP**

### Brings container management closer to your daily workflow by connecting Docker with AI.

### **Practical Use Cases:**

#### **Start and stop containers** with a quick request.

#### **Check status and health** of running containers instantly.

#### **Monitor resources:** Track CPU, memory, and usage patterns in real time.

#### **Debug environments** by surfacing logs quickly.

-----

## Slide 27 Code Deep Dive: Building Custom MCP Servers

### Let's analyze the code for two practical MCP servers written in Python.

### 1\. **`file_manager_server.py`:** A server that gives an AI the ability to read, write, and list files on the local machine.

### 2\. **`mysql_mcp_server.py`:** A server that allows an AI to safely query a MySQL database.

-----

## Slide 28 Example 1: File Manager Server (Overview)

### This server exposes basic file system operations as tools for an AI.

### It uses a common and clean pattern where tools and their logic are defined using decorators from the `mcp.server` library.

### Key Structure

#### `@server.list_tools()`: A decorator for the function that defines all available tools.

#### `@server.call_tool()`: A decorator for the function that contains the implementation logic for all tools.

-----

## Slide 29 File Manager: Defining Tools (`@server.list_tools`)

### This function returns a list of `Tool` objects.

### Each `Tool` tells the AI client what it can do, what inputs it needs, and what the purpose of the tool is.

### Code minh họa

```python
# From file_manager_server.py

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="read_file",
            description="Đọc nội dung file",
            inputSchema={
                "type": "object",
                "properties": { "path": { "type": "string" } },
                "required": ["path"]
            }
        ),
        Tool(
            name="write_file",
            description="Ghi nội dung vào file",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": { "type": "string" },
                    "content": { "type": "string" }
                },
                "required": ["path", "content"]
            }
        ),
        # ... other tools like list_files ...
    ]
```

-----

## Slide 30 File Manager: Implementing Logic (`@server.call_tool`)

### This single function acts as a router for all tool calls.

### It checks the `name` of the requested tool and uses an `if/elif/else` block to execute the correct logic.

### Robust error handling (`try...except`) is crucial for dealing with file system issues like "File Not Found".

### Code minh họa

```python
# From file_manager_server.py

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "read_file":
        file_path = arguments["path"]
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            return [TextContent(text=f"Nội dung:\n{content}")]
        except FileNotFoundError:
            return [TextContent(text=f"Không tìm thấy file: {file_path}")]
        # ... more error handling ...

    elif name == "write_file":
        # ... implementation for writing files ...
    
    # ... other tool implementations ...
```

-----

## Slide 31 Example 2: MySQL Server (Overview)

### This server allows an AI to connect to a local MySQL database to list tables, describe them, and run `SELECT` queries.

### It demonstrates key practices for building more complex and sensitive servers.

### Key Features

#### **Configuration Management:** Database credentials (`DB_CONFIG`) are separated from the logic.

#### **Security:** The server includes critical checks to prevent malicious queries.

#### **Output Formatting:** Results are formatted into a clean table for readability.

-----

## Slide 32 MySQL Server: Logic & Dispatch Pattern

### This server uses a slightly different but effective pattern for tool logic.

### The main `@server.call_tool` function acts as a simple dispatcher.

### It calls separate, dedicated `async` handler functions for each tool (e.g., `handle_list_tables`, `handle_select_query`). This keeps the code organized and easy to maintain.

### Code minh họa

```python
# From mysql_mcp_server.py

async def handle_list_tables() -> list[TextContent]:
    # ... logic to execute "SHOW TABLES" ...

async def handle_select_query(query: str) -> list[TextContent]:
    # ... logic to execute a SELECT query ...

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Dispatches to appropriate handler functions"""
    if name == "list_tables":
        return await handle_list_tables()
    elif name == "select_query":
        query = arguments["query"]
        return await handle_select_query(query)
    # ... other dispatch calls ...
```

-----

## Slide 33 MySQL Server: The CRITICAL Importance of Security

### When exposing a database or any sensitive system to an LLM, security is the \#1 priority.

### This server implements a basic but essential security layer. It validates user input *before* executing it.

### Code minh họa

```python
# From mysql_mcp_server.py in handle_select_query

async def handle_select_query(query: str) -> list[TextContent]:
    # Security check 1: Only allow queries that start with SELECT.
    if not query.upper().startswith("SELECT"):
        return [TextContent(text="Error: Only SELECT queries are allowed.")]
    
    # Security check 2: Block queries containing dangerous keywords.
    dangerous_keywords = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER"]
    query_upper = query.upper()
    for keyword in dangerous_keywords:
        if keyword in query_upper:
            return [TextContent(text=f"Error: Forbidden keyword '{keyword}'.")]
    
    # Only if checks pass, proceed to execute the query...
    try:
        # ... database execution logic ...
```

-----

## Slide 34 MySQL Server: Formatting for Usability

### Raw database output can be messy. A good MCP server formats data for clear presentation.

### This server uses a helper function (`format_table_data`) to turn query results into a nicely formatted text-based table, which is much easier for both the AI and the user to understand.

### Code minh họa

```python
# Example of formatted output

Query results:

Query: SELECT name, price FROM products LIMIT 2

| name          | price   |
|---------------|---------|
| Laptop        | 1200.00 |
| Mouse         | 25.00   |

Rows returned: 2
```

-----

## Slide 35 Code Takeaways for Building MCP Servers

### **Define Clear Tools:** The `inputSchema` is your contract with the AI. Make it explicit and clear.

### **Choose a Design Pattern:** Both the "all-in-one" function with `if/elif` (File Manager) and the "dispatcher" pattern (MySQL) are effective. Choose what fits your complexity.

### **Prioritize Security:** If a tool can perform destructive actions (write file, run query), you MUST validate and sanitize inputs. Never trust input directly.

### **Format Your Outputs:** Clean, readable output makes your server more reliable and useful.

### **Handle Every Error:** Anticipate potential failures (file not found, DB connection error, etc.) and provide helpful error messages.

-----

## Slide 36 Practice Q\&A

### **Hands-On & Implementation**

### Questions?

-----

## Slide 37 Thank You

### [Your Contact Information / Final Message]