document.addEventListener('DOMContentLoaded', function () {
  const courseDetails = {
    penelitianKuantitatif: {
      title: "Metode Penelitian Kuantitatif",
      detail: "Tugas: Buat proposal penelitian menggunakan metode kuantitatif.",
      deadlineDate: "null"
    },
    reportaseMultimedia: {
      title: "Penulisan dan Reportase Multimedia",
      detail: "Tugas: Buat laporan multimedia berdasarkan wawancara dan observasi.",
      deadlineDate: "null"
    },
    featureTV: {
      title: "Feature TV",
      detail: "Tugas: Produksi segment feature TV dengan durasi 5 menit.",
      deadlineDate: "null"
    },
    jurnalistikLingkungan: {
      title: "Jurnalistik Lingkungan",
      detail: "Tugas: Tulis artikel tentang isu lingkungan terkini.",
      deadlineDate: "null"
    },
    jurnalistikMultiplatform: {
      title: "Praktik Terpadu Jurnalistik Multiplatform",
      detail: "Tugas: Buat konten berita yang disebarkan melalui berbagai platform.",
      deadlineDate: "null"
    }
  };

  function getDaysDifference(deadline) {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const deadlineMidnight = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate());
    return Math.round((deadlineMidnight - todayMidnight) / oneDay);
  }

  const courseElements = document.querySelectorAll('.course-name');
  courseElements.forEach(function(element) {
    const courseKey = element.getAttribute('data-course');
    const data = courseDetails[courseKey];

    if (data && data.deadlineDate) {
      const daysDiff = getDaysDifference(data.deadlineDate);

      if (daysDiff <= 3 && daysDiff >= 0) {
        const indicator = document.createElement('span');
        indicator.className = 'deadline-indicator';
        indicator.textContent = '⚠';
        if (daysDiff <= 1) {
          indicator.style.fontWeight = '900';
        }
        element.appendChild(indicator);
      }
    }
  });

  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const courseTitle = document.getElementById('course-title');
  const courseDetail = document.getElementById('course-detail');

  courseElements.forEach(function (element) {
    element.addEventListener('click', function () {
      const courseKey = this.getAttribute('data-course');
      const data = courseDetails[courseKey];
      if (data) {
        courseTitle.textContent = data.title;
        courseDetail.textContent = `${data.detail} Deadline: ${data.deadlineDate}`;
        modal.style.display = 'block';
      }
    });
  });

  closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
