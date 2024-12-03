document.addEventListener("DOMContentLoaded", () => {
    const iconWrappers = document.querySelectorAll(".icon-wrapper");
    
    const navigationLinks = {
        "dashboard.png": "http://127.0.0.1:5502/pages/dashboard.html",
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
        const imageName = img.src.split("/").pop();
        const targetLink = navigationLinks[imageName];

        if (targetLink) {
            wrapper.addEventListener("click", () => {
                window.location.href = targetLink;
            });
        }
    });
});

$(document).ready(function() {
    const fieldData = [
        {
            // fieldCode: "FIELD001",
            fieldName: "North Field",
            // fieldLocation: { x: 10.5, y: 20.3 },
            fieldSize: 10.5,
            fieldImage1: "north-field.jpg",
            fieldImage2: "north-field-aerial.jpg",
            // cropCodes: ["CR001", "CR002"],
            staffIds: ["STAFF01", "STAFF02"],
            // equipmentIds: ["EQ001", "EQ002"],
            // monitoringLogCodes: ["LOG001"]
        }
    ];

    // <td>${field.fieldCode}</td>
    // <td>
    //                     Location: (${field.fieldLocation.x}, ${field.fieldLocation.y})
    //                 </td>

    function populateFieldTable() {
        const tableBody = $("#field-table-body");
        tableBody.empty();

        fieldData.forEach(field => {
            const row = `
                <tr data-field-id="${field.fieldCode}">
                    <td>${field.fieldName}</td>
                    
                    <td>${field.fieldSize} hectares</td>
                    
                    <td>${field.staffIds.join(", ")}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-primary view-field-btn">View</button>
                            <button class="btn btn-sm btn-danger delete-field-btn">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    populateFieldTable();

    $("#openPopup").on("click", function() {
        $("#popup").css("display", "flex");
        $("#fieldForm")[0].reset();
        $("#saveButton").show();
        $("#updateButton, #deleteButton").hide();
    });

    $("#closePopup, #cancelButton").on("click", function() {
        $("#popup").hide();
    });

    $(document).on("click", ".view-field-btn", function() {
        const fieldCode = $(this).closest("tr").data("field-id");
        const field = fieldData.find(f => f.fieldCode === fieldCode);

        if (field) {
            $("#field-code").val(field.fieldCode);
            $("#field-name").val(field.fieldName);
            $("#field-size").val(field.fieldSize);
            $("#location-x").val(field.fieldLocation.x);
            $("#location-y").val(field.fieldLocation.y);
            $("#field-image1").val(field.fieldImage1);
            $("#field-image2").val(field.fieldImage2);
            // $("#crop-codes").val(field.cropCodes.join(", "));
            $("#staff-ids").val(field.staffIds.join(", "));
            // $("#equipment-ids").val(field.equipmentIds.join(", "));
            // $("#log-codes").val(field.monitoringLogCodes.join(", "));

            $("#popup").css("display", "flex");
            $("#updateButton").show();
            $("#saveButton, #deleteButton").hide();
        }
    });

    $(document).on("click", ".delete-field-btn", function() {
        const fieldCode = $(this).closest("tr").data("field-id");
        const index = fieldData.findIndex(f => f.fieldCode === fieldCode);

        if (index !== -1) {
            fieldData.splice(index, 1);
            populateFieldTable();
        }
    });

    $("#saveButton").on("click", function() {
        const newField = {
            fieldCode: `FIELD${String(fieldData.length + 1).padStart(3, '0')}`,
            fieldName: $("#field-name").val(),
            fieldLocation: { 
                x: parseFloat($("#location-x").val()), 
                y: parseFloat($("#location-y").val()) 
            },
            fieldSize: parseFloat($("#field-size").val()),
            fieldImage1: $("#field-image1").val(),
            fieldImage2: $("#field-image2").val(),
            // cropCodes: $("#crop-codes").val().split(",").map(code => code.trim()),
            staffIds: $("#staff-ids").val().split(",").map(id => id.trim()),
            // equipmentIds: $("#equipment-ids").val().split(",").map(id => id.trim()),
            // monitoringLogCodes: $("#log-codes").val().split(",").map(code => code.trim())
        };

        fieldData.push(newField);
        populateFieldTable();
        $("#popup").hide();
    });

    $("#updateButton").on("click", function() {
        const fieldCode = $("tr[data-field-id]").data("field-id");
        const fieldIndex = fieldData.findIndex(f => f.fieldCode === fieldCode);

        if (fieldIndex !== -1) {
            fieldData[fieldIndex] = {
                fieldCode: fieldCode,
                fieldName: $("#field-name").val(),
                fieldLocation: { 
                    x: parseFloat($("#location-x").val()), 
                    y: parseFloat($("#location-y").val()) 
                },
                fieldSize: parseFloat($("#field-size").val()),
                fieldImage1: $("#field-image1").val(),
                fieldImage2: $("#field-image2").val(),
                // cropCodes: $("#crop-codes").val().split(",").map(code => code.trim()),
                staffIds: $("#staff-ids").val().split(",").map(id => id.trim()),
                // equipmentIds: $("#equipment-ids").val().split(",").map(id => id.trim()),
                // monitoringLogCodes: $("#log-codes").val().split(",").map(code => code.trim())
            };

            populateFieldTable();
            $("#popup").hide();
        }
    });

    $(".search_input").on("keyup", function() {
        const searchTerm = $(this).val().toLowerCase();

        $("#field-table-body tr").filter(function() {
            $(this).toggle(
                $(this).text().toLowerCase().indexOf(searchTerm) > -1
            );
        });
    });
});