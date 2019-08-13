"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _ErrorList = _interopRequireDefault(require("./ErrorList"));

var _utils = require("../utils");

var _validate = _interopRequireWildcard(require("../validate"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys["default"])(object); if (_getOwnPropertySymbols["default"]) { var symbols = (0, _getOwnPropertySymbols["default"])(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor["default"])(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3["default"])(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors["default"]) { (0, _defineProperties["default"])(target, (0, _getOwnPropertyDescriptors["default"])(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2["default"])(target, key, (0, _getOwnPropertyDescriptor["default"])(source, key)); }); } } return target; }

var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Form, _Component);

  function Form(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Form);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Form).call(this, props));
    (0, _defineProperty3["default"])((0, _assertThisInitialized2["default"])(_this), "getUsedFormData", function (formData, fields) {
      //for the case of a single input form
      if (fields.length === 0 && (0, _typeof2["default"])(formData) !== "object") {
        return formData;
      }

      return (0, _pick2["default"])(formData, fields);
    });
    (0, _defineProperty3["default"])((0, _assertThisInitialized2["default"])(_this), "getFieldNames", function (pathSchema, formData) {
      var getAllPaths = function getAllPaths(_obj) {
        var acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        (0, _keys["default"])(_obj).forEach(function (key) {
          if ((0, _typeof2["default"])(_obj[key]) === "object") {
            if (!paths.length) {
              getAllPaths(_obj[key], acc, [key]);
            } else {
              var newPaths = [];
              paths.forEach(function (path) {
                newPaths.push(path);
              });
              newPaths = newPaths.map(function (path) {
                return "".concat(path, ".").concat(key);
              });
              getAllPaths(_obj[key], acc, newPaths);
            }
          } else if (key === "$name") {
            paths.forEach(function (path) {
              var formValue = (0, _get2["default"])(formData, path);

              if ((0, _typeof2["default"])(formValue) !== "object") {
                acc.push(path);
              }
            });
          }
        });
        return acc;
      };

      return getAllPaths(pathSchema);
    });
    (0, _defineProperty3["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (formData, newErrorSchema) {
      var setStateAndBackPropagate = function setStateAndBackPropagate(state) {
        (0, _utils.setState)((0, _assertThisInitialized2["default"])(_this), state, function () {
          if (state.formData && _this.props.onChange) {
            _this.props.onChange(_this.state);
          }
        });
      };

      if ((0, _utils.isObject)(formData) || (0, _isArray["default"])(formData)) {
        var newState = _this.getStateFromProps(_this.props, formData);

        formData = newState.formData;
      }

      var mustValidate = !_this.props.noValidate && _this.props.liveValidate;
      var state = {
        formData: formData
      };
      var newFormData = formData;

      if (_this.props.omitExtraData === true && _this.props.liveOmit === true) {
        var _newState = _this.getStateFromProps(_this.props, formData);

        var fieldNames = _this.getFieldNames(_newState.pathSchema, _newState.formData);

        newFormData = _this.getUsedFormData(formData, fieldNames);
        state = {
          formData: newFormData
        };
      }

      if (mustValidate) {
        _this.validate(newFormData).then(function (stateError) {
          return setStateAndBackPropagate(_objectSpread({}, state, {}, stateError));
        });
      } else if (!_this.props.noValidate && newErrorSchema) {
        state = {
          formData: newFormData,
          errorSchema: newErrorSchema,
          errors: (0, _validate.toErrorList)(newErrorSchema)
        };
        setStateAndBackPropagate(state);
      } else {
        setStateAndBackPropagate(state);
      }
    });
    (0, _defineProperty3["default"])((0, _assertThisInitialized2["default"])(_this), "onBlur", function () {
      if (_this.props.onBlur) {
        var _this$props;

        (_this$props = _this.props).onBlur.apply(_this$props, arguments);
      }
    });
    (0, _defineProperty3["default"])((0, _assertThisInitialized2["default"])(_this), "onFocus", function () {
      if (_this.props.onFocus) {
        var _this$props2;

        (_this$props2 = _this.props).onFocus.apply(_this$props2, arguments);
      }
    });
    (0, _defineProperty3["default"])((0, _assertThisInitialized2["default"])(_this), "onSubmit", function (event) {
      event.preventDefault();

      if (event.target !== event.currentTarget) {
        return;
      }

      event.persist();
      var newFormData = _this.state.formData;
      var pathSchema = _this.state.pathSchema;

      if (_this.props.omitExtraData === true) {
        var fieldNames = _this.getFieldNames(pathSchema, _this.state.formData);

        newFormData = _this.getUsedFormData(_this.state.formData, fieldNames);
      }

      var onValidationOK = function onValidationOK() {
        _this.setState({
          formData: newFormData,
          errors: [],
          errorSchema: {}
        }, function () {
          if (_this.props.onSubmit) {
            _this.props.onSubmit(_objectSpread({}, _this.state, {
              formData: newFormData,
              status: "submitted"
            }), event);
          }
        });
      };

      if (!_this.props.noValidate) {
        _this.validate(newFormData).then(function (_ref) {
          var errors = _ref.errors,
              errorSchema = _ref.errorSchema;

          if ((0, _keys["default"])(errors).length > 0) {
            (0, _utils.setState)((0, _assertThisInitialized2["default"])(_this), {
              errors: errors,
              errorSchema: errorSchema
            }, function () {
              if (_this.props.onError) {
                _this.props.onError(errors);
              } else {
                console.error("Form validation failed", errors);
              }
            });
          } else {
            onValidationOK();
          }
        });
      } else {
        onValidationOK();
      }
    });
    _this.state = _this.getStateFromProps(props, props.formData);

    if (_this.props.onChange && !(0, _utils.deepEquals)(_this.state.formData, _this.props.formData)) {
      _this.props.onChange(_this.state);
    }

    _this.formElement = null;
    return _this;
  }

  (0, _createClass2["default"])(Form, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextState = this.getStateFromProps(nextProps, nextProps.formData);

      if (!(0, _utils.deepEquals)(nextState.formData, nextProps.formData) && !(0, _utils.deepEquals)(nextState.formData, this.state.formData) && this.props.onChange) {
        this.props.onChange(nextState);
      }

      this.setState(nextState);
    }
  }, {
    key: "getStateFromProps",
    value: function getStateFromProps(props, inputFormData) {
      var state = this.state || {};
      var schema = "schema" in props ? props.schema : this.props.schema;
      var uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
      var edit = typeof inputFormData !== "undefined";
      var liveValidate = props.liveValidate || this.props.liveValidate;
      var mustValidate = edit && !props.noValidate && liveValidate;
      var definitions = schema.definitions;
      var formData = (0, _utils.getDefaultFormState)(schema, inputFormData, definitions);
      var retrievedSchema = (0, _utils.retrieveSchema)(schema, definitions, formData);
      var customFormats = props.customFormats;
      var additionalMetaSchemas = props.additionalMetaSchemas;

      var _ref2 = mustValidate ? this.validate(formData, schema, additionalMetaSchemas, customFormats) : {
        errors: state.errors || [],
        errorSchema: state.errorSchema || {}
      },
          errors = _ref2.errors,
          errorSchema = _ref2.errorSchema;

      var idSchema = (0, _utils.toIdSchema)(retrievedSchema, uiSchema["ui:rootFieldId"], definitions, formData, props.idPrefix);
      var pathSchema = (0, _utils.toPathSchema)(retrievedSchema, "", definitions, formData);
      return {
        schema: schema,
        uiSchema: uiSchema,
        idSchema: idSchema,
        formData: formData,
        edit: edit,
        errors: errors,
        errorSchema: errorSchema,
        additionalMetaSchemas: additionalMetaSchemas,
        pathSchema: pathSchema
      };
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "validate",
    value: function validate(formData) {
      var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.schema;
      var additionalMetaSchemas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.additionalMetaSchemas;
      var customFormats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.props.customFormats;
      var _this$props3 = this.props,
          validate = _this$props3.validate,
          transformErrors = _this$props3.transformErrors;

      var _this$getRegistry = this.getRegistry(),
          definitions = _this$getRegistry.definitions;

      var resolvedSchema = (0, _utils.retrieveSchema)(schema, definitions, formData);
      return (0, _validate["default"])(formData, resolvedSchema, validate, transformErrors, additionalMetaSchemas, customFormats);
    }
  }, {
    key: "renderErrors",
    value: function renderErrors() {
      var _this$state = this.state,
          errors = _this$state.errors,
          errorSchema = _this$state.errorSchema,
          schema = _this$state.schema,
          uiSchema = _this$state.uiSchema;
      var _this$props4 = this.props,
          ErrorList = _this$props4.ErrorList,
          showErrorList = _this$props4.showErrorList,
          formContext = _this$props4.formContext;

      if (errors && errors.length && showErrorList != false) {
        return _react["default"].createElement(ErrorList, {
          errors: errors,
          errorSchema: errorSchema,
          schema: schema,
          uiSchema: uiSchema,
          formContext: formContext
        });
      }

      return null;
    }
  }, {
    key: "getRegistry",
    value: function getRegistry() {
      // For BC, accept passed SchemaField and TitleField props and pass them to
      // the "fields" registry one.
      var _getDefaultRegistry = (0, _utils.getDefaultRegistry)(),
          fields = _getDefaultRegistry.fields,
          widgets = _getDefaultRegistry.widgets;

      return {
        fields: _objectSpread({}, fields, {}, this.props.fields),
        widgets: _objectSpread({}, widgets, {}, this.props.widgets),
        ArrayFieldTemplate: this.props.ArrayFieldTemplate,
        ObjectFieldTemplate: this.props.ObjectFieldTemplate,
        FieldTemplate: this.props.FieldTemplate,
        definitions: this.props.schema.definitions || {},
        formContext: this.props.formContext || {}
      };
    }
  }, {
    key: "submit",
    value: function submit() {
      if (this.formElement) {
        this.formElement.dispatchEvent(new Event("submit", {
          cancelable: true
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          children = _this$props5.children,
          safeRenderCompletion = _this$props5.safeRenderCompletion,
          id = _this$props5.id,
          idPrefix = _this$props5.idPrefix,
          className = _this$props5.className,
          tagName = _this$props5.tagName,
          name = _this$props5.name,
          method = _this$props5.method,
          target = _this$props5.target,
          action = _this$props5.action,
          autocomplete = _this$props5.autocomplete,
          enctype = _this$props5.enctype,
          acceptcharset = _this$props5.acceptcharset,
          noHtml5Validate = _this$props5.noHtml5Validate,
          disabled = _this$props5.disabled,
          formContext = _this$props5.formContext;
      var _this$state2 = this.state,
          schema = _this$state2.schema,
          uiSchema = _this$state2.uiSchema,
          formData = _this$state2.formData,
          errorSchema = _this$state2.errorSchema,
          idSchema = _this$state2.idSchema;
      var registry = this.getRegistry();
      var _SchemaField = registry.fields.SchemaField;
      var FormTag = tagName ? tagName : "form";
      return _react["default"].createElement(FormTag, {
        className: className ? className : "rjsf",
        id: id,
        name: name,
        method: method,
        target: target,
        action: action,
        autoComplete: autocomplete,
        encType: enctype,
        acceptCharset: acceptcharset,
        noValidate: noHtml5Validate,
        onSubmit: this.onSubmit,
        ref: function ref(form) {
          _this2.formElement = form;
        }
      }, this.renderErrors(), _react["default"].createElement(_SchemaField, {
        schema: schema,
        uiSchema: uiSchema,
        errorSchema: errorSchema,
        idSchema: idSchema,
        idPrefix: idPrefix,
        formContext: formContext,
        formData: formData,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        registry: registry,
        safeRenderCompletion: safeRenderCompletion,
        disabled: disabled
      }), children ? children : _react["default"].createElement("div", null, _react["default"].createElement("button", {
        type: "submit",
        className: "btn btn-info"
      }, "Submit")));
    }
  }]);
  return Form;
}(_react.Component);

exports["default"] = Form;
(0, _defineProperty3["default"])(Form, "defaultProps", {
  uiSchema: {},
  noValidate: false,
  liveValidate: false,
  disabled: false,
  safeRenderCompletion: false,
  noHtml5Validate: false,
  ErrorList: _ErrorList["default"],
  omitExtraData: false
});

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    uiSchema: _propTypes["default"].object,
    formData: _propTypes["default"].any,
    widgets: _propTypes["default"].objectOf(_propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object])),
    fields: _propTypes["default"].objectOf(_propTypes["default"].func),
    ArrayFieldTemplate: _propTypes["default"].func,
    ObjectFieldTemplate: _propTypes["default"].func,
    FieldTemplate: _propTypes["default"].func,
    ErrorList: _propTypes["default"].func,
    onChange: _propTypes["default"].func,
    onError: _propTypes["default"].func,
    showErrorList: _propTypes["default"].bool,
    onSubmit: _propTypes["default"].func,
    id: _propTypes["default"].string,
    className: _propTypes["default"].string,
    tagName: _propTypes["default"].string,
    name: _propTypes["default"].string,
    method: _propTypes["default"].string,
    target: _propTypes["default"].string,
    action: _propTypes["default"].string,
    autocomplete: _propTypes["default"].string,
    enctype: _propTypes["default"].string,
    acceptcharset: _propTypes["default"].string,
    noValidate: _propTypes["default"].bool,
    noHtml5Validate: _propTypes["default"].bool,
    liveValidate: _propTypes["default"].bool,
    validate: _propTypes["default"].func,
    transformErrors: _propTypes["default"].func,
    safeRenderCompletion: _propTypes["default"].bool,
    formContext: _propTypes["default"].object,
    customFormats: _propTypes["default"].object,
    additionalMetaSchemas: _propTypes["default"].arrayOf(_propTypes["default"].object),
    omitExtraData: _propTypes["default"].bool
  };
}