

## Slide 1 Lecture 06: Fine-Tuning LLMs
### An Introduction to Fine-Tuning Large Language Models (LLMs)
### Adapting powerful pre-trained models for specialized tasks.
### Unlocking new capabilities, improving accuracy, and increasing efficiency.


---

## Slide 2 The Limitation of Pre-trained LLMs
### Despite their power, general-purpose LLMs may not always be a perfect fit.
### They can lack the specific knowledge or style required for specialized domains or tasks.
### They may not always be suitable for specific tasks or domains.

* URL: https://media.licdn.com/dms/image/v2/D4E12AQEPr2krkMePDQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709585045088?e=2147483647&v=beta&t=M_0pyqkZsD4JC8n4V0BBngWFdIPaflw-EXumBxHsmuQ
---

## Slide 3 What is Fine-Tuning?
### Fine-tuning is the process of taking a pre-trained model and performing additional training on it.
### This additional training uses a smaller, specialized dataset relevant to your specific task.
### It's a resource-efficient approach, as training a new LLM from scratch requires enormous computational power and time.

* URL: https://www.anolytics.ai/public/upload/1724735896_fine-tuning-and-llm.jpg

---

## Slide 4 Key Benefit 1: Performance & Efficiency
### Improved Performance and Accuracy
#### Fine-tuned models adapt to new data, leading to more accurate and reliable outputs.
#### It helps fix hallucinations or errors that are difficult to correct with prompt engineering alone.

### Cost and Time Efficiency
#### It saves computational costs by adjusting pre-trained models instead of building new ones.
#### It can "distill" skills from a large model (like GPT-4) into a smaller one, reducing cost and latency.

* URL: https://zesty.co/wp-content/uploads/2022/01/do-you-have-to-choose_v2-1.jpg

---

## Slide 5 Key Benefit 2: Customization & Adaptation
### Domain-Specific Adaptation
#### Fine-tuning allows an LLM to understand the unique language, terminology, and nuances of a specific domain (e.g., medical, legal, financial).

### Consistent Tone and Style
#### You can teach the model specific rules for voice, tone, and output formatting (e.g., JSON, Markdown).
#### This ensures the model's output consistently aligns with your brand or application requirements.

---

## Slide 6 Key Benefit 3: Advanced Capabilities
### Handling Edge Cases
#### You can integrate corrections for specific corner cases directly into the model's behavior.
#### This makes the model more robust and reliable when facing unusual user inputs.

### Teaching New Skills
#### Fine-tuning can teach a model to use your specific tools or APIs through "Function-calling."
#### The model learns to integrate API signatures into its core behavior.

---

## Slide 7 When to Fine-Tune: The Tipping Point
### Fine-tuning is a more significant commitment than prompt engineering.
### It should be considered when the benefits of customization and accuracy outweigh the effort.
### There are clear signs when you have reached the limits of what prompting can achieve.

---

## Slide 8 Signs You've Outgrown Prompt Engineering
### Your system prompts are becoming novels
#### If your "always-do-this" instructions have become excessively long and complex.

### You are burning through your token budget
#### When you are spending hundreds or thousands of extra tokens just to guide the model to the correct output.

### You see diminishing returns on tweaks
#### When small changes to your prompts no longer produce significant improvements in output quality.

### You constantly find new edge cases
#### If you are continuously discovering new user inputs that cause the model to struggle or fail.

---

## Slide 9 When is Fine-Tuning Beneficial?
### Tone, Style, and Formatting: When you need the model to adopt a specific persona or consistently produce structured output (JSON, YAML).
### Improving Accuracy: Especially when initial accuracy is low (<50%), fine-tuning can lead to dramatic improvements.
### Niche Domains: For specialized fields like legal, medical, or finance where the general model lacks deep knowledge.
### New Tasks/Capabilities: To teach the model new skills, like using a retrieval system more effectively or evaluating other LLMs.

---

## Slide 10 Fine-Tuning vs. Other Techniques
### In-Context Learning (ICL)
#### Providing a few examples within the prompt to guide the model.
#### It's powerful but can increase cost and latency, and the model might ignore examples if there are too many.

