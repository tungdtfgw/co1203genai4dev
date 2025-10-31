
## Slide 1 Lecture 4: Advanced Concepts in Gen AI Programming
### Code Execution
### Function Calling
### Caching

## Slide 2 Why Go Beyond Text Generation?
### Standard LLMs are limited to their training data; they cannot access real-time information or perform precise calculations.
### Many real-world problems require executing code, fetching data from an API, or interacting with external services.
### Advanced tools like Code Execution and Function Calling give the model the ability to perform actions and solve more complex tasks.
### This transforms the LLM from a simple text generator into an intelligent agent that can reason and act.

## Slide 3 Section 1: Code Execution
### This section introduces Code Execution.
### A built-in, stateful tool that allows the Gemini model to execute code in a secure environment.
### The model decides when to run code to solve a problem and uses the output to inform its response.
### This is ideal for tasks involving calculations, data analysis, or algorithmic logic.

## Slide 4 What is Code Execution?
### Code Execution allows the model to run Python code within a REPL-like environment.
#### It is a tool provided by the API that the model can choose to use.
#### The execution happens in a sandboxed, stateless environment for security.

### It enables the model to perform tasks that are difficult with text alone.
#### For example, solving complex math problems or performing data manipulations.
#### The model generates the code, executes it, and observes the result to provide a final, accurate answer.

## Slide 5 How Code Execution Works
### The user sends a prompt to the model.
#### The prompt might ask for a calculation or a task that requires coding logic.

### The model determines that it needs to execute code.
#### It generates a Python code snippet to solve the task.
#### This code is sent to the Code Execution tool.

### The tool executes the code and returns the output.
#### The output (stdout) is sent back to the model as context.
#### The model then uses this output to formulate its final answer to the user.

## Slide 6 Key Benefits of Code Execution
### It significantly improves the model's ability to perform mathematical and computational reasoning.
### It allows the model to solve multi-step problems that require maintaining a state or building upon previous calculations.
### Since the model generates and runs the code itself, it requires less complex client-side logic from the developer.
### All execution is sandboxed, ensuring that the code cannot affect the host system.

## Slide 7 Use Case: Mathematical Calculations
### A user asks for a complex calculation that is prone to errors if done by text reasoning alone.
#### "Calculate the factorial of 15 and then tell me the sum of its digits."

### The model uses the Code Execution tool to get a precise answer.
#### First, it runs `math.factorial(15)` to get the exact number.
#### Second, it runs code to convert the result to a string and sum its digits.
#### Finally, it presents the correct, verified answer to the user.

## Slide 8 Code Example: A Simple Calculation
### This example shows how to enable the Code Execution tool for a simple prompt.
#### We will ask the model to calculate the area of a circle.
#### Notice that we simply enable the tool; the model decides how and when to use it.

### Code minh họa
```python
import google.generativeai as genai

# Configure with your API key
# genai.configure(api_key="YOUR_API_KEY")

# Enable the Code Execution tool
code_execution_tool = genai.Tool(
    code_execution=genai.CodeExecution()
)

model = genai.GenerativeModel(
    'gemini-1.5-pro-latest',
    tools=[code_execution_tool]
)

# Start a chat session
chat = model.start_chat()

prompt = "What is the area of a circle with a radius of 12.34 inches? Use π = 3.14159."
response = chat.send_message(prompt)

print(response.text)
```

## Slide 9 Understanding the Model's Reasoning

### When the Code Execution tool is used, the model's response contains logs of its actions.

#### This allows you to see the exact code the model generated and executed.

#### This is crucial for debugging and understanding the model's thought process.

### You can inspect the `tool_code` and `tool_output` parts of the response.

#### `tool_code` shows the Python snippet the model ran.

#### `tool_output` shows the result that was returned from the execution.

## Slide 10 Code Example: Inspecting Execution Logs

### Let's expand on the previous example to see what the model did behind the scenes.

#### We will access the `response.parts` to view the tool calls.

#### This reveals the intermediate steps the model took.

### Code minh họa

