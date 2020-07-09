

/**
 * Provides safe deep path access on objects. E.g.
 *
 * The path access: a.b.c.d.e.f could safely be performed on {}
 * and the function will return {}.
 *
 * @param {array} path - path segments
 * @param {object} object - object to perform access on
 * @returns {*} value at end of path or undefined
 */

module.exports = (path, object) => {
  let current = object;
  while (current && path.length > 0) {
    const nextSegment = path.shift();
    current = current[nextSegment];
  }
  return current;
};
