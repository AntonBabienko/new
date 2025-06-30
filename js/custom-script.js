

function initNewsSwitcher() {
  const newsList = document.querySelector('.view-news-window ul');
  const anonsList = document.querySelector('.view-latest-news ul');

  if (!newsList || !anonsList) {
    console.warn('Не знайдено списків новин або анонсів');
    return;
  }

  const newsItems = newsList.querySelectorAll('li');
  const anonsItems = anonsList.querySelectorAll('li');


  const activateItem = (index) => {
    newsItems.forEach((item, i) => {
      item.style.display = i === index ? 'inline-block' : 'none';
      anonsItems[i].style.backgroundColor = i === index ? '#FBF6EA' : '#ffffff';
    });
  };

  activateItem(0);


  anonsList.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('li');
    if (clickedItem) {
      const index = Array.from(anonsItems).indexOf(clickedItem);
      if (index >= 0 && newsItems[index]) {
        activateItem(index);
      }
    }
  });
}


function burgerMenu() {
  const nav = document.querySelector('header #block-my-theme-osnovnanavigaciya-2 ul');
  const subscribeBtn = document.querySelector('header #block-my-theme-knopka');
  const headerRegion = document.querySelector('.region-header');

  if (!nav || !subscribeBtn || !headerRegion) {
    console.warn('Не знайдено необхідних елементів для меню');
    return;
  }

  let burger = document.getElementById('burger-burger');
  if (!burger) {
    burger = document.createElement('div');
    burger.id = 'burger-burger';
    burger.innerHTML = '<samp></samp>';
    headerRegion.appendChild(burger);

    subscribeBtn.style.display = 'none';
    nav.style.display = 'none';
  }


  headerRegion.addEventListener('click', (event) => {
    if (event.target.closest('#burger-burger')) {
      const isActive = burger.classList.contains('active');

      if (isActive) {
        headerRegion.style.cssText = `
          display: flex;
          height: 80px;
          flex-direction: row;
          align-items: flex-start;
        `;
        subscribeBtn.style.display = 'none';
        nav.style.display = 'none';
        burger.classList.remove('active');
      } else {

        headerRegion.style.cssText = `
          display: flex;
          height: 500px;
          flex-direction: column;
          align-items: center;
        `;
        subscribeBtn.style.display = 'inline-block';
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.height = '190px';
        burger.classList.add('active');
      }
    }
  });
}

function monitorScreenWidth(callback) {
  const mediaQuery = window.matchMedia('(min-width: 1200px)');

  const handleChange = (e) => {
    callback(e.matches);
  };


  handleChange(mediaQuery);


  mediaQuery.addEventListener('change', handleChange);

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}


monitorScreenWidth((isWide) => {
  if (isWide) {
    initNewsSwitcher();

    const burger = document.getElementById('burger-burger');
    if (burger) {
      burger.remove();

      const nav = document.querySelector('header #block-my-theme-osnovnanavigaciya-2 ul');
      const subscribeBtn = document.querySelector('header #block-my-theme-knopka');
      if (nav) nav.style.display = 'flex';
      if (nav) nav.style.flexDirection = 'row';
      if (nav) nav.style.height = 'auto';
      if (subscribeBtn) subscribeBtn.style.display = 'inline-block';
      const headerRegion = document.querySelector('.region-header');
      headerRegion.style.cssText = `
        display: flex;
        height: 80px;
        flex-direction: row;
         align-items: center;
      `;


    }
  } else {
    burgerMenu();
  }
});