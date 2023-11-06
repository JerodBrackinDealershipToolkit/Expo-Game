import './styles.css';
//import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import {useState} from 'react';
//import apicalls when ready to connect

const apiUrl = "https://u61hy8i23c.execute-api.us-west-1.amazonaws.com/dev/results";

const Level6 = ({setLevel,appReference,formSubmtited,setFormSubmitted,leadsTotal1,salesTotal1,salesTotal2}) => {

    const captureScreenshot = async () => {
        if (appReference.current) {
            const blob = domtoimage.toBlob(appReference.current);
            return blob;
            /*
            const canvas = await html2canvas(appReference.current);
            // Convert the canvas to a Blob
            return new Promise(resolve => {
                canvas.toBlob(blob => {
                    resolve(blob);
                }, 'image/png');
            });
            */
        }
        return null;
    };
    
    const captureScreenshots = async () => {
        let blobs = [];
        for (let i = 1; i <= 6; i++) {
            setLevel(i);
            // Await a brief moment for the UI to update
            await new Promise(resolve => setTimeout(resolve, 200));
            const blob = await captureScreenshot();
            if (blob) {
                blobs.push(blob);
            }
        }
        return blobs;
    };

    const onFormSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        setFormSubmitted(true);

        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        const blobs = await captureScreenshots();

        blobs.forEach((blob, i) => {
          formData.append(`level${i + 1}`, blob);
          //const url = URL.createObjectURL(blob);
          //window.open(url, '_blank');
          //URL.revokeObjectURL(url); // Clean up the URL after opening
        });

        // Append the fields to display in the HTML template
        formData.append("totalLeads", leadsTotal1);
        formData.append("incrementalSales", salesTotal2 - salesTotal1);

        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData
        });
        console.log(response);
    }

    return (
        <div className="Level">
            {!formSubmtited&&<div className="Form-Container">
                <form onSubmit={onFormSubmit}>
                    <h2>Get Your Results!</h2>
                    <input type="text" placeholder="Name" name="name"/>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="text" placeholder="Company" name="company"/>
                    <input type="tel" placeholder="(000) 000-0000" name="phone"/>
                    <button type="submit">Submit</button>
                </form> 
            </div>}
        </div>
    );
}

export default Level6;
