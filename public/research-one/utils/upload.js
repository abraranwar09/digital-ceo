function handleFileUpload() {
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    const lottieContainer = document.getElementById('lottie-container');
    const uploaderImage = document.getElementById('uploader-image'); // Get the uploader image element

    fileInput.addEventListener('change', function(e) {
        console.log('file changed');
        
        // fileList.innerHTML = '';
        const file = this.files[0]; // Get the first file (single file upload)
        if (file) {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between bg-gray-100 p-2 rounded';
            fileItem.innerHTML = `
                <span>${file.name}</span>
                <div>
                    <span class="text-gray-500 mr-2">${(file.size / 1024).toFixed(1)}kb</span>
                    <button class="text-red-500 hover:text-red-700" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
            `;
            fileList.appendChild(fileItem);

            // Hide the uploader image
            uploaderImage.classList.add('hide');

            // Show Lottie animation
            lottieContainer.innerHTML = '';
            lottie.loadAnimation({
                container: lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '/assets/file-loader.json'
            });

            // Create a new Headers object and append the Authorization header
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer dataset-c5Rq0ex8T4tnzpYoP5ZBVGR3");

            // Create a FormData object and append the necessary data
            const formdata = new FormData();
            formdata.append("data", "{\"indexing_technique\":\"high_quality\",\"process_rule\":{\"rules\":{\"pre_processing_rules\":[{\"id\":\"remove_extra_spaces\",\"enabled\":true},{\"id\":\"remove_urls_emails\",\"enabled\":true}],\"segmentation\":{\"separator\":\"###\",\"max_tokens\":500}},\"mode\":\"custom\"}}");
            formdata.append("file", fileInput.files[0], fileInput.files[0].name);

            // Define the request options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            
            // Make a POST request to the new server endpoint
            fetch("https://coreapi.inovasolutions.ai/v1/datasets/2d1c7e74-eee6-4af3-9727-f5b0bc6a9611/document/create_by_file", requestOptions)
                .then((response) => response.text())
                .then((result) => handleResult(result))
                .catch((error) => console.error(error)
            );

            function handleResult(result) {
                let resultObject = JSON.parse(result);
                console.log(resultObject);

                if (resultObject.message === 'Internal Server Error') {
                    alert('Error uploading or indexing file. Please try again or try another file.');
                } else {
                    fileInput.nextElementSibling.textContent = "This file is indexing in your knowledgebase. Click here to add more!";
                }
            }


        }
    });

}

function fetchAndDisplayFiles() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer dataset-c5Rq0ex8T4tnzpYoP5ZBVGR3");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://coreapi.inovasolutions.ai/v1/datasets/2d1c7e74-eee6-4af3-9727-f5b0bc6a9611/documents?limit=100", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = `<div class="text-blue-500 font-medium text-center"></div>`; // Clear existing list
            let fileData = data.data;
            console.log(data.data);
            fileData.forEach((file) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'flex items-center justify-between bg-gray-100 p-2 rounded';
                fileItem.innerHTML = `
                    <span>${file.name}</span>
                    <div>
                        <span class="text-gray-500 mr-2">${(file.data_source_detail_dict.upload_file.size / 1024).toFixed(1)}kb</span>
                        <button class="text-red-500 hover:text-red-700" onclick="this.parentElement.parentElement.remove()">×</button>
                    </div>
                `;
                fileList.appendChild(fileItem);
            });
        })
        .catch((error) => console.error(error));
}

// Call the function to fetch and display files when the app loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayFiles);

// Call the function to set up the file upload handler
handleFileUpload();