```python
import google.generativeai as genai

# ... (previous model and tool setup) ...

prompt = "What is the area of a circle with a radius of 12.34 inches? Use π = 3.14159."
response = chat.send_message(prompt)

# Iterate through the response parts to find tool usage
for part in response.parts:
    if part.function_call and part.function_call.name == "code_execution":
        print("--- Model Decided to Execute Code ---")
        print(f"Code Executed:\n{part.function_call.args['code']}")
        
# You would then find the corresponding function response part
# to see the output the model received before generating the final text.
print(f"\nFinal Answer:\n{response.text}")
```

## Slide 11 Security and Environment

### Code execution is a powerful tool, so security is a primary concern.

### All code is executed in a secure, sandboxed environment.

#### The execution environment has no access to the local machine, network, or any user credentials.

#### It prevents the model from performing harmful actions.

### The environment is also stateless.

#### Each code execution call is independent.

#### Variables or states from one call do not persist to the next, ensuring predictable and isolated executions.

## Slide 12 Best Practices for Code Execution

### Use Code Execution for tasks that require precision and logic.

#### Ideal for math, science, data analysis, and algorithmic problems.

#### Avoid it for tasks that don't require computation, as it adds unnecessary overhead.

### Provide clear and unambiguous prompts.

#### The better the prompt, the better the code the model will generate.

#### Specify any constraints, constants, or required libraries if known.

### Always review and log the model's tool usage in production.

#### This helps in monitoring costs, debugging issues, and ensuring the model is behaving as expected.

## Slide 13 Section 2: Function Calling

### This section introduces Function Calling.

### Function calling allows developers to connect the model to external APIs and services.

### The model doesn't execute the function itself; instead, it provides structured JSON output telling your application which function to call.

### This is the primary way to give the model access to real-time information or proprietary business logic.

## Slide 14 What is Function Calling?

### It's a mechanism for the model to request a specific action from your application.

#### You define a set of available functions (tools) that the model can use.

#### When the model needs one, it outputs a `FunctionCall` object with the function's name and the arguments it should be called with.

### It follows a request/response pattern.

#### Your code receives the `FunctionCall`, executes the corresponding function in your application, and sends the result back to the model.

#### The model then uses this result to continue the conversation.

## Slide 15 Code Execution vs. Function Calling

### Code Execution

#### The model **writes and executes** its own Python code in a sandboxed environment provided by Google.

#### Good for self-contained computational tasks.

#### The developer's role is simply to enable the tool.

### Function Calling

#### The model **requests the execution** of a function that **you, the developer, have defined** in your own application code.

#### Good for accessing external data (APIs) or executing proprietary logic.

#### The developer must declare the functions, handle the call, execute the code, and return the result.

## Slide 16 How Function Calling Works: A 3-Step Process

### Step 1: Define Your Tools and Send the Prompt

#### You declare your available functions (e.g., `get_current_weather`) to the model, including their name, description, and parameters.

#### You then send a user prompt like, "What's the weather like in Boston?"

### Step 2: Handle the Model's Function Call

#### The model processes the prompt and your tool definitions. It determines that it needs to call your `get_current_weather` function.

#### The API returns a `FunctionCall` object, like `{ "name": "get_current_weather", "args": { "location": "Boston, MA" } }`.

### Step 3: Execute the Function and Return the Result

#### Your code parses this object, calls your actual weather API function with "Boston, MA", and gets the result (e.g., "72 degrees and sunny").

#### You send this result back to the model, which then generates a natural language response for the user.

## Slide 17 Use Case: Getting Real-Time Weather

### An AI assistant needs to provide the current weather, which is not in its training data.

#### The developer defines a function `get_current_weather(location)` that calls a weather API.

### The user asks, "Is it a good day for a walk in London?"

#### The model sees the `get_current_weather` tool and understands it can get the weather for "London".

#### It issues a function call, your app fetches the data, and the model receives "45 degrees and raining."

#### The model then responds, "It's currently 45 degrees and raining in London, so it might not be the best day for a walk."

## Slide 18 Code Example: Defining a Tool

### Here is how you define a function that the model can call.

#### We will create a simple tool for finding the current weather.

#### The function declaration includes a description of what it does and its parameters, which is crucial for the model to understand how to use it.

### Code minh họa

