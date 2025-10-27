import express from "express";
import bodyParser from "body-parser";
import nocache from "nocache";
import cors from "cors";

const port = 8001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: ["*/*"] }));
app.use(nocache());
app.use(cors()); 

// function redirectUnmatched(req, res) { res.redirect('/'); }
// app.use(redirectUnmatched);

const themes =  [
  { id: '1', label: 'Bannanas' },
  { id: '2', label: 'Helicopters' },
  { id: '3', label: 'Jupiter' },
];
const categories = [
  { name: "What's new" },
  { name: "Chromatic Feelings" },
  { name: "Best Classics" },
  { name: "Nature Textures" },
];
const imgs = [
  "https://fastly.picsum.photos/id/563/300/200.jpg?hmac=2zX8b2Akr3vClB4c0Bx6LAWb84LX0QuFxjzdkYezFlU",
  "https://fastly.picsum.photos/id/411/300/200.jpg?hmac=ev1VWFFqewY_uqDLshz8OuswpnW_0jYPN07LYuNvcB4",
  "https://fastly.picsum.photos/id/510/300/200.jpg?hmac=b8fG9GxqHHCM9vW7Z2k3s_-tMk7ULuCFnUefY9RXgo8",
  "https://fastly.picsum.photos/id/214/300/200.jpg?hmac=xAr0P6sJ-SSjhq-GSAdByEb_5k7MBsc_gXfND4uFDhM",
  "https://fastly.picsum.photos/id/1064/300/200.jpg?hmac=8xH9it1PM_imDchzba7RSQAyi9xUFfRx28JQYtW7k9Y",
  "https://fastly.picsum.photos/id/474/300/200.jpg?hmac=U3owchyfD1gP7JngoXB576Lo9qRMD8R19P1zopKGvKI",
  "https://fastly.picsum.photos/id/272/300/200.jpg?hmac=pToeQGP7P1ALht579t2BWQOoVzuPB2zvbdy3kQKMMFE",
  "https://fastly.picsum.photos/id/823/300/200.jpg?hmac=l_jdJLoJQeErmRXETXjqQt0DHWa8Wt14UteSSnnDgTI",
  "https://fastly.picsum.photos/id/251/300/200.jpg?hmac=j6P9IEpc40EtEgrA28bi4WCXKRjps7sWowiGKShe7Uw",
  "https://fastly.picsum.photos/id/973/300/200.jpg?hmac=Q0fGFtvimiyY4NYJlA22LuGWCXIDFJVTp5mLrTCzAV4",
  "https://fastly.picsum.photos/id/354/300/200.jpg?hmac=WVtIMqL1bA8NbK5YOTswbhZo_V3ACCC_s5LHnVaB4IM",
  "https://fastly.picsum.photos/id/695/300/200.jpg?hmac=NhJTi38JrBvF1HoSovtzB9Tqr7f5-X-qCWNwcwu25Nw",
  "https://fastly.picsum.photos/id/665/300/200.jpg?hmac=2PmtELRCk_YFJrixWbbCW-jXh9R_N_CFAtoKzCc8Q28",
  "https://fastly.picsum.photos/id/99/300/200.jpg?hmac=U4YQmefe3Ng4IlKBytiAxUQdgd11VBNO59_0wZNOxPk",
  "https://fastly.picsum.photos/id/794/300/200.jpg?hmac=HDhH_umexV_q0wBwlZ1XyvuHlLxJk1zJl3sMKr8gQlw",
  "https://fastly.picsum.photos/id/937/300/200.jpg?hmac=GJYxL7lzejHKjvxi5uA67PGLYLd8rg4FkdTfjl04fsw",
  "https://fastly.picsum.photos/id/658/300/200.jpg?hmac=qi-cNxTuO44OcrDK6OPF73mGzIQKtRqlVWoUKaNMDGs",
];

