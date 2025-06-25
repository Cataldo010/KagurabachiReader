class OnePieceCapitolo {
    constructor(capitolo, pagina, img ) {
      this.Capitolo = capitolo;
      this.Pagina = 1;
      this.img = img;
      this.BasePath = `https://www.kagurabachiscanita.org/chapter`;
    }


    nextPagina(){
        this.Pagina++;
    }
    prevPagina(){
        if(this.Pagina > 1){
            this.Pagina--
        }
    }

    nextCapitolo(){
        this.Capitolo = this.Capitolo + 1;
        document.getElementById("capitolo").value = this.Capitolo;
    }
    prevCapitolo(){
        if(this.Capitolo > 1){
            this.Capitolo = this.Capitolo - 1;
            document.getElementById("capitolo").value = this.Capitolo;
        }
    }

    setPagina(pagina){
        this.Pagina = pagina
    }

    updateImg(){
        this.img.src = `${this.BasePath}/${this.Capitolo.toString().padStart(2, '0')}/${this.Pagina}.jpg`;	
        this.saveToStorage();
    }

    saveToStorage() {
        const data = {
            capitolo: this.Capitolo,
            pagina: this.Pagina
        };
        localStorage.setItem("kagurabachi_reader", JSON.stringify(data));
    }


}



window.onload = function(){
    const capitoloElem = document.getElementById("capitolo");
    const paginaElem = document.getElementById("pagina"); 
    const imgElem = document.getElementById("img");

    let reader = new OnePieceCapitolo(capitoloElem, paginaElem, imgElem);

    // Ripristina stato salvato
    const stato = caricaStato();
    if (stato) {
        reader.Capitolo = stato.capitolo;
        reader.setPagina(parseInt(stato.pagina));
    }

    reader.updateImg();

    const aggiorna = () => {
        reader.updateImg();
        console.log(reader.img.src)
        salvaStato(reader);
    }

    // Eventi

    document.getElementById("btn_Read").addEventListener("click", function() {
        aggiorna();
    })

    document.getElementById("btn_PrevCapitolo").addEventListener("click", function() {
        reader.prevCapitolo();
        reader.setPagina(1);
        aggiorna();
    });
    document.getElementById("btn_NextCapitolo").addEventListener("click", function() {
        reader.nextCapitolo();
        reader.setPagina(1);
        aggiorna();
    });
    document.getElementById("btn_PrevPagine").addEventListener("click", function() {
        reader.prevPagina();
        aggiorna();
    });
    document.getElementById("btn_NextPagine").addEventListener("click", function() {
        reader.nextPagina();
        aggiorna();
    });
}

function salvaStato(reader) {
    const data = {
        capitolo: reader.Capitolo,
        pagina: reader.Pagina
    };
    localStorage.setItem("onepiece_reader", JSON.stringify(data));
}

function caricaStato() {
    const data = localStorage.getItem("onepiece_reader");
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
}
