const request = require('request');




const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ebfbd71436fac8f57b633ee072929658&query='+latitude+','+longitude+'&units=m'
    
    request({ url, json: true }, (err, resp) => {
        const {temperature, feelslike} = resp.body.current;

        if (err) {
            callback ('Susijungimo klaida', undefined);
        } else if (resp.body.error) {
          console.log(err);

            callback ('Lokacija nerasta', undefined);

        }  else {
            callback(undefined, {
                temperatura: temperature,
                jutimine: feelslike,
                lokacija: resp.body.location.name
            });
        }
        
    });

}

module.exports = forecast;