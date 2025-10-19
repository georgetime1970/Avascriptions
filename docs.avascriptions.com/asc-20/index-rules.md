# Index Rules

* Transaction data converted to text must start with "data:${mime-type}," or it won't be indexed. $mime-type can be left blank, e.g. "data:,".
* The first deployment of a ticker is the only one that has claim to the ticker.&#x20;
* Tickers are not case sensitive (aval = AVAL=Aval=....).
* The first mint to exceed the maximum supply will receive the fraction that is valid. (ex. 21,000,000 maximum supply, 20,999,242 circulating supply, and 1000 mint inscription = 758 balance state applied)
* Maximum supply cannot exceed uint64\_max
* Due to community consensus, the AVAL index data for aval will be entirely sourced from Dune's data.