### Retrieval-Augmented Generation (RAG)
#### Providing the model with external, up-to-date information from a database to answer a query.
#### RAG does not update the model's weights; it only provides context for a specific prompt.

* URL: https://media.licdn.com/dms/image/v2/D5612AQGHGLn9BD_Y6w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1713769485184?e=2147483647&v=beta&t=C-aZX78W7faVCVRu6jv4JcA5Z3Z8Q_f4FrSzZo-GK_U

---

## Slide 11 RAG or Fine-Tuning?
### Use Retrieval-Augmented Generation (RAG) when...
#### You need up-to-the-minute facts or your data changes frequently (e.g., product docs, news feeds).
#### The task is primarily about retrieving and synthesizing specific information from a known source.

### Use Fine-Tuning when...
#### You need a consistent tone, strict output formatting, or an integrated behavior you can't reliably prompt every time.
#### The task is about learning a style, skill, or nuance that is not easily captured by providing documents.

### The Hybrid Approach
#### In many cases, a combined solution using both RAG and fine-tuning yields the best results.

---

## Slide 12 The Fine-Tuning Workflow: An Overview
### The process of fine-tuning an LLM is a structured, multi-stage journey.
### It begins with data preparation and ends with ongoing monitoring in a production environment.
### The seven key stages are: Data Preparation, Model Initialization, Environment Setup, Fine-Tuning, Evaluation, Deployment, and Maintenance.

---

## Slide 13 Key Steps in the Fine-Tuning Process (1/2)
### 1. Select a Pre-Trained Model
#### Choose a base model that aligns well with your target task or domain.

### 2. Gather and Preprocess Data
#### Collect high-quality, diverse, and representative data for your task.
#### Clean the data, format it consistently (e.g., JSON), and split it into training, validation, and test sets.

### 3. Configure Model & Tokenizer
#### Configure how the model is loaded, for instance, using 4-bit quantization (with QLoRA) to save memory.
#### Set up the tokenizer, adding special tokens and padding strategies.

* URL: https://miro.medium.com/v2/resize:fit:1400/1*Qt3DkmSdM3JYOPVCb0wHKA.png

---

## Slide 14 Key Steps in the Fine-Tuning Process (2/2)
### 4. Fine-Tune the Model
#### Adjust the model's parameters on your specialized dataset using a chosen technique (Full Fine-Tuning or PEFT).

### 5. Evaluate and Validate
#### Assess the fine-tuned model's performance on unseen data to ensure it generalizes well.
#### Use both quantitative metrics (e.g., ROUGE, Accuracy) and qualitative human evaluation.

### 6. Deploy and Monitor
#### Package the fine-tuned model and integrate it into your production application.
#### Continuously monitor its performance and maintain it over time.

* URL: https://miro.medium.com/v2/resize:fit:1400/1*Qt3DkmSdM3JYOPVCb0wHKA.png

---

## Slide 15 Fine-Tuning Methods: An Overview
### There are two primary approaches to fine-tuning an LLM.
### Full Fine-Tuning: Updates all of the model's weights.
### Parameter-Efficient Fine-Tuning (PEFT): Updates only a small subset of the model's parameters.
### PEFT methods are now the most common due to their efficiency.

---

## Slide 16 Method 1: Full Fine-Tuning
### How it Works
#### This traditional method adjusts all of the weights of the pre-trained model.
#### It essentially creates a completely new version of the model.

### Requirements & Drawbacks
#### It demands significant memory and computational resources, similar to pre-training.
#### It is highly susceptible to "catastrophic forgetting," where the model loses its original, general knowledge.

---

## Slide 17 Method 2: Parameter-Efficient Fine-Tuning (PEFT)
### PEFT addresses the resource challenges of full fine-tuning.
### Content 2
### It works by freezing most of the model's parameters and only updating a small, manageable subset.
### This dramatically reduces memory requirements and helps prevent catastrophic forgetting.
### LoRA and QLoRA are the most widely used and effective PEFT methods today.

