(function () {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  sidebarToggle.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle("show");
    } else {
      sidebar.classList.toggle("collapsed");
      mainContent.classList.toggle("expanded");
    }
  });

  document.querySelectorAll(".nav-link[data-section]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      document
        .querySelectorAll(".content-section")
        .forEach((s) => s.classList.add("d-none"));
      const sectionId = this.getAttribute("data-section") + "-section";
      const target = document.getElementById(sectionId);
      if (target) target.classList.remove("d-none");
      const title = this.textContent.trim();
      document.getElementById("pageTitle").textContent = title;
      if (window.innerWidth <= 768) sidebar.classList.remove("show");
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("show");
      if (sidebar.classList.contains("collapsed"))
        mainContent.classList.add("expanded");
      else mainContent.classList.remove("expanded");
    } else {
      sidebar.classList.remove("collapsed");
      mainContent.classList.remove("expanded");
    }
  });

  const revenueCtx = document.getElementById("revenueChart").getContext("2d");
  new Chart(revenueCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: "rgb(75,192,192)",
          backgroundColor: "rgba(75,192,192,0.12)",
          tension: 0.35,
          fill: true,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
        },
      },
    },
  });

  const trafficCtx = document.getElementById("trafficChart").getContext("2d");
  new Chart(trafficCtx, {
    type: "doughnut",
    data: {
      labels: ["Direct", "Social Media", "Email", "Search"],
      datasets: [
        {
          data: [35, 25, 20, 20],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
    },
  });

  const monthlySalesEl = document.getElementById("monthlySalesChart");
  if (monthlySalesEl) {
    new Chart(monthlySalesEl.getContext("2d"), {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55, 70, 85, 90, 75, 88, 95],
            backgroundColor: "rgba(54,162,235,0.8)",
            borderColor: "rgba(54,162,235,1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  const userGrowthEl = document.getElementById("userGrowthChart");
  if (userGrowthEl) {
    new Chart(userGrowthEl.getContext("2d"), {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "New Users",
            data: [30, 45, 35, 50, 49, 60, 70, 91, 85, 100, 120, 150],
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgba(255,99,132,0.12)",
            tension: 0.35,
            fill: true,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (el) {
    return new bootstrap.Tooltip(el);
  });

  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.zIndex = "9999";
    notification.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (notification.parentNode)
        notification.parentNode.removeChild(notification);
    }, 5000);
  }

  function updateStats() {
    document.querySelectorAll(".stat-card h3").forEach((stat) => {
      const text = stat.textContent.trim();
      const match = text.match(/^(\D*)([\d,]+)(\D*)$/);
      if (!match) return;
      const prefix = stat.getAttribute("data-prefix") || match[1] || "";
      const suffix = stat.getAttribute("data-suffix") || match[3] || "";
      const number = parseInt(match[2].replace(/,/g, ""), 10) || 0;
      let newValue = number + Math.floor(Math.random() * 11) - 5;
      if (newValue < 0) newValue = 0;
      stat.textContent = prefix + newValue.toLocaleString() + suffix;
    });
  }

  setInterval(updateStats, 30000);

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showNotification("Settings saved successfully!", "success");
    });
  });

  document.querySelectorAll("table tbody tr").forEach((row) => {
    row.addEventListener("click", function () {
      document
        .querySelectorAll("table tbody tr")
        .forEach((r) => r.classList.remove("table-active"));
      this.classList.add("table-active");
    });
  });

  document.querySelectorAll(".search-input").forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const container = this.closest(".table-container");
      if (!container) return;
      const rows = container.querySelectorAll("table tbody tr");
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      ripple.style.background = "rgba(255,255,255,0.45)";
      ripple.style.animation = "ripple 0.6s linear";
      this.style.position = this.style.position || "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 600);
    });
  });

  console.log("Admin Dashboard loaded successfully!");
})();
