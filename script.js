document.addEventListener('DOMContentLoaded', function () {
  const courseDetails = {
    penelitianKuantitatif: {
      title: "Metode Penelitian Kuantitatif",
      detail: "Tugas: Buat proposal penelitian menggunakan metode kuantitatif. Deadline: -"
    },
    reportaseMultimedia: {
      title: "Penulisan dan Reportase Multimedia",
      detail: "Tugas: Buat laporan multimedia berdasarkan wawancara dan observasi. Deadline: -"
    },
    featureTV: {
      title: "Feature TV",
      detail: "Tugas: Produksi segment feature TV dengan durasi 5 menit. Deadline: -"
    },
    jurnalistikLingkungan: {
      title: "Jurnalistik Lingkungan",
      detail: "Tugas: Tulis artikel tentang isu lingkungan terkini. Deadline: -"
    },
    jurnalistikMultiplatform: {
      title: "Praktik Terpadu Jurnalistik Multiplatform",
      detail: "Tugas: Buat konten berita yang disebarkan melalui berbagai platform. Deadline: -"
    }
  };

  const courseElements = document.querySelectorAll('.course-name');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const courseTitle = document.getElementById('course-title');
  const courseDetail = document.getElementById('course-detail');

  courseElements.forEach(function (element) {
    element.addEventListener('click', function () {
      const courseKey = this.getAttribute('data-course');
      const data = courseDetails[courseKey];

      courseTitle.textContent = data.title;
      courseDetail.textContent = data.detail;

      modal.style.display = 'block';
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