```python
import google.generativeai as genai

# Define the function for the model to use
def get_current_weather(location: str):
    """Gets the current weather in a given location."""
    # In a real app, this would call a weather API
    if "tokyo" in location.lower():
        return "15 degrees Celsius and cloudy"
    elif "london" in location.lower():
        return "10 degrees Celsius and raining"
    else:
        return "22 degrees Celsius and sunny"

# Declare it as a tool for the model
weather_tool = genai.Tool(
    function_declarations=[
        genai.FunctionDeclaration(
            name="get_current_weather",
            description="Get the current weather in a given location",
            parameters={
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA"
                    }
                }
            }
        )
    ]
)
```

## Slide 19 Code Example: Initializing the Model

### Now, we initialize the model and provide it with our defined tools.

#### The model will now be aware of the `get_current_weather` function.

#### We pass the `weather_tool` in the `tools` argument.

### Code minh họa

```python
# ... (after defining weather_tool) ...

# Create the model and provide the tool
model = genai.GenerativeModel(
    'gemini-1.5-pro-latest',
    tools=[weather_tool]
)

# Start a chat session
chat = model.start_chat()
```

## Slide 20 Code Example: Handling the Function Call

### This is the core logic: sending a prompt and handling the model's request to call our function.

#### If the model returns a `FunctionCall`, we execute our local function.

#### We then send the output back to the model so it can formulate a final answer.

### Code minh họa

```python
# ... (after starting the chat) ...

prompt = "What is the weather like in London?"
response = chat.send_message(prompt)

# Check if the model wants to call a function
if response.parts[0].function_call:
    function_call = response.parts[0].function_call
    if function_call.name == "get_current_weather":
        # Call our actual Python function
        location = function_call.args['location']
        weather_result = get_current_weather(location=location)
        
        # Send the result back to the model
        response = chat.send_message(
            genai.Part(
                function_response=genai.FunctionResponse(
                    name="get_current_weather",
                    response={"weather": weather_result}
                )
            )
        )

# The final response from the model will contain the natural language answer
print(response.text)
```

## Slide 21 Multi-Turn Function Calling

### Conversations are often more complex than a single question and answer.

#### A user might ask a follow-up question that requires another function call, or multiple calls for one prompt.

#### Gemini supports these multi-turn scenarios automatically.

### Example Interaction:

#### User: "What's the weather in Tokyo and London?"

#### Model: Calls `get_current_weather` for "Tokyo".

#### You: Return the weather for Tokyo.

#### Model: Calls `get_current_weather` for "London".

#### You: Return the weather for London.

#### Model: "In Tokyo, it is 15 degrees and cloudy. In London, it is 10 degrees and raining."

## Slide 22 Code Example: A Function-Calling Loop

### To handle multi-turn conversations, it's best to put the logic in a loop.

#### The loop continues until the model returns a final text response instead of another function call.

#### This structure can handle any number of tool calls the model needs to make.

### Code minh họa

```python
prompt = "What's the weather in both Tokyo and London?"
response = chat.send_message(prompt)

while response.parts[0].function_call:
    function_call = response.parts[0].function_call
    
    # Execute the function based on its name
    if function_call.name == "get_current_weather":
        location = function_call.args['location']
        result = get_current_weather(location=location)
        
        # Send the result back
        response = chat.send_message(
            genai.Part(function_response=genai.FunctionResponse(
                name=function_call.name,
                response={"weather": result}
            ))
        )
    else:
        # Handle other potential functions
        break

print(response.text)
```

## Slide 23 Parallel Function Calling

### Gemini can also request multiple function calls in a single turn.

#### If a user asks a question that requires information from two separate tools, the model can ask for both at once.

#### For example, "What's the weather in Paris and what is the current exchange rate for EUR to USD?"

### This improves efficiency and reduces latency.

#### Your application can execute these API calls in parallel.

#### You then return all the results to the model in a single message.

## Slide 24 Best Practices for Function Calling

### Write clear function descriptions and parameter descriptions.

#### This is the most important factor for the model to reliably choose the right tool and provide the right arguments.

#### Use descriptive names and provide examples where helpful.

### Handle potential errors gracefully.

#### If your API call fails, you should return a meaningful error message to the model.

#### The model can then use this information to either try again or inform the user of the problem.

### Keep your functions focused and deterministic.

#### Each function should do one thing well.

#### Avoid functions with side effects that are not obvious from the description.

## Slide 25 Choosing the Right Tool

### Use Code Execution when...

#### The task is computational, algorithmic, or mathematical.

#### The problem can be solved with self-contained Python code.

#### You want the model to figure out the logic on its own.

