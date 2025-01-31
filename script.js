document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const orderForm = document.getElementById('orderForm');
    const orderTypeSelect = document.getElementById('orderType');
    const cocktailOptions = document.getElementById('cocktailOptions');
    const foodOptions = document.getElementById('foodOptions');
    const invoiceSection = document.getElementById('invoiceSection');
    const invoiceClientName = document.getElementById('invoiceClientName');
    const invoiceItems = document.getElementById('invoiceItems');
    const invoiceTotal = document.getElementById('invoiceTotal');
    const printInvoiceButton = document.getElementById('printInvoice');
    const orderBtn = document.getElementById('orderBtn');
    const invoiceBtn = document.getElementById('invoiceBtn');
    const invoiceNumber = document.getElementById('invoiceNumber');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const clientName = document.getElementById('clientName').value;
        invoiceClientName.textContent = clientName;
        document.getElementById('registerSection').classList.add('hidden');
        document.getElementById('orderSection').classList.remove('hidden');
        orderBtn.disabled = false;
    });

    orderTypeSelect.addEventListener('change', function() {
        if (orderTypeSelect.value === 'cocktail') {
            cocktailOptions.classList.remove('hidden');
            foodOptions.classList.add('hidden');
        } else if (orderTypeSelect.value === 'food') {
            cocktailOptions.classList.add('hidden');
            foodOptions.classList.remove('hidden');
        } else {
            cocktailOptions.classList.add('hidden');
            foodOptions.classList.add('hidden');
        }
    });

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let total = 0;
        let items = [];
        
        document.querySelectorAll('.order-item').forEach(input => {
            const quantity = parseInt(input.value);
            const price = parseFloat(input.getAttribute('data-price'));
            if (quantity > 0) {
                total += quantity * price;
                items.push(`${quantity}x ${input.parentElement.textContent.trim()}`);
            }
        });

        invoiceItems.textContent = items.join(', ');
        invoiceTotal.textContent = total.toFixed(2);
        document.getElementById('orderSection').classList.add('hidden');
        invoiceSection.classList.remove('hidden');
        invoiceBtn.disabled = false;

        // Generar número de factura
        invoiceNumber.textContent = generateInvoiceNumber();
    });

    printInvoiceButton.addEventListener('click', function() {
        window.print();
        resetForm();
    });
    function resetForm() {
        // Reset the register form
        registerForm.reset();
        // Reset the order form
        orderForm.reset();
        // Hide the invoice section and show the register section
        invoiceSection.classList.add('hidden');
        document.getElementById('registerSection').classList.remove('hidden');
        // Disable the order and invoice buttons
        orderBtn.disabled = true;
        invoiceBtn.disabled = true;
        // Clear the invoice details
        invoiceClientName.textContent = 'No registrado';
        invoiceItems.textContent = 'Ninguno';
        invoiceTotal.textContent = '0';
        invoiceNumber.textContent = '';
    }
});