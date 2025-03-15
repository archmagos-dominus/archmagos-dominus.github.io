<p>The HourAI/ShanghAI framework offers a quick, easy to setup, reliable and safe way to deploy a robust and efficient AI chatbot on any discord server. It's main purpose is to be as close as possible to state of the art chatbots currently deployed online while also being as cheap as possible to set-up and maintain for a long period of time.</p>

<p>This system is made up of two separate parts: the discord bot (HourAI) and the natural language processing software (ShanghAI). The main reasons for separation
can be condensed down to safety and resource usage. In terms of safety, the split allows the part theat requires internet access (HourAI) to be hosted on a different
machine from ShanghAI, which will be able to provide inference for HourAI as long as they can communicate. This approach can be beneficial in any event that might compromise the security of the machine connected to the internet that HourAI runs on, making sure that any malicious activity does not reach ShanghAI (and, most importantly, data that the bot might collect from the users). In terms of efficiency and resource usage, ShanghAI is deisgned to provide the complete natural language processing functionality (including inference, fine-tuning and model training) while HourAI is left handling all the rest. This creates a back-end as light as it is possible by making sure the machine that is used to run inference or training does not have to divert any resouces towards other processing tasks required for the full functionality of this system.</p>

<p>Now that we have a basic understanding of the HourAI/ShanghAI framework, let us dive deeper and analyse both components in turn, while also noting the way they can be set up depending on your availible resources.</p>

<p>HourAI is the discord bot, tasked with receiving user messages from discord, sanitizing them so that they can be used for inference, storing message content short term for debugging and/or later training and controlling ShanghAI's functionality directly from discord. It is written in python and while it does have a wide range of task that it needs to complete, it is also the lightest part of this framework. It can run on any machine that is capable of connecting to the internet and has python and HourAI's required modules installed. Her configuration files are the place where most of the varibles required (both for herself and ShanghAI inference parameters) are found. HourAI is also capable of connecting to cloud based inference solutions in case your current resources do not allow for on-site hosting of a model (the current example assumes you are using HuggingFace but any kind of service can be used with minimal changes to the requests).</p>

<p>The ShanghAI half of this system has fewer separate processing tasks to concern herself with, however, each of those tasks requires memory and processing power a few orders of magnitude higher than the HourAI part. As such, ShanghAI has been designed with the purpose of being used in self-hosting the model on a dedicated machine, as to allow all the necessary resources to be used exclussively by ShanghAI's processes. Those processes include inference, taking the sanitized message from HourAI and proving back the response, and the traning of models using it's past conversations as a dataset. ShanghAI seems able to run inference with a system boasting a staggering 4GB of RAM and a mediocre processor, however, the trainig uses up either 16GB of SRAM or 8GB of VRAM, and does require either a fast CPU or a dedicated GPU to perfom this function in an acceptable time frame. That said, I have provided a model that is already trained and ready for use, so even if you do not have acccess to the required hardware for training the model, you can still use the model "as is" for inference and parameter tuning research.</p>

<p style="font-family:sans-serif;">Useful links for this project:</p><a href="https://github.com/archmagos-dominus/HourAI" style="font-family:sans-serif;">HourAI repository</a><a href="https://github.com/archmagos-dominus/ShnaghAI" style="font-family:sans-serif;">ShanghAI repository</a>


<p style="font-family:sans-serif;"></p>

<p style="font-family:sans-serif;"></p>

<p style="font-family:sans-serif;"></p>

<p style="font-family:sans-serif;"></p>

<p style="font-family:sans-serif;"></p>

<p style="font-family:sans-serif;"></p>

<p style="font-family:sans-serif;"></p>

<p></p><p></p>