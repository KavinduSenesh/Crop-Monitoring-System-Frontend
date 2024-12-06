// Enhanced Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Routing
    const navigationLinks = {
        "dashboard.png": "/pages/dashboard.html",
        "staff.png": "/pages/staffManagement.html",
        "vehicle.png": "/pages/vehicleManagement.html",
        "field.png": "/pages/fieldManagement.html",
        "Wrench.png": "/pages/equipmentManagement.html",
        "crop.png": "/pages/cropManagement.html",
        "Clipboard.png": "/pages/monitoringLogs.html",
        "Logout.png": "/index.html"
    };

    const iconWrappers = document.querySelectorAll(".icon-wrapper");
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

    // Implement Quick Stats and Real-time Updates
    function initializeDashboardStats() {
        // Create stats container if it doesn't exist
        let statsContainer = document.querySelector('.dashboard-stats');
        if (!statsContainer) {
            statsContainer = document.createElement('div');
            statsContainer.className = 'dashboard-stats container mt-4';
            document.body.appendChild(statsContainer);
        }

        // Fetch and display real-time farm statistics
        const statsData = [
            { 
                title: 'Total Crops', 
                icon: 'bi-tree', 
                value: 12, 
                description: 'Crop Varieties' 
            },
            { 
                title: 'Active Staff', 
                icon: 'bi-people', 
                value: 24, 
                description: 'Employees' 
            },
            { 
                title: 'Field Area', 
                icon: 'bi-map', 
                value: 250, 
                description: 'Hectares' 
            },
            { 
                title: 'Equipment', 
                icon: 'bi-gear', 
                value: 18, 
                description: 'Machines' 
            }
        ];

        statsContainer.innerHTML = `
            <div class="row g-4">
                ${statsData.map(stat => `
                    <div class="col-md-3">
                        <div class="card stats-card">
                            <div class="card-body text-center">
                                <i class="bi ${stat.icon} display-4 text-primary mb-3"></i>
                                <h5 class="card-title">${stat.title}</h5>
                                <p class="display-6 fw-bold text-success">${stat.value}</p>
                                <p class="text-muted">${stat.description}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /// Update the initializeNotifications function
function initializeNotifications() {
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);

    const notifications = [
        { 
            type: 'warning', 
            message: 'Wheat Field 3 requires irrigation',
            icon: 'bi-exclamation-triangle'
        },
        { 
            type: 'info', 
            message: 'Equipment maintenance scheduled for next week',
            icon: 'bi-info-circle'
        }
    ];

    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `alert alert-${notification.type} alert-dismissible fade show`;
        notificationElement.innerHTML = `
            <i class="bi ${notification.icon} me-2"></i>
            ${notification.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        notificationContainer.appendChild(notificationElement);

        // Add event listener to close button
        const closeButton = notificationElement.querySelector('.btn-close');
        closeButton.addEventListener('click', () => {
            notificationElement.classList.remove('show');
            setTimeout(() => {
                notificationContainer.removeChild(notificationElement);
            }, 150); // Wait for the fade-out animation to complete
        });
    });
}

    // Quick Action Buttons
    function initializeQuickActions() {
        const quickActionsContainer = document.createElement('div');
        quickActionsContainer.className = 'quick-actions container mt-4';
        quickActionsContainer.innerHTML = `
            <div class="row">
                <div class="col-12">
                    <h4>Quick Actions</h4>
                    <div class="btn-group" role="group">
                        <button class="btn btn-outline-primary" id="addCropBtn">
                            <i class="bi bi-plus-circle me-2"></i>Add Crop
                        </button>
                        <button class="btn btn-outline-success" id="generateReportBtn">
                            <i class="bi bi-file-earmark-text me-2"></i>Generate Report
                        </button>
                        <button class="btn btn-outline-warning" id="scheduleMaintenanceBtn">
                            <i class="bi bi-wrench me-2"></i>Schedule Maintenance
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(quickActionsContainer);

        // Add event listeners to quick action buttons
        document.getElementById('addCropBtn')?.addEventListener('click', () => {
            alert('Add Crop functionality to be implemented');
        });

        document.getElementById('generateReportBtn')?.addEventListener('click', () => {
            alert('Generate Report functionality to be implemented');
        });

        document.getElementById('scheduleMaintenanceBtn')?.addEventListener('click', () => {
            alert('Schedule Maintenance functionality to be implemented');
        });
    }

    // Initialize all dashboard functionalities
    initializeDashboardStats();
    initializeNotifications();
    initializeQuickActions();

    // Logout Confirmation
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmLogout = confirm('Are you sure you want to log out?');
            if (confirmLogout) {
                window.location.href = '/index.html';
            }
        });
    }
});

// Add custom styles for new elements
const styleElement = document.createElement('style');
styleElement.textContent = `
    .stats-card {
        transition: transform 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .stats-card:hover {
        transform: translateY(-10px);
    }
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        max-width: 300px;
    }
    .quick-actions {
        margin-bottom: 20px;
    }
`;
document.head.appendChild(styleElement);