### Use Function Calling when...

#### You need to access real-time, external, or proprietary data via an API.

#### You need to interact with other systems (e.g., databases, IoT devices).

#### You want to grant the model specific, well-defined capabilities.



## Slide 26 Giới thiệu về Prompt Caching
### Prompt caching là kỹ thuật tối ưu hóa hiệu suất và chi phí cho các mô hình ngôn ngữ lớn (LLM) bằng cách lưu trữ và tái sử dụng kết quả xử lý của các phần prompt không thay đổi.
### Mục tiêu chính là giảm độ trễ và chi phí xử lý prompt dài bằng cách tránh việc xử lý lại các phần không thay đổi giữa các yêu cầu.
### Cơ chế cơ bản là lưu trữ trạng thái nội bộ của mô hình sau khi xử lý phần đầu của prompt (input caching) hoặc lưu trữ toàn bộ cặp prompt-phản hồi (output caching).
### Khi LLM xử lý prompt dài, phần lớn thời gian và chi phí tính toán được dành cho việc xử lý phần đầu của prompt, và prompt caching giúp tránh xử lý lại phần này.

## Slide 27 Real-world Applications
### Prompt caching đã được triển khai thành công trong nhiều ứng dụng thực tế.
#### Nó mang lại hiệu suất cao hơn và chi phí thấp hơn đáng kể cho các hệ thống sản xuất dựa trên LLM.

### Một công ty fintech đã triển khai prompt caching cho hệ thống hỗ trợ khách hàng dựa trên Claude.
#### Độ trễ phản hồi giảm từ 2.5 giây xuống 0.4 giây (giảm 84%).
#### Chi phí API được tiết kiệm 78%, với tỷ lệ cache hit là 65% trên hơn 50,000 cuộc hội thoại mỗi ngày.

### Một công ty phần mềm đã áp dụng prompt caching cho trợ lý lập trình nội bộ dựa trên GPT-4.
#### Chi phí API hàng tháng giảm từ $75,000 xuống $12,000 (giảm 84%).
#### Thời gian phản hồi trung bình cải thiện từ 3.2 giây xuống 0.5 giây, với tỷ lệ cache hit đạt 72%.

### Một công ty luật sử dụng prompt caching cho hệ thống phân tích tài liệu pháp lý.
#### Thời gian xử lý trung bình giảm từ 45 giây xuống còn 8 giây (giảm 82%).
#### Chi phí API tiết kiệm được 76%, với tỷ lệ cache hit là 58% trên hơn 10,000 trang tài liệu mỗi ngày.

## Slide 28 Cách thức hoạt động
### Prompt caching hoạt động bằng cách lưu trữ và tái sử dụng kết quả xử lý của các phần prompt không thay đổi.
#### Prompt được phân tích để xác định phần cố định (system prompt, context) và phần thay đổi (user query).
#### Sau khi xử lý phần cố định, trạng thái nội bộ của mô hình được lưu trữ trong cache với một khóa duy nhất.
#### Khi nhận được prompt mới có phần cố định giống hệt, hệ thống tải trạng thái đã lưu và chỉ xử lý phần thay đổi.

### Hiệu quả của prompt caching phụ thuộc vào độ dài của phần cố định.
#### Càng dài, càng tiết kiệm được nhiều thời gian và chi phí.
#### Ngưỡng tối thiểu thường là 1024 token để đạt được lợi ích đáng kể.

## Slide 29 Input Caching Overview
### Input caching là phương pháp lưu trữ trạng thái nội bộ của mô hình sau khi xử lý phần đầu của prompt.
#### Nó cho phép tái sử dụng trạng thái này cho các prompt có phần đầu giống nhau.
#### Kỹ thuật này giúp giảm 50-85% thời gian xử lý và 50-90% chi phí API.

### Về mặt kỹ thuật, input caching hoạt động bằng cách lưu trữ các trạng thái ẩn và trọng số chú ý (hidden states, attention weights).
#### Phần đầu của prompt phải giống hệt nhau để có cache hit.
#### Thời gian sống của cache (TTL) thường từ 5 phút đến 1 giờ, tùy thuộc vào nhà cung cấp.

