/*import axios from "axios";
import jwt from "jsonwebtoken"
import UrlPattern from 'url-pattern';
import qs from 'query-string';

// jwt generator
const privateKey = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIF7u6fQ1RaVV7YUg+dOD0j6upkFJ1fNQZ4nzz8n0m1zboAoGCCqGSM49
AwEHoUQDQgAEuG6npq0n2HHW+kKK2x2RfMh0J/AzwJeXgUKuMvzC2aXoKZyTLNf+
TNX1cfH+h+aMkOhenIabeiHsjdiHzX/n54lM/g==
-----END EC PRIVATE KEY-----`;
const payload = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 1 minggu dalam detik
    referer: "https://apimate.net/",
    origin: "https://apimate.net",
    userAgent: "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
};
const header = {
    alg: "HS256",
    typ: "JWT",
    kid: "8d79bd11784029a8cfb3aa5a79741a6f"
};
const jwt_token = jwt.sign(payload, privateKey, { algorithm: 'ES256', header: header });

// url parser
async function parseYouTubeUrl(url) {
  const [domain, querystring] = url.split('?');
  const options = {};
  const query = qs.parse(querystring);

  if (query.list) {
    options.playlistId = query.list;
  } else if (query.v) {
    options.videoId = query.v;
  } else {
    const shortVideo = new UrlPattern('(http(s)\\://)(www.)youtu.be/:videoId');
    const directVideo = new UrlPattern(
      '(http(s)\\://)(www.)youtube.com/v/:videoId',
    );
    const embedVideo = new UrlPattern(
      '(http(s)\\://)(www.)youtube.com/embed/:videoId',
    );

    let params = shortVideo.match(domain);
    if (params) options.videoId = params.videoId;

    params = directVideo.match(domain);
    if (params) options.videoId = params.videoId;

    params = embedVideo.match(domain);
    if (params) options.videoId = params.videoId;
  }

  // Check for start and end times for single videos.
  if (options.videoId) {
    // Start times can be set with &start= for embed urls or
    // &t= for short urls.
    if (query.start) {
      options.start = parseInt(query.start, 10);
    } else if (query.t) {
      options.start = parseInt(query.t, 10);
    }

    if (query.end) {
      options.end = parseInt(query.end, 10);
    }
  }

  return options;
}

async function getInfo(url) {
  try {
    if(!url) return { status: false, message: "failed get info, invalid url link" };
    return await new Promise(async (resolve, reject) => {
      const videoId = (await parseYouTubeUrl(url)).videoId;
      if(!videoId) reject("invalid url!");
      axios.get(`https://rr-01-bucket.cdn1313.net/api/v4/info/` + videoId, {
        headers: {
          'authority': 'rr-01-bucket.cdn1313.net',
          'accept': 'application/json',
          'origin': 'https://apimate.net',
          'referer': 'https://apimate.net/'
        }
      }).then(async res => {
        const data = res.data;
        if(!data?.videoId) reject("failed fetch video information");
        let video = data.formats.video.mp4.filter(d => /H.264/.test(d.codec));
        resolve({
          status: true,
          data: {
            videoId: data.videoId,
            title: data.title,
            duration: data.humanDuration,
            media: {
              video,
              audio: data.formats.audio.mp3 || undefined
            }
          }
        })
      }).catch(reject)
    })
  } catch (e) {
    return { status: false, message: e }
  }
}

async function download(token) {
    try {
      if(!token) return { status: false, message: "invalid content token!" };
      return await new Promise(async(resolve, reject) => {
        axios.post("https://rr-01-bucket.cdn1313.net/api/v4/convert", {
          token
        }, {
          headers: {
            'authorization': jwt_token,
            'authority': 'rr-01-bucket.cdn1313.net',
            'accept': 'application/json',
            'origin': 'https://apimate.net',
            'referer': 'https://apimate.net/',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
          }
        }).then(async res => {
          const data = res.data;
          if(data?.error) reject("content token expired!")
          let jobProc = async() => {
            return await new Promise((resolve, reject) => {
              axios.get(`https://rr-01-bucket.cdn1313.net/api/v4/status/` + data.id, {
                headers: {
                  'authorization': jwt_token,
                  'authority': 'rr-01-bucket.cdn1313.net',
                  'accept': 'application/json',
                  'origin': 'https://apimate.net',
                  'referer': 'https://apimate.net/',
                  'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
                }
              }).then(res => {
                const data = res.data;
                if(data?.error) reject({ status: "error", message: data.message });
                if(data.status === "failed") reject({ status: "error", message: "failed converting content" });
                if(data.status == "active") resolve({ status: "queue", message: "on queue...", data});
                resolve({
                  status: "completed",
                  data: {
                    url: data.download,
                    title: data.title,
                    quality: data.quality,
                    ext: data.ext
                  }
                })
              }).catch(e => reject({ status: false, message: e }));
            })
          }
          let count = 0;;
          async function process() {
            let job = await jobProc()
            console.log(count + ":", job)
            count++
            if(job?.status == "error") return reject("failed converting content")
            if(job.status == "completed") {
              job.status = true;
              return resolve(job)
            }
            setTimeout(process, 3000);
          }
          await process();
        }).catch(reject)
      })
    } catch (e) {
      return { status: false, message: e };
    }
}

getInfo("https://youtube.com/watch?v=u_fsVPfxgAQ")
*/
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(console.log)
download("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlb0lkIjoidV9mc1ZQZnhnQVEiLCJpdGFnIjoxMzQsImV4dCI6Im1wNCIsImV4cCI6MTcyMDc2OTM2NH0.3EPjmnNr4XtPPcXdoiklFU3n7iBSf3M_O6TpBjUvfhA")
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(console.log)
