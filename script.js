document.addEventListener('DOMContentLoaded', function () {
  const courseDetails = {
    penelitianKuantitatif: {
      title: "Metode Penelitian Kuantitatif",
      detail: "Tugas: Buat proposal penelitian menggunakan metode kuantitatif. Proposal harus mencakup latar belakang, rumusan masalah, tujuan penelitian, manfaat penelitian, tinjauan pustaka, dan metode penelitian.",
      deadlineDate: null
    },
    reportaseMultimedia: {
      title: "Penulisan dan Reportase Multimedia",
      detail: "Tugas: Buat laporan multimedia berdasarkan wawancara dan observasi. Laporan harus mencakup teks, foto, audio, dan video yang terintegrasi dalam satu platform.",
      deadlineDate: null
    },
    featureTV: {
      title: "Feature TV",
      detail: "Tugas: Produksi segment feature TV dengan durasi 5 menit. Tema bebas, tetapi harus memiliki nilai human interest yang kuat.",
      deadlineDate: null
    },
    jurnalistikLingkungan: {
      title: "Jurnalistik Lingkungan",
      detail: "Tugas: Tulis artikel tentang isu lingkungan terkini. Artikel harus berdasarkan riset dan wawancara dengan minimal satu ahli lingkungan.",
      deadlineDate: null
    },
    jurnalistikMultiplatform: {
      title: "Praktik Terpadu Jurnalistik Multiplatform",
      detail: "Tugas: Buat konten berita yang disebarkan melalui berbagai platform. Konten harus mencakup artikel, infografis, dan video pendek.",
      deadlineDate: null
    }
  };

  function getDaysDifference(deadline) {
    if (!deadline) return null;
    
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const deadlineMidnight = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate());
    return Math.round((deadlineMidnight - todayMidnight) / oneDay);
  }

  function formatDate(dateString) {
    if (!dateString) return "Belum diatur";
    
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  }

  function getDeadlineStatus(daysDiff) {
    if (daysDiff === null) return "";
    if (daysDiff < 0) return "Deadline telah lewat";
    if (daysDiff === 0) return "Deadline hari ini!";
    if (daysDiff === 1) return "Deadline besok!";
    if (daysDiff <= 3) return `Deadline dalam ${daysDiff} hari`;
    return `${daysDiff} hari menuju deadline`;
  }

  function updateDeadlineIndicators() {
    const courseElements = document.querySelectorAll('.course-name');
    courseElements.forEach(function(element) {
      const courseKey = element.getAttribute('data-course');
      const data = courseDetails[courseKey];
      
      const existingIndicator = element.querySelector('.deadline-indicator');
      if (existingIndicator) {
        element.removeChild(existingIndicator);
      }

      if (data && data.deadlineDate) {
        const daysDiff = getDaysDifference(data.deadlineDate);

        if (daysDiff !== null && daysDiff <= 3) {
          const indicator = document.createElement('span');
          indicator.className = 'deadline-indicator';
          indicator.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
          
          if (daysDiff <= 0) {
            indicator.style.color = '#e74a3b';
          } else if (daysDiff === 1) {
            indicator.style.color = '#f6c23e';
          }
          
          element.appendChild(indicator);
        }
      }
    });
  }

  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const courseTitle = document.getElementById('course-title');
  const courseDetail = document.getElementById('course-detail');
  const deadlineText = document.getElementById('deadline-text');
  const deadlineInfo = document.getElementById('deadline-info');
  const setDeadlineBtn = document.getElementById('set-deadline');
  
  updateDeadlineIndicators();

  const courseElements = document.querySelectorAll('.course-name');
  courseElements.forEach(function(element) {
    element.addEventListener('click', function() {
      const courseKey = this.getAttribute('data-course');
      const data = courseDetails[courseKey];
      
      if (data) {
        courseTitle.textContent = data.title;
        courseDetail.textContent = data.detail;
        
        const daysDiff = getDaysDifference(data.deadlineDate);
        if (data.deadlineDate) {
          deadlineText.innerHTML = `<strong>Deadline:</strong> ${formatDate(data.deadlineDate)}`;
          if (daysDiff !== null) {
            deadlineText.innerHTML += `<br><span class="${daysDiff <= 0 ? 'text-danger' : daysDiff <= 3 ? 'text-warning' : ''}">${getDeadlineStatus(daysDiff)}</span>`;
          }
        } else {
          deadlineText.innerHTML = "<strong>Deadline:</strong> Belum diatur";
        }
        
        setDeadlineBtn.setAttribute('data-course', courseKey);
        
        modal.style.display = 'block';
      }
    });
  });

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  setDeadlineBtn.addEventListener('click', function() {
    const courseKey = this.getAttribute('data-course');
    
    if (courseKey) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;
      
      const dateInput = document.createElement('input');
      dateInput.type = 'date';
      dateInput.min = todayStr;
      dateInput.value = courseDetails[courseKey].deadlineDate || todayStr;
      dateInput.style.display = 'block';
      dateInput.style.marginTop = '10px';
      dateInput.style.padding = '8px';
      dateInput.style.width = '100%';
      
      const saveBtn = document.createElement('button');
      saveBtn.className = 'btn btn-primary';
      saveBtn.innerHTML = '<i class="fas fa-save"></i> Simpan';
      saveBtn.style.marginTop = '15px';
      
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn';
      cancelBtn.innerHTML = 'Batal';
      cancelBtn.style.marginTop = '15px';
      cancelBtn.style.marginLeft = '10px';
      
      deadlineInfo.innerHTML = '';
      
      const icon = document.createElement('i');
      icon.className = 'fas fa-calendar-day';
      icon.style.color = '#4e73df';
      icon.style.fontSize = '1.2rem';
      icon.style.marginTop = '8px';
      deadlineInfo.appendChild(icon);
      
      const formContainer = document.createElement('div');
      formContainer.style.flex = '1';
      formContainer.innerHTML = '<p><strong>Pilih Tanggal Deadline:</strong></p>';
      formContainer.appendChild(dateInput);
      
      const btnContainer = document.createElement('div');
      btnContainer.style.textAlign = 'right';
      btnContainer.appendChild(saveBtn);
      btnContainer.appendChild(cancelBtn);
      formContainer.appendChild(btnContainer);
      
      deadlineInfo.appendChild(formContainer);
      
      saveBtn.addEventListener('click', function() {
        const selectedDate = dateInput.value;
        if (selectedDate) {
          courseDetails[courseKey].deadlineDate = selectedDate;
          
          const daysDiff = getDaysDifference(selectedDate);
          deadlineText.innerHTML = `<strong>Deadline:</strong> ${formatDate(selectedDate)}`;
          if (daysDiff !== null) {
            deadlineText.innerHTML += `<br><span class="${daysDiff <= 0 ? 'text-danger' : daysDiff <= 3 ? 'text-warning' : ''}">${getDeadlineStatus(daysDiff)}</span>`;
          }
          
          deadlineInfo.innerHTML = '';
          const icon = document.createElement('i');
          icon.className = 'fas fa-hourglass-half';
          deadlineInfo.appendChild(icon);
          
          const paragraph = document.createElement('p');
          paragraph.id = 'deadline-text';
          paragraph.innerHTML = deadlineText.innerHTML;
          deadlineInfo.appendChild(paragraph);
          
          updateDeadlineIndicators();
        }
      });
      
      cancelBtn.addEventListener('click', function() {
        deadlineInfo.innerHTML = '';
        const icon = document.createElement('i');
        icon.className = 'fas fa-hourglass-half';
        deadlineInfo.appendChild(icon);
        
        const paragraph = document.createElement('p');
        paragraph.id = 'deadline-text';
        paragraph.innerHTML = deadlineText.innerHTML;
        deadlineInfo.appendChild(paragraph);
      });
    }
  });
});