## Slide 30 Output Caching Overview
### Output caching là phương pháp lưu trữ và truy xuất toàn bộ cặp prompt-phản hồi.
#### Cách tiếp cận này khác với input caching chỉ lưu trữ trạng thái nội bộ của mô hình.
#### Nó giúp giảm độ trễ gần như bằng 0 và tiết kiệm chi phí tối đa khi có cache hit.

### Output caching hỗ trợ hai phương pháp so khớp.
#### So khớp chính xác (Exact matching) yêu cầu prompt phải giống hệt.
#### So khớp ngữ nghĩa (Semantic matching) cho phép cache hit ngay cả khi prompt không hoàn toàn giống nhau.



## Slide 31 So sánh Input vs Output Caching
### Input Caching lưu trữ trạng thái nội bộ của mô hình sau khi xử lý phần đầu của prompt.
#### Nó giúp giảm 50-85% độ trễ và tiết kiệm 50-90% chi phí API.
#### Chất lượng phản hồi luôn được cập nhật, nhưng nó yêu cầu tiền tố của prompt phải giống hệt nhau.

### Output Caching lưu trữ toàn bộ cặp prompt-phản hồi để truy xuất trực tiếp.
#### Nó giúp giảm độ trễ gần như bằng 0 và tiết kiệm chi phí gần 100% khi có cache hit.
#### Phương pháp này hỗ trợ matching linh hoạt (exact và semantic) nhưng phản hồi có thể không được cập nhật với phiên bản mô hình mới nhất.

## Slide 32 OpenAI Prompt Caching
### OpenAl triển khai input caching tự động cho các mô hình GPT-3.5 và GPT-4 mà không yêu cầu cấu hình.
#### Hệ thống tự động phát hiện và cache các phần đầu của prompt không thay đổi.
#### Yêu cầu tối thiểu 1024 token để kích hoạt caching, và cache có thời gian sống (TTL) khoảng 5 phút.

### Về mặt kỹ thuật, OpenAl sử dụng cơ chế hash để xác định các phần giống nhau giữa các prompt.
#### Khi phát hiện phần đầu của prompt giống hệt, hệ thống sẽ tải trạng thái đã lưu và tiếp tục xử lý từ đó.
#### Cơ chế này hoạt động tốt nhất với các ứng dụng có system prompt dài và cố định.

## Slide 33 OpenAI Prompt Caching - Triển khai
### Để tận dụng caching, hãy chia prompt thành phần cố định (system prompt, context) và phần thay đổi (user query).
#### Đảm bảo phần cố định đủ dài (>1024 token).

### Luôn đặt phần cố định ở đầu prompt, vì OpenAl chỉ cache phần đầu.
#### Phần thay đổi nên được đặt ở cuối prompt.

### Giữ phần cố định không thay đổi và giống hệt nhau giữa các yêu cầu.
#### Ngay cả những thay đổi nhỏ cũng có thể dẫn đến cache miss.

### Code minh họa
```python
import openai

# Phần cố định của prompt (system prompt + context)
system_prompt = """
Bạn là một trợ lý AI chuyên về lập trình Python.
Bạn cung cấp câu trả lời ngắn gọn, chính xác và dễ hiểu.
Luôn bao gồm ví dụ code khi trả lời các câu hỏi về lập trình.
Dưới đây là một số quy tắc bạn phải tuân thủ:
1. Sử dụng PEP 8 cho định dạng code
2. Ưu tiên các giải pháp Pythonic
3. Giải thích code một cách rõ ràng
4. Đề xuất các thực hành tốt nhất
"""

# Hàm để tạo prompt đầy đủ
def create_prompt(user_query):
    # Đảm bảo phần cố định ở đầu, phần thay đổi ở cuối
    return f"{system_prompt}\\n\\nUser Query: {user_query}"
```

## Slide 34 OpenAI Prompt Caching - Ví dụ mã nguồn
### Với prompt 2048 token, độ trễ có thể giảm từ \~1000ms xuống \~300ms (giảm 70%).
### Với tỷ lệ cache hit 80%, chi phí API giảm khoảng 65% cho prompt dài.
### Có thể đạt tỷ lệ cache hit \>90% với thiết kế prompt tốt và quản lý phiên đúng cách.
### OpenAl không cung cấp thông tin trực tiếp về cache hit/miss trong phản hồi API.
#### Để theo dõi hiệu suất caching, cần đo lường độ trễ và chi phí token theo thời gian.
### Code minh họa

