"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Ender kullanılacak dosya bu dosya, sync dosyası gibi
// swagger için json verileri toplayıp hazırlayacak olan dosya

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
// npm i swagger-autogen
// https://swagger-autogen.github.io/docs/
/* ------------------------------------------------------- *
const options = {
	openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
	language:         <string>,     // Change response language.                      By default is 'en-US'
	disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
	autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
	autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
	autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
	writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */
//yukarıdaki ayarlara hiç ihtiyaç olmayacak, biz belirtmeyeceğiz
// const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', language: 'tr-tr' })
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = { //sonuçta oluşrurulacak json dosyasının ön tanımlamaları
	// info: {
	// 	version: "1.0.0",
	// 	title: "Personnel API",
	// 	description: "Personnel Management API Service",
	// 	termsOfService: "http://www.clarusway.com",
	// 	contact: { name: "Clarusway", email: "qadir@clarusway.com" },
	// 	license: { name: "BSD License", },
	// },

	// yukarıdaki bilglerin nedeyse tamamı zaten bizim package.json dosyamızda var o nedenle package.json dan çekeceğiz bu bilgileri, o ndenle yukarıda package.json u require ettik önce 
	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		termsOfService: "http://www.clarusway.com",
		contact: { name: packageJson.author, email: "qadir@clarusway.com" },
		license: { name: packageJson.license, },
	},
	host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
	// SimpleToken Settings:
	securityDefinitions: {
		Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
		},
	},
	security: [{ Token: [] }], //giriş yöntemi bu olsun

	// dokümantasyondaki MODELLER kısmı ile ilgili alanlardan sorumlu aşağıdakiler
	//definitions, swagger sayfasının en altındaki Models bölümünden sorumlu
	// authentication.model diye bir model olmadığı için login ve refresh i manuel yazdık
	// hazır tanımlı olan modelleri direkt çağırabiliyoruz
	//yeni proje yaptığımızda modelleri bu kısımda require edeceğiz
	//Definition olsa da olur olmasa da olur bir bölümmüş swagger için
	
	definitions: {
		"/auth/login": {
			username: {
				type: "String",
				required: true
			},
			password: {
				type: "String",
				required: true
			},
		},
		"/auth/refresh": {
			"token.refresh": {
				description: "{ token: { refresh: ... } }",
				type: "String",
				required: true
			}
		},
		// "Department": {
		// 	"name": {
		// 		type: "ObjectId",
		// 		required: true
		// 	}
		// },
		"Department": require('./src/models/department.model').schema.obj,
		"Personnel": require('./src/models/personnel.model').schema.obj,
	}
};

const routes = ['./index.js'] //sistem taramasına index.js den başla
const outputFile = './swagger.json' //sonuç olarak yazacağın json dosyası anadizindeki swagger.json dosyasıdır

// Create JSON file:
swaggerAutogen(outputFile, routes, document) //outputFile a, şu sırayla, document teki kurallara göre bilgileri yaz demek


// swaggerAutogen ı başlatmak için yeni terminal açtırdı, orda terminale node swaggerAutogen.js yazdırıp çalıştırdı
// bunu çalıştırınca ana dizinde 91 satırda belirtilen swagger.json isimli bir dosya oluşturuldu
// swagger a kaynağı artık oluşturduk artık sıra geldi görüntüleme kısmına
// swagger a bu json u kullan demeliyiz, swaggerUI, index.js de tanımlıyoruz bunu, oradan devam