* URL: https://api.weekly.vn/files/1/public/1741576974612_da4c1576-e41d-4764-8b4e-f0bf00c0baf8

---

## Slide 18 PEFT Explained: LoRA and QLoRA
### LoRA (Low-Rank Adaptation)
#### Instead of fine-tuning all weights, LoRA fine-tunes two much smaller matrices that approximate the weight changes.
#### This results in a small "LoRA adapter" (measured in MBs) that can be applied to the original, frozen LLM.

### QLoRA (Quantized Low-Rank Adaptation)
#### An even more memory-efficient version of LoRA.
#### QLoRA quantizes the LLM's weights to a lower precision (e.g., 4-bit) before adding the LoRA adapters.
#### This allows fine-tuning of large models on consumer-grade GPUs.

* URL: https://docs.pytorch.org/torchtune/0.6/_images/lora_diagram.png

---

## Slide 19 Advanced Method: Reinforcement Learning from Human Feedback (RLHF)
### RLHF is an innovative approach to align LLMs more closely with human preferences.
### It trains a language model through interactions involving human feedback.
### This helps the model generate responses that are more accurate, helpful, and contextually appropriate.
### It involves training a "reward model" based on human rankings of model outputs.
### Direct Preference Optimization (DPO) is a more recent, simpler alternative that bypasses the complexity of RLHF.

* URL: https://cdn.prod.website-files.com/67a1e6de2f2eab2e125f8b9a/67a4f1ea8c23f95d2ce3908b_i91Ps5p_H6KP2nv4D1kBr_wmaf_pEks93gpKNRs01ip_rrnvzxN37Bjj2e3AXaJCRyFsT2CJpkgPMtcO2hr1xAieLJv4BFgR-NxZvN0T5moWbJsH0PMWkM4P7jTSTovuNr5H_0sS7fOEaoApZl38UtM.png


---

## Slide 20 Platforms & Tools for Fine-Tuning (Beginner)
### Hugging Face
#### Offers user-friendly tools like the no-code `AutoTrain` and flexible APIs (`Trainer`, `TRL`) for open-source models.

### OpenAI Fine-Tuning API
#### A managed, beginner-friendly platform for fine-tuning OpenAI's proprietary models like GPT-3.5 and GPT-4.

### Cohere
#### Known for clear, developer-friendly documentation and a straightforward dashboard for fine-tuning.

---

## Slide 21 Platforms & Tools for Fine-Tuning (Enterprise)
### Google Vertex AI Studio
#### Fine-tune Google's models (e.g., Gemini) within the Google Cloud Platform ecosystem.

### AWS Bedrock / SageMaker
#### Fine-tune leading foundation models using the AWS console or API.

### Microsoft Azure AI / OpenAI Service
#### An end-to-end platform on Azure for developing, fine-tuning, and deploying AI, including access to OpenAI models.

### NVIDIA NeMo
#### A framework for building and customizing LLMs on advanced NVIDIA GPUs, with tools for preparing large-scale datasets.

---

## Slide 22 Challenge 1: Scalability
### Massive Resource Requirements
#### Large models like LLaMA 2 (7B) can require over 100 GB of GPU memory for full fine-tuning.
#### This creates significant computational and financial costs.

### Large Data Volumes
#### LLMs require substantial amounts of high-quality training data to achieve peak performance during fine-tuning.

---

## Slide 23 Future Direction: More Efficient Fine-Tuning
### Advanced PEFT Techniques
#### Research into methods like Sparse Fine-Tuning aims to reduce the computational load even further by updating only a tiny fraction of parameters.

### Data-Efficient Fine-Tuning (DEFT)
#### A new approach that focuses on "data pruning" to identify and train only on the most critical data samples, optimizing the process.

### Hardware-Algorithm Co-design
#### Developing custom hardware accelerators (like NVIDIA's TensorRT) that are specifically optimized for LLM tasks.

---

## Slide 24 Challenge 2: Ethical Considerations
### Bias and Fairness
#### Biases present in the fine-tuning dataset can be learned and amplified by the model.