```python
import openai
import time

class CachedOpenAIClient:
    def __init__(self, model="gpt-4"):
        self.client = openai.OpenAI()
        self.model = model
        self.cache_hits = 0
        self.cache_misses = 0

    def get_system_prompt(self):
        # Phần cố định của prompt (system prompt)
        # Đảm bảo phần này không thay đổi và đủ dài (>1024 token)
        return \"\"\"
Bạn là một trợ lý AI chuyên về lập trình Python.
Bạn cung cấp câu trả lời ngắn gọn, chính xác và dễ hiểu.
Luôn bao gồm ví dụ code khi trả lời các câu hỏi về lập trình.
[Thêm nhiều nội dung cố định ở đây để đạt >1024 token]
\"\"\"
```

## Slide 35 Google Gemini Prompt Caching
### Google Gemini triển khai hai loại prompt caching: Implicit (tự động) và Explicit (thủ công).
### Implicit caching tự động phát hiện và cache các phần đầu của prompt, tương tự như OpenAl.
### Explicit caching cho phép kiểm soát chi tiết thông qua tham số cacheOptions, bao gồm cacheLevel và cacheSeed.
### Yêu cầu tối thiểu 1024 token cho implicit caching, nhưng không có ngưỡng cho explicit caching.
### Cache có thời gian sống (TTL) khoảng 10 phút, dài hơn so với OpenAl.



## Slide 36 Gemini - Implicit Caching

### Implicit caching là phương pháp caching tự động của Google Gemini, tương tự như cách OpenAl triển khai.

#### Hệ thống tự động phát hiện và cache các phần đầu của prompt mà không cần cấu hình đặc biệt.

#### Yêu cầu tối thiểu 1024 token để kích hoạt, có TTL 10 phút và hỗ trợ tất cả các mô hình Gemini.

### Để tối ưu, hãy đảm bảo phần đầu của prompt giống hệt nhau giữa các yêu cầu và đủ dài (\>1024 token).

### Code minh họa

```python
import google.generativeai as genai
import os
import time

# Cấu hình API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Phần cố định của prompt (system prompt + context)
system_prompt = \"\"\"
Bạn là một trợ lý AI chuyên về lập trình Python.
Bạn cung cấp câu trả lời ngắn gọn, chính xác và dễ hiểu.
Luôn bao gồm ví dụ code khi trả lời các câu hỏi về lập trình.
Dưới đây là một số quy tắc bạn phải tuân thủ:
1. Sử dụng PEP 8 cho định dạng code
2. Ưu tiên các giải pháp Pythonic
\"\"\"
```

## Slide 37 Gemini - Explicit Caching

### Explicit caching là phương pháp caching thủ công của Google Gemini, cho phép kiểm soát chi tiết.

#### Tham số `cacheLevel` xác định mức độ cache, từ NONE (không cache) đến FULL (cache tối đa).

#### Tham số `cacheSeed` xác định khóa cache duy nhất, cho phép kiểm soát chính xác khi nào cache được sử dụng.

### Sử dụng `cacheSeed` giống nhau giữa các yêu cầu để đảm bảo cache hít.

#### Điều này đặc biệt hữu ích cho các ứng dụng có nhiều người dùng khác nhau nhưng cùng sử dụng một system prompt.

### Code minh họa

```python
import google.generativeai as genai
import os
import uuid

# Cấu hình API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Phần cố định của prompt (system prompt + context)
system_prompt = \"\"\"
Bạn là một trợ lý AI chuyên về lập trình Python.
[Thêm nội dung cố định ở đây]
\"\"\"

def generate_response(user_query, session_id):
    model = genai.GenerativeModel('gemini-1.5-pro-latest')
    # Sử dụng session_id làm cacheSeed
    response = model.generate_content(
        f"{system_prompt}\\n{user_query}",
        cache_options={"cache_seed": session_id, "cache_level": "HIGH"}
    )
    return response.text
```

## Slide 38 Anthropic Claude Prompt Caching

### Anthropic Claude triển khai input caching với khả năng kiểm soát chi tiết thông qua tham số `cache_control`.

#### Tham số này cho phép tùy chỉnh hành vi caching với các tùy chọn như "none", "auto", và "reuse".

