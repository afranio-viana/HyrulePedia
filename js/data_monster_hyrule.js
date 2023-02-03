window.addEventListener('load', function(event) {
    const baseUrl = 'https://botw-compendium.herokuapp.com/api/v2/category/';
    const container = document.querySelector('.monster');
    let monster;
  
    function requestMonsterInfo(url) {
      try {
        fetch(`${url}monsters`)
          .then(response => response.json())
          .then(data => {
            monster = data;
            monster.data.forEach((monsterData, index) => {
              const cardMonster = document.createElement('div');
              cardMonster.classList.add('card_monster');
              const linkMonster = document.createElement('a');
              linkMonster.classList.add('link_monster');
              const h1Monster = document.createElement('h1');
              const nameMonster = document.createTextNode(`[${index + 1}] ${monsterData.name}`);
              const imgMonster = document.createElement('img');
              imgMonster.src = monsterData.image;
              h1Monster.appendChild(nameMonster);
              linkMonster.appendChild(h1Monster);
              linkMonster.appendChild(imgMonster);
              cardMonster.appendChild(linkMonster);
              container.appendChild(cardMonster);
              cardMonster.addEventListener('click', () => {
                switchModal(monsterData.name,monsterData.image,monsterData.description)
              });
            });
          });
      } catch (error) {
        console.error(error);
      }
    }
  
    requestMonsterInfo(baseUrl);


    function switchModal(monsterName,monsterImage,monsterDescription){
        const modal=document.querySelector('.modal');
        modal.innerHTML=`<div class="content-modal"></div>`;
        const contentModal=document.querySelector('.content-modal');
        
        const imgModal=document.createElement('div');
        imgModal.classList.add('img-modal')
        contentModal.appendChild(imgModal)
        
        const imgMonster = document.createElement('img');
        imgMonster.src=monsterImage;
        imgModal.appendChild(imgMonster);
        
        const containerModal=document.createElement('div');
        containerModal.classList.add('container-modal');
        contentModal.appendChild(containerModal);
        
        const closeModal=document.createElement('span');
        closeModal.classList.add('close-modal');
        const h3 =document.createElement('h3');
        const X=document.createTextNode(`X`);
        h3.appendChild(X);
        closeModal.appendChild(h3);
        containerModal.appendChild(closeModal)
        
        const actualStyle=modal.style.display;
        closeModal.addEventListener('click',()=>{
          modal.style.display='none';
        });

        const nameMonster=document.createElement('h2');
        nameMonster.classList.add('name-monster');
        nameMonster.appendChild(document.createTextNode(monsterName));
        containerModal.appendChild(nameMonster);

        const descriptionMonster=document.createElement('p');
        descriptionMonster.classList.add('description-monster');
        descriptionMonster.appendChild(document.createTextNode(monsterDescription));
        containerModal.appendChild(descriptionMonster);

        if(actualStyle=='block'){
            modal.style.display='none';
        }else{
            modal.style.display='block';
        }
    }
  });

  
  