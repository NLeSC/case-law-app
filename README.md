[![Build Status](https://travis-ci.org/NLeSC/case-law-app.svg?branch=master)](https://travis-ci.org/NLeSC/case-law-app)
[![DOI](https://zenodo.org/badge/79349354.svg)](https://zenodo.org/badge/latestdoi/79349354)

# Network visualization for Case Law Analytics
The visualization is shown at [https://nlesc.github.io/case-law-app/](https://nlesc.github.io/case-law-app/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

If you use this software or the online tool, please acknowledge by citing the DOI.

## Installation
Clone the github repository:

`git clone https://github.com/NLeSC/case-law-app` 

Cd to the `case-law-app` directory and run:

`npm install`

To run the application:

`npm start`

To deploy the application to gh-pages (using [gh-pages](https://www.npmjs.com/package/gh-pages)):

`npm run deploy`


## Data format
It is possible to upload a json file with a network to the visualization. This json file can be created with the [caselawnet Python application](https://github.com/NLeSC/CaseLawAnalytics). 

### Specification
This should be the structure of the JSON file (containing one example node):

```
{
  "nodes":[
    {
      "id": "http://deeplink.rechtspraak.nl/uitspraak?id=ECLI:NL:HR:2000:AA5634",
      "ecli": "ECLI:NL:HR:2000:AA5634",
      "title": "ECLI:NL:HR:2000:AA5634 Hoge Raad , 28-04-2000 / C98/220HR",
      "date": "2000-04-28",
      "year": 2000,
      "abstract": "-",
      "creator": "http://standaarden.overheid.nl/owms/terms/Hoge_Raad_der_Nederlanden",
      "subject": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht",
      "count_version": 5,
      "count_annotation": 2,
      "articles": ["Onteigeningswet 73"],
      "degree": 1,
      "degree_centrality": 0.0064516129032258064,
      "in_degree": 0,
      "in_degree_centrality": 0.0,
      "rel_in_degree": 0.0,
      "out_degree": 1,
      "out_degree_centrality": 0.0064516129032258064,
      "closeness_centrality": 0.012903225806451613,
      "betweenness_centrality": 0.0,
      "pagerank": 0.0038386703423328333,
      "hubs": 4.528120703550719e-97,
      "authorities": 0.0,
      "community": "1",
      "x": 0.4335141987424399,
      "y": 0.8291632847446144,
    },
    ...
  ],
  
  "links":[
    {
      "id": ..,
      "source": "http://deeplink.rechtspraak.nl/uitspraak?id=ECLI:NL:HR:2000:AA5634",
      "target": ..
    },
    ...
  ]
}
```

Documentation of the node attributes:
* Identifying attributes:
  * **id**: Unique identifier of the node. Preferably an URL that is visitable.
  * **ecli** European Case Law identifier
* Meta information of the law case:
  * **title**: Full title
  * **date**: Date of the case
  * **year**: Year of the case 
  * **abstract**: Abstract of the case
  * **creator**: Creator of the doument
  * **subject**: Subject of the case
  * **count_version**: number of published versions
  * **count_annotation**: number of published versions with annotations
  * **articles**: Law articles references by this case
* Network statistics (_optional_) (See [caselawnet.network_analysis](https://github.com/NLeSC/CaseLawAnalytics/blob/master/caselawnet/network_analysis.py)) 
  * **degree**
  * **degree_centrality**
  * **in_degree**
  * **in_degree_centrality**
  * **rel_in_degree**
  * **out_degree**
  * **out_degree_centrality**
  * **closeness_centrality**
  * **betweenness_centrality**
  * **pagerank**
  * **hubs**
  * **authorities**
  * **community**: Louvain community
* Other attributes:
  * **x** (_optional_): Initial x-position of the node in the visualizaion (to ensure consistent layout)
  * **y** (_optional_): Initial y-position of the node in the visualization (to ensure consistent layout)
  
 Documentation of the link attributes:
 * **id**: Unique identifier of the link. This could be a concatenation of source and target
 * **source**: _id_ value of the source node
 * **source**: _id_ value of the target node
   