#### `cache_seed` được sử dụng để xác định khóa cache duy nhất, cho phép kiểm soát chính xác khi nào cache được sử dụng.

### Không có ngưỡng token tối thiểu cụ thể, nhưng hiệu quả nhất với prompt dài (\>1024 token).

#### Cache có thời gian sống (TTL) khoảng 1 giờ, dài hơn đáng kể so với OpenAl và Gemini.

## Slide 39 Claude - Cache Control

### Claude cho phép kiểm soát chi tiết caching thông qua tham số `cache_control`.

#### `none`: Vô hiệu hóa caching hoàn toàn.

#### `auto`: Tự động phát hiện và cache các phần đầu của prompt (mặc định).

#### `reuse`: Tái sử dụng cache đã tạo trước đó với `cache_seed` tương ứng.

### Cache có thời gian sống khoảng 1 giờ và được hỗ trợ trên tất cả các mô hình Claude.

### Code minh họa

```python
import anthropic
import os
import uuid

# Khởi tạo client
client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

# Phần cố định của prompt
system_prompt = \"\"\"
Bạn là một trợ lý AI chuyên về lập trình Python.
Bạn cung cấp câu trả lời ngắn gọn, chính xác và dễ hiểu.
\"\"\"

def get_response(user_query, cache_mode="auto", seed=None):
    cache_control = {"type": cache_mode}
    if cache_mode == "reuse":
        cache_control["seed"] = seed
    
    response = client.messages.create(
        model="claude-3-opus-20240229",
        messages=[{"role": "user", "content": f"{system_prompt}\\n{user_query}"}],
        cache_control=cache_control
    )
    return response.content[0].text
```

## Slide 40 Claude - Ví dụ mã nguồn

### Chế độ "auto" tự động phát hiện và cache các phần đầu của prompt.

#### Lần gọi đầu tiên sẽ là cache miss, trong khi lần gọi thứ hai với cùng prompt sẽ là cache hit.

### Chế độ "reuse" kiểm soát chính xác khi nào cache được sử dụng thông qua `cache_seed`.

#### Với cache hit, chế độ "reuse" có thể giảm độ trễ từ \~1000ms xuống \~50ms (giảm 95%).

### Code minh họa

```python
# Ví dụ 1: Sử dụng chế độ auto (mặc định)
def example_auto_mode():
    user_query = "Làm thế nào để sử dụng list comprehension?"
    # Lần gọi đầu tiên (cache miss)
    result1 = get_response(user_query, cache_mode="auto")
    # Lần gọi thứ hai (cache hit)
    result2 = get_response(user_query, cache_mode="auto")
    return result1, result2

# Ví dụ 2: Sử dụng chế độ reuse với cache_seed
def example_reuse_mode():
    user_query = "Làm thế nào để sử dụng list comprehension?"
    cache_seed = "python-assistant-v1"
    # Lần gọi đầu tiên (cache miss)
    result1 = get_response(user_query, cache_mode="reuse", seed=cache_seed)
    # Lần gọi thứ hai (cache hit)
    result2 = get_response(user_query, cache_mode="reuse", seed=cache_seed)
    return result1, result2
```

## Slide 41 AWS Bedrock Prompt Caching

### AWS Bedrock triển khai input caching cho nhiều mô hình từ các nhà cung cấp khác nhau.

#### Hỗ trợ caching cho các mô hình từ Anthropic, Al21, Cohere, và Amazon Titan.

#### Cho phép bật/tắt cachíng thông qua tham số `cacheConfig`, với các tùy chọn như `enabled` và `ttlInSeconds`.

### Cho phép đặt thời gian sống của cache (TTL) từ 60 đến 3600 giây (1 phút đến 1 giờ).

#### Tích hợp chặt chẽ với các dịch vụ AWS như CloudWatch để giám sát và quản lý hiệu suất caching.

## Slide 42 AWS Bedrock - Ví dụ mã nguồn

### AWS Bedrock cho phép cấu hình caching thông qua tham số `cacheConfig`.

#### Các tùy chọn bao gồm `enabled` và `ttlInSeconds`.

#### Có thể đặt thời gian sống của cache từ 60 đến 3600 giây.

### Với prompt dài (\>2048 token), caching có thể giảm độ trễ 75% và giảm chi phí API khoảng 70%.

### Code minh họa

