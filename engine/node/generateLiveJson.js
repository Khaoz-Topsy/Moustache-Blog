const fs = require('fs');
// const axios = require('axios');

async function generateLiveJson() {

    // const appReviewJson = await axios.get('https://api.assistantapps.com/AppReview/1');
    // console.log('appReviewJson');

    // const contributorsJson = await axios.get('https://api.nmsassistant.com/Contributor');
    // console.log('contributorsJson');

    // const testimonialsJson = await axios.get('https://api.nmsassistant.com/Testimonial');
    // console.log('testimonialsJson');

    // const donationJson = await axios.get('https://api.assistantapps.com/Donation?page=1');
    // console.log('donationPageJson 1');
    // let donationList = [...donationJson.data.value];
    // for (let donationIndex = 1; donationIndex < donationJson.data.totalPages; donationIndex++) {
    //     const pageToRequest = donationIndex + 1;
    //     const donationPageJson = await axios.get(`https://api.assistantapps.com/Donation?page=${pageToRequest}`);
    //     console.log('donationPageJson ' + pageToRequest);
    //     donationList = [...donationList, ...(donationPageJson?.data?.value ?? [])];
    // }

    let fullJson = {
        // testimonials: testimonialsJson.data,
        // googlePlayRating: appReviewJson.data[0],
        // appleAppStoreRating: appReviewJson.data[1],
        // contributors: contributorsJson.data,
        // donations: donationList.filter(d => d.type != 'Patreon'),
    };

    fs.writeFile('./data/generated/live.json', JSON.stringify(fullJson), ['utf8'], () => { });
}

generateLiveJson();