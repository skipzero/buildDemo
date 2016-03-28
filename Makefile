.PHONY: build run stop test clean lint js node_modules

LIB := ./node_modules
BIN := $(LIB)/.bin

all: build

build: node_modules build/js/main.js build/css/main.css build/index.html 

js: build/js/main.js

clean:
	npm cache clean
	-rm -R node_modules/

lint:
	$(BIN)/eslint --ext .js,.jsx src/

node_modules: package.json
	npm install

dist/:
	-mkdir build

dist/index.html: build/ src/index.html
	cp src/index.html build/index.html

dist/main.js: node_modules build/
	$(BIN)/webpack src/js/main.js build/js/main.js

test:
	$(BIN)/mocha -R nyan --compilers js:babel/register

