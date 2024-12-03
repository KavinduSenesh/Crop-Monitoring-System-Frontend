//dashboard
document.addEventListener("DOMContentLoaded", () => {
    const iconWrappers = document.querySelectorAll(".icon-wrapper");
    
    const navigationLinks = {
        "dashboard.png": "http://127.0.0.1:5502/pages/dashboard.html", // Update with the actual URL
        "staff.png": "http://127.0.0.1:5502/pages/staffManagement.html",
        "vehicle.png": "http://127.0.0.1:5502/pages/vehicleManagement.html",
        "field.png": "http://127.0.0.1:5502/pages/fieldManagement.html",
        "Wrench.png": "http://127.0.0.1:5502/pages/equimpentManagement.html",
        "crop.png": "http://127.0.0.1:5502/pages/cropManagement.html",
        "Clipboard.png": "http://127.0.0.1:5502/pages/monitoringLogManagement.html",
        "Logout.png": "http://127.0.0.1:5502/index.html"
    };

    iconWrappers.forEach(wrapper => {
        const img = wrapper.querySelector("img");
        const imageName = img.src.split("/").pop(); // Extract file name from the src
        const targetLink = navigationLinks[imageName];

        if (targetLink) {
            wrapper.addEventListener("click", () => {
                window.location.href = targetLink;
            });
        }
    });
});

$(document).ready(function() {
    // Sample monitoring log data (in a real application, this would come from a backend)
    const monitoringLogData = [
        {
            monitoringLogCode: "LOG001",
            logDate: "2024-12-01",
            observation: "Healthy crop growth observed.",
            observedImage: "https://example.com/log1.jpg",
            fieldCodes: ["FIELD01"],
            cropCodes: ["CR001", "CR002"],
            staffIds: ["ST001", "ST002"]
        },
        {
            monitoringLogCode: "LOG002",
            logDate: "2024-12-02",
            observation: "Signs of pest infestation.",
            observedImage: "https://example.com/log2.jpg",
            fieldCodes: ["FIELD02"],
            cropCodes: ["CR003"],
            staffIds: ["ST003"]
        }
    ];

    // <td>${log.fieldCodes.join(", ")}</td>
    //                 <td>${log.cropCodes.join(", ")}</td>
    //                 <td>${log.staffIds.join(", ")}</td>

    // Function to populate the monitoring log table
    function populateMonitoringLogTable() {
        const tableBody = $("#log-table-body");
        tableBody.empty();

        monitoringLogData.forEach(log => {
            const row = `
                <tr data-log-id="${log.monitoringLogCode}">
                    <td>${log.monitoringLogCode}</td>
                    <td>${log.logDate}</td>
                    <td>${log.observation}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-primary view-log-btn">View</button>
                            <button class="btn btn-sm btn-danger delete-log-btn">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Initial table population
    populateMonitoringLogTable();

    // Open Popup Button
    $("#openPopup").on("click", function() {
        $("#popup").css("display", "flex");
        // Reset form
        $("#cropForm")[0].reset();
        // Show/hide appropriate buttons
        $("#saveButton").show();
        $("#updateButton, #deleteButton").hide();
    });

    // Close Popup Button
    $("#closePopup, #cancelButton").on("click", function() {
        $("#popup").hide();
    });

    // View Monitoring Log Button (in table)
    $(document).on("click", ".view-log-btn", function() {
        const logCode = $(this).closest("tr").data("log-id");
        const log = monitoringLogData.find(l => l.monitoringLogCode === logCode);

        if (log) {
            // Populate form with monitoring log details
            $("#log-code").val(log.monitoringLogCode);
            $("#log-date").val(log.logDate);
            $("#observation").val(log.observation);
            // $("#field-codes").val(log.fieldCodes.join(", "));
            // $("#crop-codes").val(log.cropCodes.join(", "));
            // $("#staff-ids").val(log.staffIds.join(", "));
            $("#observed-image-preview").attr("src", log.observedImage).show();

            // Show popup
            $("#popup").css("display", "flex");

            // Show update/delete buttons, hide save
            $("#updateButton").show();
            $("#saveButton, #deleteButton").hide();
        }
    });

    // Delete Monitoring Log Button (in table)
    $(document).on("click", ".delete-log-btn", function() {
        const logCode = $(this).closest("tr").data("log-id");
        const index = monitoringLogData.findIndex(l => l.monitoringLogCode === logCode);

        if (index !== -1) {
            // Remove from array
            monitoringLogData.splice(index, 1);
            // Repopulate table
            populateMonitoringLogTable();
        }
    });

    // Save New Monitoring Log
    $("#saveButton").on("click", function() {
        const newLog = {
            monitoringLogCode: `LOG${String(monitoringLogData.length + 1).padStart(3, '0')}`,
            logDate: $("#log-date").val(),
            observation: $("#observation").val(),
            observedImage: $("#observed-image").val(),
            fieldCodes: $("#field-codes").val().split(",").map(code => code.trim()),
            cropCodes: $("#crop-codes").val().split(",").map(code => code.trim()),
            staffIds: $("#staff-ids").val().split(",").map(id => id.trim())
        };

        monitoringLogData.push(newLog);
        populateMonitoringLogTable();
        $("#popup").hide();
    });

    // Update Monitoring Log
    $("#updateButton").on("click", function() {
        const logCode = $("#log-code").val();
        const logIndex = monitoringLogData.findIndex(l => l.monitoringLogCode === logCode);

        if (logIndex !== -1) {
            monitoringLogData[logIndex] = {
                monitoringLogCode: logCode,
                logDate: $("#log-date").val(),
                observation: $("#observation").val(),
                observedImage: $("#observed-image").val(),
                fieldCodes: $("#field-codes").val().split(",").map(code => code.trim()),
                cropCodes: $("#crop-codes").val().split(",").map(code => code.trim()),
                staffIds: $("#staff-ids").val().split(",").map(id => id.trim())
            };

            populateMonitoringLogTable();
            $("#popup").hide();
        }
    });

    // Search functionality
    $(".search_input").on("keyup", function() {
        const searchTerm = $(this).val().toLowerCase();

        $("#log-table-body tr").filter(function() {
            $(this).toggle(
                $(this).text().toLowerCase().indexOf(searchTerm) > -1
            );
        });
    });

    // Image Upload Preview
    $('#cropImage').on('change', function(event) {
        const file = event.target.files[0];
        const imagePreview = $('#imagePreview');
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.attr('src', e.target.result);
                imagePreview.show();
            }
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.hide();
        }
    });
});