const fakeArtworksResponse = {
  artworks: [
    {
      id: "art001",
      title:
        "Reflections of Light on a Silent Horizon Beneath the Whispering Skies of a Forgotten Evening",
      artist_name: "by Javier Aznar Gonzalez de Rueda",
      thumbnail_url:
        "https://cdn.pixabay.com/photo/2019/03/12/17/18/trees-4051288_1280.jpg",
      signed_url:
        "https://cdn.pixabay.com/photo/2019/03/12/17/18/trees-4051288_1280.jpg",
    },
    {
      id: "art002",
      title: "Rhinoceros Hornbills in the Canopy",
      artist_name: "by Tim Laman",
      thumbnail_url:
        "https://images.pexels.com/photos/13872636/pexels-photo-13872636.jpeg",
      signed_url:
        "https://images.pexels.com/photos/13872636/pexels-photo-13872636.jpeg",
    },
    {
      id: "art003",
      title: "Idea",
      artist_name: "by Javier Aznar Gonzalez de Rueda",
      thumbnail_url:
        "https://images.pexels.com/photos/1271620/pexels-photo-1271620.jpeg",
      signed_url:
        "https://images.pexels.com/photos/1271620/pexels-photo-1271620.jpeg",
    },
    {
      id: "art004",
      title: "Artwork 004",
      artist_name: "Artist 004",
      thumbnail_url:
        "https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg",
      signed_url:
        "https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg",
    },
  ],
  offset: 4,
};

let playlistCount = 0;
let artCount = 1;
function newPlaylist(totalArts, category) {
  const artworks = Array.from(Array(totalArts).keys()).map(n => {
    if (n < 4) { return fakeArtworksResponse.artworks[n]; }
    return {
      id: `art${((artCount + n) + '').padStart(3, '0')}`,
      title: `Artwork ${((artCount + n) + '').padStart(3, '0')}`,
      artist_name: 'Someone',
      thumbnail_url: imgs[(playlistCount + 0) % (imgs.length - 1)],      
      signed_url   : imgs[(playlistCount + 0) % (imgs.length - 1)],
    };
  });
  artCount += totalArts;
  playlistCount++;
  return {
    id: "pl" + ((playlistCount) + '').padStart(3, '0'),
    title: "Playlist " + playlistCount,
    artworks,
    thumbnail: imgs[playlistCount % (imgs.length - 1)],
    owner_name: "John Doe",
    description: 'Description provided by the artist in case of being a collection. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac sollicitudin justo. Nunc vitae tristique turpis. Quisque varius auctor malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In maximus ante nec magna pellentesque consectetur. Fusce ac lorem metus. Nulla facilisi. Aliquam ultrices id metus ac condimentum. Donec tortor nisi, rutrum sed malesuada nec, elementum pretium erat. Nam in nunc et tortor cursus ultrices.',
    category,
    theme: themes[playlistCount & (themes.length - 1)].id,
    nudity_content: !((playlistCount) % 4),
    mature_content: !((playlistCount + artCount) % 3),
    only_full_screen: !((artCount) % 2),
  };
}

const fakePlaylists = [
  newPlaylist(4, categories[0].name),
  newPlaylist(62, categories[0].name),
  newPlaylist(10, categories[0].name),
  newPlaylist(3, categories[0].name),
  newPlaylist(3, categories[0].name),
  newPlaylist(3, categories[0].name),
  newPlaylist(3, categories[0].name),
  newPlaylist(3, categories[0].name),
  newPlaylist(3, categories[1].name),
  newPlaylist(3, categories[1].name),
  newPlaylist(3, categories[1].name),
  newPlaylist(3, categories[2].name),
  newPlaylist(3, categories[2].name),
  newPlaylist(3, categories[2].name),
  newPlaylist(3, categories[3].name),
  newPlaylist(3, categories[3].name),
  newPlaylist(3, categories[3].name),
];

