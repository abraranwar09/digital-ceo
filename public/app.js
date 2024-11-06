        //function to send message to chat
        function sendMessage() {
            const userInput = document.getElementById('userInput');
            const message = userInput.value.trim();
            if (!message) {
                alert("Please enter a message to send");
                return; // Exit the function early
            }

               

                // Call sendMessageToAI with message and filePath
                sendMessageToAI(message).then(data => {
                   
                     
                }).catch(error => {
                    console.error('Error sending message to AI:', error);
                });

                userInput.value = '';
            }


            document.addEventListener('DOMContentLoaded', () => {
                sendFirstMessage('Hi there');
            });
        

        // Function to export chat messages as PDF with styling
        function exportChatMessagesAsPDF() {
            const chatMessages = document.getElementById('chatMessages');
            const originalHeight = chatMessages.style.height; // Store the original height

            // Temporarily set the height to 'auto' to capture all content
            chatMessages.style.height = 'auto';

            html2canvas(chatMessages).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf; // Access jsPDF from the window object
                const pdf = new jsPDF();
                const imgWidth = 190; // Width of the PDF page
                const pageHeight = pdf.internal.pageSize.height;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('chatMessages.pdf');

                // Restore the original height
                chatMessages.style.height = originalHeight;
            });
        }

        // Add event listener to export PDF button
        document.getElementById('exportPdfButton').addEventListener('click', exportChatMessagesAsPDF);
