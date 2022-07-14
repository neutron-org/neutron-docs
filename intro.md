# Документация по neutron.

## Что есть нейтрон и для чего нужен.
нейтрон это сеть приносящая в семью космос блокчейнов wasm смартконтракты. Нейтрон работает с сетями про протоколу ibc. Безопасность нейтрона(валидация блоков) обеспечивается сетью cosmos-hub при помощи interchain security
*Тут у нас схема сетей*

## Как работает нейтрон
Проект нейтрон состоит из 3х основных компонентов(узлов): 
- неопсредственно сеть neutron(cosmos-sdk based), отвечающая за работу смарт контрактов.
- ibc message relayer - hermes - публикация транзакций на клиентской сети и пересылка ответов от транзакций обратно в сеть neutron
- ibc query relayer - интерчейн запросы
*Снова схема, но уже схема самой сети тейтрона и вспомогательных узлов*
### немного о ICA
### IBC transfers
Трансферы нативных монет между сетями соедененными по ibc. Когда мы посылаем некоторое количество монет из сети A(например 10stake) в сеть B. Модуль ibc лочит у себя 10stake на сети A, и выпускает 10ibc/LONGHASHNAME на сети B и посылает их на целевой адрес, которые и являются представлением 10stake из сети A. При пересылке  10ibc/LONGHASHNAME обратно на сеть A. В сети B уничтожаются 10ibc/LONGHASHNAME, в сети A разлочиваются 10stake и посылаются на целевой адрес.
### IBC transactions
ICA позволяет выполнить проивольную транзакцию на удаленной сети(B) инициированую из локальной сети(A)
### Про Ack and sudo
Тут детально расписать про эти вещи со схемами типов данных
### Избавление от starport и свои хэндлеры msg и custom query
### IBQ query
IQ позволяют "делать" query запросы на удаленной сети
#### query relayer
В настойщий момент схема работы реелра следующая. 
На сети neutron регистрируется query, данные с которой мы хотим получать. С некоторой переодичностью релеер запрашивает данные этой query с клиенткой сети и публикует эти данные(с доказательствами действительности) на сети neutron. В любой момент пользователь может запросить данные по query вместе с высотой блока на котором данные были обновлены.
##### типы поддерживаемых(которые можно зарегистировать) query 
- Баланс
- Тразакции
- Заделегированное

##### работа с iq
Регистрация query происходит при помощи публикации сообщения
```
message MsgRegisterInterchainQuery {
  string query_data = 1; // JSON encoded data of query
  string query_type = 2; // is used to identify the query (i.e. /cosmos.staking.v1beta1.Query/AllDelegations)
  string zone_id = 3; // is used to identify the chain of interest
  string connection_id = 4; // is IBC connection ID for getting ConsensusState to verify proofs
  uint64 update_period = 5; // is used to say how often the query must be updated
  string sender = 6; // is the signer of the message
}
```
Сообщение можно послать как через rpc/rest интерфейс, так и из командной строки
```
./build/neutrond tx interchainqueries register-interchain-query test-2 connection-0 x/staking/DelegatorDelegations '{"delegator": "neutron10h9stc5v6ntgeygf5xf945njqq5h32r54rf7kf"}' 1  --chain-id test-1
```
будет зарегистрирована query для сети `test-2`
Каждый блок icq relayer будет запрашивать данные по query на сети `test-2` и публиковать ответ вместе с доказательствавми(merle proof) на сети `test-1`
Плучить список всех зарегистрированных query можно командой
`neutrond q interchainqueries registered-queries`
или же через rpc/rest сообщением 
```
message QueryRegisteredQueryRequest {
  uint64 query_id = 1;
}
```

Получить результат query можно одним из двух способов.
- `neutrond q interchainqueries query-transactions-search-result 1 1 100` для получения результата на query типа "список транзакций"
- `neutrond q interchainqueries query-result <query_id>` для всех остальных query

*Пройтись по остальным запросам/сообщениям iq* с описание структуры сообщений


## wasm
### наша библиотека с sudo хелперами и кастомными query/msg