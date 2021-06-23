const handleSubmitProductForm = (e) => {
    if (e) {
        e.preventDefault()
    }
    const current_url = new URL(window.location.href)
    current_url.searchParams.set('submitted', '1')
    window.location.href = current_url.href
}

const productForm = document.querySelector('.feedback_form');
if (productForm.attachEvent) {
    productForm.attachEvent("submit", handleSubmitProductForm);
} else {
    productForm.addEventListener("submit", handleSubmitProductForm);
}


const success_msg = `
    <h3 class="very-basic-success">
        Submitted successfully
    </h3>
    `
const current_url = new URL(window.location.href)
const maybeSuccess = current_url.searchParams.get('submitted')
if (maybeSuccess) {
    document.querySelector('.message_area').innerHTML = success_msg
}