function getPlaylists(query = {}) {
  // FILTER:
  // theme: string; // id of the theme
  // show_nudity: Boolean; // show nudity content
  // show_mature: Boolean; // show mature content
  // only_full_screen: Boolean; // show only full screen content
  // search: string; // search entry --> search through categories and playlist names
  const filters = {};
  for (let propName in query) { filters[propName] = query[propName]; }

  // console.log('nudity_content = ',   fakePlaylists.filter(p => p.nudity_content).length);   // 4
  // console.log('mature_content = ',   fakePlaylists.filter(p => p.mature_content).length);   // 5
  // console.log('only_full_screen = ', fakePlaylists.filter(p => p.only_full_screen).length); // 8
  console.log('Getting playlists with FILTERS =', filters);

  const playlists = fakePlaylists
    .filter(playlist => {
      if (filters.hasOwnProperty('theme') && playlist.theme !== filters.theme) { return false; }
      if (filters.hasOwnProperty('show_nudity') && !playlist.nudity_content) { return false; }
      if (filters.hasOwnProperty('show_mature') && !playlist.mature_content) { return false; }
      if (filters.hasOwnProperty('only_full_screen') && !playlist.only_full_screen) { return false; }
      if (filters.hasOwnProperty('search')) {
        if ((playlist.title.indexOf(filters.search) < 0)
         || (playlist.description.indexOf(filters.search) < 0)
         || (playlist.category.indexOf(filters.search) < 0)
        ) { return false; }
      }
      return true;
    })
    .map(playlist => {
      return {
        id            : playlist.id,
        title         : playlist.title,
        thumbnail     : playlist.thumbnail,
        description   : playlist.description,
        artwork_count : playlist.artworks.length,
        category      : playlist.category,
        owner_name    : playlist.owner_name,
        // theme    : playlist.theme,
        // nudity_content    : playlist.nudity_content,
        // mature_content    : playlist.mature_content,
        // only_full_screen    : playlist.only_full_screen,
      };
  });

  // Group by category to get:
  //   categories: [
  //     { name: "What's new",         playlists: [...] },
  //     { name: "Chromatic Feelings", playlists: [...] },
  //     { name: "Best Classics",      playlists: [...] }, 
  //     { name: "Nature Textures",    playlists: [...] },
  //   ]
  const categories = Object.keys(Object.groupBy(playlists, p => p.category)).map(name => {
    return { name, playlists: playlists.filter(p => p.category === name) }
  });
  
  return { categories };
}

function getPlaylist(playlistId) {
  const playlist = fakePlaylists.find(p => p.id === playlistId);
  if (playlist) {
    return {
      id            : playlist.id,
      title         : playlist.title,
      thumbnail     : playlist.thumbnail,
      description   : playlist.description,
      artwork_count : playlist.artworks.length,
      category      : playlist.category,
      owner_name    : playlist.owner_name,
    };
  }
}


function getPlaylistArtworks(playlistId, query = {}, onlyThumbnails = false) {
  // limit: number;  // number paginated artwors returned in artworks[]
  // offset: number; // first artwork to return in the pagination
  // play_randomly: Boolean; // whether to return the artworks ordered, or shuffledes
  const playlist = fakePlaylists.find(p => p.id === playlistId);
  if (playlist) {
    const offset = Math.min(parseInt(query.offset) || 0, playlist.artworks.length - 1);
    const limit = parseInt(query.limit) || 10;

    console.log('playlistId = ', playlistId);
    console.log('limit = ', limit);
    console.log('offset = ', offset);

    const artworks = playlist.artworks.map(({ id, title, artist_name, thumbnail_url, signed_url }) => {
      const imgLink = onlyThumbnails ? { thumbnail_url } : { signed_url };
      return { id, title, artist_name, ...imgLink };
    })
    
    let page = artworks.slice(offset, offset + limit); // 60-68 [60, 61, 62]
    console.log(`page = slice[${offset}, ${offset + limit}] = `, page.map(p => p.id));

    const loopSize = limit - page.length; // 8 - 3 = 5
    if (loopSize > 0 && artworks.length > limit) {
      const pageLoop = artworks.slice(0, loopSize);
      console.log(`page2 = slice[0, ${loopSize}] = `, pageLoop.map(p => p.id));
      page = [...page, ...pageLoop];
    }

    return {
      title         : playlist.title,
      artwork_count : artworks.length,
      artworks      : page,
      next_offset   : (offset + limit) % artworks.length,
    };
  }
}






