language: node_js

node_js:
  - "stable"

sudo: false

script:
  - npm run lint
  
branches:
  only:
    - master
