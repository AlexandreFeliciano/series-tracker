const mongoose = require("mongoose");
require("dotenv").config();
const Series = require("./models/series");

const data = [
    {
        title: "Supernatural",
        genre: "Drama",
        platform: "Netflix",
        status: "plan",
        rating: 0,
        totalSeasons: 15,
        watchedSeasons: 0,
        review: "Recomendado pelo Bruno!",
        cover: "https://m.media-amazon.com/images/M/MV5BMDFmMGZmMGItNGRjNC00NjVjLWI5ODEtNzhjMTE5MmJhN2FkXkEyXkFqcGc@._V1_.jpg",
        episodes: []
    },
    {
        title: "Dexter",
        genre: "Crime",
        platform: "Netflix",
        status: "plan",
        rating: 0,
        totalSeasons: 8,
        watchedSeasons: 0,
        review: "",
        cover: "https://bdspotlight.com/wp-content/uploads/2025/01/dexter-3.jpg",
        episodes: []
    },
    {
        title: "Dr. House",
        genre: "Drama",
        platform: "Netflix",
        status: "watching",
        rating: 7,
        totalSeasons: 8,
        watchedSeasons: 2,
        review: "",
        cover: "https://www.dvdplanetstore.pk/wp-content/uploads/2017/12/lxSzRZ49NXwsiyHuvMsd19QxduC.jpg",
        episodes: []
    },
    {
        title: "Sherlock",
        genre: "Crime",
        platform: "Netflix",
        status: "plan",
        rating: 0,
        totalSeasons: 4,
        watchedSeasons: 0,
        review: "",
        cover: "https://m.media-amazon.com/images/M/MV5BNTQzNGZjNDEtOTMwYi00MzFjLWE2ZTYtYzYxYzMwMjZkZDc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        episodes: []
    },
    {
        title: "The Witcher",
        genre: "Fantasia",
        platform: "Netflix",
        status: "watching",
        rating: 6,
        totalSeasons: 4,
        watchedSeasons: 3,
        review: "",
        cover: "https://i1.sndcdn.com/artworks-000652035193-begee6-t500x500.jpg",
        episodes: []
    },
    {
        title: "Daredevil Born Again",
        genre: "Ação",
        platform: "Disney+",
        status: "plan",
        rating: 0,
        totalSeasons: 1,
        watchedSeasons: 0,
        review: "",
        cover: "https://cdn.marvel.com/content/2x/daredevilbornagain_lob_crd_03.jpg",
        episodes: []
    },
    {
        title: "The Punisher",
        genre: "Ação",
        platform: "Disney+",
        status: "plan",
        rating: 0,
        totalSeasons: 2,
        watchedSeasons: 0,
        review: "",
        cover: "https://m.media-amazon.com/images/M/MV5BZTI2NDllMjgtOWEyYi00Y2YxLThhYjQtNTQ0NTgwNDE1YmYzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        episodes: []
    },
    {
        title: "Daredevil (Original)",
        genre: "Ação",
        platform: "Disney+",
        status: "plan",
        rating: 0,
        totalSeasons: 3,
        watchedSeasons: 0,
        review: "",
        cover: "https://m.media-amazon.com/images/M/MV5BODcwOTg2MDE3NF5BMl5BanBnXkFtZTgwNTUyNTY1NjM@._V1_QL75_UX190_CR0,0,190,281_.jpg",
        episodes: []
    },
    {
        title: "House of the Dragon",
        genre: "Fantasia",
        platform: "HBO",
        status: "watching",
        rating: 8,
        totalSeasons: 2,
        watchedSeasons: 2,
        review: "",
        cover: "https://www.etonline.com/sites/default/files/styles/720x720/public/images/2024-05/key-art_5.jpg?h=bb4b18a7",
        episodes: []
    },
    {
        title: "A Knight of the Seven Kingdoms",
        genre: "Fantasia",
        platform: "HBO",
        status: "watching",
        rating: 10,
        totalSeasons: 1,
        watchedSeasons: 1,
        review: "INCRÍVEL",
        cover: "https://m.media-amazon.com/images/M/MV5BNGUxNDM5OTEtZWRiYi00OWI1LTgxOTctYzljYTJmMjlkY2Y4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        episodes: []
    },
    {
        title: "Alice in Borderland",
        genre: "Thriller",
        platform: "Netflix",
        status: "completed",
        rating: 8,
        totalSeasons: 3,
        watchedSeasons: 3,
        review: "",
        cover: "https://static.wikia.nocookie.net/dubbing9585/images/8/8b/Alice_in_Borderland.jpg/revision/latest?cb=20201210203645",
        episodes: []
    },
    {
        title: "Lucifer",
        genre: "Drama",
        platform: "Netflix",
        status: "dropped",
        rating: 6,
        totalSeasons: 6,
        watchedSeasons: 1,
        review: "",
        cover: "https://resizing.flixster.com/PYMILH2RwjmJ3uCZyBAEDihOIG4=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvUlRUVjI3OTYxMS53ZWJw",
        episodes: []
    },
    {
        title: "Peaky Blinders",
        genre: "Ação",
        platform: "Netflix",
        status: "completed",
        rating: 10,
        totalSeasons: 6,
        watchedSeasons: 6,
        review: "Amazing!",
        cover: "https://www.tallengestore.com/cdn/shop/products/PeakyBlinders-NetflixTVShow-ArtPoster_56823192-0a33-4a9d-b8e3-fd2878fcc867.jpg?v=1619864550",
        episodes: []
    },
    {
        title: "The Last Dance",
        genre: "Desporto",
        platform: "Netflix",
        status: "dropped",
        rating: 7,
        totalSeasons: 1,
        watchedSeasons: 0,
        review: "",
        cover: "https://upload.wikimedia.org/wikipedia/en/1/14/The_Last_Dance_2020.jpg",
        episodes: []
    },
    {
        title: "Walking Dead",
        genre: "Terror",
        platform: "Amazon Prime",
        status: "dropped",
        rating: 7,
        totalSeasons: 11,
        watchedSeasons: 5,
        review: "",
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0e/TheWalkingDeadPoster.jpg",
        episodes: []
    },
    {
        title: "The Falcon and the Winter Soldier",
        genre: "Ação",
        platform: "Disney+",
        status: "completed",
        rating: 8,
        totalSeasons: 1,
        watchedSeasons: 1,
        review: "",
        cover: "https://m.media-amazon.com/images/M/MV5BYmJkOGNlNmEtMmQyOS00YjZiLTgxM2EtNmEzNzUzNTU5ODYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        episodes: []
    },
    {
        title: "Prison Break",
        genre: "Crime",
        platform: "Disney+",
        status: "dropped",
        rating: 8,
        totalSeasons: 5,
        watchedSeasons: 4,
        review: "",
        cover: "https://upload.wikimedia.org/wikipedia/en/4/46/Prison_Break_season_1_dvd.jpg",
        episodes: []
    },
    {
        title: "Stranger Things",
        genre: "Ficção Científica",
        platform: "Netflix",
        status: "watching",
        rating: 7,
        totalSeasons: 5,
        watchedSeasons: 4,
        review: "",
        cover: "https://cdn-images.dzcdn.net/images/cover/b489155c4fc82ede52989ebbc2afb5f1/0x1900-000000-80-0-0.jpg",
        episodes: []
    },
    {
        title: "Unsolved: The Murders of Tupac and the Notorious B.I.G",
        genre: "Documentário",
        platform: "Netflix",
        status: "plan",
        rating: 0,
        totalSeasons: 1,
        watchedSeasons: 0,
        review: "",
        cover: "https://static.wikia.nocookie.net/netflix/images/0/0c/Unsolved.jpg/revision/latest?cb=20200716054409",
        episodes: []
    },
    {
        title: "Squid Game",
        genre: "Thriller",
        platform: "Netflix",
        status: "completed",
        rating: 8,
        totalSeasons: 2,
        watchedSeasons: 2,
        review: "",
        cover: "https://m.media-amazon.com/images/I/7118ecsxO3L._AC_UF894,1000_QL80_.jpg",
        episodes: []
    },
    {
        title: "Suits",
        genre: "Drama",
        platform: "Netflix",
        status: "completed",
        rating: 10,
        totalSeasons: 9,
        watchedSeasons: 9,
        review: "Legendary.",
        cover: "https://image.tmdb.org/t/p/w500/vQiryp6LioFxQThywxbC6TuoDjy.jpg",
        episodes: []
    },
    {
        title: "Loki",
        genre: "Ficção Científica",
        platform: "Disney+",
        status: "completed",
        rating: 8,
        totalSeasons: 2,
        watchedSeasons: 2,
        review: "",
        cover: "https://cdn.marvel.com/content/1x/arch_digital_keyart_teaser_v4_lg.jpg",
        episodes: []
    },
    {
        title: "Sons of Anarchy",
        genre: "Ação",
        platform: "Disney+",
        status: "completed",
        rating: 10,
        totalSeasons: 10,
        watchedSeasons: 10,
        review: "",
        cover: "https://m.media-amazon.com/images/M/MV5BZWNiZjFiNGEtNGZmMS00YTBlLWJlNmQtZTA2NzEzZWE4ZGQyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        episodes: []
    },
    {
        title: "The Lord of the Rings: The Rings of Power",
        genre: "Fantasia",
        platform: "Amazon Prime",
        status: "watching",
        rating: 10,
        totalSeasons: 2,
        watchedSeasons: 2,
        review: "Good af",
        cover: "https://upload.wikimedia.org/wikipedia/en/6/65/TROP_season_1_poster.jpg",
        episodes: []
    },
    {
        title: "Last of Us",
        genre: "Terror",
        platform: "HBO",
        status: "watching",
        rating: 8,
        totalSeasons: 2,
        watchedSeasons: 1,
        review: "",
        cover: "https://www.topart-ujsag.hu/wp-content/uploads/2023/01/fokep-1.jpeg",
        episodes: []
    },
    {
        title: "Yellowstone",
        genre: "Drama",
        platform: "Amazon Prime",
        status: "plan",
        rating: 0,
        totalSeasons: 5,
        watchedSeasons: 1,
        review: "",
        cover: "https://i5.walmartimages.com/asr/e5ffd246-acee-45b8-88fd-f10cc6862f3b.5844d8129f9d5907a7db324866a7d1e4.jpeg",
        episodes: []
    },
    {
        title: "Ted",
        genre: "Ação",
        platform: "Amazon Prime",
        status: "completed",
        rating: 10,
        totalSeasons: 1,
        watchedSeasons: 1,
        review: "",
        cover: "https://resizing.flixster.com/yhSMR7wi7o5kRjjrQb4Yo6zTCHM=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNmMzZDU3MDktNzkxOC00ZmZkLWIxMjctNTdlMTY2ZGQxODljLmpwZw==",
        episodes: []
    },
    {
        title: "Game of Thrones",
        genre: "Fantasia",
        platform: "HBO",
        status: "completed",
        rating: 10,
        totalSeasons: 8,
        watchedSeasons: 8,
        review: "Terrible ending LMAO",
        cover: "https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        episodes: []
    },
    {
        title: "Breaking Bad",
        genre: "Crime",
        platform: "Netflix",
        status: "dropped",
        rating: 7,
        totalSeasons: 5,
        watchedSeasons: 1,
        review: "",
        cover: "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_.jpg",
        episodes: []
    }
];

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("MongoDB ligado");
        await Series.deleteMany({});
        console.log("BD limpa");
        await Series.insertMany(data);
        console.log(`${data.length} séries inseridas com sucesso!`);
        process.exit();
    })
    .catch((error) => {
        console.error("Erro:", error);
        process.exit(1);
    });