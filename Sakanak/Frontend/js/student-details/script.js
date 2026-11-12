document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBooking');
    const bookingSidebar = document.getElementById('bookingSidebar');

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const startDate = document.getElementById('startDate').value;
        const rentalPeriod = document.getElementById('rentalPeriod').options[document.getElementById('rentalPeriod').selectedIndex].text;

        if(!startDate) {
            alert("Please select a rental start date first!");
            return;
        }

        bookingSidebar.innerHTML = `
            <h3 style="color: #10B981; margin-bottom: 10px;">✅ Request Sent Successfully!</h3>
            <p class="spots-note" style="color: #64748B; margin-bottom: 20px;">Your spot is held immediately; status changes to Pending.</p>
            <div class="price-calc" style="flex-direction: column; gap: 10px; background-color: #F0FDF4; border: 1px solid #BBF7D0;">
                <div style="display: flex; justify-content: space-between;">
                    <span>Status:</span>
                    <strong style="color: #F59E0B;">Pending Approval</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Start Date:</span>
                    <strong>${startDate}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Duration:</span>
                    <strong>${rentalPeriod}</strong>
                </div>
            </div>
            <p class="policy-note" style="margin-top: 20px;">
                The landlord will review your request. You will be notified once they respond.
            </p>
        `;
    });
});