### Privacy Concerns
#### Fine-tuning often involves sensitive or proprietary data, requiring techniques like differential privacy to protect it.

### Security Risks
#### Fine-tuned models can be vulnerable to adversarial attacks.

### Accountability and Transparency
#### A lack of documentation and transparency about the fine-tuning process can make it difficult to understand a model's behavior.

---

## Slide 25 The Future is Multimodal
### The next frontier for LLMs is multimodality—processing information from text, images, video, and audio.
### Vision-Language Models (VLMs) combine visual and text information.
### Audio or Speech LLMs can understand and generate language from audio inputs (e.g., OpenAI's Whisper).
### PEFT techniques like LoRA and QLoRA are already being successfully applied to fine-tune these powerful multimodal models for specialized tasks.
---


## Slide 26 Fine-Tuning an LLM from Hugging Face
https://www.kaggle.com/code/ibrahimqasimi/distilbert-fine-tuning-on-imdb-50k-nlp-tutorial
### Goal of the Tutorial

  * **What is Fine-Tuning?** A brief explanation that fine-tuning is the process of adapting a pre-trained model to a specific dataset, making it perform better on a specialized task.
  * **Why Fine-Tune?** This process leverages the vast knowledge of large models while optimizing them for unique needs, such as text classification, summarization, or domain-specific question answering.
  * **What We Will Do:** This tutorial will walk you through the steps to fine-tune the **DistilBERT** model for a sentiment analysis task using the `transformers` and `datasets` libraries from Hugging Face.

-----

## Slide 27 Environment Setup

### Installing Necessary Libraries

  * To get started, you need to install the `transformers`, `datasets`, and `torch` libraries. The `evaluate` and `accelerate` libraries are also required to support the training and evaluation process.
  * Use pip to install all of them at once.

### Code

```python
!pip install transformers datasets torch evaluate accelerate
```

-----

## Slide 28 Step 1: Load the Model and Tokenizer

### Choose a Pre-trained Model

* The first step is to select a suitable base model. For this example, we will use `distilbert-base-uncased`, a smaller and faster version of BERT, which is ideal for experimentation.
* We will load both the model and its corresponding tokenizer using the `AutoModelForSequenceClassification` and `AutoTokenizer` classes.

### Code

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load the tokenizer for the 'distilbert-base-uncased' model
tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')

# Load the pre-trained model for sequence classification
# num_labels=2 indicates 2 output classes (e.g., positive and negative)
model = AutoModelForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=2)
```

-----

## Slide 29 Step 2: Load and Prepare the Dataset

### Using the `datasets` Library

* Hugging Face provides a powerful `datasets` library to easily load and process data.
* We will use the `imdb` dataset, a popular dataset for sentiment classification of movie reviews.

### Code

```python
from datasets import load_dataset

# Load the imdb dataset from the Hugging Face Hub
imdb_dataset = load_dataset('imdb')
```

---

## Slide 30 Step 3: Tokenize the Dataset

### Converting Text into Model Inputs

* The model cannot understand raw text. We must use the tokenizer to convert sentences into numbers (token IDs) that the model can process.
* We will write a function to tokenize the data and apply it to the entire dataset using the `.map()` method.

### Code

```python
# A function to tokenize the data
def tokenize_function(examples):
    # padding="max_length" to pad shorter sequences
    # truncation=True to truncate longer sequences
    return tokenizer(examples['text'], padding='max_length', truncation=True)

# Apply the tokenize function to the entire dataset
tokenized_datasets = imdb_dataset.map(tokenize_function, batched=True)

# For faster training, we will only use a small subset
tokenized_train = tokenized_datasets['train'].select(range(1000))
tokenized_test = tokenized_datasets['test'].select(range(500))
```

---

## Slide 31 Step 4: Set Training Arguments

### Configuring the Fine-Tuning Process

* The `TrainingArguments` class allows you to customize all aspects of the training process, such as the learning rate, number of epochs, batch size, and the directory where the model will be saved.

### Code

```python
from transformers import TrainingArguments

