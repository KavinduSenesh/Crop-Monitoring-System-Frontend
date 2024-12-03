//dashboard
document.addEventListener("DOMContentLoaded", () => {
    const iconWrappers = document.querySelectorAll(".icon-wrapper");
    
    const navigationLinks = {
        "dashboard.png": "http://127.0.0.1:5502/pages/dashboard.html", // Update with the actual URL
        "staff.png": "http://127.0.0.1:5502/pages/staffManagement.html",
        "vehicle.png": "http://127.0.0.1:5502/pages/vehicleManagement.html",
        "field.png": "/field-management.html",
        "Wrench.png": "http://127.0.0.1:5502/pages/equimpentManagement.html",
        "crop.png": "/crop-management.html",
        "Clipboard.png": "/monitoring-logs.html",
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

//popup form
const openPopup = document.getElementById('openPopup');
        const closePopup = document.getElementById('closePopup');
        const popup = document.getElementById('popup');

        openPopup.addEventListener('click', () => {
            popup.style.display = 'flex';
        });

        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
        document.querySelector(".logout-btn").addEventListener("click", () => {
        window.location.href = "http://127.0.0.1:5500/GreenShadow%20Frontend/index.html";
        });

// Equipment Management Controller
$(document).ready(function() {
  // Sample equipment data (in a real application, this would come from a backend)
  const equipmentData = [
      {
          equipmentId: "EQ001",
          equipmentName: "Excavator",
          equipmentType: "Mechanical",
          availabilityStatus: "Available",
          staffId: "STF001",
          fieldCode: "FIELD01"
      },
      {
          equipmentId: "EQ002",
          equipmentName: "Generator",
          equipmentType: "Electrical",
          availabilityStatus: "Not_Available",
          staffId: "STF002",
          fieldCode: "FIELD02"
      }
  ];

  // Function to populate the equipment table
  function populateEquipmentTable() {
      const tableBody = $("#staff-table-body");
      tableBody.empty();

      equipmentData.forEach(equipment => {
          const row = `
              <tr data-equipment-id="${equipment.equipmentId}">
                  <td>${equipment.equipmentName}</td>
                  <td>${equipment.equipmentType}</td>
                  <td>${equipment.availabilityStatus}</td>
                  <td>${equipment.staffId}</td>
                  <td>${equipment.fieldCode}</td>
                  <td>
                      <div class="action-buttons">
                          <button class="btn btn-sm btn-primary view-equipment-btn">View</button>
                          <button class="btn btn-sm btn-danger delete-equipment-btn">Delete</button>
                      </div>
                  </td>
              </tr>
          `;
          tableBody.append(row);
      });
  }

  // Initial table population
  populateEquipmentTable();

  // Open Popup Button
  $("#openPopup").on("click", function() {
      $("#popup").css("display", "flex");
      // Reset form
      $("#equipmentForm")[0].reset();
      // Show/hide appropriate buttons
      $("#saveButton").show();
      $("#updateButton, #deleteButton").hide();
  });

  // Close Popup Button
  $("#closePopup, #cancelButton").on("click", function() {
      $("#popup").hide();
  });

  // View Equipment Button (in table)
$(document).on("click", ".view-equipment-btn", function() {
  const equipmentId = $(this).closest("tr").data("equipment-id");
  const equipment = equipmentData.find(e => e.equipmentId === equipmentId);

  if (equipment) {
      // Populate form with equipment details
      $("#equipmentName").val(equipment.equipmentName);
      $("#equipmentType").val(equipment.equipmentType);
      $("#availabilityStatus").val(equipment.availabilityStatus);
      $("#staffId").val(equipment.staffId);
      $("#fieldCode").val(equipment.fieldCode);

      // Show popup
      $("#popup").css("display", "flex");

      // Show update/delete buttons, hide save
      $("#updateButton").show();
      $("#saveButton, #deleteButton").hide();
  }
});


  // Delete Equipment Button (in table)
  $(document).on("click", ".delete-equipment-btn", function() {
      const equipmentId = $(this).closest("tr").data("equipment-id");
      const index = equipmentData.findIndex(e => e.equipmentId === equipmentId);

      if (index !== -1) {
          // Remove from array
          equipmentData.splice(index, 1);
          // Repopulate table
          populateEquipmentTable();
      }
  });

  // Save New Equipment
  $("#saveButton").on("click", function() {
      const newEquipment = {
          equipmentId: `EQ${String(equipmentData.length + 1).padStart(3, '0')}`,
          equipmentName: $("#equipmentName").val(),
          equipmentType: $("#equipmentType").val(),
          availabilityStatus: $("#availabilityStatus").val(),
          staffId: $("#staffId").val(),
          fieldCode: $("#fieldCode").val()
      };

      equipmentData.push(newEquipment);
      populateEquipmentTable();
      $("#popup").hide();
  });

  // Update Equipment
  $("#updateButton").on("click", function() {
      const equipmentId = $("tr[data-equipment-id]").data("equipment-id");
      const equipmentIndex = equipmentData.findIndex(e => e.equipmentId === equipmentId);

      if (equipmentIndex !== -1) {
          equipmentData[equipmentIndex] = {
              equipmentId: equipmentId,
              equipmentName: $("#equipmentName").val(),
              equipmentType: $("#equipmentType").val(),
              availabilityStatus: $("#availabilityStatus").val(),
              staffId: $("#staffId").val(),
              fieldCode: $("#fieldCode").val()
          };

          populateEquipmentTable();
          $("#popup").hide();
      }
  });

  // Search functionality
  $(".search_input").on("keyup", function() {
      const searchTerm = $(this).val().toLowerCase();

      $("#equipment-table-body tr").filter(function() {
          $(this).toggle(
              $(this).text().toLowerCase().indexOf(searchTerm) > -1
          );
      });
  });
});
