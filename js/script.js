document.addEventListener("DOMContentLoaded", function () {


  document.querySelectorAll('.btn-finter').forEach(function (item) {
    item.addEventListener('click', function () {
      if (document.body.classList.contains('show-fitler')) {
        document.body.classList.remove('_show-fitler');
        document.querySelector('.sidebar_filter').classList.remove('_active');
      } else {
        document.body.classList.add('_show-fitler');
        document.querySelector('.sidebar_filter').classList.add('_active');
      }
    })
  })

  document.querySelectorAll('.js-filter-close').forEach(function (item) {
    item.addEventListener('click', function (e) {
      document.body.classList.remove('_show-fitler');
      document.querySelector('.sidebar_filter').classList.remove('_active');
    })
  })

  document.querySelectorAll('.sidebar__outer').forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.classList.contains('sidebar__outer')) {
        document.body.classList.remove('_show-fitler');
        document.querySelector('.sidebar_filter').classList.remove('_active');
      }
    })
  })

  document.querySelectorAll('.js-select-search').forEach(function (item) {
    NiceSelect.bind(item, {
      searchable: true
    });
    item.nextSibling.querySelector('.nice-select-search').setAttribute('placeholder', 'Поиск...');
  })
  document.querySelectorAll('.js-select').forEach(function (item) {
    NiceSelect.bind(item);
  })

  document.querySelectorAll('.card-item__more').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.parentNode.classList.contains('_active')) {
        this.parentNode.classList.remove('_active');
        this.querySelector('span').innerHTML = 'Полностью'
      } else {
        this.parentNode.classList.add('_active');
        this.querySelector('span').innerHTML = 'Скрыть'
      }
    })
  })

  document.querySelectorAll('.card-main__more').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.parentNode.classList.contains('_active')) {
        this.parentNode.classList.remove('_active');
        this.querySelector('span').innerHTML = 'Показать все'
      } else {
        this.parentNode.classList.add('_active');
        this.querySelector('span').innerHTML = 'Скрыть'
      }
    })
  })

  let sliderGallery = new Swiper(".slider-gallery", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".slider-gallery-btn-next",
      prevEl: ".slider-gallery-btn-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  });

  let imageLinks = document.querySelectorAll('#js-bp-gallery a')
  for (var i = 0; i < imageLinks.length; i++) {
    imageLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      if (this.getAttribute('ytSrc')) {
        let videoID = YouTubeGetID(this.getAttribute('ytSrc'))
        BigPicture({
          el: this,
          ytSrc: videoID,
          dimensions: [1280, 720],
          gallery: '#js-bp-gallery',
        })
      } else {
        BigPicture({
          el: this,
          gallery: '#js-bp-gallery',
        })
      }
    })
  }
  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  var sliderPrice = new Swiper(".slider-product", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".slider-product-btn-next",
      prevEl: ".slider-product-btn-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });

  document.querySelectorAll('.js-tab').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('_active')) return;

      let tabsBtn = this.closest('.js-tabs');
      tabsBtn.querySelectorAll('.js-tab._active').forEach(function (btn) {
        btn.classList.remove('_active');
      });
      this.classList.add('_active');

      let index = elIndex(this);
      let tabsContent = tabsBtn.nextElementSibling;
      tabsContent.querySelectorAll('.js-tab-content._active').forEach(function (tab) {
        tab.classList.remove('_active');
      });
      tabsContent.querySelectorAll('.js-tab-content')[index].classList.add('_active');

    })
  })
  function elIndex(el) {
    if (!el) return -1;
    var i = 0;
    while (el = el.previousElementSibling) {
      i++;
    }
    return i;
  }

  document.querySelectorAll('[data-anchor]').forEach(function (item) {
    item.addEventListener('click', function () {
      let targetId = this.getAttribute('href') || this.getAttribute('data-anchor');
      if (!targetId) return;
      scrollToItem(targetId);
      //+new
      if (document.querySelector('.sidebar_filter')) {
        document.body.classList.remove('_show-fitler');
        document.querySelector('.sidebar_filter').classList.remove('_active');
      }
      //-new
    })
  })
  let urlHash = window.location.hash;
  if (urlHash.includes('anchor-')) {
    scrollToItem(urlHash)
  }
  function scrollToItem(targetId, targetOffset = 0) {
    let targetItem = document.querySelector(targetId);
    if (targetItem.offsetParent === null) {
      let tabContent = targetItem.closest('.js-tab-content')
      let tabsContent = targetItem.closest('.js-tabs-content')
      tabsContent.querySelectorAll('.js-tab-content._active').forEach(function (tab) {
        tab.classList.remove('_active');
      });
      tabContent.classList.add('_active');

      let index = elIndex(tabContent);
      let tabsBtn = tabsContent.previousElementSibling;
      tabsBtn.querySelectorAll('.js-tab._active').forEach(function (tab) {
        tab.classList.remove('_active');
      });
      tabsBtn.querySelectorAll('.js-tab')[index].classList.add('_active');
    }

    let topPos = targetItem.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: topPos - targetOffset,
      behavior: "smooth"
    })
  }

  document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
      let modalId = this.getAttribute('href') || this.getAttribute('data-modal');
      if (!modalId) return;
      openModal(modalId)
    })
  })
  function openModal(modalId) {
    document.querySelector(modalId).classList.add('_active')
    document.body.classList.add('show-modal');
  }

  document.querySelectorAll('.js-modal-hide').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.classList.contains('js-modal-hide')) {
        let modal = this.closest('.modal');
        closeModal(modal);
      }
    })
  })
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('_active');
    } else {
      document.querySelectorAll('.modal._active').forEach(function (item) {
        item.classList.remove('_active')
      })
    }
    document.body.classList.remove('show-modal');

  }

  var myMap = '';
  var mapId = 'company-map-sidebar';
  window.getYaMap = function () {
    if (document.querySelector('#company-map-sidebar')) {
      if (window.innerWidth < 1280) {
        mapId = 'company-map-main';
      }
      ymaps.ready(initMap);

      window.addEventListener('resize', function (event) {
        if (window.innerWidth < 1280) {
          if (document.getElementById('company-map-main').innerHTML === "") {
            myMap.destroy();
            mapId = 'company-map-main';
            ymaps.ready(initMap);
          }
        } else {
          if (document.getElementById('company-map-sidebar').innerHTML === "") {
            myMap.destroy();
            mapId = 'company-map-sidebar';
            ymaps.ready(initMap);
          }
        }
      }, true);
    }
    //+new
    if (document.querySelector('#map-reception-points')) {
      ymaps.ready(initMapReceptionPoints);
    }
    //-new
  };

  function initMap() {
    let mapX = 55.755115;
    let mapY = 37.618749;
    myMap = new ymaps.Map(mapId, {
      center: [mapX, mapY],
      zoom: 16,
      controls: []
    })
    let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Центроконсалт, центр экспертиз',
      balloonContent: 'г. Москва, Савёлкинский проезд д. 6 <br>' +
        'Ежедневно с 8:00 до 20:00 <br> ' +
        '8 (925) 796-45-67 <br>' +
        'marketing_SPB@mail.ru '
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/map-pin.svg',
      iconImageSize: [30, 40],
      iconImageOffset: [-15, -37]
    });
    myMap.geoObjects.add(myPlacemark);
  }

  //+new
  function initMapReceptionPoints() {
    let mapX = 55.755115;
    let mapY = 37.618749;
    let mapReceptionPoints = new ymaps.Map('map-reception-points', {
      center: [mapX, mapY],
      zoom: 16,
      controls: []
    })
    let mapPinConfig = {
      iconLayout: 'default#image',
      iconImageHref: 'images/map-pin.svg',
      iconImageSize: [30, 40],
      iconImageOffset: [-15, -37]
    };
    let myPlacemark0 = new ymaps.Placemark([55.755115, 37.618749], {
      hintContent: 'Центроконсалт, центр экспертиз',
      balloonContent: 'г. Москва, Савёлкинский проезд д. 6 <br>' +
        'Ежедневно с 8:00 до 20:00 <br> ' +
        '8 (925) 796-45-67 <br>' +
        'marketing_SPB@mail.ru '
    }, mapPinConfig);
    mapReceptionPoints.geoObjects.add(myPlacemark0);
    let myPlacemark1 = new ymaps.Placemark([55.756515, 37.618249], {
      hintContent: '1Центроконсалт, центр экспертиз',
      balloonContent: 'г. Москва, Савёлкинский проезд д. 6 <br>' +
        'Ежедневно с 8:00 до 20:00 <br> ' +
        '8 (925) 796-45-67 <br>' +
        'marketing_SPB@mail.ru '
    }, mapPinConfig);
    mapReceptionPoints.geoObjects.add(myPlacemark1);
    let myPlacemark2 = new ymaps.Placemark([55.753515, 37.616049], {
      hintContent: '1Центроконсалт, центр экспертиз',
      balloonContent: 'г. Москва, Савёлкинский проезд д. 6 <br>' +
        'Ежедневно с 8:00 до 20:00 <br> ' +
        '8 (925) 796-45-67 <br>' +
        'marketing_SPB@mail.ru '
    }, mapPinConfig);
    mapReceptionPoints.geoObjects.add(myPlacemark2);
  }
  //-new
});