# Set up the arguments for the training process
training_args = TrainingArguments(
    output_dir='./results',          # Directory to save model checkpoints
    num_train_epochs=3,              # Total number of training epochs
    per_device_train_batch_size=8,   # Batch size per device during training
    per_device_eval_batch_size=8,    # Batch size for evaluation
    warmup_steps=500,                # Number of warm-up steps for the learning rate scheduler
    weight_decay=0.01,               # Strength of weight decay
    logging_dir='./logs',            # Directory for storing logs
    logging_steps=10,
)
```

---

## Slide 32 Step 5 & 6: Initialize and Start Training

### Using the `Trainer` Class

* The Hugging Face `Trainer` class is a convenient wrapper that simplifies the training loop.
* It handles everything from feeding data to the model, calculating the loss, and updating the weights.
* We just need to provide it with the model, arguments, training dataset, and evaluation dataset.

### Code

```python
from transformers import Trainer

# Initialize the Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_train,
    eval_dataset=tokenized_test
)

# Start the fine-tuning process
trainer.train()
```

---

## Slide 33 Step 7 & 8: Evaluate and Save the Model

### Checking Performance

* After training is complete, we need to evaluate the model's performance on the test set to see how well it works.
* Finally, save the fine-tuned model so it can be used later.

### Code

```python
# Evaluate the model on the test set
evaluation_results = trainer.evaluate()
print(evaluation_results)

# Save the fine-tuned model
trainer.save_model("./fine_tuned_distilbert_imdb")
tokenizer.save_pretrained("./fine_tuned_distilbert_imdb")
```

---

## Slide 34 Using the Fine-Tuned Model

### Making Predictions

* Now, we can load our fine-tuned model and use it to predict the sentiment of new sentences.
* The easiest way to do this is with the Hugging Face `pipeline`.

### Code

```python
from transformers import pipeline

# Load the fine-tuned model from the saved directory
fine_tuned_model = AutoModelForSequenceClassification.from_pretrained("./fine_tuned_distilbert_imdb")
fine_tuned_tokenizer = AutoTokenizer.from_pretrained("./fine_tuned_distilbert_imdb")

# Create a pipeline for the text-classification task
classifier = pipeline('text-classification', model=fine_tuned_model, tokenizer=fine_tuned_tokenizer)

# Test with a new sentence
result = classifier("This movie was fantastic, the acting was superb!")
print(result)
```


-----

## Slide 35 Summary and Next Steps

### What We Accomplished

* ✅ **Data Loading:** Successfully loaded and explored the IMDb dataset
* ✅ **Preprocessing:** Tokenized text data for DistilBERT consumption
* ✅ **Model Training:** Fine-tuned DistilBERT for sentiment classification
* ✅ **Evaluation:** Achieved high accuracy on movie review sentiment
* ✅ **Deployment:** Created inference pipeline for real-world usage

### Key Takeaways

* **DistilBERT** provides excellent performance-to-size ratio
* **Fine-tuning** dramatically improves task-specific performance
* **Hugging Face ecosystem** simplifies the entire ML pipeline
* **Proper evaluation** is crucial for understanding model performance

### Next Steps and Extensions

* **Multi-class Classification:** Extend to rating prediction (1-5 stars)
* **Domain Adaptation:** Apply to other review types (products, restaurants)
* **Model Compression:** Further optimize for mobile deployment
* **Data Augmentation:** Improve robustness with synthetic data
* **Ensemble Methods:** Combine multiple fine-tuned models

-----

## Slide 36 Q&A / Thank You

### Thank You for Following This Tutorial!

* **GitHub Repository:** Find complete code and resources
* **Hugging Face Model Hub:** Share your fine-tuned models
* **Community Support:** Join ML communities for continued learning

### Questions & Discussion

* How can we adapt this approach to other NLP tasks?
* What are the computational requirements for larger datasets?
* How do we handle multilingual sentiment analysis?
* What are the best practices for continuous model improvement?

**Remember:** Fine-tuning is an iterative process. Experiment, evaluate, and improve!