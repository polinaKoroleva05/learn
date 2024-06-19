async function sort(sortby) {
    if (sortby == 'ishere' && !document.getElementById('ishere').checked) {
        sortby = 'normal';
    }
    const url = '/?sort=' + sortby; //получаем тип сортировки
    try {
        const response = await fetch(url);
        if (response.ok) {
            const sortedbase = await response.json();
            let newGrid = '';
            sortedbase.forEach(book => {
                newGrid += `
                <div class="bookBlock">
                    <div class="textBlock">
                        <p class="title">${book[1].title}</p>
                        <p>${book[1].author}</p>
                        <p>${book[1].year}</p>
                    </div>
                    <a class="btn moreInfo" href="/book/${book[0]}">Подробнее</a>
                </div>`
            })
            let grid = document.getElementsByClassName('grid');
            grid[0].innerHTML = newGrid;
        }
    } catch(e) {
        console.log("smt wrong in fetch sort");
        console.log(e);
    }
}