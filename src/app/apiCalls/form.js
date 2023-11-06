// api/products.js
export async function submitLevel5Form(formData) {
    try {
      const response = await fetch('/api/submit-level5-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
        return response.json();
      } else {
        // Handle errors
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      // Handle network or other errors
      throw error;
    }
  }
   