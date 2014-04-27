/**
 * Instantiate the cache
 * @param cacheName
 * @param ttl - optional, in seconds
 *  if not set, 60s is set as defalut
 * @constructor
 */

ApiCache = function(cacheName, ttl) {
  this.localCache = new Meteor.Collection("cache_" + cacheName);
  // apply index for key
  this.localCache._ensureIndex( { "key": 1 });

  ttl = ttl || 60;
  // ensure key expiration
  this.localCache._ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: ttl });
};

/**
 * Set key and value to the cache
 * @param key
 * @param value
 */
ApiCache.prototype.set = function (key, value) {
  this.localCache.insert(
    {
      key: key,
      value: value,
      createdAt: new Date()
    }
  );
}

/**
 * Get value from the cache
 * @param key to search for
 * @returns found value
 *  or undefined if not found
 */
ApiCache.prototype.get = function (key) {
  var value = this.localCache.findOne({key: key}, {_id: false, value: true});
  if (value) {
    return value.value;
  }
  return value;
}

