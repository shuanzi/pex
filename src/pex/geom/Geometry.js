// Generated by CoffeeScript 1.6.2
define(function(require) {
  var Color, Edge, Face3, Face4, Geometry, Vec2, Vec3, Vec4, elementSizeMap;

  Vec2 = require('pex/geom/Vec2');
  Vec3 = require('pex/geom/Vec3');
  Vec4 = require('pex/geom/Vec4');
  Edge = require('pex/geom/Edge');
  Face3 = require('pex/geom/Face3');
  Face4 = require('pex/geom/Face4');
  Color = require('pex/color/Color');
  elementSizeMap = {
    'Vec2': 2,
    'Vec3': 3,
    'Vec4': 4,
    'Color': 4
  };
  return Geometry = (function() {
    function Geometry(attribs) {
      var attrib, attribName, _ref, _ref1;

      this.faces = [];
      this.edges = [];
      this.attribs = attribs || {};
      _ref = this.attribs;
      for (attribName in _ref) {
        attrib = _ref[attribName];
        attrib.isDirty = true;
        attrib.elementSize = elementSizeMap[attrib.type];
        attrib.data = [];
        attrib.length = (_ref1 = attrib.length) != null ? _ref1 : 0;
      }
    }

    Geometry.prototype.allocate = function(numVertices) {
      var attrib, attribName, i, _ref, _results;

      _ref = this.attribs;
      _results = [];
      for (attribName in _ref) {
        attrib = _ref[attribName];
        attrib.length = numVertices;
        _results.push((function() {
          var _i, _ref1, _results1;

          _results1 = [];
          for (i = _i = 0, _ref1 = numVertices - 1; _i <= _ref1; i = _i += 1) {
            if (attrib.data[i] == null) {
              switch (attrib.type) {
                case 'Vec2':
                  _results1.push(attrib.data[i] = new Vec2());
                  break;
                case 'Vec3':
                  _results1.push(attrib.data[i] = new Vec3());
                  break;
                case 'Vec4':
                  _results1.push(attrib.data[i] = new Vec4());
                  break;
                case 'Color':
                  _results1.push(attrib.data[i] = new Color());
                  break;
                default:
                  _results1.push(void 0);
              }
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };

    Geometry.prototype.addEdge = function(a, b) {
      var ab, ba;

      if (!this.edges) {
        this.edges = [];
      }
      if (!this.edgeHash) {
        this.edgeHash = [];
      }
      ab = a + '_' + b;
      ba = a + '_' + a;
      if (!this.edgeHash[ab] && !this.edgeHash[ba]) {
        this.edges.push(new Edge(a, b));
        return this.edgeHash[ab] = this.edgeHash[ba] = true;
      }
    };

    Geometry.prototype.computeEdges = function() {
      var face, _i, _len, _ref, _results;

      _ref = this.faces;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        face = _ref[_i];
        if (face instanceof Face3) {
          this.addEdge(face.a, face.b);
          this.addEdge(face.b, face.c);
          this.addEdge(face.c, face.a);
        }
        if (face instanceof Face4) {
          this.addEdge(face.a, face.b);
          this.addEdge(face.b, face.c);
          this.addEdge(face.c, face.d);
          _results.push(this.addEdge(face.d, face.a));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Geometry;

  })();
});
