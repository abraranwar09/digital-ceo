async function sendMessageToAI(message) {
//add user message to chat container
const chatMessagesContainer = document.getElementById('chatMessages');
chatMessagesContainer.innerHTML += `
    <div class="" style="margin-top: 20px; margin-bottom: 20px;">
        <p class="bg-blue-100 text-sm text-blue-800 rounded-lg p-3 inline-block">${message}</p>
     </div>
`;
     // Show skeleton loader
    //  const skeletonLoader = document.createElement('div');
    //  skeletonLoader.className = 'skeleton-loader';
    //  skeletonLoader.id = 'skeletonLoader';
    //  chatMessagesContainer.appendChild(skeletonLoader);

    const skeletonLoaderContainer = document.createElement('div');
    skeletonLoaderContainer.id = 'skeletonLoaderContainer';
    skeletonLoaderContainer.innerHTML = `<div class="skeleton-loader"></div><div class="skeleton-loader skeleton-2"></div>`;
    chatMessagesContainer.appendChild(skeletonLoaderContainer);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": {
            "KnowledgebaseSearchTool-E9RCn": {},
            "APIRequestTool-uAe9v": {},
            "FlowTool-AlZd3": {},
            "ChatInput-GKkgm": {},
            "ChatOutput-dXTzJ": {},
            "ToolCallingAgent-zfRQZ": {},
            "OpenAIModel-lXBwH": {},
            "FlowTool-RDIB6": {},
            "CalculatorTool-3LCtm": {},
            "Memory-PXtvG": {},
            "FlowTool-9vytV": {},
            "FlowTool-Lqs54": {}
        }
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://flow.ohanapal.bot/api/v1/run/4177a407-20fd-486a-8bc9-b259c23a3538?stream=false", requestOptions);
        const result = await response.text();
        console.log(JSON.parse(result));
        const message = JSON.parse(result).outputs[0].outputs[0].results.message.text;

        skeletonLoaderContainer.remove();

        // Insert mainText into the chatMessages container
        const chatMessagesContainer = document.getElementById('chatMessages');
        chatMessagesContainer.innerHTML += `
            <div class="mb-4">
                <div class="flex items-start">
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">Snowflake Research One</p>
                        <p class="text-sm text-gray-500">${message}</p>
                    </div>
                </div>
            </div>
        `;

        // var tltElements = document.querySelectorAll('.tlt');
        
        // $('.tlt').textillate({in: {delayScale: .2}});

        // setTimeout(() => {
        //     tltElements.forEach(element => {
        //         element.classList.remove('tlt');
        //     });
        // }, 10000);



        chatMessages.scrollTop = chatMessages.scrollHeight;

        return result;

    } catch (error) {
        alert("Error: " + "The Analysis Failed. Please try again.");
        console.error('Error:', error);
    }
}



async function sendFirstMessage(message) {
    //add user message to chat container
    const chatMessagesContainer = document.getElementById('chatMessages');
    // chatMessagesContainer.innerHTML += `
    //     <div class="mb-4">
    //         <p class="bg-blue-100 text-sm text-blue-800 rounded-lg p-3 inline-block">${message}</p>
    //      </div>
    // `;
         // Show skeleton loader
        //  const skeletonLoader = document.createElement('div');
        //  skeletonLoader.className = 'skeleton-loader';
        //  skeletonLoader.id = 'skeletonLoader';
        //  chatMessagesContainer.appendChild(skeletonLoader);
    
        const skeletonLoaderContainer = document.createElement('div');
        skeletonLoaderContainer.id = 'skeletonLoaderContainer';
        skeletonLoaderContainer.innerHTML = `<div class="skeleton-loader"></div><div class="skeleton-loader skeleton-2"></div>`;
        chatMessagesContainer.appendChild(skeletonLoaderContainer);
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            "input_value": message,
            "output_type": "chat",
            "input_type": "chat",
            "tweaks": {
                "KnowledgebaseSearchTool-E9RCn": {},
                "APIRequestTool-uAe9v": {},
                "FlowTool-AlZd3": {},
                "ChatInput-GKkgm": {},
                "ChatOutput-dXTzJ": {},
                "ToolCallingAgent-zfRQZ": {},
                "OpenAIModel-lXBwH": {},
                "FlowTool-RDIB6": {},
                "CalculatorTool-3LCtm": {},
                "Memory-PXtvG": {},
                "FlowTool-9vytV": {},
                "FlowTool-Lqs54": {}
            }
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        try {
            const response = await fetch("https://flow.ohanapal.bot/api/v1/run/4177a407-20fd-486a-8bc9-b259c23a3538?stream=false", requestOptions);
            const result = await response.text();
            console.log(JSON.parse(result));
            const message = JSON.parse(result).outputs[0].outputs[0].results.message.text;
    
            skeletonLoaderContainer.remove();
    
            // Insert mainText into the chatMessages container
            const chatMessagesContainer = document.getElementById('chatMessages');
            chatMessagesContainer.innerHTML += `
                <div class="mb-4">
                    <div class="flex items-start">
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-900">Snowflake Research One</p>
                            <p class="text-sm text-gray-500">${message}</p>
                        </div>
                    </div>
                </div>
            `;
    
            var tltElements = document.querySelectorAll('.tlt');
            
            // $('.tlt').textillate({in: {delayScale: .2}});
    
            // setTimeout(() => {
            //     tltElements.forEach(element => {
            //         element.classList.remove('tlt');
            //     });
            // }, 10000);
    
    
    
            chatMessages.scrollTop = chatMessages.scrollHeight;
    
            return result;
    
        } catch (error) {
            alert("Error: " + "The AI agent may be busy now. Please try again.");
            console.error('Error:', error);
        }
    }