```python
import boto3
import json

# Khởi tạo client
bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1'
)

# Phần cố định của prompt
system_prompt = \"\"\"
Bạn là một trợ lý AI chuyên về lập trình Python.
[Thêm nội dung cố định ở đây để đạt >1024 token]
\"\"\"

def get_bedrock_response(user_query, use_cache=True):
    prompt = f"{system_prompt}\\n{user_query}"
    body = json.dumps({"prompt": prompt})
    
    response = bedrock_runtime.invoke_model(
        body=body,
        modelId="amazon.titan-text-lite-v1",
        cacheConfig={"enabled": use_cache, "ttlInSeconds": 3600}
    )
    return json.loads(response.get('body').read())
```

## Slide 43 LangChain Caching Implementation

### LangChain triển khai output caching thông qua nhiều loại cache khác nhau.

#### Nó cho phép lưu trữ và truy xuất toàn bộ cặp prompt-phản hồi mà không cần gọi LLM khi có cache hit.

#### Hỗ trợ nhiều loại cache (in-memory, Redis, SQLite) và cả so khớp chính xác lẫn so khớp ngữ nghĩa.

### Code minh họa

```python
from langchain.globals import set_llm_cache
from langchain.cache import InMemoryCache
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import time

# Cấu hình cache (sử dụng cache trong bộ nhớ)
set_llm_cache(InMemoryCache())

# Khởi tạo mô hình
llm = ChatOpenAI(temperature=0)

# Lần gọi đầu tiên (cache miss)
start_time = time.time()
llm.invoke([HumanMessage(content="Chào bạn")])
print(f"First call: {time.time() - start_time:.2f}s")

# Lần gọi thứ hai (cache hit)
start_time = time.time()
llm.invoke([HumanMessage(content="Chào bạn")])
print(f"Second call (cached): {time.time() - start_time:.2f}s")
```


## Slide 44 Limitations and Considerations

### Hầu hết các nhà cung cấp đều áp dụng giới hạn TTL cho cache (thường từ 5 phút đến 1 giờ).

#### Điều này có thể gây khó khăn cho các ứng dụng cần lưu cache lâu hơn.

### Caching chỉ hiệu quả khi prompt đủ dài (thường \>1024 token).

#### Với prompt ngắn, chi phí xử lý cache có thể cao hơn lợi ích thu được.

### Input caching yêu cầu tiền tố prompt phải giống hệt nhau để có cache hit.

#### Ngay cả những thay đổi nhỏ như khoảng trắng cũng có thể dẫn đến cache miss.

### Caching có thể gây khó khăn trong việc debug vì phản hồi có thể đến từ cache thay vì mô hình.

### Khi nhà cung cấp cập nhật mô hình, cache có thể trở nên lỗi thời, đặc biệt với output caching.

## Slide 45 Tổng kết

### Prompt caching là một kỹ thuật quan trọng để tối ưu hóa hiệu suất và chi phí cho các ứng dụng LLM.

### Input Caching giúp giảm độ trễ 50-85% và chi phí 50-90%.

### Output Caching giúp giảm độ trễ gần như bằng 0 và chi phí gần 100% khi có cache hit.

### Các trường hợp sử dụng tối ưu là conversational agents, coding assistants, và xử lý tài liệu lớn.

### Best Practices bao gồm cấu trúc prompt có chủ ý, theo dõi hiệu quả cache, và duy trì patterns nhất quán.

## Slide 46 Q\&A

### Prompt caching có hoạt động với tất cả các mô hình không?

#### Không, nó chỉ hoạt động với các mô hình và nhà cung cấp hỗ trợ tính năng này.

#### OpenAl, Claude, Gemini, và AWS Bedrock hỗ trợ input caching, trong khi LangChain hỗ trợ output caching.

### Làm thế nào để tối ưu hóa tỷ lệ cache hit?

#### Cấu trúc prompt với phần đầu cố định, duy trì patterns nhất quán, và đảm bảo tiền tố giống hệt nhau.

#### Sử dụng semantic matching cho output caching cũng là một giải pháp hiệu quả.

### Prompt caching có ảnh hưởng đến chất lượng phản hồi không?

#### Đối với input caching, chất lượng không bị ảnh hưởng.

#### Đối với output caching, chất lượng phụ thuộc vào độ tương tự giữa prompt mới và prompt đã cache.