function getConstants() {
  return {
    play_times: [
      { label: "4 seconds", value: 3000 },
      { label: "8 seconds", value: 4000 },
      { label: "15 seconds", value: 15000 },
      { label: "20 seconds", value: 20000 },
      { label: "30 seconds", value: 30000 },
      { label: "45 seconds", value: 45000 },
      { label: "1 minute", value: 60000 },
      { label: "2 minutes", value: 120000 },
      { label: "3 minutes", value: 180000 },
      { label: "5 minutes", value: 300000 },
      { label: "7 minutes", value: 420000 },
      { label: "10 minutes", value: 600000 },
      { label: "15 minutes", value: 900000 },
      { label: "20 minutes", value: 1200000 },
      { label: "30 minutes", value: 1800000 },
      { label: "45 minutes", value: 2700000 },
      { label: "1 hour", value: 3600000 },
      { label: "2 hours", value: 7200000 },
      { label: "5 hours", value: 18000000 },
      { label: "10 hours", value: 36000000 },
      { label: "15 hours", value: 54000000 },
      { label: "24 hours", value: 86400000 },
    ],
    backgrounds: [
      { name: "Background 1", value: "#DAC9B6", img: "<extension-base-path>/assets/background-DAC9B6.png" },
      { name: "Background 2", value: "#E4E0DA", img: "<extension-base-path>/assets/background-E4E0DA.png" },
      { name: "Background 3", value: "#B4A79B", img: "<extension-base-path>/assets/background-B4A79B.png" },
      { name: "Background 4", value: "#262626", img: "<extension-base-path>/assets/background-262626.png" },
      { name: "Background 5", value: "#9B9B9B", img: "<extension-base-path>/assets/background-9B9B9B.png" },
    ],
  };
};



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.get('/', (req, res) => res.send('Hello World!!'));


// req.method    = GET, POST, …
// req.query     = query string of the request
// req.body      = data on the body of the request (this requires 'body-parser')
// req.headers   = headers of the request
// req.params[0] = URL of the request
// req.originalUrl

app.get('/constants', (req, res) => res.status(200).send({ constants: getConstants() }));

app.get('/playlists', (req, res) => {
  return res.status(200).send(getPlaylists(req.query));
});

app.get('/playlists/:id', (req, res) => {
  const data = getPlaylist(req.params.id);
  if (data) { return res.status(200).send(data); }
  return res.status(404).send({ error: 'playlist not found' });
});

app.get('/playlists/:id/artworks', (req, res) => {
  const data = getPlaylistArtworks(req.params.id, req.query);
  if (data) { return res.status(200).send(data); }
  return res.status(404).send({ error: 'playlist not found' });
});

app.get('/playlists/:id/artwork-thumbnails', (req, res) => {
  const data = getPlaylistArtworks(req.params.id, req.query, true);
  if (data) { return res.status(200).send(data); }
  return res.status(404).send({ error: 'playlist not found' });
});

app.post('playlist/:id/statistics', (req, res) => {
  res.status(200).send({ response: 'ok' });
});

app.get('/hello', (req, res) => res.status(200).send({ res: 'Hello World' }));

// curl --request GET -H "Content-Type: application/json" http://localhost:8001/playlists
// curl --request GET -H "Content-Type: application/json" http://localhost:8001/playlists/pl002/artworks
// curl --request GET -H "Content-Type: application/json" http://localhost:8001/playlists/pl002/artwork-thumbnails

// curl --request GET -H "Content-Type: application/json" https://publicapi-g6k5.onrender.com/hello
// curl --request GET -H "Content-Type: application/json" https://publicapi-g6k5.onrender.com/playlists
// curl --request GET -H "Content-Type: application/json" https://publicapi-g6k5.onrender.com/playlists/pl002/artworks
// curl --request GET -H "Content-Type: application/json" https://publicapi-g6k5.onrender.com/playlists/pl002/artwork-thumbnails



