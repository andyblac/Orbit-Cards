//#region src/version.js
var e = "1.1.0", t = {
	area: "1.0.0",
	status: "1.0.0",
	action: "1.0.0",
	deck: "1.0.0",
	statusBadge: "0.5.0"
}, n = "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", r = "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;";
function i(e, t) {
	console.info(`%c ${e} %c v${t} `, n, r);
}
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var a = globalThis, o = a.ShadowRoot && (a.ShadyCSS === void 0 || a.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), c = /* @__PURE__ */ new WeakMap(), l = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (o && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = c.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && c.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, u = (e) => new l(typeof e == "string" ? e : e + "", void 0, s), d = (e, ...t) => new l(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, s), f = (e, t) => {
	if (o) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = a.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, p = o ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return u(t);
})(e) : e, { is: m, defineProperty: ee, getOwnPropertyDescriptor: te, getOwnPropertyNames: ne, getOwnPropertySymbols: re, getPrototypeOf: ie } = Object, h = globalThis, g = h.trustedTypes, ae = g ? g.emptyScript : "", oe = h.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ae : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, y = (e, t) => !m(e, t), se = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: y
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = se) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && ee(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = te(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? se;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = ie(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(_("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
			let e = this.properties, t = [...ne(e), ...re(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(p(e));
		} else e !== void 0 && t.push(p(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return f(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? v : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? v : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? y)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[_("elementProperties")] = /* @__PURE__ */ new Map(), b[_("finalized")] = /* @__PURE__ */ new Map(), oe?.({ ReactiveElement: b }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ce = globalThis, le = (e) => e, ue = ce.trustedTypes, de = ue ? ue.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, fe = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + x, me = `<${pe}>`, S = document, he = () => S.createComment(""), ge = (e) => e === null || typeof e != "object" && typeof e != "function", _e = Array.isArray, ve = (e) => _e(e) || typeof e?.[Symbol.iterator] == "function", ye = "[ 	\n\f\r]", be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, Se = />/g, C = RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Ce = /'/g, we = /"/g, Te = /^(?:script|style|textarea|title)$/i, w = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Ee = /* @__PURE__ */ new WeakMap(), D = S.createTreeWalker(S, 129);
function De(e, t) {
	if (!_e(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return de === void 0 ? t : de.createHTML(t);
}
var Oe = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = be;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === be ? c[1] === "!--" ? o = xe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = C) : (Te.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = C) : o = Se : o === C ? c[0] === ">" ? (o = i ?? be, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? C : c[3] === "\"" ? we : Ce) : o === we || o === Ce ? o = C : o === xe || o === Se ? o = be : (o = C, i = void 0);
		let d = o === C && e[t + 1].startsWith("/>") ? " " : "";
		a += o === be ? n + me : l >= 0 ? (r.push(s), n.slice(0, l) + fe + n.slice(l) + x + d) : n + x + (l === -2 ? t : d);
	}
	return [De(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, ke = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Oe(t, n);
		if (this.el = e.createElement(l, r), D.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = D.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(fe)) {
					let t = u[o++], n = i.getAttribute(e).split(x), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ne : r[1] === "?" ? Pe : r[1] === "@" ? Fe : Me
					}), i.removeAttribute(e);
				} else e.startsWith(x) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Te.test(i.tagName)) {
					let e = i.textContent.split(x), t = e.length - 1;
					if (t > 0) {
						i.textContent = ue ? ue.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], he()), D.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], he());
					}
				}
			} else if (i.nodeType === 8) if (i.data === pe) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(x, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += x.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = S.createElement("template");
		return n.innerHTML = e, n;
	}
};
function O(e, t, n = e, r) {
	if (t === T) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ge(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = O(e, i._$AS(e, t.values), i, r)), t;
}
var Ae = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? S).importNode(t, !0);
		D.currentNode = r;
		let i = D.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new je(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ie(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = D.nextNode(), a++);
		}
		return D.currentNode = S, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, je = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = O(this, e, t), ge(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== T && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ve(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== E && ge(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ke.createElement(De(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ae(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ee.get(e.strings);
		return t === void 0 && Ee.set(e.strings, t = new ke(e)), t;
	}
	k(t) {
		_e(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(he()), this.O(he()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = le(e).nextSibling;
			le(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Me = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = E;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = O(this, e, t, 0), a = !ge(e) || e !== this._$AH && e !== T, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = O(this, r[n + o], t, o), s === T && (s = this._$AH[o]), a ||= !ge(s) || s !== this._$AH[o], s === E ? e = E : e !== E && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ne = class extends Me {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === E ? void 0 : e;
	}
}, Pe = class extends Me {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== E);
	}
}, Fe = class extends Me {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = O(this, e, t, 0) ?? E) === T) return;
		let n = this._$AH, r = e === E && n !== E || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== E && (n === E || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ie = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		O(this, e);
	}
}, Le = {
	M: fe,
	P: x,
	A: pe,
	C: 1,
	L: Oe,
	R: Ae,
	D: ve,
	V: O,
	I: je,
	H: Me,
	N: Pe,
	U: Fe,
	B: Ne,
	F: Ie
}, Re = ce.litHtmlPolyfillSupport;
Re?.(ke, je), (ce.litHtmlVersions ??= []).push("3.3.3");
var ze = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new je(t.insertBefore(he(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Be = globalThis, k = class extends b {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return T;
	}
};
k._$litElement$ = !0, k.finalized = !0, Be.litElementHydrateSupport?.({ LitElement: k });
var Ve = Be.litElementPolyfillSupport;
Ve?.({ LitElement: k }), (Be.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/common/helpers/actions.js
function He(e, t = null) {
	if (!(!e || !this.hass)) switch (e.action || "toggle") {
		case "toggle": {
			if (!t) return;
			let e = t.split(".")[0];
			this.hass.callService(e, "toggle", { entity_id: t });
			break;
		}
		case "more-info": {
			let n = e.entity || e.entity_id || t;
			this.dispatchEvent(new CustomEvent("hass-more-info", {
				detail: { entityId: n },
				bubbles: !0,
				composed: !0
			}));
			break;
		}
		case "navigate":
			this._navigate(e.navigation_path);
			break;
		case "url":
			if (!e.url_path) return;
			window.open(e.url_path, "_blank", "noopener,noreferrer");
			break;
		case "perform-action":
		case "call-service": {
			let [t, n] = (e.perform_action || e.service || "").split(".");
			if (!t || !n) return;
			this.hass.callService(t, n, e.data || e.service_data || {}, e.target);
			break;
		}
		case "fire-dom-event":
			this.dispatchEvent(new CustomEvent("ll-custom", {
				detail: { browser_mod: e.browser_mod },
				bubbles: !0,
				composed: !0
			}));
			break;
		case "popup": {
			let t = e.popup_title || e.title || " ", n = e.popup_content || e.content;
			if (!n) return;
			let r = Ge(e, t, n);
			this.dispatchEvent(new CustomEvent("ll-custom", {
				detail: { browser_mod: {
					service: "browser_mod.popup",
					data: r
				} },
				bubbles: !0,
				composed: !0
			}));
			break;
		}
		default: break;
	}
}
function A(e) {
	return !!(e?.action && e.action !== "none");
}
function j(e) {
	let t = e;
	for (; t;) {
		let e = t.localName || "";
		if (e === "hui-card-picker" || e === "hui-dialog-add-card" || e === "hui-card-picker-card") return !0;
		let n = t.getRootNode?.();
		t = t.parentElement || (n instanceof ShadowRoot ? n.host : null);
	}
	return !1;
}
function M(e, t, n, r) {
	if (!j(this)) {
		if (We(e), this._clearDoubleTapTimer?.(), A(r)) {
			this._doubleTapTimer = setTimeout(() => {
				this._doubleTapTimer = null, this._handleAction(n, t);
			}, 250);
			return;
		}
		this._handleAction(n, t);
	}
}
function N(e, t, n) {
	j(this) || (We(e), this._clearDoubleTapTimer?.(), A(n) && this._handleAction(n, t));
}
function Ue() {
	this._doubleTapTimer &&= (clearTimeout(this._doubleTapTimer), null);
}
function We(e) {
	e?.preventDefault?.(), e?.stopPropagation?.(), e?.stopImmediatePropagation && e.stopImmediatePropagation();
}
function Ge(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function Ke(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function qe(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function Je(e) {
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	M.call(this, e, t, n, r);
}
function Ye(e) {
	N.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Xe(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	M.call(this, e, t, n, r);
}
function Ze(e) {
	N.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Qe(e) {
	if (!j(this)) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return et.call(this, e);
		M.call(this, e, this._config.main_entity || this._config.entity, nt(this._config), this._config.double_tap_action);
	}
}
function $e(e) {
	if (!j(this)) {
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return tt.call(this, e);
		N.call(this, e, this._config.main_entity || this._config.entity, this._config.double_tap_action);
	}
}
function et(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		M.call(this, e, null, nt(this._config), this._config.double_tap_action);
		return;
	}
	M.call(this, e, t, rt(this._config), this._config.main_entity_double_tap_action);
}
function tt(e) {
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		N.call(this, e, null, this._config.double_tap_action);
		return;
	}
	N.call(this, e, t, this._config.main_entity_double_tap_action);
}
function nt(e = {}) {
	return e.tap_action?.action ? e.tap_action : {
		action: "navigate",
		navigation_path: e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function rt(e = {}) {
	return e.main_entity_tap_action?.action === "none" ? nt(e) : e.main_entity_tap_action || { action: "more-info" };
}
//#endregion
//#region src/common/helpers/colors.js
function it(e) {
	if (!e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return _t(t) ? t : ct(t);
}
function at(e) {
	if (!e) return "rgba(var(--color-theme), 0.3)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.3)" : gt(t, 70);
}
function ot(e) {
	if (!e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.05)" : gt(t, 20);
}
function st(e) {
	return e ? gt(e.toString().trim(), 25) : "rgba(var(--color-theme), 0.25)";
}
function ct(e) {
	let t = vt(e);
	if (!t) return "rgb(var(--color-theme))";
	if (t === "light") return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
	let n = ft(t);
	return lt(t) ? n ? `rgb(var(--${n}))` : `var(--${t}-color, var(--${t}, rgb(var(--color-theme))))` : t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))`;
}
function lt(e) {
	return ut.has(vt(e));
}
var ut = new Set([
	"red",
	"pink",
	"purple",
	"deep-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"teal",
	"green",
	"light-green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deep-orange",
	"brown",
	"light-grey",
	"grey",
	"dark-grey",
	"blue-grey",
	"black",
	"white",
	"disabled"
]);
function dt(e) {
	return !!ft(e);
}
function ft(e) {
	let t = vt(e);
	return t && pt(t).find(ht) || "";
}
function pt(e) {
	let t = e.startsWith("color-") ? e.slice(6) : e, n = mt[t] || [];
	return [`color-${t}`, ...n.map((e) => `color-${e}`)];
}
var mt = {
	"blue-grey": ["bluegrey"],
	"dark-grey": ["darkgrey"],
	"deep-orange": ["deeporange"],
	"deep-purple": ["deeppurple"],
	"light-blue": ["lightblue"],
	"light-green": ["lightgreen"],
	"light-grey": ["lightgrey"]
};
function ht(e) {
	return typeof document > "u" ? !1 : [document.documentElement, document.body].filter(Boolean).some((t) => getComputedStyle(t).getPropertyValue(`--${e}`).trim());
}
function gt(e, t) {
	let n = e.toString().trim();
	return `color-mix(in srgb, transparent, ${_t(n) ? n : ct(n)} ${t}%)`;
}
function _t(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function vt(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
//#endregion
//#region src/common/helpers/card-name.js
function yt(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.area_name) return bt(e.area_name, e, t, n);
	if (e.room_name) return bt(e.room_name, e, t, n);
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
function bt(e, t, n, r = "") {
	return typeof e == "string" ? e : (Array.isArray(e) ? e : [e]).map((e) => xt(e, t, n, r)).filter(Boolean).join(" ");
}
function xt(e, t, n, r) {
	if (!e) return "";
	if (typeof e == "string") return e;
	if (e.type === "text") return e.text || "";
	if (e.type === "area") return St(t, n) || "";
	if (e.type === "floor") return Ct(t, n) || "";
	let i = wt(t, n);
	return i && typeof n?.formatEntityName == "function" ? n.formatEntityName(i, { type: e.type }) || "" : e.type === "entity" && (i?.attributes?.friendly_name || i?.entity_id) || "";
}
function St(e, t) {
	let n = e.area;
	if (n && t?.areas?.[n]) return t.areas[n].name || "";
	let r = wt(e, t);
	return r && typeof t?.formatEntityName == "function" ? t.formatEntityName(r, { type: "area" }) : "";
}
function Ct(e, t) {
	let n = e.area, r = n && t?.areas?.[n] ? t.areas[n].floor_id : "";
	if (r && t?.floors?.[r]) return t.floors[r].name || "";
	let i = wt(e, t);
	return i && typeof t?.formatEntityName == "function" ? t.formatEntityName(i, { type: "floor" }) : "";
}
function wt(e, t) {
	let n = e.main_entity || e.entity || "";
	return n && t?.states ? t.states[n] : null;
}
//#endregion
//#region src/common/helpers/documentation.js
var Tt = "https://github.com/andyblac/Orbit-Cards/wiki", Et = {
	"orbit-area-card": {
		default: "Area-Card",
		card: "Area-Card#main-layout",
		status: "Area-Card#status-row",
		buttons: "Area-Card#side-buttons",
		curve: "Area-Card#curved-buttons",
		action: "Area-Card#action-button"
	},
	"orbit-room-card": {
		default: "Area-Card",
		card: "Area-Card#main-layout",
		status: "Area-Card#status-row",
		buttons: "Area-Card#side-buttons",
		curve: "Area-Card#curved-buttons",
		action: "Area-Card#action-button"
	},
	"orbit-status-card": { default: "Status-Card" },
	"orbit-action-card": { default: "Action-Card" },
	"orbit-deck-card": {
		default: "Deck-Card",
		"setup-wrap": "Deck-Card#wrap-layout",
		"setup-tabs": "Deck-Card#tabs-layout",
		"setup-overlay": "Deck-Card#overlay-layout",
		card: "Deck-Card#deck-items"
	}
};
function Dt(e = "") {
	return e.replace(/^custom:/, "");
}
function Ot(e, t = "default") {
	let n = Et[Dt(e)], r = n?.[t] || n?.default;
	return r ? `${Tt}/${r}` : `${Tt}`;
}
function kt(e, t, n = "default") {
	let r = Ot(t, n);
	queueMicrotask(() => {
		let t = At(e, "hui-dialog-edit-card") || At(e, "hui-dialog-edit-badge");
		!t || t._documentationURL === r || (t._documentationURL = r, t.requestUpdate?.());
	});
}
function At(e, t) {
	let n = e;
	for (; n;) {
		if (n.localName === t) return n;
		let e = n.getRootNode?.();
		n = n.parentElement || e?.host || null;
	}
	return null;
}
//#endregion
//#region src/common/helpers/card-registration.js
function jt({ tag: e, cardClass: t, name: n, description: r, version: a, getEntitySuggestion: o, documentationURL: s, aliases: c = [] }) {
	customElements.get(e) || customElements.define(e, t), c.forEach((e) => {
		customElements.get(e.tag) || customElements.define(e.tag, e.cardClass || t);
	});
	let l = new Set([e, ...c.map((e) => e.tag)]);
	window.customCards = window.customCards || [];
	for (let e = window.customCards.length - 1; e >= 0; --e) l.has(window.customCards[e].type) && window.customCards.splice(e, 1);
	window.customCards.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		version: a,
		documentationURL: s || Ot(e),
		getEntitySuggestion: o
	}), i(n, a);
}
//#endregion
//#region src/common/helpers/templates.js
var Mt = "__ORBIT_TEMPLATE_RESULT_START_8C4F2A__", Nt = "__ORBIT_TEMPLATE_RESULT_END_8C4F2A__";
function Pt(e) {
	if (typeof e != "string") return e;
	let t = e.trim();
	return !t || Ft(t) ? e : `{{ ${t} }}`;
}
function Ft(e) {
	return /{{|{%|{#/.test(e || "");
}
function It(e = []) {
	let t = this.hass?.connection;
	if (!this.isConnected || !t?.subscribeMessage) {
		Lt.call(this);
		return;
	}
	let n = Ht(this), r = Gt(this._config || {}), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = Pt(t?.template || "")?.trim();
		if (!e) continue;
		let n = t?.entityId || "", a = Ut(e, n);
		i.set(a, {
			id: a,
			template: e,
			entityId: n,
			configSignature: r
		});
	}
	for (let [e, t] of n) {
		let r = i.get(e);
		(!r || r.configSignature !== t.configSignature) && (Wt(t), n.delete(e));
	}
	for (let e of i.values()) n.has(e.id) || Bt.call(this, e);
}
function Lt() {
	let e = this.__orbitTemplateSubscriptions;
	if (e) {
		for (let t of e.values()) Wt(t);
		e.clear();
	}
}
function P(e, t = "") {
	if (!e) return null;
	let n = Pt(e)?.trim();
	return this.__orbitTemplateSubscriptions?.get(Ut(n, t))?.result ?? null;
}
function Rt(e, t = "") {
	if (!e) return "";
	let n = Pt(e)?.trim();
	return this.__orbitTemplateSubscriptions?.get(Ut(n, t))?.error || "";
}
function zt(e) {
	let t = String(e ?? "").trim().toLowerCase();
	if (!t || [
		"false",
		"off",
		"no",
		"none",
		"null",
		"unknown",
		"unavailable"
	].includes(t)) return !1;
	let n = Number(t);
	return Number.isFinite(n) ? n !== 0 : !0;
}
function Bt(e) {
	let t = Ht(this), { id: n, template: r, entityId: i, configSignature: a } = e, o = {
		configSignature: a,
		result: null,
		error: "",
		subscription: void 0
	};
	t.set(n, o);
	let s = [
		"{% set entity = states[orbit_entity_id] if orbit_entity_id else none %}",
		Mt,
		r,
		Nt
	].join(""), c = this.hass.connection.subscribeMessage((e) => {
		t.get(n) === o && ("error" in e ? (o.error = Kt(e.error), o.result = null) : (o.error = "", o.result = Vt(e.result)), this._templateRevision = (this._templateRevision || 0) + 1);
	}, {
		type: "render_template",
		template: s,
		variables: {
			config: this._config || {},
			orbit_entity_id: i
		},
		strict: !0,
		report_errors: !0
	});
	o.subscription = c, c.catch((e) => {
		t.get(n) === o && (o.subscription = void 0, o.error = Kt(e), o.result = null, this._templateRevision = (this._templateRevision || 0) + 1);
	});
}
function Vt(e) {
	let t = String(e ?? ""), n = t.indexOf(Mt), r = t.lastIndexOf(Nt);
	return n !== -1 && r > n ? t.slice(n + 38, r).trim() : t.trim();
}
function Ht(e) {
	return e.__orbitTemplateSubscriptions ||= /* @__PURE__ */ new Map(), e.__orbitTemplateSubscriptions;
}
function Ut(e, t) {
	return JSON.stringify([e || "", t || ""]);
}
function Wt(e) {
	e.subscription?.then((e) => e()).catch(() => {});
}
function Gt(e) {
	try {
		return JSON.stringify(e);
	} catch {
		return "";
	}
}
function Kt(e) {
	if (!e) return "Template rendering failed";
	if (typeof e == "string") return e;
	if (e.message) return e.message;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
//#endregion
//#region src/common/helpers/config-migration.js
function qt(e = {}) {
	let t = { ...e || {} }, n = !1;
	return t.type === "custom:orbit-room-card" && (t.type = "custom:orbit-area-card", n = !0), Object.prototype.hasOwnProperty.call(t, "room_name") && (t.area_name === void 0 && t.room_name !== void 0 && t.room_name !== "" && (t.area_name = t.room_name), delete t.room_name, n = !0), n = tn(t) || n, {
		config: n ? t : e,
		migrated: n
	};
}
function Jt(e = {}) {
	if (!Array.isArray(e?.decks)) return {
		config: e,
		migrated: !1
	};
	let t = !1, n = e.decks.map((e) => {
		if (!e?.card || typeof e.card != "object") return e;
		let n = Yt(e.card);
		return n.migrated ? (t = !0, {
			...e,
			card: n.config
		}) : e;
	});
	return t ? {
		config: {
			...e,
			decks: n
		},
		migrated: t
	} : {
		config: e,
		migrated: t
	};
}
function Yt(e) {
	return Xt(e, "orbit-status-card") ? Zt(e) : Xt(e, "orbit-deck-card") ? Jt(e) : {
		config: e,
		migrated: !1
	};
}
function Xt(e, t) {
	return e?.type === `custom:${t}` || e?.type === `custom:${t}-dev`;
}
function Zt(e = {}) {
	let t = { ...e || {} }, n = tn(t);
	if (n = en(t) || n, n = $t(t) || n, n = Qt(t) || n, Object.prototype.hasOwnProperty.call(t, "main_entity") && (t.entity === void 0 && t.main_entity !== void 0 && t.main_entity !== "" && (t.entity = t.main_entity), delete t.main_entity, n = !0), Array.isArray(t.entities)) {
		let e = t.entities.map((e) => {
			if (!e || typeof e == "string") return e;
			let t = { ...e }, r = tn(t), i = en(t), a = $t(t), o = Qt(t), s = r || i || a || o;
			return n ||= s, s ? t : e;
		});
		n && (t.entities = e);
	}
	return {
		config: n ? t : e,
		migrated: n
	};
}
function Qt(e) {
	let t = [
		"icon_source",
		"icon",
		"icon_on",
		"icon_off",
		"icon_svg_color_override",
		"icon_on_svg_color_override",
		"icon_off_svg_color_override"
	], n = !1;
	for (let r of t) {
		let t = `main_entity_${r}`, i = `entity_${r}`;
		Object.prototype.hasOwnProperty.call(e, t) && (e[i] === void 0 && e[t] !== void 0 && (e[i] = e[t]), delete e[t], n = !0);
	}
	return n;
}
function $t(e) {
	let t = [
		"tap_action",
		"hold_action",
		"double_tap_action"
	], n = !1;
	for (let r of t) {
		let t = `main_entity_${r}`, i = `entity_${r}`;
		Object.prototype.hasOwnProperty.call(e, t) && (e[i] === void 0 && e[t] !== void 0 && (e[i] = e[t]), delete e[t], n = !0);
	}
	return n;
}
function en(e) {
	return Object.prototype.hasOwnProperty.call(e, "status_name") ? (e.name === void 0 && e.status_name !== void 0 && e.status_name !== "" && (e.name = e.status_name), delete e.status_name, !0) : !1;
}
function tn(e) {
	let t = !1;
	for (let n of Object.keys(e || {})) {
		if (!n.endsWith("_template")) continue;
		let r = Pt(e[n]);
		r !== e[n] && (e[n] = r, t = !0);
	}
	return t;
}
//#endregion
//#region src/common/helpers/entities.js
function nn(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function rn(e) {
	if (!e) return !1;
	let t = e.entity_id.split(".")[0], n = e.state;
	switch (t) {
		case "cover": return ["open", "opening"].includes(n);
		case "lock": return n === "unlocked";
		case "person": return n === "home";
		case "device_tracker": return n !== "not_home";
		case "climate": return n !== "off";
		case "media_player": return ![
			"off",
			"idle",
			"standby",
			"unavailable"
		].includes(n);
		case "vacuum": return ![
			"docked",
			"idle",
			"off"
		].includes(n);
		case "alarm_control_panel": return n !== "disarmed";
		case "sun": return n === "above_horizon";
		default: return n === "on";
	}
}
function an(e) {
	return e?.state?.toString().toLowerCase() === "unavailable";
}
//#endregion
//#region src/icons/fan.svg?raw
var on = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     width=\"120\"\n     height=\"120\"\n     viewBox=\"0 0 24 24\"\n     fill=\"none\">\n\n  <style>\n    .spinner {\n      transform-origin: center;\n      animation: spin 1.2s linear infinite;\n    }\n\n    @keyframes spin {\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  </style>\n\n  <g class=\"spinner\">\n    <path\n      fill=\"black\"\n      d=\"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z\"\n    />\n  </g>\n\n</svg>", sn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-fixed</title>\n\n  <!-- Frame -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Animated group (NO base transform!) -->\n    <g>\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Start OPEN via animation itself -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 -10\"\n        to=\"0 0\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n\n    </g>\n  </g>\n</svg>", cn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-variant-open</title>\n\n  <!-- Frame / roof -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <!-- Clip area -->\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Door group (FINAL STATE is open) -->\n    <g class=\"door\" transform=\"translate(0 -10)\">\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Optional SMIL animation (safe fallback style) -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 0\"\n        to=\"0 -10\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n    </g>\n\n  </g>\n</svg>", ln = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", un = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\">\n  <g class=\"start\">\n    <path\n      fill=\"currentColor\"\n      d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"/>\n  </g>\n</svg>", dn = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", fn = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M 25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M 10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z M 17 30C15.894531 30 15 30.894531 15 32C15 33.105469 15.894531 34 17 34C18.105469 34 19 33.105469 19 32C19 30.894531 18.105469 30 17 30 Z M 25 30C23.894531 30 23 30.894531 23 32C23 33.105469 23.894531 34 25 34C26.105469 34 27 33.105469 27 32C27 30.894531 26.105469 30 25 30 Z M 33 30C31.894531 30 31 30.894531 31 32C31 33.105469 31.894531 34 33 34C34.105469 34 35 33.105469 35 32C35 30.894531 34.105469 30 33 30 Z M 13 38C11.894531 38 11 38.894531 11 40C11 41.105469 11.894531 42 13 42C14.105469 42 15 41.105469 15 40C15 38.894531 14.105469 38 13 38 Z M 21 38C19.894531 38 19 38.894531 19 40C19 41.105469 19.894531 42 21 42C22.105469 42 23 41.105469 23 40C23 38.894531 22.105469 38 21 38 Z M 29 38C27.894531 38 27 38.894531 27 40C27 41.105469 27.894531 42 29 42C30.105469 42 31 41.105469 31 40C31 38.894531 30.105469 38 29 38 Z M 37 38C35.894531 38 35 38.894531 35 40C35 41.105469 35.894531 42 37 42C38.105469 42 39 41.105469 39 40C39 38.894531 38.105469 38 37 38 Z M 9 46C7.894531 46 7 46.894531 7 48C7 49.105469 7.894531 50 9 50C10.105469 50 11 49.105469 11 48C11 46.894531 10.105469 46 9 46 Z M 17 46C15.894531 46 15 46.894531 15 48C15 49.105469 15.894531 50 17 50C18.105469 50 19 49.105469 19 48C19 46.894531 18.105469 46 17 46 Z M 25 46C23.894531 46 23 46.894531 23 48C23 49.105469 23.894531 50 25 50C26.105469 50 27 49.105469 27 48C27 46.894531 26.105469 46 25 46 Z M 33 46C31.894531 46 31 46.894531 31 48C31 49.105469 31.894531 50 33 50C34.105469 50 35 49.105469 35 48C35 46.894531 34.105469 46 33 46 Z M 41 46C39.894531 46 39 46.894531 39 48C39 49.105469 39.894531 50 41 50C42.105469 50 43 49.105469 43 48C43 46.894531 42.105469 46 41 46Z\"/></svg>", pn = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Animated shower</title>\n  <desc id=\"desc\">A shower head icon with animated falling water droplets.</desc>\n  <style>\n    .fixture {\n      fill: #111111;\n    }\n\n    .drop {\n      fill: #1597d3;\n      opacity: 0;\n      transform-box: fill-box;\n      transform-origin: center;\n      animation: fall 1.35s linear infinite;\n    }\n\n    .drop:nth-child(1) { animation-delay: 0s; }\n    .drop:nth-child(2) { animation-delay: .18s; }\n    .drop:nth-child(3) { animation-delay: .36s; }\n    .drop:nth-child(4) { animation-delay: .54s; }\n    .drop:nth-child(5) { animation-delay: .72s; }\n    .drop:nth-child(6) { animation-delay: .9s; }\n    .drop:nth-child(7) { animation-delay: 1.08s; }\n    .drop:nth-child(8) { animation-delay: .12s; }\n    .drop:nth-child(9) { animation-delay: .3s; }\n    .drop:nth-child(10) { animation-delay: .48s; }\n    .drop:nth-child(11) { animation-delay: .66s; }\n    .drop:nth-child(12) { animation-delay: .84s; }\n\n    @keyframes fall {\n      0% {\n        opacity: 0;\n        transform: translateY(-8px) scale(.72);\n      }\n      18% {\n        opacity: 1;\n      }\n      72% {\n        opacity: .95;\n      }\n      100% {\n        opacity: 0;\n        transform: translateY(8px) scale(1);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .drop {\n        opacity: 1;\n        animation: none;\n      }\n    }\n  </style>\n\n  <path class=\"fixture\" d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z\"/>\n\n  <g id=\"water\">\n    <circle class=\"drop\" cx=\"17\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"13\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"21\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"29\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"37\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"9\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"17\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"41\" cy=\"48\" r=\"2\"/>\n  </g>\n</svg>\n", mn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Closing shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly closes from twenty percent closed to fully closed.</desc>\n  <style>\n    .shade-closing {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(3.943322);\n    }\n\n    .rail-closing {\n      transform: translateY(12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-closing {\n      animation: shade-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-closing {\n      animation: rail-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-closing {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(3.943322); }\n    }\n\n    @keyframes rail-closing {\n      from { transform: translateY(0); }\n      to   { transform: translateY(12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-closing\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"4.358\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-closing\" x=\"2.42\" y=\"8.694\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", hn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Opening shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly opens from fully closed to twenty percent closed.</desc>\n  <style>\n    .shade-opening {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(0.253593);\n    }\n\n    .rail-opening {\n      transform: translateY(-12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-opening {\n      animation: shade-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-opening {\n      animation: rail-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-opening {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(0.253593); }\n    }\n\n    @keyframes rail-opening {\n      from { transform: translateY(0); }\n      to   { transform: translateY(-12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-opening\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"17.185\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-opening\" x=\"2.42\" y=\"21.521\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", gn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"120\" height=\"120\" fill=\"currentColor\">\n\n  <style>\n    .swirl {\n      transform-origin: 12px 14px;\n      animation: wash 1.5s ease-in-out infinite;\n    }\n\n    @keyframes wash {\n      0%,100% { transform: rotate(0deg); }\n      25%     { transform: rotate(-20deg); }\n      75%     { transform: rotate(20deg); }\n    }\n  </style>\n\n  <!-- machine -->\n  <path\n    fill=\"currentColor\"\n    d=\"M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2\n       M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4\n       M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4\n       M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z\" />\n\n  <!-- animated inner swirl -->\n  <path\n    class=\"swirl\"\n    fill=\"currentColor\"\n    d=\"M14.83,11.17\n       C16.39,12.73 16.39,15.27 14.83,16.83\n       C13.27,18.39 10.73,18.39 9.17,16.83\n       L14.83,11.17\" />\n</svg>", _n = [
	{
		name: "Fan",
		file: "fan.svg",
		tags: ["bathroom", "fan"]
	},
	{
		name: "Garage Door Closed",
		file: "garage-door_closed.svg",
		tags: ["garage", "door"]
	},
	{
		name: "Garage Door Open",
		file: "garage-door_open.svg",
		tags: ["garage", "door"]
	},
	{
		name: "Motion Detected",
		file: "motion_detected.svg",
		tags: ["motion", "sensor"]
	},
	{
		name: "No Motion",
		file: "motion_off.svg",
		tags: ["motion", "sensor"]
	},
	{
		name: "Shutter Opening",
		file: "shutter-opening.svg",
		revision: "3bfde376",
		tags: [
			"cover",
			"shade",
			"shutter",
			"opening"
		]
	},
	{
		name: "Shutter Closing",
		file: "shutter-closing.svg",
		revision: "458fb44b",
		tags: [
			"cover",
			"shade",
			"shutter",
			"closing"
		]
	},
	{
		name: "Shower On",
		file: "shower_on.svg",
		tags: ["bathroom", "water"]
	},
	{
		name: "Shower Off",
		file: "shower_off.svg",
		tags: ["bathroom", "water"]
	},
	{
		name: "Washing Machine Running",
		file: "washing-machine-running.svg",
		tags: ["kitchen", "washing"]
	}
], vn = Object.freeze({
	"fan.svg": on,
	"garage-door_closed.svg": sn,
	"garage-door_open.svg": cn,
	"motion_detected.svg": ln,
	"motion_off.svg": un,
	"motion_on.svg": dn,
	"shower_off.svg": fn,
	"shower_on.svg": pn,
	"shutter-closing.svg": mn,
	"shutter-opening.svg": hn,
	"washing-machine-running.svg": gn
});
function yn(e) {
	return e?.startsWith("orbit:") && vn[decodeURIComponent(e.slice(6).split("?")[0])] || "";
}
//#endregion
//#region src/common/helpers/icons.js
function bn(e, t) {
	let n = this._config.accent_color || "theme";
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function xn(e) {
	if (!e) return null;
	let t = e.entity_id?.split(".")[0], n = e.attributes || {};
	if (t === "light") {
		if (Array.isArray(n.rgb_color)) {
			let [e, t, r] = n.rgb_color;
			return `rgb(${e}, ${t}, ${r})`;
		}
		if (Array.isArray(n.hs_color)) {
			let [e, t] = n.hs_color;
			return `hsl(${e}, ${t}%, 50%)`;
		}
	}
	return null;
}
function Sn(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function Cn(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function F(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = t.animate === !0, i = [
		e,
		n ? "forced" : "auto",
		r ? "animated" : "static"
	].join("::"), a = this.constructor.svgCache, o = a[i];
	if (typeof o == "string" && o !== "loading") return o;
	if (o === "loading") return Dn(i, this), "";
	let s = yn(e);
	if (s) {
		let e = Tn(s, n, r);
		return a[i] = e, e;
	}
	return a[i] = "loading", Dn(i, this), kn(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = Tn(e, n, r), a[i] = e, On(i);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete a[i], On(i);
	}), "";
}
function wn(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function Tn(e, t, n = !1) {
	let r = e.replace(/<svg\b[^>]*>/i, (e) => {
		let t = e.replace(/\swidth="[^"]*"/i, " width=\"100%\"").replace(/\sheight="[^"]*"/i, " height=\"100%\"");
		return n && (t = t.replace(/^<svg\b/i, "<svg data-orbit-animate=\"true\"")), t;
	});
	return t ? r.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : r;
}
var En = {};
function Dn(e, t) {
	t && (En[e] = En[e] || /* @__PURE__ */ new Set(), En[e].add(t));
}
function On(e) {
	let t = En[e];
	t && (delete En[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function kn(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
//#endregion
//#region src/common/helpers/long-press.js
function An(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function jn() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function Mn(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
//#endregion
//#region src/common/helpers/updates.js
function Nn(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? Fn(r, i) : !1;
}
function Pn(e) {
	return Object.keys(e || {}).some((e) => e.endsWith("_template"));
}
function Fn(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
//#endregion
//#region src/common/helpers/suggestions.js
function In(e = "") {
	return e.split(".")[0] || "";
}
function Ln(e, t) {
	let n = e?.entities?.[t];
	if (n?.area_id) return n.area_id;
	let r = n?.device_id;
	return r && e?.devices?.[r]?.area_id || "";
}
function Rn(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
//#endregion
//#region src/common/helpers/svg-cache.js
var I = {}, zn = {
	automation: "automation.trigger",
	button: "button.press",
	input_button: "input_button.press",
	scene: "scene.turn_on",
	script: "script.turn_on"
}, Bn = new Set([
	"alarm_control_panel",
	"climate",
	"cover",
	"fan",
	"humidifier",
	"input_boolean",
	"light",
	"lock",
	"media_player",
	"remote",
	"siren",
	"switch",
	"vacuum",
	"water_heater"
]);
function Vn(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = zn[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : Bn.has(n) ? { action: "toggle" } : { action: t };
}
//#endregion
//#region src/cards/area/helpers/lifecycle.js
function Hn(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	this._cardName = this._getCardName("");
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, i);
	let a = this._config.main_entity_icon, o = this._config.main_entity_icon_on, s = this._config.main_entity_icon_off, c = sr(this._config, n, t), l = c === "custom", u = n && this.hass?.areas?.[n] && this.hass.areas[n].icon || "mdi:sofa", d = l && ((i ? o : s) || a) || "";
	this._mainStateObj = r, this._useNativeMainIcon = !!r && c !== "area" && !d;
	let f = l && i && o ? "main_entity_icon_on" : l && !i && s ? "main_entity_icon_off" : l && a ? "main_entity_icon" : "";
	this._icon = d || u, this._iconSvgForceColor = f ? this._getSvgColorOverride(f) : !0, this._statusItems = Un.call(this), this._buttonModels = qn.call(this), this._curveButtonModels = Jn.call(this), this._actionButtonModel = Yn.call(this);
}
function Un() {
	return [
		1,
		2,
		3
	].map((e) => {
		let t = this._config[`status${e}`];
		if (!t) return null;
		let n = this.hass?.states[t], r = `status${e}`, i = this._config[`${r}_icon`] || "", a = Gn.call(this, r, t), o = a === "custom" ? i : "";
		return {
			entityId: t,
			stateObj: n,
			useStateIcon: a === "entity" && !!n,
			text: Kn.call(this, n, this._config[`status${e}_decimal_places`]),
			icon: o,
			iconPath: this._isImageIcon(o) ? this._resolveIconPath(o) : "",
			isImage: this._isImageIcon(o),
			isHaIcon: Wn(o)
		};
	}).filter(Boolean);
}
function Wn(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function Gn(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "none" ? "none" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] ? "custom" : "none";
}
function Kn(e, t) {
	if (!e) return "—";
	if (t === void 0 || t === "") return this.formatState(e);
	let n = Number(t), r = Number(e.state);
	if (!Number.isFinite(n) || !Number.isFinite(r)) return this.formatState(e);
	let i = e.attributes.unit_of_measurement || "";
	return `${r.toFixed(Math.max(0, n))}${i}`;
}
function qn() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => Xn.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: tr,
		getBackgroundColor: er
	})).filter(Boolean);
}
function Jn() {
	let e = this._config?.curve_buttons_lock_position ?? !1, t = [
		this._config.curve_button1,
		this._config.curve_button2,
		this._config.curve_button3,
		this._config.curve_button4,
		this._config.curve_button5,
		this._config.curve_button6
	], n = t.filter(Boolean);
	return t.map((t, r) => {
		if (!e && !t) return null;
		if (e && !t) return {
			empty: !0,
			position: r
		};
		let i = Xn.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: ir,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function Yn() {
	let e = this._config.action_button;
	return e ? Xn.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: Vn(e),
		defaultHoldAction: null,
		getIconColor: ar,
		getBackgroundColor: null
	}) : null;
}
function Xn(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = r.key || `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = o ? zt(s) : this._getEntityActiveState(i), l = $n.call(this, a, t), u = Qn.call(this, a, c), d = this._isImageIcon(u), f = this._buttonIconStates?.get(a), p = !!(f && f.entityId === t && f.isOn !== c);
	return this._buttonIconStates ||= /* @__PURE__ */ new Map(), this._buttonIconStates.set(a, {
		entityId: t,
		isOn: c
	}), {
		entityId: t,
		stateObj: i,
		useStateIcon: !!i && (l === "entity" || !u),
		holdAction: this._config?.[`${a}_hold_action`] || r.defaultHoldAction,
		doubleTapAction: this._config?.[`${a}_double_tap_action`] || null,
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, c) : "",
		icon: u,
		iconColor: r.getIconColor.call(this, a, i, c),
		iconPath: d ? this._resolveIconPath(u) : "",
		svgForceColor: Zn.call(this, a, c),
		animateIcon: p,
		isImage: d
	};
}
function Zn(e, t) {
	if ($n.call(this, e) !== "custom") return !0;
	let n = this._config?.[`${e}_icon`], r = t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : n ? `${e}_icon` : "";
	return r ? this._getSvgColorOverride(r) : !0;
}
function Qn(e, t) {
	let n = this._config?.[`${e}_icon`], r = this._config?.[`${e}_icon_on`], i = this._config?.[`${e}_icon_off`];
	return $n.call(this, e) === "entity" ? "" : (t ? r : i) || n || "";
}
function $n(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] || this._config?.[`${e}_icon_on`] || this._config?.[`${e}_icon_off`] ? "custom" : "entity";
}
function er(e, t, n) {
	if (n) return this._computeButtonBackground(nr.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : gt(r, 10);
}
function tr(e, t, n) {
	if (n) return this._computeFullColor(nr.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return r.startsWith("rgba(") ? r : this._computeIconColor(r);
}
function nr(e, t) {
	let n = this._config[`${e}_on_color`] || "theme";
	return n === "light" ? this._getEntityColor(t) || this._config.accent_color || "theme" : n;
}
function rr(e, t, n) {
	let r = this._config.accent_color || "theme";
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : n ? this._computeFullColor(r) : gt(r, 40);
}
function ir(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? or.call(this, e, t, n, r) : rr.call(this, e, t, n);
}
function ar(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? or.call(this, e, t, n, r) : rr.call(this, e, t, n);
}
function or(e, t, n, r) {
	return n ? tr.call(this, e, t, !0) : r.startsWith("rgba(") ? r : gt(r, 40);
}
function sr(e = {}, t, n) {
	let r = e.main_entity_icon_source, i = !!t, a = !!n;
	return r === "custom" ? r : r === "area" && i ? "area" : r === "entity" && a ? "entity" : i ? "area" : a ? "entity" : "area";
}
//#endregion
//#region node_modules/lit-html/directive.js
var cr = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, lr = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), ur = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, dr = class extends ur {
	constructor(e) {
		if (super(e), this.it = E, e.type !== cr.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === E || e == null) return this._t = void 0, this.it = e;
		if (e === T) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
dr.directiveName = "unsafeHTML", dr.resultType = 1;
var L = lr(dr);
//#endregion
//#region src/cards/area/renders/buttons.js
function fr(e) {
	return e ? w`
      <button
        class="entity-button"
        style="background:${e.backgroundColor};"
        @click=${this._handleButtonClick}
        @dblclick=${this._handleButtonDoubleClick}

        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
        .dataDoubleAction=${e.doubleTapAction}
      >
        ${e.isImage ? w`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? L(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon)) : ""}
              </div>
            ` : e.useStateIcon && e.stateObj ? w`
                <ha-state-icon
                  .stateObj=${e.stateObj}
                  style="color:${e.iconColor};"
                ></ha-state-icon>
              ` : w`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
        ${an(e.stateObj) ? w`
              <ha-tile-badge
                class="entity-unavailable-badge"
                title=${this._t("Unavailable")}
                aria-label=${this._t("Unavailable")}
              >
                <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
              </ha-tile-badge>
            ` : ""}
      </button>
    ` : null;
}
//#endregion
//#region src/cards/area/renders/area-card.js
function pr() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return w`
    <ha-card
      tabindex="0"
      @click=${this._handleTap}
      @dblclick=${this._handleCardDoubleTap}
      @pointerdown=${this._handleCardPointerDown}
      @pointerup=${this._finishLongPress}
      @pointerleave=${this._cancelLongPress}
      @pointercancel=${this._cancelLongPress}
    >
      <div class="container">
        <div class="content">

            <div class="header ${e.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._areaColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${mr.call(this)}
            </div>
          </div>

          ${e.length ? w`
                <div class="button-column" style="--button-count:${e.length}">
                  ${e.map((e) => this._renderButtons(e))}
                </div>
              ` : ""}

        </div>

        <div
          class="circle"
          style="background:${this._circleColor}"

          @pointerdown=${this._handleMainEntityPointerDown}

          @pointerup=${this._finishLongPress}
          @pointerleave=${this._cancelLongPress}
          @pointercancel=${this._cancelLongPress}
        >

          ${this._renderCurveButtons()}

          <div class="main-icon-badge-anchor">
            ${this._isImageIcon(this._icon) ? w`
                  <div
                    class="main-image-icon"
                    style="color:${this._iconColor};"
                  >
                    ${n ? L(n) : w`<img src=${t} alt="" />`}
                  </div>
                ` : this._useNativeMainIcon && this._mainStateObj ? w`
                    <ha-state-icon
                      class="main-icon"
                      .stateObj=${this._mainStateObj}
                      style="color:${this._iconColor}"
                    ></ha-state-icon>
                  ` : w`
                  <ha-icon
                    class="main-icon"
                    .icon=${this._icon}
                    style="color:${this._iconColor}"
                  ></ha-icon>
                `}

            ${an(this._mainStateObj) ? w`
                  <ha-tile-badge
                    class="entity-unavailable-badge"
                    title=${this._t("Unavailable")}
                    aria-label=${this._t("Unavailable")}
                  >
                    <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
                  </ha-tile-badge>
                ` : ""}
          </div>

        </div>

      </div>
    </ha-card>
  `;
}
function mr() {
	let e = this._statusItems || [];
	if (!e.length) return this._statusText || "";
	let t = this._config?.status_separator || "|";
	return e.map((e, n) => w`
    ${n > 0 ? w`
          <span class="status-separator">
            ${t}
          </span>
        ` : ""}
    <span class="status-item">
      ${hr.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function hr(e) {
	return !e.icon && !e.useStateIcon ? "" : e.isImage ? w`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? L(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.useStateIcon && e.stateObj ? w`
      <ha-state-icon
        class="status-prefix-icon"
        .stateObj=${e.stateObj}
      ></ha-state-icon>
    ` : e.isHaIcon ? w`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : w`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  `;
}
//#endregion
//#region node_modules/lit-html/directive-helpers.js
var { I: gr } = Le, _r = (e) => e, vr = () => document.createComment(""), yr = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new gr(r.insertBefore(vr(), i), r.insertBefore(vr(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = _r(e).nextSibling;
				_r(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, R = (e, t, n = e) => (e._$AI(t, n), e), br = {}, xr = (e, t = br) => e._$AH = t, Sr = (e) => e._$AH, Cr = (e) => {
	e._$AR(), e._$AA.remove();
}, wr = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, Tr = lr(class extends ur {
	constructor(e) {
		if (super(e), e.type !== cr.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = Sr(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = R(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = R(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = R(i[d], a[m]), yr(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = R(i[f], a[p]), yr(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = wr(o, p, m), u = wr(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
			let t = u.get(o[p]), n = t === void 0 ? null : i[t];
			if (n === null) {
				let t = yr(e, i[d]);
				R(t, a[p]), c[p] = t;
			} else c[p] = R(n, a[p]), yr(e, i[d], n), i[t] = null;
			p++;
		} else Cr(i[f]), f--;
		else Cr(i[d]), d++;
		for (; p <= m;) {
			let t = yr(e, c[m + 1]);
			R(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && Cr(e);
		}
		return this.ut = o, xr(e, c), T;
	}
});
//#endregion
//#region src/cards/area/renders/curve-buttons.js
function Er() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return w`
      <div class="curve-buttons">

        ${Tr(e, (e, t) => t, (e) => e.empty ? w`
              <div class="curve-button pos-${e.position}"></div>
            ` : w`
            <button
              class="curve-button pos-${e.position}"
                @click=${this._handleCurveButtonClick}
                @dblclick=${this._handleCurveButtonDoubleClick}
                @pointerdown=${this._handleButtonPointerDown}

                @pointerup=${this._finishLongPress}
                @pointerleave=${this._cancelLongPress}
                @pointercancel=${this._cancelLongPress}

                .dataEntity=${e.entityId}
                .dataAction=${e.tapAction}
                .dataHoldAction=${e.holdAction}
                .dataDoubleAction=${e.doubleTapAction}
            >
              ${e.isImage ? w`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${L(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
                    </div>
                  ` : e.useStateIcon && e.stateObj ? w`
                      <ha-state-icon
                        .stateObj=${e.stateObj}
                        style="color:${e.iconColor};"
                      ></ha-state-icon>
                    ` : w`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
              ${Or.call(this, e.stateObj)}
            </button>
          `)}

      ${t ? Dr.call(this, t) : ""}

      </div>
    `;
}
function Dr(e) {
	return w`
    <button
      class="curve-button action-button"
        @click=${this._handleCurveButtonClick}
        @dblclick=${this._handleCurveButtonDoubleClick}
        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
        .dataDoubleAction=${e.doubleTapAction}
    >
      ${e.isImage ? w`
            <div
              class="curve-image-icon"
              style="color:${e.iconColor};"
            >
              ${L(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
            </div>
          ` : e.useStateIcon && e.stateObj ? w`
              <ha-state-icon
                .stateObj=${e.stateObj}
                style="color:${e.iconColor};"
              ></ha-state-icon>
            ` : w`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
      ${Or.call(this, e.stateObj)}
    </button>
  `;
}
function Or(e) {
	return an(e) ? w`
        <ha-tile-badge
          class="entity-unavailable-badge"
          title=${this._t("Unavailable")}
          aria-label=${this._t("Unavailable")}
        >
          <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
        </ha-tile-badge>
      ` : "";
}
//#endregion
//#region src/common/styles/header.js
var kr = d`
  .header {
    width: 100%;
  }

  .card-name {
    font-size: clamp(18px, 9cqw, 34px);
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status {
    font-size: clamp(13px, 6.7cqw, 26px);
    font-weight: bold;
    opacity: 0.4;
    line-height: 1.1;
    margin-top: clamp(6px, 1.8cqw, 28px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`, Ar = d`
  :host {
    display: block;
  }

  ha-card {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;
    container-type: size;
  }

  ha-card:active {
    transform: scale(0.98);
  }

  .container {
    padding: clamp(14px, 2cqw, 24px);
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`, jr = d`
  .main-icon {
    --orbit-main-icon-size: 45%;
    --mdc-icon-size: var(--orbit-main-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  ha-state-icon.main-icon {
    width: var(--orbit-main-icon-size);
    height: var(--orbit-main-icon-size);
    --mdc-icon-size: 100%;
  }

  .main-image-icon {
    width: 45%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    position: relative;
  }

  .main-image-icon svg,
  .main-image-icon img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .main-image-icon img {
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.8;
  }

  .main-icon-badge-anchor {
    position: relative;
    width: 45%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-icon-badge-anchor .main-icon {
    --orbit-main-icon-size: 100%;
  }

  .main-icon-badge-anchor ha-state-icon.main-icon,
  .main-icon-badge-anchor .main-image-icon {
    width: 100%;
    height: 100%;
  }

  .entity-unavailable-badge {
    --tile-badge-background-color: var(--orange-color);
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(22%, -22%);
    pointer-events: none;
    z-index: 10;
  }
`, Mr = d`
  .status {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .status-item {
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  .status-separator {
    padding: 0 0.35em;
  }

  .status-prefix-icon {
    --mdc-icon-size: 0.9em;
    width: 0.9em;
    height: 0.9em;
    margin-right: 0.15em;
    flex: none;
  }

  ha-state-icon.status-prefix-icon {
    --mdc-icon-size: 100%;
  }

  .status-prefix-image {
    display: inline-flex;
    color: currentColor;
  }

  .status-prefix-image svg,
  .status-prefix-image img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .status-prefix-text {
    margin-right: 0.15em;
    flex: none;
  }

  .header.compressed {
    width: calc(100% - (var(--button-area-width) - 5px));
  }

  .button-column[style*="--button-count:4"] ~ .header.compressed {
    width: calc(100% - (var(--button-area-width) - 18px));
  }
`, Nr = d`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`, Pr = d`
  .curve-button {
    position: absolute;
    width: 22%;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    background: transparent !important;
    box-shadow: none !important;

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: auto;
    cursor: pointer;
    z-index: 5;

    transition: transform 0.2s ease;
  }

  .curve-button:hover {
    transform: scale(1.12);
  }

  .curve-button:active {
    transform: scale(0.92);
  }
`, Fr = d`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`, Ir = d`
  .curve-button ha-icon,
  .curve-button ha-state-icon {
    width: clamp(24px, 13cqw, 78px);
    height: clamp(24px, 13cqw, 78px);
    --mdc-icon-size: 100%;
  }

  .curve-image-icon {
    width: clamp(24px, 13cqw, 78px);
    height: clamp(24px, 13cqw, 78px);

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: none;
    user-select: none;
  }

  .curve-image-icon svg {
    width: 100%;
    height: 100%;
  }

  .curve-button.action-button ha-icon,
  .curve-button.action-button ha-state-icon,
  .curve-button.action-button .curve-image-icon {
    width: clamp(30px, 16cqw, 96px);
    height: clamp(30px, 16cqw, 96px);
  }
`, Lr = d`
  .curve-button.pos-0 {
    top: 7%;
    left: 17%;
  }

  .curve-button.pos-1 {
    top: 2%;
    left: 37%;
  }

  .curve-button.pos-2 {
    top: 6%;
    right: 20%;
  }

  .curve-button.pos-3 {
    top: 22%;
    right: 4%;
  }

  .curve-button.pos-4 {
    bottom: 38%;
    right: 0%;
  }

  .curve-button.pos-5 {
    bottom: 16%;
    right: 7%;
  }

  .curve-button.action-button {
    top: -12%;
    right: 0%;
    width: 27%;
  }
`, Rr = d`
  .entity-button {
    width: min(
      clamp(44px, 26cqw, 250px),
      calc(
        (100cqh - (var(--button-count, 4) - 1) * clamp(10px, 2cqw, 22px)) /
          var(--button-count, 4)
      )
    );

    aspect-ratio: 1 / 1;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
    position: relative;
    overflow: visible;
  }

  .entity-button:hover {
    transform: scale(1.05);
  }

  .entity-button:active {
    transform: scale(0.95);
  }

  .entity-button ha-icon {
    --mdc-icon-size: 54%;
  }

  .entity-button ha-state-icon {
    width: 54%;
    height: 54%;
    --mdc-icon-size: 100%;
  }

  .button-image-icon {
    width: 54%;
    height: 54%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
  }

  .button-image-icon svg {
    width: 100%;
    height: 100%;
  }
`, zr = d`
  .button-column {
    position: absolute;
    right: -2cqw;
    top: 0;
    bottom: -2cqw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: var(--button-area-width);
  }

  .button-column[style*="--button-count:1"] {
    justify-content: center;
  }

  .button-column[style*="--button-count:2"] {
    justify-content: space-between;
    padding-top: 35%;
  }

  .button-column[style*="--button-count:3"],
  .button-column[style*="--button-count:4"] {
    justify-content: space-between;
  }
`, Br = [
	Ar,
	kr,
	jr,
	Nr,
	Mr,
	d`
  .circle {
    position: absolute;
    bottom: -12%;
    left: -12%;
    width: 75%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    z-index: 3;
  }
`,
	Rr,
	zr,
	Pr,
	Fr,
	Ir,
	Lr
];
//#endregion
//#region src/common/editor/helpers/icon.js
function z(e, t) {
	return Array.isArray(t) ? Vr(e, t.map((t) => z(e, t))) : e._t ? e._t(t) : t;
}
function Vr(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Hr(e)).join(" ") : t.join(" ");
}
function Hr(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function Ur(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function Wr(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Gr(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = r && this._isImageIcon(r) ? "files" : "ha", o = this._iconPickerKey === i && this._iconPickerTab || a;
	return o === "files" && !this._orbitIconFilesLoading && !this._localIconFilesLoading && !(this._orbitIconFiles || []).length && !(this._localIconFiles || []).length && queueMicrotask(() => this._loadLocalIconFiles?.(r)), w`
    <div class="field">
      ${e ? w`<label>${z(this, e)}</label>` : ""}

      <div
        class="icon-picker-panel"
        @click=${(e) => e.stopPropagation()}
      >
        <div class="icon-tabs">
          <button
            type="button"
            class=${o === "ha" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "ha";
	}}
          >
            ${z(this, "Icons")}
          </button>
          <button
            type="button"
            class=${o === "files" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
          >
            ${z(this, "Files")}
          </button>
        </div>

        ${o === "files" ? Yr.call(this, t, r) : Jr.call(this, t, r)}
      </div>
    </div>
  `;
}
function B({ label: e = "Icon", sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [], renderCustom: s } = {}) {
	let c = Kr(this._config, {
		sourceKey: t,
		entityKey: n,
		areaKey: r,
		allowArea: i,
		allowNone: a,
		customIconKeys: o
	}), l = c === "custom", u = [
		a ? {
			label: z(this, "None"),
			value: "none"
		} : null,
		i ? {
			label: z(this, "Area"),
			value: "area"
		} : null,
		{
			label: z(this, "Entity"),
			value: "entity"
		},
		{
			label: z(this, "Custom"),
			value: "custom"
		}
	].filter(Boolean);
	return w`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${z(this, e)}</label>

        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: u } }}
          .value=${c}
          @value-changed=${(e) => {
		this._handleConfigUpdate(t, e.detail.value || (a ? "none" : "custom"));
	}}
        ></ha-selector>
      </div>

      ${l && s ? s.call(this) : ""}
    </div>
  `;
}
function Kr(e = {}, { sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [] } = {}) {
	let s = e[t], c = i && !!e[r], l = !!(e[n] || e.entity), u = o.some((t) => !!e[t]);
	if (s === "custom") return "custom";
	if (s === "none" && a) return "none";
	if (s === "area" && c) return "area";
	if (s === "entity" && l) return "entity";
	if (i) {
		if (c) return "area";
		if (l) return "entity";
	}
	return u ? "custom" : a ? "none" : l ? "entity" : i ? "area" : "entity";
}
async function qr(e = "") {
	let t = mi(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([si(), ci()]);
	this._orbitIconFiles = gi(n), this._localIconFiles = gi([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function Jr(e, t) {
	return w`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${t && !this._isImageIcon(t) ? t : ""}
      @value-changed=${(t) => {
		this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-icon-picker>
  `;
}
function Yr(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [], i = Xr([...n, ...r]);
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? w`
      <div class="icon-picker-note">${z(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? w`
      <div class="icon-picker-note">
        ${z(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : w`
    <ha-generic-picker
      .value=${t && this._isImageIcon(t) ? t : ""}
      .getItems=${(e) => Qr(i, e)}
      .rowRenderer=${(e) => $r.call(this, e)}
      .valueRenderer=${(e) => ei.call(this, i.find((t) => t.id === e))}
      .notFoundLabel=${z(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${!0}
      @value-changed=${(t) => {
		t.stopPropagation(), this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-generic-picker>
  `;
}
function Xr(e) {
	return gi(e).map((e) => {
		let t = hi(e), n = Zr(e);
		return {
			id: t,
			primary: n,
			sorting_label: n,
			iconFile: e,
			search_labels: {
				label: n,
				file: e.file || "",
				name: e.name || "",
				value: t
			}
		};
	});
}
function Zr(e) {
	return `${e.source ? `${e.source}:` : ""}${(e.name || e.file || "").trim().replace(/\s+/g, "-")}`;
}
function Qr(e, t = "") {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => Object.values(e.search_labels || {}).some((e) => String(e).toLowerCase().includes(n))) : e;
}
function $r(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${ti.call(this, e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function ei(e) {
	return e ? w`
    ${ti.call(this, e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function ti(e) {
	return e?.iconFile ? w`
    <span
      slot="start"
      class="file-picker-preview"
      style=${ri()}
    >
      ${ni.call(this, e.iconFile)}
    </span>
  ` : "";
}
function ni(e) {
	let t = hi(e), n = this._resolveIconPath(t);
	if (!n) return w``;
	let r = this._getInlineSvg ? this._getInlineSvg(n) : "", i = this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? !1, a = ri(), o = ii(i);
	return w`
    <span
      class="file-picker-preview-inner"
      style=${a}
    >
      ${r ? w`${L(ai(r))}` : w`
            <img
              class=${i ? "dark" : ""}
              src=${n}
              alt=""
              width="24"
              height="24"
              style=${o}
              loading="eager"
              decoding="sync"
              fetchpriority="high"
            />
          `}
    </span>
  `;
}
function ri() {
	return [
		"display:inline-flex",
		"flex:0 0 24px",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"align-items:center",
		"justify-content:center",
		"overflow:hidden",
		"line-height:0",
		"box-sizing:border-box",
		"contain:layout paint",
		"color:var(--secondary-text-color)"
	].join(";");
}
function ii(e) {
	return [
		"display:block",
		"flex:none",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"object-fit:contain",
		"box-sizing:border-box",
		"overflow:hidden",
		e ? "filter:brightness(0) invert(72%)" : "filter:brightness(0) opacity(72%)"
	].join(";");
}
function ai(e) {
	if (!e) return "";
	let t = oi(e.replace(/<\?xml[^>]*>/gi, "").trim()), n = t.match(/<svg\b[^>]*>/i)?.[0];
	if (!n) return t;
	let r = [
		"display:block",
		"flex:none",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"overflow:hidden",
		"box-sizing:border-box",
		"color:var(--secondary-text-color)",
		"vertical-align:middle",
		"pointer-events:none"
	].join(";"), i = n.replace(/\swidth=(["'])[^"']*\1/gi, "").replace(/\sheight=(["'])[^"']*\1/gi, "").replace(/\sstyle=(["'])[^"']*\1/gi, "").replace(/\spreserveAspectRatio=(["'])[^"']*\1/gi, "");
	return i = i.replace(/^<svg\b/i, `<svg width="24" height="24" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" style="${r}"`), t.replace(n, i);
}
function oi(e) {
	let t = "(?!none\\b|currentColor\\b|transparent\\b|inherit\\b|url\\()(?:rgb\\([^)]*\\)|rgba\\([^)]*\\)|hsl\\([^)]*\\)|hsla\\([^)]*\\)|[^\"';)]+)";
	return e.replace(RegExp(`\\s(fill|stroke)=(["'])${t}\\2`, "gi"), (e, t) => ` ${t}="currentColor"`).replace(RegExp(`(fill|stroke)\\s*:\\s*${t}`, "gi"), (e, t) => `${t}:currentColor`);
}
async function si() {
	return _n.filter(fi).map((e) => pi(e, "orbit"));
}
async function ci() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await li([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await ui();
	return [
		...e,
		...t,
		...n
	].filter(fi).map((e) => pi(e, "local"));
}
async function li(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(fi).map((e) => pi(e));
	} catch {}
	return [];
}
async function ui() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function di(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function fi(e) {
	return Ur(di(e));
}
function pi(e, t = "") {
	let n = di(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function mi(e) {
	if (!e || !fi(e)) return null;
	let t = di(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function hi(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function gi(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
//#endregion
//#region src/common/editor/helpers/inputs.js
function _i(e, t) {
	return Array.isArray(t) ? vi(e, t.map((t) => _i(e, t))) : e._t ? e._t(t) : t;
}
function vi(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : yi(e)).join(" ") : t.join(" ");
}
function yi(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function bi(e, t, n, r = {}) {
	let i = r.externalLabel === !0, a = r.value ?? this._config?.[t] ?? "", o = r.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return w`
      <div class="field">
        ${i ? w`<label>${_i(this, e)}</label>` : ""}

        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : _i(this, e)}
          .selector=${{ text: {} }}
          .value=${a}
          .placeholder=${n}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function xi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.hideLabel === !0, a = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return w`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : _i(this, e)}
          .selector=${{ template: {} }}
          .value=${r}
          @value-changed=${(e) => a(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function Si(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.min ?? 0, a = n.step ?? 1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return w`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${_i(this, e)}
        .selector=${{ number: {
		min: i,
		step: a,
		mode: "box"
	} }}
        .value=${r}
        @value-changed=${(e) => o(e.detail.value)}
      ></ha-selector>
    </div>
  `;
}
//#endregion
//#region src/common/editor/helpers/config.js
function Ci(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function V(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function H(e, t = []) {
	return V([e, ...t]);
}
function wi(e, t = []) {
	return V([e, ...t.map((t) => `${e}${t}`)]);
}
//#endregion
//#region src/common/editor/helpers/labels.js
function U(e, t, n) {
	return Array.isArray(t) ? Ti(e, t.map((t) => U(e, t, n))) : e._t ? e._t(t, n) : t;
}
function Ti(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Ei(e)).join(" ") : t.join(" ");
}
function Ei(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
//#endregion
//#region src/common/editor/helpers/color-picker.js
function Di(e, t, n) {
	let r = this._config?.[t] || "";
	return Oi.call(this, e, t, r, (e) => this._handleConfigUpdate(t, e), n);
}
function Oi(e, t, n, r, i) {
	Bi.call(this);
	let a = ki.call(this, n, i), o = sa(n || a), s = this._colorPickerKey === t && this._colorPickerTab || o;
	return w`
    <div class="field">
      <div class="color-row">
        <div
          class="color-popover"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="color-tabs">
            <button
              type="button"
              class=${s === "picker" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "picker", this._themeColorPickerOpen = !1;
		let e = n || a;
		if (e && !ca(e)) {
			let t = this._getColorPickerValue(e);
			t && r(t);
		}
	}}
            >
              ${U(this, "Color")}
            </button>
            <button
              type="button"
              class=${s === "theme" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "theme", this._themeColorPickerOpen = !1, this._themeColorSearch = "";
	}}
            >
              ${U(this, "Theme")}
            </button>
          </div>

          ${s === "theme" ? w`
                ${ji.call(this, e, n, r, a, t)}
              ` : w`
                ${Ai.call(this, e, n, r, a)}
              `}
        </div>
      </div>
    </div>
  `;
}
function ki(e, t) {
	return t || e || "theme";
}
function Ai(e, t, n, r = t) {
	let i = ca(t) ? this._getColorPickerValue(t) : "", a = i || (ca(t) ? this._getColorPickerValue(t) : this._getColorPickerValue(t || r)) || "#000000";
	return w`
    <div
      class="native-color-picker-field ${i ? "has-value" : ""}"
      @click=${(e) => e.stopPropagation()}
    >
      <input
        class="native-color-picker-input"
        type="color"
        .value=${a}
        @input=${(e) => n(e.target.value)}
        @change=${(e) => n(e.target.value)}
      />

      ${i ? w`
            <span
              class="native-color-picker-swatch"
              style=${`background-color:${i};`}
            ></span>
            <span class="native-color-picker-text">
              ${e ? w`
                    <span class="native-color-picker-label">
                      ${U(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value">
                ${i.toUpperCase()}
              </span>
            </span>
          ` : w`
            <span class="native-color-picker-empty-swatch"></span>
            <span class="native-color-picker-text">
              ${e ? w`
                    <span class="native-color-picker-label">
                      ${U(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value empty"></span>
            </span>
          `}

      ${i ? w`
            <button
              type="button"
              class="native-color-picker-clear"
              aria-label=${U(this, "Clear")}
              @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), n("");
	}}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          ` : ""}

      <ha-icon
        class="native-color-picker-arrow"
        icon="mdi:menu-down"
      ></ha-icon>
    </div>
  `;
}
function ji(e, t, n, r = t, i = "") {
	let a = t || r, o = sa(a) === "theme" ? Wi(a) || "theme" : "", s = zi.call(this), c = Mi.call(this, s, o);
	return w`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .getItems=${Ni.call(this, i, c)}
        .label=${e ? U(this, e) : ""}
        .value=${o}
        .rowRenderer=${(e) => Pi.call(this, e)}
        .valueRenderer=${(e) => Fi.call(this, c.find((t) => t.id === e))}
        .notFoundLabel=${U(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${!0}
        @value-changed=${(e) => {
		e.stopPropagation(), n(e.detail.value || "");
	}}
      ></ha-generic-picker>
    </div>
  `;
}
function Mi(e, t) {
	return !t || e.some((e) => e.id === t) ? e : [...e, Hi.call(this, {
		id: t,
		source: "theme"
	})];
}
function Ni(e, t) {
	this._themeColorItemGetters ||= /* @__PURE__ */ new Map();
	let n = this._themeColorItemGetters.get(e);
	return n ? n.items = t : (n = {
		items: t,
		getItems: () => n.items
	}, this._themeColorItemGetters.set(e, n)), n.getItems;
}
function Pi(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${Ii.call(this, e)}
      <span slot="headline">${e.primary}</span>
      ${Li.call(this, e)}
    </ha-combo-box-item>
  `;
}
function Fi(e) {
	return e ? w`
    ${Ii.call(this, e)}
    <span slot="headline">${e.primary}</span>
    ${Li.call(this, e)}
  ` : "";
}
function Ii(e) {
	return e.id === "theme" ? w`
      <ha-icon
        slot="start"
        class="theme-color-default-icon"
        icon="mdi:palette"
      ></ha-icon>
    ` : w`
    <span
      slot="start"
      class="theme-color-swatch"
      style=${`
        ${this._getColorStyle(e.id)}
        display: block;
        width: 20px;
        height: 20px;
        border-radius: var(--ha-border-radius-pill, 999px);
        border: 1px solid var(--outline-color, var(--divider-color));
        box-sizing: border-box;
      `}
    ></span>
  `;
}
function Li(e) {
	return e.isThemeColor ? w`
      <span
        slot="end"
        class="theme-source-badge theme-source-badge-theme"
        aria-label=${U(this, "Theme")}
      >T</span>
    ` : e.isStandardFallback ? w`
        <span
          slot="end"
          class="theme-source-badge theme-source-badge-standard"
          aria-label=${U(this, "Standard")}
        >S</span>
      ` : "";
}
function Ri() {
	let e = [], t = /* @__PURE__ */ new Set();
	for (let n of oa) {
		let r = Hi.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	for (let n of Gi.call(this)) {
		let r = Hi.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	return e;
}
function zi() {
	let e = Vi.call(this);
	if (this._themeColorItemsCache && this._themeColorItemsCacheKey === e) return this._themeColorItemsCache;
	let t = Ri.call(this);
	return this._themeColorItemsCache = t, this._themeColorItemsCacheKey = e, t;
}
function Bi() {
	let e = Vi.call(this);
	if (this._themeColorItemsCacheKey === e || this._themeColorWarmupScheduled === e) return;
	this._themeColorWarmupScheduled = e;
	let t = () => {
		this._themeColorWarmupScheduled === e && (zi.call(this), this._themeColorWarmupScheduled = "");
	};
	if (window.requestIdleCallback) {
		window.requestIdleCallback(t, { timeout: 500 });
		return;
	}
	window.setTimeout(t, 0);
}
function Vi() {
	return `${this?.hass?.locale?.language || this?.hass?.language || ""}|${this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || ""}|${this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? ""}|${Ki.call(this)}`;
}
function Hi(e) {
	let t = Ui(typeof e == "string" ? { id: e } : e), n = na(t.id), r = n && ra(t.id), i = !r && (t.source === "theme" || ea.call(this, t.id)), a = t.label ? U(this, t.label) : ia.call(this, t.id);
	return {
		id: t.id,
		primary: a,
		secondary: n ? U(this, "Color") : U(this, "Theme"),
		sorting_label: a,
		isStandardFallback: r,
		isThemeColor: i,
		search_labels: {
			color: t.id,
			label: a,
			source: r ? "standard" : i ? "theme" : "color"
		}
	};
}
function Ui(e) {
	return {
		...e,
		id: Wi(e.id),
		label: e.label || null
	};
}
function Wi(e) {
	if (!e) return "";
	let t = e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""), n = t.startsWith("color-") ? t.slice(6) : t;
	return aa[n] || n;
}
function Gi() {
	return qi.call(this).map((e) => Xi(e)).filter(Zi).map((e) => ({
		id: e,
		source: "theme"
	})).sort((e, t) => ia.call(this, e.id).localeCompare(ia.call(this, t.id), this?.hass?.locale?.language || this?.hass?.language || void 0, { sensitivity: "base" }));
}
function Ki() {
	return Ji.call(this).map(([e, t]) => `${e}:${t}`).join(",");
}
function qi() {
	return Ji.call(this).map(([e]) => e).sort();
}
function Ji() {
	let e = /* @__PURE__ */ new Set(), t = [], n = Yi.call(this);
	for (let [r, i] of Object.entries(n)) {
		let n = r.toLowerCase();
		Qi(n, i) && (e.has(n) || (e.add(n), t.push([n, i])));
	}
	return t.sort(([e], [t]) => e.localeCompare(t));
}
function Yi() {
	let e = this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || "", t = e ? this?.hass?.themes?.themes?.[e] : null;
	if (!t) return {};
	let { modes: n, ...r } = t, i = this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? !1 ? n?.dark : n?.light;
	return {
		...r,
		...i || {}
	};
}
function Xi(e) {
	return e.startsWith("color-") ? e.slice(6) : e;
}
function Zi(e) {
	return !!e && !/^\d+$/.test(e);
}
function Qi(e, t) {
	return !e || !(e.startsWith("color-") || e.startsWith("google-") || e.endsWith("-color") || e.includes("-color-")) ? !1 : $i(t);
}
function $i(e) {
	let t = e == null ? "" : e.toString().trim();
	return t ? /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(/i.test(t) || /^var\(\s*--[a-z0-9-_]*color[a-z0-9-_]*/i.test(t) || /^\d+\s*,\s*\d+\s*,\s*\d+/.test(t) : !1;
}
function ea(e) {
	let t = new Set(qi.call(this));
	return ta(e).some((e) => t.has(e));
}
function ta(e) {
	let t = Wi(e);
	if (!t) return [];
	let n = t.startsWith("color-") ? t : `color-${t}`;
	return t.endsWith("-color") ? [t, n] : [n, t];
}
function na(e) {
	return e === "theme" || e === "primary-color" || e === "accent-color" || lt(e);
}
function ra(e) {
	return lt(e) && !dt(e);
}
function ia(e) {
	return e === "theme" ? U(this, "State color (default)") : e === "light" ? U(this, "State Light color") : e === "primary-color" ? U(this, "Primary") : e === "primary-text-color" ? U(this, "Primary text color") : e === "card-background-color" ? U(this, "Card background") : e === "secondary-background-color" ? U(this, "Secondary background color") : e === "accent-color" ? U(this, "Accent") : e.replaceAll("-", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
var aa = {
	bluegrey: "blue-grey",
	darkgrey: "dark-grey",
	deeporange: "deep-orange",
	deeppurple: "deep-purple",
	lightblue: "light-blue",
	lightgreen: "light-green",
	lightgrey: "light-grey"
}, oa = [
	{
		id: "theme",
		label: "State color (default)"
	},
	{
		id: "light",
		label: "State Light color"
	},
	"primary-color",
	"card-background-color",
	"accent-color",
	"red",
	"pink",
	"purple",
	"deep-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"teal",
	"green",
	"light-green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deep-orange",
	"brown",
	"light-grey",
	"grey",
	"dark-grey",
	"blue-grey",
	"black",
	"white",
	"disabled",
	"state-icon-color",
	"state-inactive-color",
	"state-light-active-color",
	"gold",
	"violet",
	"google-red",
	"google-green",
	"google-yellow",
	"google-blue",
	"google-violet",
	"google-grey",
	"color-red",
	"color-green",
	"color-yellow",
	"color-amber",
	"color-blue",
	"color-purple",
	"color-violet",
	"color-grey",
	"color-darkgrey",
	"color-pink",
	"color-orange",
	"color-gold",
	"color-brown"
];
function sa(e) {
	let t = e?.toString().trim();
	return t && ca(t) ? "picker" : "theme";
}
function ca(e) {
	let t = e?.toString().trim().toLowerCase();
	return !!(t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")));
}
//#endregion
//#region src/common/editor/helpers/actions.js
function W(e, t) {
	return da(e?.hass, t) || fa[t] || t;
}
function la(e, t) {
	return pa(e?.hass, t) || t;
}
function ua(e) {
	e.stopPropagation();
}
function da(e, t) {
	if (!e?.localize || !t) return null;
	let n = [t, t.replaceAll("-", "_")].flatMap((e) => [
		`ui.panel.lovelace.editor.action-editor.actions.${e}`,
		`ui.panel.lovelace.editor.card.generic.action.actions.${e}`,
		`ui.panel.lovelace.editor.card.generic.action.${e}`,
		`ui.panel.lovelace.editor.card.config.action.actions.${e}`,
		`ui.panel.lovelace.editor.card.config.action.${e}`,
		`ui.components.action-input.editor.action.${e}`
	]);
	for (let r of n) {
		let n = e.localize(r);
		if (n && n !== r && n !== t) return n;
	}
	return null;
}
var fa = {
	"Current state": "Current state",
	"call-service": "Perform action",
	"more-info": "More info",
	navigate: "Navigate",
	none: "Nothing",
	popup: "Popup",
	"perform-action": "Perform action",
	toggle: "Toggle",
	url: "URL"
};
function pa(e, t) {
	if (!e?.localize || !t) return null;
	let n = ma[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
var ma = {
	content: ["ui.panel.lovelace.editor.card.markdown.content"],
	entity_id: ["ui.dialogs.entity_registry.editor.entity_id", "ui.panel.lovelace.unused_entities.entity_id"],
	path: ["ui.panel.lovelace.editor.action-editor.navigation_path", "ui.panel.lovelace.editor.edit_view.path"],
	service: ["ui.panel.developer-tools.tabs.actions.actions.call_service", "ui.panel.config.devices.type.service_heading"],
	title: ["ui.panel.lovelace.editor.edit_lovelace.title", "ui.panel.lovelace.dashboards.picker.headers.title"],
	url: ["ui.panel.lovelace.editor.action-editor.url_path"]
};
function ha(e, t, n, { extraActions: r = [] } = {}) {
	let i = this._config?.[t], a = typeof n == "object" ? n : { action: n || "none" }, o = i && typeof i == "object" ? Ra(i, a) : a, s = o.action || a.action || "none", c = new Set(r.map((e) => e.id)), l = [...r, ...ka(this).filter((e) => !c.has(e.id))];
	return w`
    <div class="field action-field">
      <div class="action-picker">
        <ha-generic-picker
          .label=${U(this, e)}
          .value=${s}
          .getItems=${() => l}
          .rowRenderer=${(e) => Aa(e)}
          .valueRenderer=${(e) => ja(l.find((t) => t.id === e))}
          .notFoundLabel=${U(this, "No matching actions")}
          .noSort=${!0}
          @value-changed=${(e) => {
		e.stopPropagation();
		let n = Oa(e) || "none";
		this._updateConfig({ [t]: La(this, n, o) }), this.requestUpdate?.();
	}}
        ></ha-generic-picker>
      </div>

      ${s === "navigate" ? Na.call(this, t, o) : ""}

      ${s === "call-service" ? Pa.call(this, t, o) : ""}

      ${s === "url" ? Fa.call(this, t, o) : ""}

      ${s === "popup" ? Ia.call(this, t, o) : ""}
    </div>
  `;
}
function G({ interactions: e = [], title: t = "Interactions", expanded: n = !1, context: r = {}, config: i = this._config, onChange: a } = {}) {
	let o = e.filter(Boolean);
	if (!o.length) return "";
	let s = o.filter((e) => ga(i, e)), c = o.filter((e) => !s.includes(e)), l = [{
		name: "interactions",
		type: "expandable",
		flatten: !0,
		expanded: n,
		icon: "mdi:gesture-tap-button",
		schema: [...s.map((e) => _a(e, r, i, this)), {
			name: "",
			type: "optional_actions",
			flatten: !0,
			schema: c.map((e) => _a(e, r, i, this))
		}]
	}], u = va(i, o);
	return w`
    <ha-form
      class="interactions-form"
      .hass=${this.hass}
      .data=${u}
      .schema=${l}
      .computeLabel=${(e) => xa(this, e, o, t)}
      @value-changed=${(e) => {
		e.stopPropagation();
		let t = ya(e.detail.value || {}, o, i);
		a ? a(t) : this._updateConfig(t), this.requestUpdate?.();
	}}
    ></ha-form>
  `;
}
function ga(e = {}, t) {
	return t.defaultVisible && !Ca(e?.[t.key]);
}
function _a(e, t, n, r) {
	let i = Sa(e.defaultAction), a = n?.[e.key];
	if (e.customDefaultLabel && !a) {
		let t = wa(i);
		return {
			name: e.formKey || e.key,
			selector: { select: {
				mode: "dropdown",
				options: [{
					value: "__default__",
					label: `${U(r, "Default")} (${U(r, e.customDefaultLabel)})`
				}, ...t.map((e) => ({
					value: e,
					label: W(r, e)
				}))]
			} }
		};
	}
	return {
		name: e.formKey || e.key,
		selector: { ui_action: {
			actions: wa(i),
			default_action: i
		} },
		...t ? { context: t } : {}
	};
}
function va(e = {}, t) {
	return t.reduce((t, n) => {
		let r = n.formKey || n.key;
		if (n.customDefaultLabel && !e?.[n.key]) return t[r] = "__default__", t;
		let i = e?.[n.key] || (n.displayDefaultValue ? Ta(n.defaultAction) : void 0);
		return i && typeof i == "object" && i.action !== "popup" && (!Ca(i) || Sa(n.defaultAction) !== "none") && (t[r] = Ea(i)), t;
	}, {});
}
function ya(e, t, n = {}) {
	return t.reduce((t, r) => {
		let i = r.formKey || r.key;
		if (r.customDefaultLabel && typeof e[i] == "string") return t[r.key] = e[i] === "__default__" ? void 0 : { action: e[i] }, t;
		let a = n?.[r.key], o = Da(ba(e[i], a), r.defaultAction);
		return t[r.key] = n?.[r.key]?.action === "popup" && !(i in e) ? n[r.key] : o, t;
	}, {});
}
function ba(e, t) {
	if (!e || typeof e != "object" || e.action !== "more-info" || e.entity || e.entity_id || t?.action !== "more-info") return e;
	let n = t.entity || t.entity_id;
	return n ? {
		...e,
		entity: n
	} : e;
}
function xa(e, t, n, r) {
	return t.name === "interactions" ? U(e, r) : U(e, n.find((e) => (e.formKey || e.key) === t.name)?.label || t.name);
}
function Sa(e) {
	let t = typeof e == "string" ? e : e?.action || "none";
	return t === "call-service" ? "perform-action" : t;
}
function Ca(e) {
	return e?.action === "none";
}
function wa(e) {
	let t = [
		"more-info",
		"toggle",
		"navigate",
		"url",
		"perform-action",
		"assist"
	];
	return e && e !== "none" && !t.includes(e) && t.unshift(e), e === "none" ? t : [...t, "none"];
}
function Ta(e) {
	return typeof e == "string" ? { action: e } : e || { action: "none" };
}
function Ea(e) {
	if (!e || typeof e != "object") return e;
	let t = e.action === "call-service" ? "perform-action" : e.action;
	if (t !== "perform-action") return {
		...e,
		action: t
	};
	let n = {
		...e,
		action: t,
		perform_action: e.perform_action || e.service || ""
	};
	return e.service_data && !e.data && (n.data = e.service_data), delete n.service, delete n.service_data, n;
}
function Da(e, t) {
	if (!(!e || typeof e != "object") && !(e.action === "none" && Sa(t) === "none")) {
		if (e.action === "perform-action") {
			let t = {
				...e,
				action: "call-service",
				service: e.perform_action || e.service || ""
			};
			return e.data && !e.service_data && (t.service_data = e.data), delete t.perform_action, delete t.data, K(t);
		}
		return K(e);
	}
}
function Oa(e) {
	let t = e.detail?.value ?? e.detail?.item?.id ?? e.target?.value ?? "";
	return typeof t == "object" ? t.id || t.value || "" : t;
}
function ka(e) {
	return [
		{
			id: "toggle",
			primary: W(e, "toggle"),
			icon: "mdi:toggle-switch"
		},
		{
			id: "more-info",
			primary: W(e, "more-info"),
			icon: "mdi:information-outline"
		},
		{
			id: "navigate",
			primary: W(e, "navigate"),
			icon: "mdi:arrow-right"
		},
		{
			id: "call-service",
			primary: W(e, "perform-action"),
			icon: "mdi:flash"
		},
		{
			id: "url",
			primary: W(e, "url"),
			icon: "mdi:open-in-new"
		},
		{
			id: "popup",
			primary: W(e, "popup"),
			icon: "mdi:window-open"
		},
		{
			id: "none",
			primary: W(e, "none"),
			icon: "mdi:close-circle-outline"
		}
	];
}
function Aa(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${Ma(e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function ja(e) {
	return e ? w`
    ${Ma(e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function Ma(e) {
	return w`
    <ha-icon
      slot="start"
      .icon=${e.icon}
    ></ha-icon>
  `;
}
function Na(e, t) {
	return installEntityFilterScrollGuard(), w`
    <div class="inline-field action-subfield">
      <ha-navigation-picker
        @click=${ua}
        @pointerdown=${ua}
        @wheel=${ua}
        @touchmove=${ua}
        @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
        .hass=${this.hass}
        .value=${t.navigation_path || ""}
        @value-changed=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: K({
			...t,
			navigation_path: n.detail.value || ""
		}) });
	}}
      ></ha-navigation-picker>
    </div>
  `;
}
function Pa(e, t) {
	let n = {
		action: t.perform_action || t.service || "",
		...t.data || t.service_data ? { data: t.data || t.service_data } : {},
		...t.target ? { target: t.target } : {}
	};
	return w`
    <div class="inline-field action-subfield">
      <ha-service-control
        .hass=${this.hass}
        .value=${n}
        narrow
        @value-changed=${(n) => {
		n.stopPropagation();
		let r = n.detail.value || {};
		this._updateConfig({ [e]: K({
			...t,
			service: r.action || "",
			service_data: r.data,
			target: r.target
		}) });
	}}
      ></ha-service-control>
    </div>
  `;
}
function Fa(e, t) {
	return w`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${la(this, "url")}
        .value=${t.url_path || ""}
        @input=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: K({
			...t,
			url_path: n.target.value
		}) });
	}}
      ></ha-input>
    </div>
  `;
}
function Ia(e, t) {
	return w`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${la(this, "title")}
        .value=${t.popup_title || ""}
        .placeholder=${"Security"}
        @input=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: K({
			...t,
			popup_title: n.target.value
		}) });
	}}
      ></ha-input>
    </div>

    <div class="inline-field action-subfield">
      <ha-input
        .label=${la(this, "content")}
        .value=${typeof t.popup_content == "string" ? t.popup_content : t.popup_content ? JSON.stringify(t.popup_content) : ""}
        @input=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: K({
			...t,
			popup_content: n.target.value
		}) });
	}}
      ></ha-input>
    </div>
  `;
}
function La(e, t, n) {
	let r = K({
		...n,
		action: t
	});
	return t === "popup" ? K({
		...r,
		popup_title: r.popup_title || U(e, "Security"),
		popup_content: r.popup_content || {
			type: "vertical-stack",
			cards: [{
				type: "tile",
				entity: "alarm_control_panel.house_alarm",
				vertical: !0
			}]
		},
		style: r.style || "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;"
	}) : r;
}
function Ra(e, t) {
	let n = e.action === "perform-action" ? "call-service" : e.action;
	return K({
		...t,
		...e,
		action: n || t.action || "none"
	});
}
function K(e) {
	let t = e?.action === "perform-action" ? "call-service" : e?.action || "none", n = { action: t };
	if (t === "navigate") return n.navigation_path = e.navigation_path || "", n;
	if (t === "more-info") {
		let t = e.entity || e.entity_id;
		return t && (n.entity = t), n;
	}
	return t === "call-service" ? (n.service = e.service || e.perform_action || "", (e.service_data || e.data) && (n.service_data = { ...e.service_data || e.data }), e.target && (n.target = { ...e.target }), n) : t === "url" ? (n.url_path = e.url_path || "", n) : t === "popup" ? (n.popup_title = e.popup_title || "", n.popup_content = e.popup_content || "", e.style && (n.style = e.style), e.card_mod && (n.card_mod = e.card_mod), n) : n;
}
//#endregion
//#region src/common/editor/helpers/renders.js
function za({ value: e = "", includeDomains: t, excludeDomains: n, multiple: r = !1, onValueChanged: i, filterOptions: a, activeFilter: o = "all", className: s = "entity-picker" } = {}) {
	let c = a?.length ? a.map((e) => ({
		...e,
		label: Ba.call(this, e)
	})) : null, l = c ? Ha(c) : t;
	return r ? w`
      <ha-selector
        class=${s}
        .hass=${this.hass}
        .selector=${{ entity: {
		...l?.length ? { filter: { domain: l } } : {},
		...n?.length ? { exclude_domains: n } : {},
		multiple: !0
	} }}
        .value=${e || ""}
        @value-changed=${(e) => i?.(e.detail.value || "")}
      ></ha-selector>
    ` : c?.length ? Wa.call(this, {
		value: e,
		includeDomains: t,
		excludeDomains: n,
		filters: c,
		activeFilter: o,
		className: s,
		onValueChanged: i
	}) : w`
    <ha-entity-picker
      class=${s}
      .hass=${this.hass}
      .includeDomains=${l}
      .excludeDomains=${n}
      .value=${e || ""}
      @value-changed=${(e) => i?.(e.detail.value || "")}
    ></ha-entity-picker>
  `;
}
function Ba(e) {
	if (e.haDomains?.length) {
		let t = e.haDomains.map((e) => Va(this?.hass, e)).filter(Boolean);
		if (t.length) return t.join(" / ");
	}
	return U(this, e.label);
}
function Va(e, t) {
	if (!e?.localize || !t) return null;
	let n = [`component.${t}.entity_component._.name_plural`, `component.${t}.entity_component._.name`];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Ha(e = []) {
	if (e.some((e) => e.value === "all" && (!e.domains || e.domains.length === 0))) return;
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => e.domains?.forEach((e) => t.add(e))), [...t];
}
var Ua = !1;
function Wa({ value: e, includeDomains: t, excludeDomains: n, filters: r, activeFilter: i, className: a, onValueChanged: o }) {
	to();
	let s = r.map((e) => ({
		id: e.value,
		label: e.label
	}));
	return w`
    <ha-generic-picker
      class=${a}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Entity"}
      .getItems=${(e, i) => Ga.call(this, {
		search: e,
		section: i,
		filters: r,
		includeDomains: t,
		excludeDomains: n
	})}
      .valueRenderer=${(e) => qa.call(this, e)}
      .rowRenderer=${Ja}
      .sections=${s}
      .selectedSection=${i || r[0]?.value || "all"}
      @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
      @value-changed=${(e) => o?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function Ga({ search: e, section: t, filters: n, includeDomains: r, excludeDomains: i }) {
	let a = n.find((e) => e.value === (t || "all"))?.domains, o = a?.length ? a : r, s = new Set(i || []), c = (e || "").trim().toLowerCase();
	return Object.values(this.hass?.states || {}).filter((e) => {
		let t = $a(e.entity_id);
		return o?.length && !o.includes(t) ? !1 : !s.has(t);
	}).map((e) => Ka.call(this, e)).filter((e) => Ya(e, c)).sort(Xa);
}
function Ka(e) {
	let t = Za(e), n = $a(e.entity_id), r = Qa(this.hass, e);
	return {
		id: e.entity_id,
		primary: t,
		secondary: r,
		sorting_label: `${t}_${e.entity_id}`,
		stateObj: e,
		domain: n,
		domainLabel: eo(n),
		searchText: [
			t,
			e.entity_id,
			n,
			eo(n),
			r,
			e.attributes?.device_class
		].filter(Boolean).join(" ").toLowerCase()
	};
}
function qa(e) {
	let t = this.hass?.states?.[e], n = t ? Za(t) : e, r = t ? Qa(this.hass, t) : void 0;
	return w`
    ${t ? w`<state-badge slot="start" .stateObj=${t}></state-badge>` : ""}
    <span slot="headline">${n}</span>
    ${r ? w`<span slot="supporting-text">${r}</span>` : ""}
  `;
}
function Ja(e, t) {
	return w`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <state-badge slot="start" .stateObj=${e.stateObj}></state-badge>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? w`<span slot="supporting-text">${e.secondary}</span>` : ""}
      <div slot="trailing-supporting-text" class="domain">
        ${e.domainLabel}
      </div>
    </ha-combo-box-item>
  `;
}
function Ya(e, t) {
	return t ? t.split(/\s+/).every((t) => e.searchText.includes(t)) : !0;
}
function Xa(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function Za(e) {
	return e.attributes?.friendly_name || e.entity_id;
}
function Qa(e, t) {
	let n = e?.entities?.[t.entity_id], r = n?.device_id ? e?.devices?.[n.device_id] : void 0, i = n?.area_id || r?.area_id || t.attributes?.area_id;
	return i ? e?.areas?.[i]?.name : void 0;
}
function $a(e = "") {
	return e.split(".")[0] || "";
}
function eo(e = "") {
	return e.split("_").filter(Boolean).map((e) => e[0]?.toUpperCase() + e.slice(1)).join(" ");
}
function to() {
	if (Ua) return;
	let e = Element.prototype.scrollIntoView;
	Element.prototype.scrollIntoView = function(...t) {
		if (ro(this)) {
			no(this);
			return;
		}
		return e.apply(this, t);
	}, Ua = !0;
}
function no(e) {
	let t = e;
	for (; t;) {
		if (t.tagName?.toLowerCase?.() === "lit-virtualizer") {
			t.scrollTop = 0;
			return;
		}
		let e = t.getRootNode?.();
		if (e?.host && e.host !== t) {
			t = e.host;
			continue;
		}
		t = t.parentNode || t.host;
	}
}
function ro(e) {
	let t = e;
	for (; t;) {
		if (t.__orbitSuppressSectionScroll) return !0;
		let e = t.getRootNode?.();
		if (e?.host && e.host !== t) {
			t = e.host;
			continue;
		}
		t = t.parentNode || t.host;
	}
	return !1;
}
function io({ value: e = "", onValueChanged: t, className: n = "entity-picker" } = {}) {
	return w`
    <ha-generic-picker
      class=${n}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Area"}
      .getItems=${() => ao.call(this)}
      .valueRenderer=${(e) => so.call(this, e)}
      .rowRenderer=${co}
      @value-changed=${(e) => t?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function ao() {
	return Object.values(this.hass?.areas || {}).map((e) => oo.call(this, e)).sort(uo);
}
function oo(e) {
	let t = e.name || e.area_id, n = lo(this.hass, e);
	return {
		id: e.area_id,
		primary: t,
		secondary: n,
		sorting_label: t,
		icon: e.icon || "mdi:texture-box"
	};
}
function so(e) {
	let t = this.hass?.areas?.[e], n = t ? oo.call(this, t) : {
		id: e,
		primary: e,
		icon: "mdi:texture-box"
	};
	return w`
    <ha-icon slot="start" .icon=${n.icon}></ha-icon>
    <span slot="headline">${n.primary}</span>
    ${n.secondary ? w`<span slot="supporting-text">${n.secondary}</span>` : ""}
  `;
}
function co(e, t) {
	return w`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? w`<span slot="supporting-text">${e.secondary}</span>` : ""}
    </ha-combo-box-item>
  `;
}
function lo(e, t) {
	let n = t.floor_id;
	return n ? e?.floors?.[n]?.name : void 0;
}
function uo(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function fo(e, t, n) {
	return w`
    <div class="field">
      <label>${U(this, e, n)}</label>

      ${za.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function po(e, t) {
	return w`
    <div class="field">
      ${io.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleConfigUpdate ? this._handleConfigUpdate(t, e) : this._updateConfig({ [t]: e })
	})}
    </div>
  `;
}
//#endregion
//#region src/common/editor/helpers/helpers.js
function mo(e) {
	e._editorPopoverCloseHandler || (e._editorPopoverCloseHandler = (t) => {
		!e._iconPickerKey && !e._colorPickerKey || go(t.composedPath?.() || []) || (e._iconPickerKey = "", e._colorPickerKey = "", e._iconFilePickerOpen = !1, e._iconFileSearch = "", e._themeColorPickerOpen = !1, e._themeColorSearch = "", e.requestUpdate?.());
	}, document.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0));
}
function ho(e) {
	e._editorPopoverCloseHandler &&= (document.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), null);
}
function go(e) {
	return e.some((e) => {
		let t = e?.classList, n = e?.tagName?.toLowerCase?.();
		return t?.contains("icon-popover") || t?.contains("color-popover") || t?.contains("icon-preview") || t?.contains("color-preview") || t?.contains("color-control-button") || t?.contains("mdc-menu-surface") || n === "ha-generic-picker" || n === "ha-icon-picker" || n === "ha-combo-box" || n === "ha-combo-box-item" || n === "mwc-list" || n === "mwc-list-item";
	});
}
function _o(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${ct(n)};` : "background-color: rgb(var(--color-theme));";
}
function vo(e) {
	let t = e?.toString().trim();
	return t && (So(t) || Co(t) || yo(t)) || "#ffffff";
}
function yo(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = ft(n), i = dt(n) ? xo(r) : "", a = lt(n) ? xo(`${n}-color`) : "", o = xo(n), s = n.startsWith("color-") ? "" : xo(`color-${n}`);
	return bo(i, t) || bo(a, t) || bo(o, t) || bo(s, t) || "";
}
function bo(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = So(n);
	if (r) return r;
	let i = Co(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? yo(a[1], t) : "";
}
function xo(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function So(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function Co(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return wo(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? wo(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function wo(e, t, n) {
	return `#${To(e)}${To(t)}${To(n)}`;
}
function To(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
//#endregion
//#region src/common/editor/helpers/name-picker.js
function Eo({ label: e = "Name", valueKey: t, legacyValueKey: n = "", entityKey: r = "main_entity", areaKey: i = "area", defaultType: a = "", defaultMode: o = "composed", modeKey: s = t, templateKey: c = "", templateLabel: l = "Template" } = {}) {
	return Do.call(this), c || !customElements.get("ha-entity-name-picker") ? Oo.call(this, {
		label: e,
		valueKey: t,
		entityKey: r,
		areaKey: i,
		defaultType: a,
		defaultMode: o,
		modeKey: s,
		templateKey: c,
		templateLabel: l
	}) : w`
    <div class="field name-picker-field">
      <ha-entity-name-picker
        .hass=${this.hass}
        .label=${this._t(e)}
        .entityId=${qo.call(this, {
		entityKey: r,
		areaKey: i
	})}
        .value=${Bo(this._config, {
		valueKey: t,
		legacyValueKey: n,
		entityKey: r,
		areaKey: i,
		defaultType: a
	})}
        @value-changed=${(e) => {
		e.stopPropagation(), Uo.call(this, {
			valueKey: t,
			legacyValueKey: n,
			value: Wo(e.detail.value, this._config, {
				entityKey: r,
				areaKey: i,
				defaultType: a
			})
		});
	}}
      ></ha-entity-name-picker>
    </div>
  `;
}
function Do() {
	customElements.get("ha-entity-name-picker") || this._namePickerRenderQueued || (this._namePickerRenderQueued = !0, customElements.whenDefined("ha-entity-name-picker").then(() => {
		this._namePickerRenderQueued = !1, this.requestUpdate?.();
	}));
}
function Oo(e) {
	let t = No(this._config, Po(this, e.modeKey), e);
	return w`
    <div class="field name-picker-field name-picker-fallback">
      <div class="field-header">
        <label>${this._t(e.label)}</label>

        <ha-selector
          class="editor-header-button-toggle name-picker-mode-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
		...e.templateKey ? [{
			label: this._t("Template"),
			value: "template"
		}] : [],
		{
			label: Zo(this, "composed"),
			value: "composed"
		},
		{
			label: Zo(this, "custom"),
			value: "custom"
		}
	] } }}
          .value=${t}
          @value-changed=${(t) => {
		t.stopPropagation();
		let n = t.detail.value || "composed";
		if (Fo(this, e.modeKey, n), !(e.templateKey && (this._updateConfig({
			[e.valueKey]: void 0,
			...e.legacyValueKey ? { [e.legacyValueKey]: void 0 } : {},
			[e.templateKey]: n === "template" ? this._config?.[e.templateKey] : void 0
		}), n === "template" || n === "composed"))) {
			if (n === "composed") {
				Uo.call(this, {
					valueKey: e.valueKey,
					legacyValueKey: e.legacyValueKey,
					value: void 0
				});
				return;
			}
			if (typeof Ho(this._config, e) != "string") {
				Uo.call(this, {
					valueKey: e.valueKey,
					legacyValueKey: e.legacyValueKey,
					value: void 0
				});
				return;
			}
			this.requestUpdate?.();
		}
	}}
        ></ha-selector>
      </div>

      ${t === "template" ? this._renderTemplateInput(e.templateLabel, e.templateKey, { hideLabel: !0 }) : t === "custom" ? ko.call(this, e) : Ao.call(this, e)}
    </div>
  `;
}
function ko(e) {
	return w`
    <ha-selector
      class="name-picker-custom-input"
      .hass=${this.hass}
      .selector=${{ text: {} }}
      .value=${typeof Ho(this._config, e) == "string" ? Ho(this._config, e) : ""}
      @value-changed=${(t) => {
		t.stopPropagation(), Uo.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: t.detail.value || void 0
		});
	}}
    ></ha-selector>
  `;
}
function Ao(e) {
	let t = Io(this._config, e), n = Ro.call(this, t, e);
	return w`
    <ha-generic-picker
      class="name-picker-composed-picker"
      .hass=${this.hass}
      .value=${""}
      .placeholder=${this._t(e.label)}
      .getItems=${() => n}
      allow-custom-value
      .customValueLabel=${es(this)}
      .rowRenderer=${(e) => w`
        <ha-combo-box-item type="button" compact>
          <span slot="headline">${e.primary}</span>
          ${e.secondary ? w`<span slot="supporting-text">${e.secondary}</span>` : ""}
        </ha-combo-box-item>
      `}
      .noSort=${!0}
      .searchLabel=${$o(this)}
      @value-changed=${(n) => {
		n.stopPropagation();
		let r = zo(n.detail.value);
		r && (Fo(this, e.modeKey, "composed"), Uo.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: Wo([...t, r], this._config, e)
		}));
	}}
    >
      <div slot="field" class="name-picker-composed-field">
        ${t.map((n, r) => jo.call(this, n, r, t, e))}

        <button
          type="button"
          class="name-picker-add-chip"
          @click=${(e) => Mo(e)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          <span>${Qo(this)}</span>
        </button>
      </div>
    </ha-generic-picker>
  `;
}
function jo(e, t, n, r) {
	return w`
    <button
      type="button"
      class="name-picker-chip"
      @click=${(e) => Mo(e)}
    >
      <ha-icon icon="mdi:drag-horizontal-variant"></ha-icon>
      <span>${Lo.call(this, e)}</span>
      <ha-icon
        class="name-picker-chip-remove"
        icon="mdi:close"
        @click=${(e) => {
		e.preventDefault(), e.stopPropagation();
		let i = n.filter((e, n) => n !== t);
		Uo.call(this, {
			valueKey: r.valueKey,
			legacyValueKey: r.legacyValueKey,
			value: Wo(i, this._config, r)
		});
	}}
      ></ha-icon>
    </button>
  `;
}
function Mo(e) {
	e.preventDefault(), e.stopPropagation(), e.currentTarget?.closest("ha-generic-picker")?.open?.();
}
function No(e = {}, t, n) {
	if (n.templateKey && Vo(e, n.templateKey)) return "template";
	let r = Ho(e, n);
	return typeof r == "string" ? "custom" : r ? "composed" : t || n.defaultMode || "composed";
}
function Po(e, t) {
	return e._namePickerModes?.[t];
}
function Fo(e, t, n) {
	e._namePickerModes = {
		...e._namePickerModes,
		[t]: n
	};
}
function Io(e = {}, t) {
	let n = Bo(e, t);
	return !n || typeof n == "string" ? [] : Array.isArray(n) ? n : [n];
}
function Lo(e) {
	return e ? e.type === "text" ? `"${e.text || ""}"` : e.type === "area" ? this._t("Area") : e.type === "entity" ? this._t("Entity") : ts(this, e.type) : "";
}
function Ro(e = [], t) {
	let n = [], r = new Set(e.filter((e) => e?.type && e.type !== "text").map((e) => e.type)), i = t.areaKey && this._config?.[t.areaKey] ? this.hass?.areas?.[this._config[t.areaKey]] : null, a = qo.call(this, t), o = a ? this.hass?.states?.[a] : null;
	if (i && !r.has("area")) n.push({
		id: "area",
		primary: this._t("Area"),
		secondary: i.name || ""
	});
	else if (o && !r.has("area")) {
		let e = Yo(this.hass, o, "area");
		e && n.push({
			id: "area",
			primary: this._t("Area"),
			secondary: e
		});
	}
	if (o) {
		r.has("entity") || n.push({
			id: "entity",
			primary: this._t("Entity"),
			secondary: Yo(this.hass, o, "entity")
		});
		let e = Yo(this.hass, o, "device");
		e && !r.has("device") && n.push({
			id: "device",
			primary: ts(this, "device"),
			secondary: e
		});
		let i = Xo(this.hass, this._config?.[t.areaKey]) || Yo(this.hass, o, "floor");
		i && !r.has("floor") && n.push({
			id: "floor",
			primary: ts(this, "floor"),
			secondary: i
		});
	}
	return n;
}
function zo(e) {
	if (e) return [
		"area",
		"device",
		"entity",
		"floor"
	].includes(e) ? { type: e } : {
		type: "text",
		text: e
	};
}
function Bo(e = {}, t) {
	let n = Ho(e, t);
	if (n !== void 0) return n;
	if (t.defaultType === "area" && e[t.areaKey]) return { type: "area" };
	if (t.defaultType === "entity" && (e[t.entityKey] || e.entity)) return { type: "entity" };
}
function Vo(e = {}, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0 && e[t] !== "";
}
function Ho(e = {}, t) {
	if (Vo(e, t.valueKey)) return e[t.valueKey];
	if (t.legacyValueKey && Vo(e, t.legacyValueKey)) return e[t.legacyValueKey];
}
function Uo({ valueKey: e, legacyValueKey: t, value: n }) {
	if (t && typeof this._updateConfig == "function") {
		this._updateConfig({
			[e]: n,
			[t]: void 0
		});
		return;
	}
	this._handleConfigUpdate(e, n);
}
function Wo(e, t = {}, n) {
	if (!(!e || Array.isArray(e) && e.length === 0) && !(n.defaultType && Go(t, n) && Ko(e, n.defaultType))) return e;
}
function Go(e = {}, t) {
	return t.defaultType === "area" ? !!e[t.areaKey] : t.defaultType === "entity" ? !!(e[t.entityKey] || e.entity) : !1;
}
function Ko(e, t) {
	let n = Array.isArray(e) ? e : [e];
	return n.length === 1 && n[0] && typeof n[0] == "object" && n[0].type === t;
}
function qo(e) {
	return this._config?.[e.entityKey] || this._config?.entity || Jo(this.hass, this._config?.[e.areaKey]);
}
function Jo(e, t) {
	if (!e || !t) return "";
	let n = e.entities || {}, r = e.devices || {};
	for (let i of Object.keys(e.states || {})) {
		let e = n[i];
		if (e?.area_id === t || e?.device_id && r[e.device_id]?.area_id === t) return i;
	}
	return "";
}
function Yo(e, t, n) {
	return !t || typeof e?.formatEntityName != "function" ? n === "entity" && (t?.attributes?.friendly_name || t?.entity_id) || "" : e.formatEntityName(t, { type: n }) || "";
}
function Xo(e, t) {
	let n = t && e?.areas?.[t] ? e.areas[t].floor_id : "";
	return n && e?.floors?.[n] && e.floors[n].name || "";
}
function Zo(e, t) {
	let n = `ui.components.entity.entity-name-picker.mode_${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t === "custom" ? e._t("Custom") : "Composed";
}
function Qo(e) {
	let t = "ui.components.entity.entity-name-picker.add", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Add");
}
function $o(e) {
	let t = "ui.components.entity.entity-name-picker.search", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Search");
}
function es(e) {
	let t = "ui.components.entity.entity-name-picker.custom_name", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Name");
}
function ts(e, t) {
	let n = `ui.components.entity.entity-name-picker.types.${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t;
}
//#endregion
//#region src/editors/area/sections/area.js
function ns() {
	return w`
    <div class="section">
      ${is.call(this)}

      ${this._renderArea("Area", "area")}

      ${this._renderColor(["Accent", "Color"], "accent_color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${as.call(this)}

      ${G.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: rs(this._config),
				defaultVisible: !0,
				displayDefaultValue: !0
			},
			{
				key: "hold_action",
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: "double_tap_action",
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			},
			this._config?.main_entity ? {
				key: "main_entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: "more-info",
				defaultVisible: !0
			} : null,
			this._config?.main_entity ? {
				key: "main_entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			} : null,
			this._config?.main_entity ? {
				key: "main_entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none"
			} : null
		],
		context: {
			entity_id: this._config?.main_entity,
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
function rs(e = {}) {
	return {
		action: "navigate",
		navigation_path: e.tap_action?.navigation_path || e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function is() {
	return Eo.call(this, {
		label: "Name",
		valueKey: "area_name",
		legacyValueKey: "room_name",
		entityKey: "main_entity",
		areaKey: "area",
		defaultType: "area"
	});
}
function as() {
	return B.call(this, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "main_entity",
		areaKey: "area",
		allowArea: !0,
		customIconKeys: [
			"main_entity_icon",
			"main_entity_icon_on",
			"main_entity_icon_off"
		],
		renderCustom() {
			return w`
        ${this._renderIconInput("", "main_entity_icon")}

        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "main_entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "main_entity_icon_off")}
        </div>
      `;
		}
	});
}
//#endregion
//#region src/editors/area/sections/buttons.js
function os() {
	let e = this._selectedButtonIndex || 1;
	return w`
    <div class="section">
      ${ss.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${cs.call(this, e)}
    </div>
  `;
}
function ss(e, t, n) {
	return w`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
      ${e.map((e) => w`
        <button
          type="button"
          class="editor-segment-item ${t === e ? "active" : ""}"
          @click=${() => n(e)}
        >
          ${this._t("Button {index}", { index: e })}
        </button>
      `)}
    </div>
  `;
}
function cs(e) {
	let t = `button${e}`, n = this._areaButtonDomainFilter || "all";
	return w`
    <div class="sub-section selected-button-section">
      <div class="field">
        <label>${this._t("Entity")}</label>

        ${za.call(this, {
		value: this._config?.[t] || "",
		filterOptions: ls,
		activeFilter: n,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
      </div>

      <div class="color-pair">
        ${this._renderColor(["Active", "Color"], `${t}_on_color`, "theme")}
        ${this._renderColor(["Inactive", "Color"], `${t}_off_color`, "theme")}
      </div>

      ${B.call(this, {
		label: "Icon",
		sourceKey: `${t}_icon_source`,
		entityKey: t,
		customIconKeys: [
			`${t}_icon`,
			`${t}_icon_on`,
			`${t}_icon_off`
		],
		renderCustom() {
			return w`
            ${this._renderIconInput("", `${t}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${t}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${t}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${t}_state_template`)}

      ${G.call(this, {
		interactions: [
			{
				key: `${t}_tap_action`,
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: "toggle",
				defaultVisible: !0
			},
			{
				key: `${t}_hold_action`,
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "more-info"
			},
			{
				key: `${t}_double_tap_action`,
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: this._config?.[t],
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
var ls = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Lights",
		haDomains: ["light"],
		value: "light",
		domains: ["light"]
	},
	{
		label: "Switches",
		haDomains: ["switch"],
		value: "switch",
		domains: ["switch"]
	}
];
//#endregion
//#region src/editors/area/sections/curve-buttons.js
function us() {
	let e = this._selectedCurveButtonIndex || 1;
	return w`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock curve button positions")}</span>
        <ha-switch
          .checked=${!!this._config?.curve_buttons_lock_position}
          @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.checked })}
        ></ha-switch>
      </label>

      <div class="curve-divider"></div>

      ${fs.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${ps.call(this, `curve_button${e}`, "", "more-info", { index: e }, {
		showColors: !0,
		filteredEntity: !0,
		filterKey: "_areaCurveButtonDomainFilter",
		filters: hs
	})}
    </div>
  `;
}
function ds() {
	let e = Vn(this._config?.action_button);
	return w`
    <div class="section">
      ${ps.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function fs(e, t, n) {
	return w`
    <div class="editor-segment-menu">
      ${e.map((e) => w`
        <button
          type="button"
          class="editor-segment-item ${t === e ? "active" : ""}"
          @click=${() => n(e)}
        >
          ${this._t("Button {index}", { index: e })}
        </button>
      `)}
    </div>
  `;
}
function ps(e, t, n, r = {}, i = {}) {
	let a = this._config?.[e];
	return w`
    <div class="sub-section selected-button-section">
      ${t ? w`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? gs.call(this, "Entity", e, i) : this._renderEntity("Entity", e)}

      ${i.showColors ? w`
            <div class="color-pair">
              ${_s.call(this, ["Active", "Color"], `${e}_on_color`)}
              ${_s.call(this, ["Inactive", "Color"], `${e}_off_color`)}
            </div>
          ` : ""}

      ${B.call(this, {
		label: "Icon",
		sourceKey: `${e}_icon_source`,
		entityKey: e,
		customIconKeys: [
			`${e}_icon`,
			`${e}_icon_on`,
			`${e}_icon_off`
		],
		renderCustom() {
			return w`
            ${this._renderIconInput("", `${e}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${e}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${e}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${e}_state_template`)}

      ${G.call(this, {
		interactions: [
			{
				key: `${e}_tap_action`,
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: n,
				defaultVisible: !0
			},
			{
				key: `${e}_hold_action`,
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: `${e}_double_tap_action`,
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: a,
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
var ms = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Automations",
		haDomains: ["automation"],
		value: "automation",
		domains: ["automation"]
	},
	{
		label: "Buttons",
		haDomains: ["button"],
		value: "button",
		domains: [
			"button",
			"input_button",
			"input_boolean"
		]
	},
	{
		label: "Cameras",
		haDomains: ["camera"],
		value: "camera",
		domains: ["camera"]
	},
	{
		label: "Scenes",
		haDomains: ["scene"],
		value: "scene",
		domains: ["scene"]
	},
	{
		label: "Scripts",
		haDomains: ["script"],
		value: "script",
		domains: ["script"]
	}
], hs = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Covers",
		haDomains: ["cover"],
		value: "cover",
		domains: ["cover"]
	},
	{
		label: "Lights",
		haDomains: ["light"],
		value: "light",
		domains: ["light"]
	},
	{
		label: "Sensors",
		haDomains: ["sensor"],
		value: "sensor",
		domains: ["sensor", "binary_sensor"]
	},
	{
		label: "Switches",
		haDomains: ["switch"],
		value: "switch",
		domains: ["switch"]
	}
];
function gs(e, t, n = {}) {
	let r = this[n.filterKey || "_areaActionButtonDomainFilter"] || "all", i = n.filters || ms;
	return w`
    <div class="field">
      <label>${this._t(e)}</label>

      ${za.call(this, {
		value: this._config?.[t] || "",
		filterOptions: i,
		activeFilter: r,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function _s(e, t) {
	let n = this._config?.[t] || "", r = n === "theme" ? "" : n, i = r || this._config?.accent_color || "theme";
	return this._renderColorControl(e, t, r, (e) => this._handleConfigUpdate(t, e), i);
}
//#endregion
//#region src/common/editor/styles/editor-styles.js
var vs = [
	d`
:host {
  display: block;
  font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, Roboto, Noto, sans-serif));
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  color: var(--primary-text-color);

  --orbit-editor-surface: color-mix(
    in srgb,
    var(--card-background-color, var(--secondary-background-color)) 96%,
    var(--primary-text-color, #fff) 4%
  );
  --orbit-editor-control: var(
    --input-fill-color,
    var(
      --mdc-text-field-fill-color,
      color-mix(
        in srgb,
        var(--card-background-color, var(--secondary-background-color)) 88%,
        var(--primary-text-color, #fff) 12%
      )
    )
  );
  --orbit-editor-control-hover: color-mix(
    in srgb,
    var(--orbit-editor-control) 86%,
    var(--primary-text-color, #fff) 14%
  );
  --orbit-editor-border: var(--outline-color, var(--divider-color));
  --orbit-editor-popover: color-mix(
    in srgb,
    var(--card-background-color, var(--secondary-background-color)) 94%,
    var(--primary-text-color, #fff) 6%
  );
  --orbit-editor-active: color-mix(
    in srgb,
    var(--primary-color) 20%,
    transparent
  );
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
`,
	d`
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 0;

  border: none;
  border-radius: 0;

  background: transparent;
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-bottom: 12px;
  margin-bottom: 12px;

  border-bottom: 1px solid var(--orbit-editor-border);
}

.sub-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.curve-divider {
  height: 1px;

  margin: 4px 0 6px 0;

  background: var(--orbit-editor-border);
}
`,
	d`
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);

  opacity: 0.75;

  transition: opacity 0.2s ease;
}

.section-header:hover {
  opacity: 1;
}

.sub-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);

  opacity: 0.72;

  padding-bottom: 6px;

  transition: opacity 0.2s ease;
}

.sub-section-header:hover {
  opacity: 1;
}

.collapse-icon {
  font-size: 18px;
  line-height: 1;
}
`,
	d`
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field > label {
  color: var(--primary-text-color);
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 20px);
}

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.field-header > label {
  color: var(--primary-text-color);
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 20px);
}

.editor-header-button-toggle,
.main-entity-icon-source-selector,
.name-picker-mode-selector {
  flex: 0 1 auto;
  width: auto;
  max-width: 100%;
}

.editor-button-toggle-field .field-header,
.main-entity-icon-source-field .field-header,
.name-picker-fallback .field-header {
  min-height: 40px;
}

.name-picker-field ha-entity-name-picker,
.name-picker-custom-input,
.name-picker-composed-picker {
  display: block;
  width: 100%;
}

.name-picker-composed-picker {
  --ha-generic-picker-width: min(720px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(720px, calc(100vw - 48px));
}

.name-picker-composed-field {
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 12px 24px;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  background: var(--orbit-editor-control);
  box-sizing: border-box;
}

.name-picker-composed-field:focus-within {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

.name-picker-chip,
.name-picker-add-chip {
  min-height: 32px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-pill, 999px);
  background: color-mix(
    in srgb,
    var(--primary-text-color) 10%,
    transparent
  );
  color: var(--primary-text-color);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  cursor: pointer;
}

.name-picker-add-chip {
  background: transparent;
}

.name-picker-chip ha-icon,
.name-picker-add-chip ha-icon {
  --mdc-icon-size: 18px;
  color: var(--secondary-text-color);
}

.name-picker-chip-remove {
  margin-right: -4px;
}

.status-badge-hide-hidden-row {
  display: flex;
  align-items: center;
  min-height: 40px;
}

.status-badge-device-class-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  align-items: center;
  column-gap: 16px;
  row-gap: 8px;
  min-height: 40px;
}

.status-badge-device-class-options ha-checkbox {
  display: inline-flex;
}

.color-pair,
.selector-pair,
.icon-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.status-settings-row .status-separator-field {
  padding-top: 44px;
}

@media (max-width: 640px) {
  .color-pair,
  .selector-pair,
  .icon-pair {
    grid-template-columns: 1fr;
  }

  .status-settings-row .status-separator-field {
    padding-top: 0;
  }
}

.editor-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 36px;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.9;
}

.editor-toggle-row span {
  opacity: 0.78;
}

input,
select,
ha-selector {
  width: 100%;
}

ha-selector {
  display: block;
}

input,
select {
  height: 56px;
  padding: 0 16px;

  border: none;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;

  background: var(--orbit-editor-control);
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  line-height: var(--ha-line-height-expanded, 24px);

  outline: none;
  box-sizing: border-box;
}

input:focus,
select:focus {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

input::placeholder {
  color: var(--secondary-text-color);
  opacity: 1;
}

select {
  appearance: auto;
}

.editor-note {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--orbit-editor-control);
  border: 1px solid var(--orbit-editor-border);
  color: inherit;
  font-size: var(--ha-font-size-s, 12px);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.72;
}

.editor-note code {
  display: block;
  margin-top: 4px;
  font-family: monospace;
  white-space: normal;
  overflow-wrap: anywhere;
}

`,
	d`
.entity-picker {
  width: 100%;
  display: block;
}

.entity-picker::part(root),
.entity-picker * {
  box-sizing: border-box;
}

`,
	d`
.color-row {
  position: relative;
}

.color-control-button {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
  box-sizing: border-box;
}

.color-control-button:focus {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
  outline: none;
}

.color-control-button ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.72;
}

.color-control-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.color-control-label.placeholder {
  color: var(--secondary-text-color);
}

.color-preview {
  position: relative;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: var(--ha-border-radius-md, 8px);
  border: 1px solid var(--orbit-editor-border);
  cursor: pointer;
  overflow: hidden;
}

.color-popover {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

.color-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.color-tabs button {
  position: relative;
  min-width: 92px;
  height: 34px;
  padding: 0 12px;
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
  overflow: hidden;
}

.color-tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.native-color-picker-field {
  position: relative;
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  box-sizing: border-box;
}

.native-color-picker-field:focus-within {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

.native-color-picker-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border: 0;
  cursor: pointer;
  z-index: 1;
}

.native-color-picker-swatch {
  position: relative;
  z-index: 2;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: var(--ha-border-radius-pill, 999px);
  border: 1px solid var(--outline-color, var(--divider-color));
  box-sizing: border-box;
  pointer-events: none;
}

.native-color-picker-empty-swatch {
  position: relative;
  z-index: 2;
  display: block;
  width: 20px;
  height: 20px;
  pointer-events: none;
}

.native-color-picker-text {
  position: relative;
  z-index: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  pointer-events: none;
}

.native-color-picker-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  color: var(--secondary-text-color);
}

.native-color-picker-value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  letter-spacing: 0;
}

.native-color-picker-value.empty {
  min-height: 20px;
}

.native-color-picker-clear {
  position: relative;
  z-index: 3;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 -8px 0 0;
  padding: 0;
  border: 0;
  border-radius: var(--ha-border-radius-pill, 999px);
  background: transparent;
  color: var(--secondary-text-color);
  cursor: pointer;
}

.native-color-picker-clear:hover,
.native-color-picker-clear:focus {
  background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  color: var(--primary-text-color);
  outline: none;
}

.native-color-picker-clear ha-icon {
  --mdc-icon-size: 22px;
}

.native-color-picker-arrow {
  position: relative;
  z-index: 2;
  --mdc-icon-size: 20px;
  color: var(--secondary-text-color);
  pointer-events: none;
}

.theme-color-picker {
  position: relative;
}

.theme-color-picker ha-generic-picker {
  display: block;
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
}

.theme-color-select {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--orbit-editor-border);
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.theme-color-select ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.7;
}

.theme-color-empty {
  grid-column: 1 / 4;
  min-height: 24px;
}

.theme-color-menu {
  position: absolute;
  z-index: 25;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--mdc-theme-surface, var(--orbit-editor-popover));
  border: 1px solid var(--orbit-editor-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.theme-color-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px;
  padding: 0 10px;
  height: 40px;
  border: 1px solid var(--primary-color);
  border-radius: var(--ha-border-radius-md, 8px);
  background: var(--mdc-theme-surface, var(--orbit-editor-popover));
}

.theme-color-search ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.68;
}

.theme-color-search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
}

.theme-color-options {
  max-height: 392px;
  overflow: auto;
  border-top: 1px solid var(--orbit-editor-border);
}

.theme-color-option {
  width: 100%;
  min-height: 46px;
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.theme-color-option.active {
  background: var(--orbit-editor-active);
}

.theme-color-no-results {
  padding: 14px;
  opacity: 0.72;
}

.theme-color-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.theme-color-swatch {
  display: block;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: var(--ha-border-radius-pill, 999px);
  border: 1px solid var(--orbit-editor-border);
  box-sizing: border-box;
}

.theme-color-default-icon {
  --mdc-icon-size: 20px;
  color: var(--secondary-text-color);
}

.theme-color-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-source-badge {
  display: inline-flex;
  flex: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: var(--text-primary-color);
  font-size: 8px;
  font-weight: 800;
  line-height: 1;
}

.theme-source-badge-theme {
  background: var(--accent-color, var(--primary-color));
}

.theme-source-badge-standard {
  background: var(--primary-color);
}

.icon-input-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-input-row input {
  flex: 1;
}

.icon-preview {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: var(--ha-border-radius-md, 8px);
  background: var(--orbit-editor-control);
  border: 1px solid var(--orbit-editor-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.preview-image-stack {
  position: relative;
  width: 24px;
  height: 24px;
  display: block;
}

.icon-preview .preview-image,
.icon-preview .preview-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.icon-preview .preview-image {
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.icon-preview .preview-svg {
  color: currentColor;
  display: flex;
  background: transparent;
}

.icon-preview .preview-svg svg {
  width: 100%;
  height: 100%;
}

.icon-preview ha-icon {
  --mdc-icon-size: 24px;
}

.icon-popover {
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  right: 0;
  width: min(360px, 100%);
  padding: 10px;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--mdc-theme-surface, var(--card-background-color, var(--secondary-background-color)));
  box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.35));
  border: 1px solid var(--orbit-editor-border);
}

.icon-picker-panel {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

.icon-picker-panel ha-icon-picker,
.icon-picker-panel ha-generic-picker {
  display: block;
  width: 100%;
}

.icon-picker-panel ha-icon-picker {
  --ha-icon-picker-width: 100%;
  --ha-icon-picker-max-width: 100%;
}

.icon-picker-panel ha-generic-picker {
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
}

.file-picker-preview {
  display: inline-flex;
  flex: none;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: var(--secondary-text-color);
}

.file-picker-preview-inner {
  display: inline-flex;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: inherit;
}

.file-picker-preview-inner svg,
.file-picker-preview-inner img {
  display: block;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  object-fit: contain;
}

.file-picker-preview-inner img {
  filter: brightness(0) opacity(0.72);
}

.file-picker-preview-inner img.dark {
  filter: brightness(0) invert(0.72);
}

.icon-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.icon-tabs button {
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  min-width: 92px;
  height: 34px;
  padding: 0 12px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
}

.icon-tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.file-icon-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  overflow: hidden;
  background: var(--orbit-editor-popover);
}

.file-icon-section + .file-icon-section {
  margin-top: 10px;
}

.file-icon-section-title {
  margin: 0 0 6px;
  font-size: var(--ha-font-size-s, 12px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.62;
  text-transform: uppercase;
}

.icon-popover {
  max-height: 320px;
  overflow: auto;
}

.file-icon-option {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  min-height: 54px;
  padding: 10px 14px;
  border: 0;
  border-radius: 0;
  background: var(--orbit-editor-popover);
  color: var(--primary-text-color);
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.file-icon-option.active {
  background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.18);
}

.file-icon-option:hover {
  background: var(--orbit-editor-control-hover);
}

.file-icon-preview {
  display: inline-flex;
  flex: none;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: var(--secondary-text-color);
}

.file-icon-preview svg,
.file-icon-preview img {
  display: block;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  object-fit: contain;
}

.file-icon-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-picker-note {
  padding: 10px;
  border-radius: 9px;
  background: var(--orbit-editor-control);
  font-size: var(--ha-font-size-s, 12px);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.76;
}

.icon-picker-note code {
  display: block;
  margin-top: 5px;
  overflow-wrap: anywhere;
}
`,
	d`
.action-field {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.interactions-form {
  display: block;
  margin-top: 16px;
}

.interactions-form ha-form {
  display: block;
}

.action-picker {
  width: 100%;
}

.action-picker ha-generic-picker,
.action-subfield ha-navigation-picker,
.action-subfield ha-service-control,
.action-subfield ha-input,
.action-subfield ha-selector {
  width: 100%;
}

.action-subfield ha-navigation-picker,
.action-subfield ha-service-control,
.action-subfield ha-input {
  display: block;
}

.action-subfield ha-service-control {
  --service-control-padding: 0;
}

.action-picker ha-combo-box-item ha-icon,
.action-picker ha-icon[slot="start"] {
  color: var(--secondary-text-color);
}

.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inline-label {
  width: 80px;
  min-width: 80px;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.7;
}

.inline-field input {
  flex: 1;
}

.action-subfield {
  align-items: flex-start;
}

.action-subfield .inline-label {
  padding-top: 18px;
}

.action-subfield input {
  min-height: 56px;
}
`,
	d`
.editor-version {
  padding: 0 14px;
  font-size: var(--ha-font-size-xs, 11px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.5;
  text-align: right;
}
`,
	d`
.editor-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.editor-tabs + .editor-tabs {
  margin-top: -12px;
}

.editor-tab {
  min-width: 72px;
  height: 42px;
  padding: 0 12px;
  border: none;
  border-bottom: 3px solid transparent;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
  cursor: pointer;
}

.editor-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.editor-segment-menu {
  display: grid;
  grid-template-columns: repeat(
    var(--editor-segment-columns, 3),
    minmax(0, 1fr)
  );
  gap: 6px;
  padding: 6px;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--orbit-editor-surface);
  border: 1px solid var(--orbit-editor-border);
}

.editor-segment-item {
  min-width: 0;
  height: 34px;
  padding: 0 10px;
  border: none;
  border-radius: var(--ha-border-radius-lg, 12px);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.58;
  cursor: pointer;
}

.editor-segment-item.active {
  background: var(--orbit-editor-active);
  color: var(--primary-color);
  opacity: 1;
}

.selected-button-section {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.sub-section-title {
  margin-bottom: 12px;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
}
`
], ys = {
	"Current state": "Current state",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	"This will turn off {count} active entities.": "This will turn off {count} active entities.",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
	"Device class": "Device class",
	"Hidden entities": "Hidden entities",
	"Name template": "Name template",
	"Not configured": "Not configured",
	"State type": "State type",
	"Active template": "Active template",
	"Inactive template": "Inactive template",
	"Action button": "Action button",
	"Actions per row": "Actions per row",
	"Add a card to start.": "Add a card to start.",
	"Battery entity {index}": "Battery entity {index}",
	"Button {index}": "Button {index}",
	Cards: "Cards",
	"Choose color": "Choose color",
	"Choose icon": "Choose icon",
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Loading files...": "Loading files...",
	"Local Icons": "Local Icons",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"Native active state color": "Native active state color",
	"Native inactive state color": "Native inactive state color",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colors",
	"No matching files": "No matching files",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Icons": "Orbit Icons",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Person entity": "Person entity",
	"Separate cards": "Separate cards",
	"State light color": "State light color",
	"State color (default)": "State color (default)",
	"State template": "State template",
	"Status {index}": "Status {index}",
	"Status color": "Status color",
	"Status sensors": "Status sensors",
	"Card background": "Card background",
	"Force padding": "Force padding",
	Main: "Main",
	Overlay: "Overlay",
	Resize: "Resize",
	Height: "Height",
	"Transparent background": "Transparent background",
	"Primary text color": "Primary text color",
	"Secondary background color": "Secondary background color",
	"Tab font size": "Tab font size",
	"Tab width": "Tab width",
	Tabs: "Tabs",
	"Tracker entity": "Tracker entity"
}, bs = {
	"Current state": "Current state",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	"This will turn off {count} active entities.": "This will turn off {count} active entities.",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
	"Device class": "Device class",
	"Hidden entities": "Hidden entities",
	"Name template": "Name template",
	"Not configured": "Not configured",
	"State type": "State type",
	"Active template": "Active template",
	"Inactive template": "Inactive template",
	"Action button": "Action button",
	"Actions per row": "Actions per row",
	"Add a card to start.": "Add a card to start.",
	"Battery entity {index}": "Battery entity {index}",
	"Button {index}": "Button {index}",
	Cards: "Cards",
	"Choose color": "Choose colour",
	"Choose icon": "Choose icon",
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Loading files...": "Loading files...",
	"Local Icons": "Local Icons",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"Native active state color": "Native active state colour",
	"Native inactive state color": "Native inactive state colour",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colours",
	"No matching files": "No matching files",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Icons": "Orbit Icons",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Person entity": "Person entity",
	"Separate cards": "Separate cards",
	"State light color": "State light colour",
	"State color (default)": "State colour (default)",
	"State template": "State template",
	"Status {index}": "Status {index}",
	"Status color": "Status colour",
	"Status sensors": "Status sensors",
	"Card background": "Card background",
	"Force padding": "Force padding",
	Main: "Main",
	Overlay: "Overlay",
	Resize: "Resize",
	Height: "Height",
	"Transparent background": "Transparent background",
	"Primary text color": "Primary text colour",
	"Secondary background color": "Secondary background colour",
	"Tab font size": "Tab font size",
	"Tab width": "Tab width",
	Tabs: "Tabs",
	"Tracker entity": "Tracker entity"
}, xs = {
	"Current state": "Aktueller Zustand",
	"Currently {state}": "Derzeit {state}",
	"No active entities": "Keine aktiven Entitäten",
	"This will turn off {count} active entities.": "Dadurch werden {count} aktive Entitäten ausgeschaltet.",
	Always: "Immer",
	"Area Count": "Bereichszähler",
	Badge: "Abzeichen",
	"Device class": "Geräteklasse",
	"Hidden entities": "Ausgeblendete Entitäten",
	"Name template": "Namensvorlage",
	"Not configured": "Nicht konfiguriert",
	"State type": "Zustandstyp",
	"Active template": "Aktivierungsvorlage",
	"Inactive template": "Inaktivitätsvorlage",
	"Action button": "Aktionstaste",
	"Actions per row": "Aktionen pro Zeile",
	"Add a card to start.": "Füge eine Karte hinzu, um zu beginnen.",
	"Battery entity {index}": "Batterie-Entität {index}",
	"Button {index}": "Taste {index}",
	Cards: "Karten",
	"Choose color": "Farbe auswählen",
	"Choose icon": "Symbol auswählen",
	"Curve buttons": "Bogen-Tasten",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-Entität",
	Files: "Dateien",
	"Icon only": "Nur Symbol",
	"Items per row": "Elemente pro Zeile",
	"Loading files...": "Dateien werden geladen...",
	"Local Icons": "Lokale Symbole",
	"Lock curve button positions": "Bogen-Tastenpositionen sperren",
	"Main entity": "Hauptentität",
	"Move left": "Nach links verschieben",
	"Move right": "Nach rechts verschieben",
	"Native active state color": "Native Farbe für aktiven Zustand",
	"Native inactive state color": "Native Farbe für inaktiven Zustand",
	"No matching colors": "Keine passenden Farben",
	"No matching actions": "Keine passenden Aktionen",
	"No matching files": "Keine passenden Dateien",
	"Person entity": "Personen-Entität",
	"Separate cards": "Separate Karten",
	"State light color": "Lichtstatusfarbe",
	"State color (default)": "Statusfarbe (Standard)",
	"State template": "Zustandsvorlage",
	"Status {index}": "Status {index}",
	"Status color": "Statusfarbe",
	"Status sensors": "Statussensoren",
	"Card background": "Kartenhintergrund",
	"Force padding": "Padding erzwingen",
	Main: "Hauptkarte",
	Overlay: "Überlagerung",
	Resize: "Größe ändern",
	Height: "Höhe",
	"Transparent background": "Transparenter Hintergrund",
	"Primary text color": "Primäre Textfarbe",
	"Secondary background color": "Sekundäre Hintergrundfarbe",
	"Tab font size": "Tab-Schriftgröße",
	"Tab width": "Tab-Breite",
	Tabs: "Tabs",
	"Tracker entity": "Tracker-Entität",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Keine Dateien gefunden. Füge ein lokales Symbolmanifest unter /local/icons/manifest.json hinzu oder gib den Dateinamen manuell ein.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Icons": "Orbit-Symbole",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, Ss = {
	"Current state": "Estado actual",
	"Currently {state}": "Actualmente {state}",
	"No active entities": "No hay entidades activas",
	"This will turn off {count} active entities.": "Esto apagará {count} entidades activas.",
	Always: "Siempre",
	"Area Count": "Recuento de área",
	Badge: "Insignia",
	"Device class": "Clase de dispositivo",
	"Hidden entities": "Entidades ocultas",
	"Name template": "Plantilla de nombre",
	"Not configured": "Sin configurar",
	"State type": "Tipo de estado",
	"Active template": "Plantilla de activación",
	"Inactive template": "Plantilla de inactividad",
	"Action button": "Botón de acción",
	"Actions per row": "Acciones por fila",
	"Add a card to start.": "Añade una tarjeta para empezar.",
	"Battery entity {index}": "Entidad de batería {index}",
	"Button {index}": "Botón {index}",
	Cards: "Tarjetas",
	"Choose color": "Elegir color",
	"Choose icon": "Elegir icono",
	"Curve buttons": "Botones curvos",
	Dynamic: "Dinámico",
	"ETA entity": "Entidad ETA",
	Files: "Archivos",
	"Icon only": "Solo icono",
	"Items per row": "Elementos por fila",
	"Loading files...": "Cargando archivos...",
	"Local Icons": "Iconos locales",
	"Lock curve button positions": "Bloquear posiciones de botones curvos",
	"Main entity": "Entidad principal",
	"Move left": "Mover a la izquierda",
	"Move right": "Mover a la derecha",
	"Native active state color": "Color nativo del estado activo",
	"Native inactive state color": "Color nativo del estado inactivo",
	"No matching colors": "No hay colores coincidentes",
	"No matching actions": "No hay acciones coincidentes",
	"No matching files": "No hay archivos coincidentes",
	"Person entity": "Entidad de persona",
	"Separate cards": "Tarjetas separadas",
	"State light color": "Color de luz de estado",
	"State color (default)": "Color de estado (predeterminado)",
	"State template": "Plantilla de estado",
	"Status {index}": "Estado {index}",
	"Status color": "Color de estado",
	"Status sensors": "Sensores de estado",
	"Card background": "Fondo de tarjeta",
	"Force padding": "Forzar relleno",
	Main: "Principal",
	Overlay: "Superposición",
	Resize: "Redimensionar",
	Height: "Alto",
	"Transparent background": "Fondo transparente",
	"Primary text color": "Color de texto primario",
	"Secondary background color": "Color de fondo secundario",
	"Tab font size": "Tamaño de fuente de pestaña",
	"Tab width": "Ancho de pestaña",
	Tabs: "Pestañas",
	"Tracker entity": "Entidad de seguimiento",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No se encontraron archivos. Añade un manifiesto de iconos local en /local/icons/manifest.json o escribe el nombre del archivo manualmente.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Icons": "Iconos de Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, Cs = {
	"Current state": "État actuel",
	"Currently {state}": "Actuellement {state}",
	"No active entities": "Aucune entité active",
	"This will turn off {count} active entities.": "Cela éteindra {count} entités actives.",
	Always: "Toujours",
	"Area Count": "Comptage de zone",
	Badge: "Badge",
	"Device class": "Classe d’appareil",
	"Hidden entities": "Entités masquées",
	"Name template": "Modèle de nom",
	"Not configured": "Non configuré",
	"State type": "Type d’état",
	"Active template": "Modèle d’activation",
	"Inactive template": "Modèle d’inactivité",
	"Action button": "Bouton d'action",
	"Actions per row": "Actions par ligne",
	"Add a card to start.": "Ajoutez une carte pour commencer.",
	"Battery entity {index}": "Entité batterie {index}",
	"Button {index}": "Bouton {index}",
	Cards: "Cartes",
	"Choose color": "Choisir une couleur",
	"Choose icon": "Choisir une icône",
	"Curve buttons": "Boutons courbes",
	Dynamic: "Dynamique",
	"ETA entity": "Entité ETA",
	Files: "Fichiers",
	"Icon only": "Icône seule",
	"Items per row": "Éléments par ligne",
	"Loading files...": "Chargement des fichiers...",
	"Local Icons": "Icônes locales",
	"Lock curve button positions": "Verrouiller les positions des boutons courbes",
	"Main entity": "Entité principale",
	"Move left": "Déplacer à gauche",
	"Move right": "Déplacer à droite",
	"Native active state color": "Couleur native de l’état actif",
	"Native inactive state color": "Couleur native de l’état inactif",
	"No matching colors": "Aucune couleur correspondante",
	"No matching actions": "Aucune action correspondante",
	"No matching files": "Aucun fichier correspondant",
	"Person entity": "Entité personne",
	"Separate cards": "Cartes séparées",
	"State light color": "Couleur d’état de lumière",
	"State color (default)": "Couleur d’état (par défaut)",
	"State template": "Modèle d'état",
	"Status {index}": "Statut {index}",
	"Status color": "Couleur du statut",
	"Status sensors": "Capteurs de statut",
	"Card background": "Arrière-plan de la carte",
	"Force padding": "Forcer le remplissage",
	Main: "Principal",
	Overlay: "Superposition",
	Resize: "Redimensionner",
	Height: "Hauteur",
	"Transparent background": "Arrière-plan transparent",
	"Primary text color": "Couleur du texte principal",
	"Secondary background color": "Couleur d’arrière-plan secondaire",
	"Tab font size": "Taille de police de l’onglet",
	"Tab width": "Largeur de l’onglet",
	Tabs: "Onglets",
	"Tracker entity": "Entité de suivi",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Aucun fichier trouvé. Ajoutez un manifeste d’icônes local dans /local/icons/manifest.json ou saisissez le nom du fichier manuellement.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Icons": "Icônes Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, ws = {
	"Current state": "Stato attuale",
	"Currently {state}": "Attualmente {state}",
	"No active entities": "Nessuna entità attiva",
	"This will turn off {count} active entities.": "Verranno disattivate {count} entità attive.",
	Always: "Sempre",
	"Area Count": "Conteggio area",
	Badge: "Badge",
	"Device class": "Classe dispositivo",
	"Hidden entities": "Entità nascoste",
	"Name template": "Modello del nome",
	"Not configured": "Non configurato",
	"State type": "Tipo di stato",
	"Active template": "Modello di attivazione",
	"Inactive template": "Modello di inattività",
	"Action button": "Pulsante azione",
	"Actions per row": "Azioni per riga",
	"Add a card to start.": "Aggiungi una scheda per iniziare.",
	"Battery entity {index}": "Entità batteria {index}",
	"Button {index}": "Pulsante {index}",
	Cards: "Schede",
	"Choose color": "Scegli colore",
	"Choose icon": "Scegli icona",
	"Curve buttons": "Pulsanti curvi",
	Dynamic: "Dinamico",
	"ETA entity": "Entità ETA",
	Files: "File",
	"Icon only": "Solo icona",
	"Items per row": "Elementi per riga",
	"Loading files...": "Caricamento file...",
	"Local Icons": "Icone locali",
	"Lock curve button positions": "Blocca posizioni dei pulsanti curvi",
	"Main entity": "Entità principale",
	"Move left": "Sposta a sinistra",
	"Move right": "Sposta a destra",
	"Native active state color": "Colore nativo dello stato attivo",
	"Native inactive state color": "Colore nativo dello stato inattivo",
	"No matching colors": "Nessun colore corrispondente",
	"No matching actions": "Nessuna azione corrispondente",
	"No matching files": "Nessun file corrispondente",
	"Person entity": "Entità persona",
	"Separate cards": "Schede separate",
	"State light color": "Colore stato luce",
	"State color (default)": "Colore stato (predefinito)",
	"State template": "Template stato",
	"Status {index}": "Stato {index}",
	"Status color": "Colore stato",
	"Status sensors": "Sensori stato",
	"Card background": "Sfondo scheda",
	"Force padding": "Forza padding",
	Main: "Principale",
	Overlay: "Sovrapposizione",
	Resize: "Ridimensiona",
	Height: "Altezza",
	"Transparent background": "Sfondo trasparente",
	"Primary text color": "Colore testo primario",
	"Secondary background color": "Colore sfondo secondario",
	"Tab font size": "Dimensione font scheda",
	"Tab width": "Larghezza scheda",
	Tabs: "Schede",
	"Tracker entity": "Entità tracker",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nessun file trovato. Aggiungi un manifesto icone locale in /local/icons/manifest.json oppure digita manualmente il nome del file.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Icons": "Icone Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, Ts = {
	"Current state": "Huidige status",
	"Currently {state}": "Momenteel {state}",
	"No active entities": "Geen actieve entiteiten",
	"This will turn off {count} active entities.": "Hiermee worden {count} actieve entiteiten uitgeschakeld.",
	Always: "Altijd",
	"Area Count": "Gebiedstelling",
	Badge: "Badge",
	"Device class": "Apparaatklasse",
	"Hidden entities": "Verborgen entiteiten",
	"Name template": "Naamsjabloon",
	"Not configured": "Niet geconfigureerd",
	"State type": "Statustype",
	"Active template": "Activeringssjabloon",
	"Inactive template": "Deactiveringssjabloon",
	"Action button": "Actieknop",
	"Actions per row": "Acties per rij",
	"Add a card to start.": "Voeg een kaart toe om te beginnen.",
	"Battery entity {index}": "Batterij-entiteit {index}",
	"Button {index}": "Knop {index}",
	Cards: "Kaarten",
	"Choose color": "Kleur kiezen",
	"Choose icon": "Icoon kiezen",
	"Curve buttons": "Gebogen knoppen",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-entiteit",
	Files: "Bestanden",
	"Icon only": "Alleen icoon",
	"Items per row": "Items per rij",
	"Loading files...": "Bestanden laden...",
	"Local Icons": "Lokale iconen",
	"Lock curve button positions": "Posities van gebogen knoppen vergrendelen",
	"Main entity": "Hoofdentiteit",
	"Move left": "Naar links verplaatsen",
	"Move right": "Naar rechts verplaatsen",
	"Native active state color": "Systeemeigen kleur voor actieve status",
	"Native inactive state color": "Systeemeigen kleur voor inactieve status",
	"No matching colors": "Geen overeenkomende kleuren",
	"No matching actions": "Geen overeenkomende acties",
	"No matching files": "Geen overeenkomende bestanden",
	"Person entity": "Persoon-entiteit",
	"Separate cards": "Aparte kaarten",
	"State light color": "Statuskleur licht",
	"State color (default)": "Statuskleur (standaard)",
	"State template": "Statussjabloon",
	"Status {index}": "Status {index}",
	"Status color": "Statuskleur",
	"Status sensors": "Statussensoren",
	"Card background": "Kaartachtergrond",
	"Force padding": "Padding afdwingen",
	Main: "Hoofdkaart",
	Overlay: "Overlay",
	Resize: "Formaat wijzigen",
	Height: "Hoogte",
	"Transparent background": "Transparante achtergrond",
	"Primary text color": "Primaire tekstkleur",
	"Secondary background color": "Secundaire achtergrondkleur",
	"Tab font size": "Tabblad lettergrootte",
	"Tab width": "Tabbladbreedte",
	Tabs: "Tabbladen",
	"Tracker entity": "Tracker-entiteit",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Geen bestanden gevonden. Voeg een lokaal iconenmanifest toe op /local/icons/manifest.json of typ de bestandsnaam handmatig.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Icons": "Orbit-iconen",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, Es = {
	"Current state": "Estado atual",
	"Currently {state}": "Atualmente {state}",
	"No active entities": "Nenhuma entidade ativa",
	"This will turn off {count} active entities.": "Isso desligará {count} entidades ativas.",
	Always: "Sempre",
	"Area Count": "Contagem da área",
	Badge: "Emblema",
	"Device class": "Classe do dispositivo",
	"Hidden entities": "Entidades ocultas",
	"Name template": "Modelo de nome",
	"Not configured": "Não configurado",
	"State type": "Tipo de estado",
	"Active template": "Modelo de ativação",
	"Inactive template": "Modelo de inatividade",
	"Action button": "Botão de ação",
	"Actions per row": "Ações por linha",
	"Add a card to start.": "Adicione um cartão para começar.",
	"Battery entity {index}": "Entidade de bateria {index}",
	"Button {index}": "Botão {index}",
	Cards: "Cartões",
	"Choose color": "Escolher cor",
	"Choose icon": "Escolher ícone",
	"Curve buttons": "Botões curvos",
	Dynamic: "Dinâmico",
	"ETA entity": "Entidade ETA",
	Files: "Arquivos",
	"Icon only": "Somente ícone",
	"Items per row": "Itens por linha",
	"Loading files...": "Carregando arquivos...",
	"Local Icons": "Ícones locais",
	"Lock curve button positions": "Bloquear posições dos botões curvos",
	"Main entity": "Entidade principal",
	"Move left": "Mover para a esquerda",
	"Move right": "Mover para a direita",
	"Native active state color": "Cor nativa do estado ativo",
	"Native inactive state color": "Cor nativa do estado inativo",
	"No matching colors": "Nenhuma cor correspondente",
	"No matching actions": "Nenhuma ação correspondente",
	"No matching files": "Nenhum arquivo correspondente",
	"Person entity": "Entidade de pessoa",
	"Separate cards": "Cartões separados",
	"State light color": "Cor de estado da luz",
	"State color (default)": "Cor de estado (padrão)",
	"State template": "Modelo de estado",
	"Status {index}": "Status {index}",
	"Status color": "Cor do status",
	"Status sensors": "Sensores de status",
	"Card background": "Fundo do cartão",
	"Force padding": "Forçar preenchimento",
	Main: "Principal",
	Overlay: "Sobreposição",
	Resize: "Redimensionar",
	Height: "Altura",
	"Transparent background": "Fundo transparente",
	"Primary text color": "Cor do texto primário",
	"Secondary background color": "Cor de fundo secundário",
	"Tab font size": "Tamanho da fonte da aba",
	"Tab width": "Largura da aba",
	Tabs: "Abas",
	"Tracker entity": "Entidade de rastreamento",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nenhum arquivo encontrado. Adicione um manifesto de ícones local em /local/icons/manifest.json ou digite o nome do arquivo manualmente.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Icons": "Ícones Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, Ds = {
	de: xs,
	en: ys,
	"en-gb": bs,
	en_gb: bs,
	es: Ss,
	fr: Cs,
	it: ws,
	nl: Ts,
	"pt-br": Es,
	pt_br: Es
};
function q(e, t, n = {}) {
	let r = js(e), i = r.replace("_", "-"), a = r.split("-")[0], o = Os(e, t) || As(r, t) || As(i, t) || As(a, t) || Ds.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function Os(e, t) {
	if (!e?.localize || !t) return null;
	let n = ks[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
var ks = {
	Add: ["ui.common.add"],
	"Add card": ["ui.panel.lovelace.editor.edit_card.add"],
	All: ["ui.components.selectors.automation_behavior.trigger.options.all.label", "ui.panel.config.backup.data.apps_all"],
	Active: [
		"ui.panel.config.users.editor.active",
		"ui.panel.config.users.picker.headers.is_active",
		"ui.panel.config.zwave_js.provisioned.active"
	],
	Area: [
		"ui.components.selectors.selector.types.area",
		"ui.components.entity.entity-name-picker.types.area",
		"ui.components.area-picker.area"
	],
	Areas: ["ui.components.area-filter.title"],
	Background: ["ui.panel.lovelace.editor.card.tile.background", "ui.panel.lovelace.editor.card.generic.background"],
	"Binary sensors": ["component.binary_sensor.entity_component._.name_plural"],
	"Binary Sensors": ["component.binary_sensor.entity_component._.name_plural"],
	Badges: ["ui.panel.lovelace.editor.card.heading.badges", "ui.panel.lovelace.editor.badges.name"],
	Color: ["ui.panel.lovelace.editor.card.tile.color", "ui.dialogs.label-detail.color"],
	Clear: ["ui.common.clear"],
	Custom: [
		"ui.components.entity.entity-name-picker.mode_custom",
		"ui.panel.lovelace.editor.edit_card.pick_card.custom",
		"ui.panel.config.backup.setup.custom_heading",
		"ui.panel.config.backup.schedule.time_options.custom",
		"ui.panel.config.backup.data.apps_custom"
	],
	Content: ["ui.panel.lovelace.editor.card.generic.content"],
	"Configuration error": ["ui.errors.config.configuration_error"],
	Domain: ["ui.panel.config.entities.picker.headers.domain"],
	Entity: [
		"ui.components.selectors.selector.types.entity",
		"ui.components.entity.entity-picker.entity",
		"ui.panel.lovelace.editor.card.generic.entity"
	],
	Disabled: ["ui.dialogs.entity_registry.editor.disabled_label", "ui.panel.config.entities.picker.status.disabled"],
	Divider: ["ui.panel.lovelace.editor.card.entities.entity_row.divider"],
	Default: ["ui.common.default"],
	Duplicate: ["ui.common.duplicate"],
	Enabled: ["ui.dialogs.entity_registry.editor.enabled_label", "ui.panel.config.entities.picker.status.enabled"],
	Equal: ["ui.components.selectors.select.options.equal"],
	Icon: ["ui.components.selectors.selector.types.icon", "ui.panel.lovelace.editor.card.generic.icon"],
	Hide: ["ui.common.hide"],
	Inactive: ["ui.components.color-picker.colors.inactive"],
	Interactions: ["ui.panel.lovelace.editor.card.tile.interactions", "ui.panel.lovelace.editor.card.generic.interactions"],
	None: ["ui.common.none"],
	Accent: ["ui.components.color-picker.colors.accent"],
	"Accent color": ["ui.panel.profile.themes.accent_color"],
	Automations: ["ui.panel.config.automation.caption", "ui.dialogs.more_info_control.add_to.automations_heading"],
	Away: ["state_badge.person.not_home"],
	Buttons: ["ui.panel.lovelace.editor.card.entities.entity_row.buttons"],
	Card: ["ui.panel.lovelace.editor.card.conditional.card"],
	Cameras: ["component.camera.entity_component._.name_plural"],
	Climate: ["component.climate.entity_component._.name_plural", "panel.climate"],
	Covers: ["component.cover.entity_component._.name_plural"],
	Crop: ["ui.dialogs.image_cropper.crop"],
	"Display precision": ["ui.dialogs.entity_registry.editor.precision"],
	"Displayed elements": ["ui.panel.lovelace.editor.badge.entity.displayed_elements"],
	"Double tap behavior": ["ui.panel.lovelace.editor.card.generic.double_tap_action"],
	Home: ["state_badge.person.home"],
	Fans: ["component.fan.entity_component._.name_plural"],
	Header: ["ui.panel.lovelace.editor.header-footer.header"],
	Icons: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style_list.icons"],
	"Icon tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_tap_action"],
	"Hold behavior": ["ui.panel.lovelace.editor.card.generic.hold_action"],
	"Icon hold behavior": ["ui.panel.lovelace.editor.card.tile.icon_hold_action"],
	"Icon double tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_double_tap_action"],
	Mode: ["ui.card.climate.mode"],
	Multiple: ["ui.components.selectors.selector.multiple"],
	"Navigation path": ["ui.panel.lovelace.editor.action-editor.navigation_path"],
	Person: ["component.person.entity_component._.name"],
	Position: ["ui.panel.lovelace.editor.card.entities.secondary_info_values.position", "ui.card.cover.position"],
	Prefix: ["ui.panel.lovelace.editor.elements.prefix"],
	Primary: ["ui.components.color-picker.colors.primary"],
	Name: ["ui.common.name"],
	Labels: ["ui.components.label-picker.labels"],
	Lights: ["component.light.entity_component._.name_plural"],
	Locks: ["component.lock.entity_component._.name_plural"],
	"Media players": ["component.media_player.entity_component._.name_plural"],
	Remove: ["ui.common.remove"],
	Search: ["ui.components.data-table.search", "ui.panel.lovelace.editor.card.generic.search"],
	Scenes: ["ui.panel.config.scene.caption"],
	Sensors: ["component.sensor.entity_component._.name_plural"],
	Scripts: ["ui.panel.config.script.caption"],
	Security: ["panel.security"],
	Separator: ["ui.panel.lovelace.editor.card.clock.date.sections.separator"],
	Standard: ["ui.panel.config.energy.battery.dialog.type_standard"],
	State: ["ui.panel.lovelace.editor.card.generic.state"],
	Switches: ["component.switch.entity_component._.name_plural"],
	"State color": ["ui.components.color-picker.state"],
	"State content": ["ui.panel.lovelace.editor.badge.entity.state_content"],
	"Entity state": ["ui.panel.lovelace.editor.condition-editor.condition.state.label"],
	Status: ["ui.panel.config.entities.picker.headers.status"],
	Style: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style", "ui.panel.lovelace.editor.features.types.numeric-input.style"],
	"Tap behavior": ["ui.panel.lovelace.editor.card.generic.tap_action"],
	Theme: ["ui.components.selectors.selector.types.theme", "ui.components.theme-picker.theme"],
	Template: ["ui.components.selectors.selector.types.template"],
	Type: ["ui.components.selectors.selector.type"],
	Unavailable: ["state.default.unavailable"],
	Top: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.top"],
	Right: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.right"],
	Bottom: ["ui.panel.lovelace.editor.card.tile.features_position_options.bottom", "ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.bottom"],
	Left: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.left"],
	Width: ["ui.panel.lovelace.editor.edit_section.settings.column_span"],
	Visibility: ["ui.panel.lovelace.editor.edit_card.tab_visibility"],
	"Visible if selected in state content": ["ui.panel.lovelace.editor.card.heading.entity_config.name_helper"],
	Wrap: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"]
};
function As(e, t) {
	let n = Ds[e]?.[t];
	return n === "" ? null : n;
}
function js(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
//#endregion
//#region src/editors/area-card-editor.js
var Ms = class extends k {
	static svgCache = I;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_activeSection: { state: !0 },
		_selectedStatusIndex: { state: !0 },
		_selectedButtonIndex: { state: !0 },
		_selectedCurveButtonIndex: { state: !0 },
		_areaButtonDomainFilter: { state: !0 },
		_areaCurveButtonDomainFilter: { state: !0 },
		_areaActionButtonDomainFilter: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_iconFileSearch: { state: !0 },
		_iconFilePickerOpen: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 }
	};
	constructor() {
		super(), this._config = this._config || {}, this._activeSection = "card", this._selectedStatusIndex = 1, this._selectedButtonIndex = 1, this._selectedCurveButtonIndex = 1, this._areaButtonDomainFilter = "all", this._areaCurveButtonDomainFilter = "all", this._areaActionButtonDomainFilter = "all", this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
	}
	connectedCallback() {
		super.connectedCallback(), mo(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		ho(this), super.disconnectedCallback();
	}
	_getColorStyle(e) {
		return _o(e);
	}
	_getColorPickerValue(e) {
		return vo(e);
	}
	_t(e, t) {
		return q(this.hass, e, t);
	}
	setConfig(e) {
		let { config: t, migrated: n } = qt(e || {});
		this._config = t || {}, this._updateDocumentationContext(), n && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: Vs(this._config) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		let t = { ...e };
		Object.prototype.hasOwnProperty.call(t, "tap_action") && t.tap_action !== void 0 && (t.navigate = void 0);
		let n = Ci(this._config, t), r = Kr(n, {
			sourceKey: "main_entity_icon_source",
			entityKey: "main_entity",
			areaKey: "area",
			allowArea: !0,
			customIconKeys: [
				"main_entity_icon",
				"main_entity_icon_on",
				"main_entity_icon_off"
			]
		}), i = Object.prototype.hasOwnProperty.call(t, "main_entity_icon_source") && t.main_entity_icon_source !== "custom", a = r !== "custom" && n.main_entity_icon === "";
		(i || a) && (n.main_entity_icon = void 0), this._config = Vs(Ci(n, {})), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleInput(e, t) {
		this._updateConfig({ [e]: t.target.value });
	}
	_handleEntityUpdate(e, t) {
		if (t) {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e.startsWith("button")) {
			this._clearButtonEntity(e);
			return;
		}
		if (e.startsWith("curve_button")) {
			this._clearCurveButtonEntity(e);
			return;
		}
		if (e === "action_button") {
			this._clearActionButtonEntity(e);
			return;
		}
		if (/^status[1-3]$/.test(e)) {
			this._clearStatusEntity(e);
			return;
		}
		if (e !== "main_entity") {
			this._handleConfigUpdate(e, t);
			return;
		}
		this._updateConfig(H("main_entity", Fs));
	}
	_clearStatusEntity(e) {
		this._updateConfig(wi(e, Is));
	}
	_clearButtonEntity(e) {
		this._updateConfig(wi(e, Ls));
	}
	_clearCurveButtonEntity(e) {
		this._updateConfig(wi(e, Rs));
	}
	_clearActionButtonEntity(e) {
		this._updateConfig(wi(e, zs));
	}
	_renderInput(e, t, n = "", r = {}) {
		return bi.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t) {
		return xi.call(this, e, t);
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_renderColor(e, t, n) {
		return Di.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return Oi.call(this, e, t, n, r, i);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return Gr.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return qr.call(this, e);
	}
	_isImageIcon(e) {
		return Ur(e);
	}
	_resolveIconPath(e) {
		return Wr(e);
	}
	_getInlineSvg(e) {
		return F.call(this, e, { forceColor: !0 });
	}
	_renderEntity(e, t, n) {
		return fo.call(this, e, t, n);
	}
	_renderArea(e, t) {
		return po.call(this, e, t);
	}
	_renderAreaSection() {
		return ns.call(this);
	}
	_renderStatusSection() {
		let e = this._selectedStatusIndex || 1;
		return w`
      <div class="section">
        <div class="selector-pair status-settings-row">
          <div class="status-separator-field">
            ${this._renderInput("Separator", "status_separator", "|")}
          </div>

          ${this._renderColorControl("Color", "status_color", this._config?.status_color || this._config?.accent_color || "", (e) => this._handleConfigUpdate("status_color", e), this._config?.status_color || this._config?.accent_color || "")}
        </div>

        <div
          class="editor-segment-menu"
          style="--editor-segment-columns: 3;"
        >
          ${[
			1,
			2,
			3
		].map((t) => w`
            <button
              type="button"
              class="editor-segment-item ${e === t ? "active" : ""}"
              @click=${() => {
			this._selectedStatusIndex = t;
		}}
            >
              ${this._t("Status {index}", { index: t })}
            </button>
          `)}
        </div>

        <div class="sub-section selected-button-section">
          ${this._renderEntity("Entity", `status${e}`)}

          ${B.call(this, {
			label: ["Prefix", "Icon"],
			sourceKey: `status${e}_icon_source`,
			entityKey: `status${e}`,
			allowNone: !0,
			customIconKeys: [`status${e}_icon`],
			renderCustom() {
				return this._renderIconInput("", `status${e}_icon`, "mdi:thermometer / icon.svg / 🌡️");
			}
		})}

          ${this._renderInput("Display precision", `status${e}_decimal_places`, "entity default")}
        </div>
      </div>
    `;
	}
	_renderButtonsSection() {
		return os.call(this);
	}
	_renderCurvedButtonsSection() {
		return us.call(this);
	}
	_renderActionButtonSection() {
		return ds.call(this);
	}
	_renderEditorTabs() {
		return w`
      <div class="editor-tabs">
        ${Ns.map((e) => w`
          <button
            type="button"
            class="editor-tab ${this._activeSection === e.key ? "active" : ""}"
            @click=${() => {
			this._activeSection = e.key, this._updateDocumentationContext();
		}}
          >
            ${this._t(e.label)}
          </button>
        `)}
      </div>
    `;
	}
	_updateDocumentationContext() {
		kt(this, this._config?.type || "orbit-area-card", this._activeSection || "card");
	}
	_renderActiveSection() {
		let e = Ns.find((e) => e.key === this._activeSection) || Ns[0];
		return this[e.render]();
	}
	render() {
		return w`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Area Card v{version}", { version: t.area })}
        </div>
      </div>
    `;
	}
	static styles = [vs];
}, Ns = [
	{
		key: "card",
		label: "Card",
		render: "_renderAreaSection"
	},
	{
		key: "status",
		label: "Status",
		render: "_renderStatusSection"
	},
	{
		key: "buttons",
		label: "Buttons",
		render: "_renderButtonsSection"
	},
	{
		key: "curve",
		label: "Curve buttons",
		render: "_renderCurvedButtonsSection"
	},
	{
		key: "action",
		label: "Action button",
		render: "_renderActionButtonSection"
	}
], Ps = class extends Ms {};
customElements.define("orbit-area-card-editor", Ms), customElements.define("orbit-room-card-editor", Ps);
var Fs = [
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_on",
	"main_entity_icon_off",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action"
], Is = [
	"_icon_source",
	"_icon",
	"_decimal_places"
], Ls = [
	"_on_color",
	"_off_color",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], Rs = [
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], zs = [
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], Bs = [
	"type",
	"area_name",
	"room_name",
	"accent_color",
	"status_color",
	"area",
	"navigate",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_on",
	"main_entity_icon_off",
	"main_entity_icon_svg_color_override",
	"main_entity_icon_on_svg_color_override",
	"main_entity_icon_off_svg_color_override",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action",
	"status_separator",
	...[
		1,
		2,
		3
	].flatMap((e) => [
		`status${e}`,
		`status${e}_icon_source`,
		`status${e}_icon`,
		`status${e}_decimal_places`
	]),
	...[
		1,
		2,
		3,
		4
	].flatMap((e) => [
		`button${e}`,
		`button${e}_on_color`,
		`button${e}_off_color`,
		`button${e}_icon_source`,
		`button${e}_icon`,
		`button${e}_icon_on`,
		`button${e}_icon_off`,
		`button${e}_icon_svg_color_override`,
		`button${e}_icon_on_svg_color_override`,
		`button${e}_icon_off_svg_color_override`,
		`button${e}_state_template`,
		`button${e}_tap_action`,
		`button${e}_hold_action`,
		`button${e}_double_tap_action`
	]),
	"curve_buttons_lock_position",
	...[
		1,
		2,
		3,
		4,
		5,
		6
	].flatMap((e) => [
		`curve_button${e}`,
		`curve_button${e}_on_color`,
		`curve_button${e}_off_color`,
		`curve_button${e}_icon_source`,
		`curve_button${e}_icon`,
		`curve_button${e}_icon_on`,
		`curve_button${e}_icon_off`,
		`curve_button${e}_icon_svg_color_override`,
		`curve_button${e}_icon_on_svg_color_override`,
		`curve_button${e}_icon_off_svg_color_override`,
		`curve_button${e}_state_template`,
		`curve_button${e}_tap_action`,
		`curve_button${e}_hold_action`,
		`curve_button${e}_double_tap_action`
	]),
	"action_button",
	"action_button_icon_source",
	"action_button_icon",
	"action_button_icon_on",
	"action_button_icon_off",
	"action_button_icon_svg_color_override",
	"action_button_icon_on_svg_color_override",
	"action_button_icon_off_svg_color_override",
	"action_button_state_template",
	"action_button_tap_action",
	"action_button_hold_action",
	"action_button_double_tap_action",
	"grid_options",
	"view_layout"
];
function Vs(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Bs.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
//#endregion
//#region src/cards/area-card.js
var Hs = class extends k {
	static svgCache = I;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_cardName: { type: String },
			_statusText: { type: String },
			_statusItems: { type: Array },
			_icon: { type: String },
			_areaColor: { type: String },
			_statusColor: { type: String },
			_iconColor: { type: String },
			_circleColor: { type: String },
			_templateRevision: { type: Number }
		};
	}
	static getConfigElement() {
		return document.createElement("orbit-area-card-editor");
	}
	static getStubConfig(e) {
		let t = Ks(e), n = {
			type: "custom:orbit-area-card",
			accent_color: "blue",
			tap_action: {
				action: "navigate",
				navigation_path: "/lovelace/home"
			}
		};
		return t && (n.area = t), n;
	}
	getLayoutOptions() {
		return {
			grid_columns: 3,
			grid_min_columns: 2,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		this._config = qt(e).config, this._areaColor = this._computeFullColor(this._config.accent_color), this._statusColor = this._computeFullColor(this._config.status_color || this._config.accent_color), this._iconColor = this._computeIconColor(this._config.accent_color), this._circleColor = this._computeCircleColor(this._config.accent_color);
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && It.call(this, this._getTemplateEntries()), Hn.call(this, e);
	}
	disconnectedCallback() {
		Lt.call(this), this._cancelLongPress(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return Nn.call(this, e, this._getRelevantEntities(), { hasTemplates: Pn(this._config) });
	}
	_handleAction(e, t = null) {
		return He.call(this, e, t);
	}
	_navigate(e) {
		return Ke.call(this, e);
	}
	_toggleEntity(e, t, n = null) {
		return qe.call(this, e, t, n);
	}
	_handleButtonClick(e) {
		return Je.call(this, e);
	}
	_handleButtonDoubleClick(e) {
		return Ye.call(this, e);
	}
	_handleCurveButtonClick(e) {
		return Xe.call(this, e);
	}
	_handleCurveButtonDoubleClick(e) {
		return Ze.call(this, e);
	}
	_handleTap(e) {
		return Qe.call(this, e);
	}
	_handleCardPointerDown(e) {
		if (j(this) || Us(e)) return;
		let t = this._config?.hold_action;
		if (!(!t?.action || t.action === "none")) return this._startLongPress(e, this._config.main_entity || this._config.entity, t);
	}
	_handleCardDoubleTap(e) {
		return $e.call(this, e);
	}
	_handleMainEntityTap(e) {
		return et.call(this, e);
	}
	_handleMainEntityDoubleTap(e) {
		return tt.call(this, e);
	}
	_handleMainEntityPointerDown(e) {
		if (!j(this)) return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
	}
	_handleButtonPointerDown(e) {
		if (j(this)) return;
		let t = e.currentTarget;
		return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
	}
	_computeFullColor(e) {
		return it.call(this, e);
	}
	_computeIconColor(e) {
		return at.call(this, e);
	}
	_computeCircleColor(e) {
		return ot.call(this, e);
	}
	_computeButtonBackground(e) {
		return st.call(this, e);
	}
	_getCardName(e = "Card") {
		return yt(this._config, this.hass, e);
	}
	formatState(e) {
		return nn(e);
	}
	_getEntityActiveState(e) {
		return rn(e);
	}
	_getMainIconColor(e, t) {
		return bn.call(this, e, t);
	}
	_getEntityColor(e) {
		return xn(e);
	}
	_isImageIcon(e) {
		return Sn(e);
	}
	_resolveIconPath(e) {
		return Cn(e);
	}
	_getInlineSvg(e, t = !0, n = !1) {
		return F.call(this, e, {
			forceColor: t,
			animate: n
		});
	}
	_getSvgColorOverride(e) {
		return wn(this._config, e);
	}
	get _LONG_PRESS_DELAY() {
		return 500;
	}
	_startLongPress(e, t, n) {
		return An.call(this, e, t, n);
	}
	_cancelLongPress() {
		return jn.call(this);
	}
	_clearDoubleTapTimer() {
		return Ue.call(this);
	}
	_finishLongPress(e) {
		return Mn.call(this, e);
	}
	_evaluateStateTemplate(e, t) {
		return P.call(this, e, t);
	}
	_getTemplateEntries() {
		let e = [];
		for (let t of [
			"button1",
			"button2",
			"button3",
			"button4",
			"curve_button1",
			"curve_button2",
			"curve_button3",
			"curve_button4",
			"curve_button5",
			"curve_button6",
			"action_button"
		]) {
			let n = this._config?.[`${t}_state_template`];
			n && e.push({
				template: n,
				entityId: this._config?.[t] || ""
			});
		}
		return e;
	}
	_getRelevantEntities() {
		return [
			this._config?.main_entity,
			this._config?.entity,
			this._config?.status1,
			this._config?.status2,
			this._config?.status3,
			this._config?.button1,
			this._config?.button2,
			this._config?.button3,
			this._config?.button4,
			this._config?.curve_button1,
			this._config?.curve_button2,
			this._config?.curve_button3,
			this._config?.curve_button4,
			this._config?.curve_button5,
			this._config?.curve_button6,
			this._config?.action_button
		];
	}
	_renderButtons(e) {
		return fr.call(this, e);
	}
	_renderCurveButtons() {
		return Er.call(this);
	}
	render() {
		return pr.call(this);
	}
	static styles = Br;
};
function Us(e) {
	return e.composedPath().some((e) => e?.classList ? e.classList.contains("entity-button") || e.classList.contains("curve-button") || e.classList.contains("action-button") : !1);
}
var Ws = class extends Hs {};
jt({
	tag: "orbit-area-card",
	cardClass: Hs,
	name: "Orbit Area Card",
	description: "Responsive area card",
	version: t.area,
	getEntitySuggestion: qs,
	aliases: [{
		tag: "orbit-room-card",
		cardClass: Ws
	}]
});
var Gs = new Set([
	"light",
	"fan",
	"climate",
	"media_player",
	"switch",
	"cover",
	"lock"
]);
function Ks(e) {
	return Object.keys(e?.areas || {}).sort((t, n) => {
		let r = e.areas[t]?.name || t, i = e.areas[n]?.name || n;
		return r.localeCompare(i, void 0, { sensitivity: "base" });
	})[0] || "";
}
function qs(e, t) {
	let n = In(t);
	if (!Gs.has(n)) return null;
	let r = Ln(e, t), i = {
		type: "custom:orbit-area-card",
		main_entity: t,
		accent_color: n === "light" ? "light" : "theme"
	};
	return r && (i.area = r), { config: i };
}
//#endregion
//#region src/common/helpers/card-layout.js
function Js({ config: e = {}, count: t = 1, wrapKey: n = "wrap", perRowKey: r, defaultColumns: i = 3 }) {
	if (!e[n]) return Math.max(1, t);
	let a = Number(e[r]);
	return Math.max(1, Math.min(t, (Number.isFinite(a) ? Math.floor(a) : i) || 1));
}
function Ys(e) {
	let t = Js(e);
	return Math.max(1, Math.ceil((e?.count || 1) / t));
}
//#endregion
//#region src/common/helpers/status-badge.js
var Xs = [
	{
		value: "light",
		label: "Lights",
		icon: "mdi:lightbulb"
	},
	{
		value: "switch",
		label: "Switches",
		icon: "mdi:toggle-switch",
		requiresDeviceClass: !0
	},
	{
		value: "fan",
		label: "Fans",
		icon: "mdi:fan"
	},
	{
		value: "cover",
		label: "Covers",
		icon: "mdi:window-shutter"
	},
	{
		value: "lock",
		label: "Locks",
		icon: "mdi:lock"
	},
	{
		value: "media_player",
		label: "Media players",
		icon: "mdi:play-box-multiple"
	},
	{
		value: "climate",
		label: "Climate",
		icon: "mdi:thermostat"
	},
	{
		value: "binary_sensor",
		label: "Binary sensors",
		icon: "mdi:radiobox-marked",
		requiresDeviceClass: !0
	}
], J = "Current state", Zs = [
	"state_source",
	"area",
	"domain",
	"device_class",
	"hide",
	"active_template",
	"inactive_template"
];
function Qs(e = {}) {
	return Object.fromEntries(Zs.map((t) => [t, e[t]]));
}
function $s(e = {}) {
	let t = Y(e);
	return t === "entity" ? { action: "more-info" } : t === "area_count" ? { action: J } : { action: "none" };
}
var ec = new Map(Xs.map((e) => [e.value, e]));
function tc(e = "") {
	return ec.get(e) || {
		value: e,
		label: e ? e.replaceAll("_", " ") : "Status",
		icon: "mdi:shape"
	};
}
function Y(e = {}) {
	let t = e.state_source || "entity";
	if ([
		"entity",
		"area_count",
		"template"
	].includes(t)) return t;
	throw Error(`Invalid state_source "${t}". Expected "entity", "area_count", or "template".`);
}
function nc(e = {}) {
	let t = Y(e), n = e.domain ? tc(e.domain) : void 0;
	if (t === "area_count" && n?.requiresDeviceClass && cc(e).length === 0) throw Error(`Orbit Status Badge requires "device_class" for domain "${e.domain}".`);
	return t;
}
function rc(e = {}) {
	if (!Object.prototype.hasOwnProperty.call(e, "hide")) return [{ type: "hidden" }];
	if (!Array.isArray(e.hide)) return [];
	let t = [], n = /* @__PURE__ */ new Set(), r = !1;
	return e.hide.forEach((e) => {
		if (e === "hidden" && !r) {
			r = !0, t.push({ type: "hidden" });
			return;
		}
		let i = typeof e?.label == "string" ? e.label.trim() : "";
		!i || n.has(i) || (n.add(i), t.push({
			type: "label",
			label: i
		}));
	}), t;
}
function ic(e = []) {
	return e.map((e) => e?.type === "hidden" ? "hidden" : { label: e?.label });
}
function ac(e, t, n = {}) {
	let r = rc(n), i = e?.entities?.[t];
	return r.some((e) => e.type === "hidden" ? !!i?.hidden : e.type === "label" && Array.isArray(i?.labels) && i.labels.includes(e.label));
}
function oc(e = {}) {
	let t = Y(e), n = { ...e };
	Object.keys(n).forEach((e) => {
		(n[e] === "" || n[e] === void 0) && delete n[e];
	});
	let r = cc(n);
	return r.length === 0 ? delete n.device_class : n.device_class = r.length === 1 ? r[0] : r, n.show_state === !0 && delete n.show_state, n.show_icon === !0 && delete n.show_icon, n.show_name === !1 && delete n.show_name, n.show_entity_picture === !1 && delete n.show_entity_picture, Object.prototype.hasOwnProperty.call(n, "hide") && (n.hide = ic(rc(n)), n.hide.length === 1 && n.hide[0] === "hidden" && delete n.hide), n.card_visibility === "always" && delete n.card_visibility, t === "entity" ? (delete n.state_source, delete n.area, delete n.domain, delete n.device_class, delete n.state_template, delete n.active_template, delete n.inactive_template, delete n.name_template, delete n.hide, n.state_content === "state" && delete n.state_content, n.tap_action?.action === "more-info" && delete n.tap_action) : t === "area_count" ? (n.state_source = "area_count", delete n.entity, delete n.state_template, delete n.active_template, delete n.inactive_template, delete n.name_template, n.state_content === "count" && delete n.state_content, n.tap_action?.action === "Current state" && delete n.tap_action) : (n.state_source = "template", n.display_style !== "badge" && delete n.entity, delete n.area, delete n.domain, delete n.device_class, delete n.hide, n.state_content === "state" && delete n.state_content, n.tap_action?.action === "none" && delete n.tap_action), n.hold_action?.action === "none" && delete n.hold_action, n.double_tap_action?.action === "none" && delete n.double_tap_action, n.icon_source === "domain" && (delete n.icon_source, delete n.icon, delete n.icon_on, delete n.icon_off), [
		"",
		"theme",
		"state",
		"state-active"
	].includes(n.accent_on_color) && delete n.accent_on_color, [
		"",
		"theme",
		"state",
		"state-inactive"
	].includes(n.accent_off_color) && delete n.accent_off_color, n;
}
function sc(e = "") {
	return e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function cc(e = {}) {
	let t = Array.isArray(e?.device_class) ? e.device_class : [e?.device_class];
	return [...new Set(t.filter((e) => typeof e == "string").map((e) => e.trim()).filter(Boolean))];
}
function lc(e, t) {
	return e?.attributes?.device_class || (t === "switch" ? "switch" : "");
}
function uc(e, t = {}) {
	let n = t.domain || "", r = new Set(cc(t));
	return n ? (Object.values(e?.states || {}).forEach((e) => {
		if (!e.entity_id.startsWith(`${n}.`)) return;
		let t = lc(e, n);
		t && r.add(t);
	}), [...r].sort((e, t) => e.localeCompare(t)).map((e) => ({
		value: e,
		label: sc(e)
	}))) : [];
}
function dc(e, t = {}) {
	let n = pc(t), r = t.domain || "", i = tc(r), a = cc(t);
	return !e || !n.length || !r || i.requiresDeviceClass && !a.length ? [] : Object.values(e.states || {}).filter((o) => o.entity_id.startsWith(`${r}.`) && n.includes(Ln(e, o.entity_id)) && (!i.requiresDeviceClass || a.includes(lc(o, r))) && !ac(e, o.entity_id, t));
}
function fc(e, t = {}) {
	if (Y(t) === "entity" || t.display_style === "badge" && t.entity) {
		let n = t.entity || t.main_entity || "", r = e?.states?.[n];
		return r ? [r] : [];
	}
	return dc(e, t);
}
function pc(e = {}) {
	return Array.isArray(e.area) ? e.area.filter(Boolean) : [e.area].filter(Boolean);
}
function mc(e, t = {}) {
	return pc(t).map((t) => e?.areas?.[t]?.name || t).filter(Boolean).join(", ");
}
function hc(e, t = {}) {
	return dc(e, t).map((e) => e.entity_id);
}
function gc(e, t = !1) {
	if (e.state === "unavailable") return "var(--state-unavailable-color)";
	let n = e.entity_id.split(".")[0], r = e.attributes || {};
	if (n === "light" && t && Array.isArray(r.rgb_color)) return vc(r.rgb_color);
	let i = _c(e.state), a = t ? "active" : "inactive";
	return [
		r.device_class ? `--state-${n}-${r.device_class}-${i}-color` : "",
		`--state-${n}-${i}-color`,
		`--state-${n}-${a}-color`,
		`--state-${a}-color`
	].filter(Boolean).reduceRight((e, t) => `var(${t}, ${e})`, "var(--state-icon-color, var(--secondary-text-color))");
}
function _c(e = "") {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function vc(e) {
	let [t, n, r] = yc(e);
	return n < .4 && (n < .1 ? r = 225 : n = .4), `#${bc(t, n, r).map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function yc([e, t, n]) {
	let [r, i, a] = [
		e,
		t,
		n
	].map((e) => e / 255), o = Math.max(r, i, a), s = o - Math.min(r, i, a), c = 0;
	return s && (c = o === r ? (i - a) / s % 6 : o === i ? (a - r) / s + 2 : (r - i) / s + 4), [
		(c * 60 + 360) % 360,
		o ? s / o : 0,
		o * 255
	];
}
function bc(e, t, n) {
	let r = n / 255 * t, i = e / 60, a = r * (1 - Math.abs(i % 2 - 1)), [o, s, c] = i < 1 ? [
		r,
		a,
		0
	] : i < 2 ? [
		a,
		r,
		0
	] : i < 3 ? [
		0,
		r,
		a
	] : i < 4 ? [
		0,
		a,
		r
	] : i < 5 ? [
		a,
		0,
		r
	] : [
		r,
		0,
		a
	], l = n / 255 - r;
	return [
		o,
		s,
		c
	].map((e) => Math.round((e + l) * 255));
}
//#endregion
//#region src/common/helpers/active-entities-dialog.js
var xc = {
	_activeEntitiesOpen: { state: !0 },
	_activeEntitiesConfirmOpen: { state: !0 },
	_activeEntitiesDurationNow: { state: !0 }
};
function Sc() {
	this._activeEntitiesOpen = !1, this._activeEntitiesConfirmOpen = !1, this._activeEntitiesDurationNow = Date.now(), this._activeEntitiesDurationTimer = null;
}
function Cc(e = []) {
	return e.filter((e) => rn(e));
}
function wc() {
	this._activeEntitiesOpen = !0, this._activeEntitiesDurationNow = Date.now(), Tc.call(this);
}
function Tc() {
	this._activeEntitiesDurationTimer === null && (this._activeEntitiesDurationTimer = window.setInterval(() => {
		if (!this._activeEntitiesOpen) {
			Ec.call(this);
			return;
		}
		this._activeEntitiesDurationNow = Date.now();
	}, 6e4));
}
function Ec() {
	this._activeEntitiesDurationTimer !== null && (window.clearInterval(this._activeEntitiesDurationTimer), this._activeEntitiesDurationTimer = null);
}
function Dc() {
	this._activeEntitiesOpen = !1, this._activeEntitiesConfirmOpen = !1, Ec.call(this);
}
function Oc(e, t = []) {
	return !e || !t.length ? Promise.resolve() : this.hass?.callService(e.domain, e.service, { entity_id: t }) || Promise.resolve();
}
function kc(e) {
	e && queueMicrotask(() => this.dispatchEvent(new CustomEvent("hass-more-info", {
		detail: { entityId: e },
		bubbles: !0,
		composed: !0
	})));
}
//#endregion
//#region src/common/helpers/active-entities.js
var Ac = {
	light: {
		service: "turn_off",
		icon: "mdi:power"
	},
	switch: {
		service: "turn_off",
		icon: "mdi:power"
	},
	fan: {
		service: "turn_off",
		icon: "mdi:power"
	},
	cover: {
		service: "close_cover",
		icon: "mdi:window-shutter"
	},
	lock: {
		service: "lock",
		icon: "mdi:lock"
	},
	media_player: {
		service: "turn_off",
		icon: "mdi:power"
	},
	climate: {
		service: "turn_off",
		icon: "mdi:power"
	}
}, jc = /* @__PURE__ */ new Map(), Mc = /* @__PURE__ */ new Map();
function Nc(e, t) {
	let n = t?.entity_id?.split(".")[0] || "", r = Ac[n];
	return !r || n === "cover" && !(t.attributes?.supported_features & 2) || n === "lock" && !(t.attributes?.supported_features & 1) || e?.services?.[n] && !e.services[n][r.service] ? null : {
		domain: n,
		...r
	};
}
function Pc(e) {
	if (!e.length) return null;
	let t = e[0].control;
	return e.every(({ control: e }) => e.domain === t.domain && e.service === t.service) ? t : null;
}
function Fc(e, t) {
	let n = e?.formatEntityName?.(t) || t?.attributes?.friendly_name || t?.entity_id || "", r = Ic(e, t);
	if (!r || n.length <= r.length) return n;
	let i = RegExp(`^${Gc(r)}(?:\\s*[-–—:|]\\s*|\\s+)`, "i");
	return n.replace(i, "").trim() || n;
}
function Ic(e, t) {
	let n = Ln(e, t?.entity_id) || t?.attributes?.area_id || "";
	return e?.areas?.[n]?.name?.trim() || "";
}
function Lc(e) {
	let t = e?.locale?.language || e?.language || "en";
	return jc.has(t) || jc.set(t, new Intl.Collator(t, {
		numeric: !0,
		sensitivity: "base"
	})), jc.get(t);
}
function Rc(e, t) {
	let n = e?.formatEntityState?.(t);
	if (n) return n;
	let r = String(t?.state || "").replaceAll("_", " ");
	return r ? r[0].toUpperCase() + r.slice(1) : "";
}
function zc(e, t, n) {
	return e.compare(t.name, n.name) || t.stateObj.entity_id.localeCompare(n.stateObj.entity_id);
}
function Bc(e, t) {
	let n = 132 + e.reduce((e, { name: t, areaName: n }) => Math.max(e, t.length, n?.length || 0), 0) * 8;
	return Math.min(520, Math.max(t ? 360 : 280, n));
}
function Vc(e, t, n = Date.now()) {
	let r = Date.parse(t?.last_changed || "");
	if (!Number.isFinite(r)) return "";
	let i = Math.max(0, n - r), a, o;
	i >= 864e5 ? (a = "days", o = Math.round(i / 864e5)) : i >= 36e5 ? (a = "hours", o = Math.round(i / 36e5)) : (a = "minutes", o = Math.max(1, Math.round(i / 6e4)));
	let s = String(e?.locale?.language || e?.language || "en").replace("_", "-");
	try {
		let e = Wc(s).format({ [a]: o });
		return s.toLowerCase().startsWith("en") ? e.replace(/\b(days?|hours?|minutes?)\b/, (e) => e[0].toUpperCase() + e.slice(1)) : e;
	} catch {
		let e = a.slice(0, -1), t = o === 1 ? e : a;
		return `${o} ${t[0].toUpperCase()}${t.slice(1)}`;
	}
}
function Hc(e, t) {
	return e?.services?.[t.domain]?.[t.service]?.name;
}
function Uc(e) {
	return `color:${xn(e) || gc(e, !0)};--mdc-icon-size:36px`;
}
function Wc(e) {
	return Mc.has(e) || Mc.set(e, new Intl.DurationFormat(e, { style: "long" })), Mc.get(e);
}
function Gc(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region src/common/renders/active-entities-dialog.js
function Kc(e = []) {
	if (!this._activeEntitiesOpen) return E;
	let t = Lc(this.hass), n = e.map((e) => {
		let t = Nc(this.hass, e);
		return {
			stateObj: e,
			control: t,
			name: Fc(this.hass, e),
			areaName: Ic(this.hass, e),
			serviceName: t ? Hc(this.hass, t) : ""
		};
	}).sort((e, n) => zc(t, e, n)), r = n.filter((e) => e.control), i = Pc(r), a = i ? Hc(this.hass, i) : "", o = Bc(n, i), s = [
		`--ha-dialog-width-sm:${o}px`,
		`--mdc-dialog-min-width:${o}px`,
		`--mdc-dialog-max-width:${o}px`
	].join(";"), c = Rc(this.hass, n[0]?.stateObj), l = c ? this._t("Currently {state}", { state: c }) : this._t("Current state");
	return w`
    <ha-adaptive-dialog
      .open=${!0}
      width="small"
      style=${s}
      @closed=${() => Dc.call(this)}
    >
      <ha-icon-button
        slot="headerNavigationIcon"
        .label=${this.hass?.localize?.("ui.common.close")}
        @click=${() => Dc.call(this)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <span slot="headerTitle">${l}</span>
      ${i ? w`
            <ha-button
              slot="headerActionItems"
              appearance="filled"
              @click=${async () => {
		if (i.service === "turn_off") {
			this._activeEntitiesConfirmOpen = !0;
			return;
		}
		await Oc.call(this, i, r.map((e) => e.stateObj.entity_id)), Dc.call(this);
	}}
            >
              <ha-icon slot="start" .icon=${i.icon}></ha-icon>
              ${a} (${r.length})
            </ha-button>
          ` : ""}
      <div class="active-entities-dialog-content">
        ${n.length ? n.map(({ stateObj: e, name: t, areaName: n, control: r, serviceName: i }) => w`
              <div class="active-entity-row">
                ${r ? w`
                      <button
                        type="button"
                        class="active-entity-control-button"
                        aria-label=${i}
                        title=${i}
                        @click=${(t) => {
		t.stopPropagation(), Oc.call(this, r, [e.entity_id]);
	}}
                      >
                        <ha-state-icon
                          .hass=${this.hass}
                          .stateObj=${e}
                          style=${Uc(e)}
                        ></ha-state-icon>
                      </button>
                    ` : w`
                      <ha-state-icon
                        .hass=${this.hass}
                        .stateObj=${e}
                        style=${Uc(e)}
                      ></ha-state-icon>
                    `}
                <button
                  type="button"
                  class="active-entity-info"
                  @click=${() => kc.call(this, e.entity_id)}
                >
                  <span class="active-entity-name">${t}</span>
                  ${n ? w`
                        <span class="active-entity-area">${n}</span>
                      ` : E}
                  <span class="active-entity-state-line">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${e}
                    ></state-display>
                    <span aria-hidden="true">-</span>
                    <span>${Vc(this.hass, e, this._activeEntitiesDurationNow)}</span>
                  </span>
                </button>
              </div>
            `) : w`
              <div class="active-entities-empty">
                ${this._t("No active entities")}
              </div>
            `}
      </div>
    </ha-adaptive-dialog>
    ${this._activeEntitiesConfirmOpen && i?.service === "turn_off" ? w`
          <ha-dialog
            .open=${!0}
            type="alert"
            .preventScrimClose=${!0}
            @closed=${() => {
		this._activeEntitiesConfirmOpen = !1;
	}}
            aria-labelledby="active-entities-confirmation-title"
            aria-describedby="active-entities-confirmation-description"
          >
            <ha-dialog-header slot="header">
              <h1
                slot="title"
                id="active-entities-confirmation-title"
                class="active-entities-confirmation-title"
              >
                ${this.hass?.localize?.("ui.dialogs.generic.default_confirmation_title")}
              </h1>
            </ha-dialog-header>
            <p
              id="active-entities-confirmation-description"
              class="active-entities-confirmation-text"
            >
              ${this._t("This will turn off {count} active entities.", { count: r.length })}
            </p>
            <ha-dialog-footer slot="footer">
              <ha-button
                slot="secondaryAction"
                appearance="plain"
                @click=${() => {
		this._activeEntitiesConfirmOpen = !1;
	}}
              >
                ${this.hass?.localize?.("ui.common.cancel")}
              </ha-button>
              <ha-button
                slot="primaryAction"
                variant="danger"
                @click=${async () => {
		await Oc.call(this, i, r.map((e) => e.stateObj.entity_id)), this._activeEntitiesConfirmOpen = !1, Dc.call(this);
	}}
              >
                ${a || this.hass?.localize?.("ui.card.common.turn_off")}
              </ha-button>
            </ha-dialog-footer>
          </ha-dialog>
        ` : E}
  `;
}
//#endregion
//#region src/cards/status/helpers/attributes.js
function X(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function qc(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function Jc(e, t, n) {
	let r = X(t, "color");
	return n ? e.accent_on_color || r || "theme" : e.accent_off_color || r || "theme";
}
function Yc(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (Xc.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
var Xc = [
	"",
	"0",
	"off",
	"false",
	"no",
	"none",
	"unknown",
	"unavailable",
	"idle",
	"standby",
	"docked",
	"disarmed",
	"closed",
	"locked",
	"clear",
	"cleared",
	"normal",
	"ok",
	"okay",
	"safe",
	"home",
	"online",
	"connected",
	"available",
	"disabled"
];
function Zc(e, t) {
	let n = X(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return qc(e) || r || "/lovelace/home";
}
//#endregion
//#region src/common/helpers/zones.js
var Qc = /* @__PURE__ */ new WeakMap();
function $c(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = Qc.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [el(e), e]))
	};
	return Qc.set(t, i), i;
}
function el(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function tl(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	if (this._config.mode === "person") {
		al.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = Z(this._config);
		this._statusItems = e.map((e) => nl.call(this, e, this._config)), il.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.entity, n = nl.call(this, { entity: t }, this._config);
	this._statusItems = [n], il.call(this, n);
}
function Z(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.entity,
		...Qs(e),
		accent_on_color: e.accent_on_color,
		accent_off_color: e.accent_off_color,
		entity_icon_source: e.entity_icon_source,
		entity_icon: e.entity_icon,
		entity_icon_on: e.entity_icon_on,
		entity_icon_off: e.entity_icon_off,
		entity_icon_svg_color_override: e.entity_icon_svg_color_override,
		entity_icon_on_svg_color_override: e.entity_icon_on_svg_color_override,
		entity_icon_off_svg_color_override: e.entity_icon_off_svg_color_override,
		state_template: e.state_template,
		name_template: e.name_template,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action,
		entity_tap_action: e.entity_tap_action,
		entity_hold_action: e.entity_hold_action,
		entity_double_tap_action: e.entity_double_tap_action
	}];
}
function nl(e, t = {}) {
	let n = {
		...t,
		...e
	}, r = Y(n), i = e.entity || t.entity, a = r === "area_count" ? dc(this.hass, n) : [], o = a.filter((e) => this._getEntityActiveState(e)), s = r === "area_count" ? o[0] || a[0] || null : i && this.hass ? this.hass.states[i] : null, c = i || s?.entity_id || "";
	n.entity = c;
	let l = n.mode !== "icon_only" && Object.prototype.hasOwnProperty.call(n, "name") && n.name !== void 0 && n.name !== "", u = r !== "area_count" && n.state_template ? this._evaluateStateTemplate(n.state_template, c) : null, d = r === "template" && n.active_template ? this._evaluateStateTemplate(n.active_template, c) : null, f = r === "template" && n.inactive_template ? this._evaluateStateTemplate(n.inactive_template, c) : null, p = r !== "area_count" && n.name_template ? this._evaluateStateTemplate(n.name_template, c) : null, m = p === null ? l ? bt(n.name, n, this.hass) : X(s, "friendly_name") || c || q(this.hass, "Status") : String(p), ee = r === "template" ? n.state_template ? String(u ?? "") : s ? X(s, "label") || this.formatState(s) : "" : r === "area_count" ? String(o.length) : X(s, "label") || (s ? this.formatState(s) : ""), te = n.entity_icon, ne = n.entity_icon_on, re = n.entity_icon_off, ie = !!(n.state_template || n.active_template || n.inactive_template), h = r === "template" ? ie ? zt(d) ? !0 : zt(f) ? !1 : zt(u) : s ? this._getEntityActiveState(s) : !1 : r === "area_count" ? o.length > 0 : Yc(s, (e) => this._getEntityActiveState(e), u), g = rl(n, c), ae = g === "custom" && ((h ? ne : re) || te) || "", oe = ae || (r === "area_count" ? tc(n.domain).icon : "mdi:information-outline"), _ = g === "custom" && h && ne ? "entity_icon_on" : g === "custom" && !h && re ? "entity_icon_off" : g === "custom" && te ? "entity_icon" : "", v = Jc(n, s, h), y = Zc(n, s), se = this._computeFullColor(v), b = this._computeFullColor(v), ce = this._computeCircleColor(v), le = h ? this._computeFullColor(v) : this._computeIconColor(v);
	return {
		...e,
		entityId: c,
		stateObj: s,
		useStateIcon: r !== "area_count" && !!s && !ae,
		cardName: m,
		statusText: ee,
		icon: oe,
		navigationPath: y,
		nameColor: se,
		statusColor: b,
		circleColor: ce,
		iconColor: le,
		svgForceColor: _ ? this._getSvgColorOverride(n, _) : !0
	};
}
function rl(e, t) {
	let n = e.entity_icon_source, r = !!t, i = !!(e.entity_icon || e.entity_icon_on || e.entity_icon_off);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function il(e) {
	this._cardName = e.cardName ?? q(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._mainStateObj = e.stateObj || null, this._useNativeMainIcon = e.useStateIcon ?? !1, this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function al() {
	let e = this._config.entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null, o = Object.prototype.hasOwnProperty.call(this._config, "name") && this._config.name !== void 0 && this._config.name !== "";
	this._cardName = o ? bt(this._config.name, this._config, this.hass) : X(i, "friendly_name") || X(r, "friendly_name") || e || t || q(this.hass, "Person");
	let s = this._config.name_template ? this._evaluateStateTemplate(this._config.name_template, t) : null;
	s !== null && (this._cardName = String(s));
	let c = r ? sl.call(this, r) : "", l = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = l ? `${c} | ${l}` : c;
	let u = Yc(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), d = Jc(this._config, r, u);
	this._personPicture = X(i, "entity_picture") || X(r, "entity_picture") || "", this._personZoneIcon = ol.call(this, r, i), this._personBattery1 = cl.call(this, this._config.battery_entity_1), this._personBattery2 = cl.call(this, this._config.battery_entity_2), this._icon = X(i, "icon") || X(r, "icon") || "mdi:account", this._navigationPath = Zc(this._config, r), this._nameColor = this._computeFullColor(d), this._statusColor = this._computeFullColor(d), this._circleColor = this._computeCircleColor(d), this._iconColor = u ? this._computeFullColor(d) : this._computeIconColor(d), this._iconSvgForceColor = !0;
}
function ol(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = $c(this.hass), r = t?.entity_id;
	if (r) {
		let e = n.zones.find((e) => Array.isArray(e.attributes?.persons) && e.attributes.persons.includes(r));
		if (e?.attributes?.icon) return e.attributes.icon;
	}
	let i = e?.state?.toLowerCase();
	if (i && i !== "not_home") {
		let e = n.zoneByTrackerState.get(i);
		if (e?.attributes?.icon) return e.attributes.icon;
	}
	return "mdi:home-minus";
}
function sl(e) {
	let t = e?.state;
	return t ? t === "home" ? q(this.hass, "Home") : t === "not_home" ? q(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function cl(e) {
	let t = e && this.hass ? this.hass.states[e] : null;
	if (!t) return null;
	let n = Number(t.state), r = "var(--state-icon-color)";
	return Number.isFinite(n) && (r = n >= 70 ? "var(--state-sensor-battery-high-color)" : n >= 30 ? "var(--state-sensor-battery-medium-color)" : "var(--state-sensor-battery-low-color)"), {
		entityId: e,
		stateObj: t,
		color: r
	};
}
//#endregion
//#region src/cards/status/helpers/action-config.js
function ll() {
	return A(this._config.hold_action) ? this._config.hold_action : null;
}
function ul() {
	return A(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function dl() {
	return A(this._config.entity_hold_action) ? this._config.entity_hold_action : null;
}
function fl() {
	let e = hl(this), t = e.entity_tap_action;
	return t?.action === "none" ? null : t?.action ? t : Y(e) === "area_count" ? { action: J } : this._isIconOnlyMode() || this._isPersonMode() ? null : { action: "more-info" };
}
function pl() {
	return A(this._config.entity_double_tap_action) ? this._config.entity_double_tap_action : null;
}
function ml() {
	let e = hl(this), t = Y(e);
	if (t === "area_count") return e.tap_action?.action ? e.tap_action : { action: J };
	if (t === "template") return e.tap_action?.action ? e.tap_action : { action: "more-info" };
	let n = {
		action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate",
		navigation_path: this._navigationPath || "/lovelace/home"
	}, r = this._config.tap_action;
	return r?.action ? r : n;
}
function hl(e) {
	if (e._config?.mode !== "icon_only") return e._config || {};
	let t = Array.isArray(e._config?.entities) ? e._config.entities[0] : null;
	return t && typeof t == "object" ? {
		...e._config,
		...t
	} : e._config || {};
}
function gl(e = 0) {
	let t = this._statusItems?.[e];
	return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : Y(t) === "area_count" ? {
		action: J,
		status_index: e
	} : { action: "more-info" };
}
function _l(e = 0) {
	let t = this._statusItems?.[e];
	return A(t?.hold_action) ? t.hold_action : A(this._config.hold_action) ? this._config.hold_action : null;
}
function vl(e = 0) {
	let t = this._statusItems?.[e];
	return A(t?.double_tap_action) ? t.double_tap_action : A(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function yl(e = 0) {
	let t = this._statusItems?.[e];
	return t?.entity_tap_action?.action && t.entity_tap_action.action !== "none" ? t.entity_tap_action : this._config.entity_tap_action?.action && this._config.entity_tap_action.action !== "none" ? this._config.entity_tap_action : Y(t) === "area_count" ? {
		action: J,
		status_index: e
	} : this._getStatusItemCardTapAction(e);
}
function bl(e = 0) {
	let t = this._statusItems?.[e];
	return A(t?.entity_double_tap_action) ? t.entity_double_tap_action : A(this._config.entity_double_tap_action) ? this._config.entity_double_tap_action : null;
}
function xl(e = 0) {
	let t = this._statusItems?.[e];
	return t?.entity_hold_action?.action ? t.entity_hold_action.action === "none" ? null : t.entity_hold_action : this._config.entity_hold_action?.action ? this._config.entity_hold_action.action === "none" ? null : this._config.entity_hold_action : null;
}
//#endregion
//#region src/cards/status/renders/status-card.js
function Sl() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = kl(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
	return w`
    <ha-card
      class="mode-${e} ${n ? "grouped" : ""} ${n && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --status-item-count:${r};
        --status-columns:${i};
        --status-rows:${a};
      "
      @click=${this._handleTap}
      @dblclick=${this._handleDoubleTap}
      @pointerdown=${this._handleCardPointerDown}
      @pointerup=${this._handleCardPointerUp}
      @pointerleave=${this._handleCardPointerCancel}
      @pointercancel=${this._handleCardPointerCancel}
      @contextmenu=${this._handleCardContextMenu}
    >
      <div
        class="container status-container mode-${e} ${n ? "grouped" : ""}"
        style="
          --status-circle-color:${this._circleColor};
          --status-icon-color:${this._iconColor};
          --status-name-color:${this._nameColor};
          --status-text-color:${this._statusColor};
        "
      >
        ${n ? Cl.call(this, t, i) : w`
        <div
          class="circle status-circle"
          @pointerdown=${this._handleMainIconPointerDown}
          @pointerup=${this._handleMainIconPointerUp}
          @pointerleave=${this._handleMainIconPointerCancel}
          @pointercancel=${this._handleMainIconPointerCancel}
          @touchstart=${this._handleMainIconPointerDown}
          @touchend=${this._handleMainIconPointerUp}
          @touchcancel=${this._handleMainIconPointerCancel}
          @click=${this._handleMainIconClick}
          @dblclick=${this._handleMainEntityDoubleTap}
          @contextmenu=${this._handleMainIconContextMenu}
        >
          ${e === "person" ? Tl.call(this) : this._isImageIcon(this._icon) ? w`
                <div
                  class="main-image-icon"
                >
                  ${c ? L(c) : w`<img src=${s} alt="" />`}
                </div>
              ` : this._useNativeMainIcon && this._mainStateObj ? w`
                <ha-state-icon
                  class="main-icon"
                  .stateObj=${this._mainStateObj}
                ></ha-state-icon>
              ` : w`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
          ${Dl.call(this, this._mainStateObj)}
        </div>

        ${e === "icon_only" ? w`
              <div
                class="status-badge"
                ?hidden=${!o}
              >
                ${o}
              </div>
            ` : w`
              <div class="content">
                <div class="header">
                  <div class="card-name">
                    ${this._cardName}
                  </div>

                  <div class="status">
                    ${this._statusText || ""}
                  </div>
                </div>
              </div>
            `}
          `}
      </div>
    </ha-card>
    ${this._renderActiveEntitiesDialog()}
  `;
}
function Cl(e, t) {
	return w`
    <div class="status-icon-grid">
      ${Al(e, t).map((e, n) => w`
        <div class="status-icon-row">
          ${e.map((e, r) => wl.call(this, e, n * t + r))}
          ${jl(e.length, t, "status-icon-spacer")}
        </div>
      `)}
    </div>
  `;
}
function wl(e, t) {
	let n = kl(e.statusText), r = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", i = r ? this._getInlineSvg(r, e.svgForceColor) : "", a = w`
    <div class="circle status-circle">
      ${this._isImageIcon(e.icon) ? w`
            <div class="main-image-icon">
              ${i ? L(i) : w`<img src=${r} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? w`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : w`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${Dl.call(this, e.stateObj)}
    </div>

    <div
      class="status-badge"
      ?hidden=${!n}
    >
      ${n}
    </div>
  `;
	return (this._statusItems?.length || 0) > 1 && !this._config?.separate_cards ? w`
      <div
        class="status-icon-item"
        style="
          --status-circle-color:${e.circleColor};
          --status-icon-color:${e.iconColor};
        "
        @click=${(e) => this._handleStatusItemClick(e, t)}
        @dblclick=${(e) => this._handleStatusItemDoubleClick(e, t)}
        @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
        @pointerup=${this._handleStatusItemPointerUp}
        @pointerleave=${this._handleStatusItemPointerCancel}
        @pointercancel=${this._handleStatusItemPointerCancel}
        @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
      >
        ${a}
      </div>
    ` : w`
    <ha-card
      class="status-icon-item"
      style="
        --status-circle-color:${e.circleColor};
        --status-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleStatusItemClick(e, t)}
      @dblclick=${(e) => this._handleStatusItemDoubleClick(e, t)}
      @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
      @pointerup=${this._handleStatusItemPointerUp}
      @pointerleave=${this._handleStatusItemPointerCancel}
      @pointercancel=${this._handleStatusItemPointerCancel}
      @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
    >
      ${a}
    </ha-card>
  `;
}
function Tl() {
	return w`
    <div class="person-main-icon">
      ${this._personPicture ? w`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          ` : w`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${El.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? El.call(this, "battery-1", null, this._personBattery1.color, this._personBattery1.entityId, this._personBattery1.stateObj) : ""}

      ${this._personBattery2 ? El.call(this, "battery-2", null, this._personBattery2.color, this._personBattery2.entityId, this._personBattery2.stateObj) : ""}
    </div>
  `;
}
function El(e, t, n, r = null, i = null) {
	let a = Ol(i);
	return w`
    <span
      class="person-badge person-badge-${e} ${r ? "clickable" : ""}"
      style="background:${n}"
      .dataEntity=${r}
      @pointerdown=${this._handlePersonBadgeStop}
      @pointerup=${this._handlePersonBadgePointerUp}
      @pointerleave=${this._handlePersonBadgeStop}
      @pointercancel=${this._handlePersonBadgeStop}
      @touchstart=${this._handlePersonBadgeStop}
      @touchend=${this._handlePersonBadgeStop}
      @touchcancel=${this._handlePersonBadgeStop}
      @click=${this._handlePersonBadgeClick}
    >
      <span class="person-badge-icon">
        ${i ? w`
              <ha-state-icon
                class=${a ? "charging" : ""}
                .stateObj=${i}
              ></ha-state-icon>
            ` : w`<ha-icon .icon=${t}></ha-icon>`}
      </span>
      ${Dl.call(this, i)}
    </span>
  `;
}
function Dl(e) {
	return an(e) ? w`
        <ha-tile-badge
          class="entity-unavailable-badge"
          title=${this._t("Unavailable")}
          aria-label=${this._t("Unavailable")}
        >
          <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
        </ha-tile-badge>
      ` : "";
}
function Ol(e) {
	let t = e?.attributes || {};
	return String(t.icon || "").toLowerCase().includes("battery-charging") || t.battery_charging === !0 || t.is_charging === !0 || t.charging === !0;
}
function kl(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
function Al(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function jl(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => w`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/cards/status/styles/status-card-styles.js
var Ml = [
	kr,
	Ar,
	jr,
	d`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped {
    --orbit-grouped-item-gap: clamp(5px, 1.4cqw, 8px);
    aspect-ratio: auto;
    container-type: inline-size;
  }

  ha-card.mode-icon_only.grouped:not(.separate-cards) {
    background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
    overflow: hidden;
  }

  ha-card.mode-icon_only.grouped.separate-cards {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: var(--ha-card-border-width, 1px) solid transparent;
    box-shadow: none;
    overflow: visible;
  }

  ha-card.mode-person {
    aspect-ratio: 3 / 1;
  }

  .status-container {
    --status-circle-color: rgba(var(--color-theme),0.05);
    --status-icon-color: rgba(var(--color-theme),0.4);
    --status-name-color: rgb(var(--color-theme));
    --status-text-color: rgb(var(--color-theme));
    overflow: hidden;
  }

  .status-circle {
    background: var(--status-circle-color);
    position: absolute;
    left: -8%;
    top: 18%;
    width: 34%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    touch-action: manipulation;
    z-index: 3;
  }

  .status-circle .main-icon {
    --orbit-main-icon-size: 45%;
    color: var(--status-icon-color);
  }

  .status-circle .main-image-icon {
    width: 45%;
    height: 45%;
    color: var(--status-icon-color);
  }

  .status-container .content {
    justify-content: center;
    padding-left: 31%;
    pointer-events: none;
  }

  .status-container .status {
    color: var(--status-text-color);
    font-size: clamp(16px, 8cqw, 32px);
  }

  .status-container .card-name {
    color: var(--status-name-color);
  }

  .status-container.mode-icon_only .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
    transform: none;
  }

  .status-container.mode-icon_only.grouped {
    display: block;
    height: auto;
    overflow: visible;
    padding: 0;
  }

  .status-icon-grid {
    display: flex;
    flex-direction: column;
    gap: var(--orbit-grouped-item-gap);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .status-container.mode-icon_only.grouped .status-icon-grid {
    height: auto;
  }

  .status-icon-row {
    display: flex;
    gap: var(--orbit-grouped-item-gap);
    width: 100%;
  }

  .status-icon-item {
    border-radius: 15px;
    box-sizing: border-box;
    container-type: size;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .status-icon-spacer {
    flex: 1 1 0;
    min-width: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .status-container.mode-icon_only.grouped .status-icon-item {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped:not(.separate-cards) .status-icon-item {
    --ha-card-background: transparent;
    --card-background-color: transparent;
    background: transparent !important;
    border: var(--ha-card-border-width, 1px) solid transparent;
    box-shadow: none;
  }

  .status-container.mode-icon_only.grouped .status-icon-spacer {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-item {
    border-radius: 15px;
    overflow: hidden;
  }

  .status-icon-item .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
  }

  .status-container.mode-icon_only .status-circle .main-icon {
    --orbit-main-icon-size: 54%;
  }

  .status-container.mode-icon_only .status-circle .main-image-icon {
    width: 54%;
    height: 54%;
  }

  .status-container.mode-person .status-circle {
    overflow: visible;
  }

  .status-container.mode-person .person-main-icon {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture,
  .status-container.mode-person .person-fallback-icon {
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture {
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  .status-container.mode-person .person-fallback-icon {
    --mdc-icon-size: 100%;
    color: var(--status-icon-color);
  }

  .person-badge {
    --person-badge-size: clamp(16px, 18%, 40px);
    --person-badge-ring: clamp(2px, 0.55cqw, 4px);
    position: absolute;
    width: var(--person-badge-size);
    height: var(--person-badge-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 var(--person-badge-ring) var(--ha-card-background, var(--card-background-color));
    transform: translate(-50%, -50%);
    z-index: 5;
    pointer-events: none;
  }

  .person-badge.clickable {
    pointer-events: auto;
    cursor: pointer;
  }

  .person-badge-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .person-badge ha-icon,
  .person-badge ha-state-icon {
    --mdc-icon-size: 92%;
    width: 92%;
    height: 92%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: none;
    color: var(--primary-background-color);
  }

  .person-badge-zone {
    left: 37%;
    top: 4%;
    z-index: 6;
  }

  .person-badge-zone ha-icon {
    transform: none;
  }

  .person-badge ha-state-icon {
    transform: translate(4%, -10%);
  }

  .person-badge ha-state-icon.charging {
    transform: translate(10%, -10%);
  }

  .person-badge-battery-1 {
    left: 69%;
    top: 4%;
  }

  .person-badge-battery-2 {
    left: 94%;
    top: 25%;
  }

  .status-badge {
    background: var(--status-circle-color);
    color: var(--status-icon-color);
    position: absolute;
    top: 5%;
    right: 5%;
    min-width: clamp(20px, 36cqw, 80px);
    height: clamp(20px, 36cqw, 80px);
    padding: 0 clamp(3px, 7cqw, 18px);
    border-radius: 999px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(17px, 23cqw, 52px);
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;
    z-index: 4;
    pointer-events: none;
  }

  .status-badge[hidden] {
    display: none;
  }
`
], Nl = d`
  ha-adaptive-dialog {
    --ha-dialog-min-height: auto;
    --ha-bottom-sheet-height: auto;
  }

  .active-entities-dialog-content {
    min-width: 0;
    padding: 0 var(--ha-space-4, 16px);
  }

  .active-entity-row {
    display: flex;
    align-items: center;
    gap: var(--ha-space-3, 12px);
    min-height: 52px;
    padding: 6px 0;
    border-top: 1px solid var(--divider-color);
  }

  .active-entity-row > ha-state-icon {
    flex: 0 0 auto;
    margin: 12px;
  }

  .active-entity-row ha-state-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    line-height: 0;
    --mdc-icon-size: 36px;
  }

  .active-entity-control-button {
    display: grid;
    flex: 0 0 auto;
    width: 48px;
    height: 48px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 50%;
    outline: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .active-entity-control-button ha-state-icon {
    pointer-events: none;
  }

  .active-entity-control-button:focus-visible,
  .active-entity-control-button:hover {
    background: var(--secondary-background-color);
  }

  .active-entity-info {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    flex-direction: column;
    gap: 1px;
    padding: 4px 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .active-entity-info:focus-visible {
    border-radius: var(--ha-border-radius-md);
    background: var(--secondary-background-color);
  }

  .active-entity-name {
    overflow: hidden;
    color: var(--primary-text-color);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .active-entity-area,
  .active-entity-state-line {
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .active-entity-area {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .active-entity-state-line {
    display: flex;
    align-items: baseline;
    gap: 5px;
  }

  .active-entity-state-line state-display {
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .active-entities-empty {
    padding: var(--ha-space-5, 20px) 0;
    color: var(--secondary-text-color);
    text-align: center;
  }

  .active-entities-confirmation-text {
    margin: 0;
    color: var(--primary-text-color);
  }

  .active-entities-confirmation-title {
    margin: inherit;
    padding: 0 var(--ha-space-2, 8px);
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`;
//#endregion
//#region src/common/editor/helpers/group-options.js
function Pl({ config: e = {}, itemCount: t = 0, wrapEnabled: n = !!e?.wrap, perRowKey: r = "items_per_row", defaultPerRow: i = 3, scrollThreshold: a = 6 } = {}) {
	let o = Math.max(1, Number(e?.[r]) || i), s = !!n && t > o;
	return {
		itemsPerRow: o,
		shouldWrapTabs: s,
		showTabScrollHint: !s && t > a || s && o > a
	};
}
function Fl({ itemCount: e = 0, classPrefix: t, wrapKey: n = "wrap", wrapEnabled: r = !!this._config?.[n], showWrapToggle: i = !0, showSeparateToggle: a = e > 1, separateKey: o = "separate_cards", perRowKey: s = "items_per_row", perRowLabel: c = "Items per row", defaultPerRow: l = 3 } = {}) {
	let u = t || "action";
	return w`
    <div class="${u}-group-options">
      ${i ? w`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Wrap")}</span>
              <ha-switch
                .checked=${!!r}
                @change=${(e) => this._updateConfig({
		[n]: e.target.checked,
		[s]: e.target.checked ? this._config?.[s] || l : this._config?.[s]
	})}
              ></ha-switch>
            </label>
          ` : ""}

      ${a ? w`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Separate cards")}</span>
              <ha-switch
                .checked=${!!this._config?.[o]}
                @change=${(e) => this._updateConfig({ [o]: e.target.checked })}
              ></ha-switch>
            </label>
          ` : ""}

      ${r ? w`
            <div class="${u}-per-row-field">
              ${this._renderNumberInput(c, s, {
		value: this._config?.[s] || l,
		min: 1,
		step: 1,
		onValueChanged: (e) => this._updateConfig({ [s]: Math.max(1, Number(e) || 1) })
	})}
            </div>
          ` : ""}
    </div>
  `;
}
//#endregion
//#region src/common/editor/renders/status-state-controls.js
function Il(e) {
	let t = e === "entity" ? "more-info" : e === "area_count" ? J : "none", n = {
		id: J,
		primary: this._t("Current state"),
		icon: "mdi:format-list-bulleted"
	};
	return w`
    <ha-expansion-panel
      class="badge-interactions-panel"
      outlined
      .expanded=${this._interactionsExpanded === !0}
      @expanded-changed=${(e) => {
		this._interactionsExpanded = e.detail.expanded;
	}}
    >
      <ha-icon slot="leading-icon" icon="mdi:gesture-tap-button"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Interactions")}
      </div>
      <div class="badge-interactions-content">
        ${ha.call(this, "Tap behavior", "tap_action", t, e === "area_count" ? { extraActions: [n] } : void 0)}
        ${ha.call(this, "Hold behavior", "hold_action", "none")}
        ${ha.call(this, "Double tap behavior", "double_tap_action", "none")}
      </div>
    </ha-expansion-panel>
  `;
}
function Ll(e = "entity") {
	let t = this._config?.icon_source || (this._config?.icon ? "custom" : "domain");
	return w`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Icon")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
		label: this._t(e === "entity" ? "Entity" : e === "area_count" ? "Domain" : "Default"),
		value: "domain"
	}, {
		label: this._t("Custom"),
		value: "custom"
	}] } }}
          .value=${t}
          @value-changed=${(e) => e.detail.value === "custom" ? this._handleConfigUpdate("icon_source", "custom") : this._updateConfig({
		icon_source: void 0,
		icon: void 0,
		icon_on: void 0,
		icon_off: void 0
	})}
        ></ha-selector>
      </div>

      ${t === "custom" ? w`
            ${this._renderIconInput("", "icon")}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], "icon_on")}
              ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
            </div>
          ` : ""}
    </div>
  `;
}
function Rl({ stateSource: e, domainConfig: t, deviceClassOptions: n, badgeMode: r, showInactiveTemplate: i = r, showNameTemplate: a = !r, preserveStateConfig: o = !1, renderEntityPicker: s, areaMultiple: c = !1, renderAreaPicker: l }) {
	let u = this._config?.domain || "", d = cc(this._config), f = r ? this._config?.card_visibility || "always" : e, p = r ? [
		{
			label: this._t("Always"),
			value: "always"
		},
		{
			label: this._t("State"),
			value: "state"
		},
		{
			label: this._t("Template"),
			value: "template"
		}
	] : [
		{
			label: this._t("Entity"),
			value: "entity"
		},
		{
			label: this._t("Area Count"),
			value: "area_count"
		},
		{
			label: this._t("Template"),
			value: "template"
		}
	];
	return w`
    <div class="field main-entity-icon-source-field">
      ${r ? w`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${!1}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
          ` : ""}

      <div class="field-header">
        <label>${this._t(r ? "Visibility" : "State")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: p } }}
          .value=${f}
          @value-changed=${(e) => {
		let t = e.detail.value || (r ? "always" : "entity");
		if (r) {
			this._updateConfig(t === "always" ? {
				card_visibility: void 0,
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				state_template: void 0,
				active_template: void 0,
				inactive_template: void 0,
				name_template: void 0,
				state_content: void 0
			} : t === "state" ? {
				card_visibility: "state",
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				state_template: void 0,
				active_template: void 0,
				inactive_template: void 0,
				name_template: void 0,
				state_content: void 0
			} : {
				card_visibility: "template",
				state_source: "template",
				area: void 0,
				domain: void 0,
				device_class: void 0,
				state_template: void 0,
				name_template: void 0,
				state_content: void 0
			});
			return;
		}
		if (o) {
			this._updateConfig({ state_source: t === "entity" ? void 0 : t });
			return;
		}
		this._updateConfig(t === "entity" ? {
			state_source: void 0,
			area: void 0,
			domain: void 0,
			device_class: void 0,
			state_template: void 0,
			active_template: void 0,
			inactive_template: void 0,
			state_content: void 0
		} : t === "area_count" ? {
			state_source: "area_count",
			entity: void 0,
			state_template: void 0,
			active_template: void 0,
			inactive_template: void 0,
			state_content: void 0
		} : {
			state_source: "template",
			entity: void 0,
			area: void 0,
			domain: void 0,
			device_class: void 0,
			state_content: void 0
		});
	}}
        ></ha-selector>
      </div>

      ${!r && e === "entity" ? s ? s() : w`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${!1}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
            ` : !r && e === "area_count" ? w`
            ${l ? l() : c ? Wl.call(this, {
		config: this._config,
		updateConfig: (e) => this._updateConfig(e)
	}) : w`
                  <div class="field">
                    <span class="native-picker-label">${this._t("Area")}</span>
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
                      .selector=${{ area: {} }}
                      .required=${!1}
                      .value=${this._config?.area || ""}
                      @value-changed=${(e) => this._handleConfigUpdate("area", e.detail.value || "")}
                    ></ha-selector>
                  </div>
                `}

            <div class="field">
              <ha-generic-picker
                .hass=${this.hass}
                .value=${u}
                .label=${this._t("Domain")}
                .placeholder=${this._t("Domain")}
                use-top-label
                .getItems=${() => Vl.call(this)}
                .valueRenderer=${(e) => Hl.call(this, e)}
                .rowRenderer=${Ul}
                @value-changed=${(e) => this._updateConfig({
		domain: e.detail.value || void 0,
		device_class: void 0
	})}
              ></ha-generic-picker>
            </div>

            ${t?.requiresDeviceClass && n.length > 0 ? w`
                  <div class="field">
                    <label>${this._t("Device class")}</label>
                    <div class="status-badge-device-class-options">
                      ${n.map((e) => w`
                          <ha-checkbox
                            .checked=${d.includes(e.value)}
                            .value=${e.value}
                            @change=${(t) => {
		let n = t.target.checked ? [...new Set([...d, e.value])] : d.filter((t) => t !== e.value);
		this._handleConfigUpdate("device_class", n.length ? n : void 0);
	}}
                          >${e.label}</ha-checkbox>
                        `)}
                    </div>
                  </div>
                ` : ""}

            ${Bl.call(this)}
          ` : f === "template" ? w`
              ${r ? "" : s ? s("") : w`
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
                      .selector=${{ entity: {} }}
                      .required=${!1}
                      .value=${this._config?.entity || ""}
                      @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
                    ></ha-selector>
                    `}
              <div class="field">
                <ha-selector
                  .hass=${this.hass}
                  .label=${this._t("Active template")}
                  .selector=${{ template: {} }}
                  .value=${this._config?.active_template || ""}
                  @value-changed=${(e) => this._handleConfigUpdate("active_template", e.detail.value || void 0)}
                ></ha-selector>
                ${zl.call(this, this._config?.active_template, this._config?.entity || "")}
              </div>
              ${i ? w`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Inactive template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.inactive_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("inactive_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${zl.call(this, this._config?.inactive_template, this._config?.entity || "")}
                    </div>
                  ` : ""}
              ${a ? w`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Name template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.name_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("name_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${zl.call(this, this._config?.name_template)}
                    </div>
                  ` : ""}
            ` : ""}
    </div>
  `;
}
function zl(e, t = "") {
	let n = Rt.call(this, e, t);
	return n ? w`<ha-alert alert-type="error">${n}</ha-alert>` : "";
}
function Bl() {
	let e = rc(this._config), t = e.some((e) => e.type === "hidden"), n = e.filter((e) => e.type === "label").map((e) => e.label), r = ({ hidden: e = t, labels: r = n } = {}) => {
		this._updateConfig({ hide: ic([...e ? [{ type: "hidden" }] : [], ...r.map((e) => ({
			type: "label",
			label: e
		}))]) });
	};
	return w`
    <div class="field">
      <label>${this._t("Hide")}</label>

      <div class="status-badge-hide-hidden-row">
        <button
          type="button"
          class=${t ? "name-picker-chip" : "name-picker-add-chip"}
          @click=${() => r({ hidden: !t })}
        >
          <ha-icon icon=${t ? "mdi:eye-off" : "mdi:plus"}></ha-icon>
          <span>${this._t("Hidden entities")}</span>
          ${t ? w`<ha-icon
                class="name-picker-chip-remove"
                icon="mdi:close"
              ></ha-icon>` : ""}
        </button>
      </div>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ label: { multiple: !0 } }}
        .value=${n}
        @value-changed=${(e) => r({ labels: Array.isArray(e.detail.value) ? e.detail.value : [] })}
      ></ha-selector>
    </div>
  `;
}
function Vl() {
	return Xs.map((e) => ({
		id: e.value,
		primary: this._t(e.label),
		sorting_label: this._t(e.label),
		icon: e.icon
	}));
}
function Hl(e) {
	let t = Xs.find((t) => t.value === e);
	return t ? w`
    <ha-icon slot="start" .icon=${t.icon}></ha-icon>
    <span slot="headline">${this._t(t.label)}</span>
  ` : "";
}
function Ul(e, t) {
	return w`
    <ha-combo-box-item type="button" compact .borderTop=${t !== 0}>
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function Wl({ config: e = this._config || {}, updateConfig: t = (e) => this._updateConfig(e) } = {}) {
	let n = Array.isArray(e.area), r = n ? e.area : [], i = Object.values(this.hass?.areas || {}).sort((e, t) => (e.name || e.area_id).localeCompare(t.name || t.area_id)), a = [{
		value: "__multiple__",
		label: this._t("Multiple")
	}, ...i.map((e) => ({
		value: e.area_id,
		label: e.name || e.area_id
	}))];
	return w`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${this._t("Area")}
        .selector=${{ select: {
		mode: "dropdown",
		options: a
	} }}
        .value=${n ? "__multiple__" : e.area || ""}
        @value-changed=${(n) => {
		let r = n.detail.value || "";
		t({ area: r === "__multiple__" ? e.area ? [e.area].flat().filter(Boolean) : [] : r });
	}}
      ></ha-selector>
    </div>

    ${n ? w`
          <div class="field">
            <label>${this._t("Areas")}</label>
            <div class="status-badge-device-class-options">
              ${i.map((e) => w`
                <ha-checkbox
                  .checked=${r.includes(e.area_id)}
                  @change=${(n) => t({ area: n.target.checked ? [...new Set([...r, e.area_id])] : r.filter((t) => t !== e.area_id) })}
                >${e.name || e.area_id}</ha-checkbox>
              `)}
            </div>
          </div>
        ` : ""}
  `;
}
//#endregion
//#region src/editors/status/sections/status.js
function Gl() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = n ? "entity" : Y(this._config), i = r === "area_count" ? J : r === "template" || t || n ? "more-info" : "navigate", a = this._config?.tap_action?.action || i, o = r === "area_count" ? J : t || n ? a : "more-info";
	return w`
    <div class="section">
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Mode")}</label>

          <ha-selector
            class="editor-header-button-toggle status-mode-selector"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: tu.call(this) } }}
            .value=${e}
            @value-changed=${(e) => this._handleStatusModeChange(e.detail.value || "standard")}
          ></ha-selector>
        </div>
      </div>
    </div>

    ${t ? ql.call(this, {
		cardActionDefault: i,
		mainEntityActionDefault: o
	}) : w`
          <div class="section">
            ${n ? Yl.call(this, w`
                  ${Kl.call(this)}
                  ${this._renderEntity("Person entity", "entity")}
                  ${this._renderEntity("Tracker entity", "tracker_entity")}
                  ${this._renderEntity("ETA entity", "eta_entity")}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_1", { index: 1 })}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_2", { index: 2 })}
                  <div class="color-pair">
                    ${this._renderColor([
		"Accent",
		"Active",
		"Color"
	], "accent_on_color")}
                    ${this._renderColor([
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color")}
                  </div>
                `) : w`
                  ${Jl.call(this, this._config, "entity", (e) => this._updateConfig(e), (e) => this._handleEntityUpdate("entity", e))}
                  ${Yl.call(this, w`
                    ${Kl.call(this)}
                    <div class="color-pair">
                      ${this._renderColor([
		"Accent",
		"Active",
		"Color"
	], "accent_on_color")}
                      ${this._renderColor([
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color")}
                    </div>
                    ${$l.call(this)}
                    ${r === "area_count" ? "" : w`
                          ${this._renderTemplateInput("State template", "state_template")}
                        `}
                  `)}
                `}

            ${this._config?.entity || r !== "entity" ? G.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: i,
				defaultVisible: !0,
				customDefaultLabel: i === "Current state" ? J : void 0
			},
			{
				key: "hold_action",
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: "double_tap_action",
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			},
			{
				key: "entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: o,
				defaultVisible: !0,
				customDefaultLabel: o === "Current state" ? J : void 0
			},
			{
				key: "entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			},
			{
				key: "entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: this._config.entity,
			area_id: this._config.area
		}
	}) : ""}
          </div>
        `}
  `;
}
function Kl() {
	return Eo.call(this, {
		label: this.hass.localize("ui.panel.lovelace.editor.card.generic.name"),
		valueKey: "name",
		entityKey: "entity",
		defaultType: "entity",
		defaultMode: "template",
		templateKey: "name_template"
	});
}
function ql({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {}, a = Y(i), o = a === "area_count", s = o ? J : e, c = o ? J : t, { itemsPerRow: l, shouldWrapTabs: u, showTabScrollHint: d } = Pl({
		config: this._config,
		itemCount: n.length,
		defaultPerRow: 3
	});
	return w`
    <div class="section">
      ${Fl.call(this, {
		itemCount: n.length,
		classPrefix: "status",
		defaultPerRow: 3
	})}

      <div
        class="status-tabs ${u ? "wrapped" : ""} ${d ? "scroll-hint" : ""} ${n.length > 1 ? "has-tools" : ""}"
        style=${u ? `--status-tabs-per-row: ${l};` : ""}
      >
        <div class="status-tab-items">
          ${n.map((e, t) => w`
            <button
              type="button"
              class="status-tab ${t === r ? "active" : ""}"
              @click=${() => this._selectStatusItem(t)}
            >
              ${t + 1}
            </button>
          `)}
        </div>

        ${d ? w`
              <div class="status-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            ` : ""}

        <div class="status-editor-tools">
          <button
            type="button"
            class="status-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addStatusItem()}
          >
            +
          </button>

          <button
            type="button"
            class="status-tool-button"
            title=${this._t("Duplicate")}
            @click=${() => this._duplicateStatusItem(r)}
          >
            <ha-icon icon="mdi:content-copy"></ha-icon>
          </button>

          ${n.length > 1 ? w`
                <button
                  type="button"
                  class="status-tool-button status-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeStatusItem(r)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${r === 0}
                  @click=${() => this._moveStatusItem(r, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${r === n.length - 1}
                  @click=${() => this._moveStatusItem(r, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>

      ${Jl.call(this, i, "entity", (e) => this._updateStatusItem(r, e), (e) => this._updateStatusItem(r, { entity: e }))}

      ${Yl.call(this, w`

        <div class="color-pair">
          ${Ql.call(this, [
		"Accent",
		"Active",
		"Color"
	], "accent_on_color", r, i)}
          ${Ql.call(this, [
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color", r, i)}
        </div>

        ${eu.call(this, r, i)}

        ${o ? "" : w`
              ${Zl.call(this, "State template", "state_template", r, i)}
            `}
      `)}

      ${i.entity || a !== "entity" ? this._renderStatusItemInteractions(r, i, s, c) : ""}
    </div>
  `;
}
function Jl(e, t, n, r) {
	let i = {
		...e,
		entity: e?.[t] || ""
	}, a = Y(i), o = {
		hass: this.hass,
		_config: i,
		_t: this._t.bind(this),
		_updateConfig: (e) => n(Xl(e, t)),
		_handleConfigUpdate: (e, r) => n(Xl({ [e]: r }, t))
	};
	return w`
    <ha-expansion-panel
      class="state-type-panel"
      outlined
      .expanded=${this._statusStateTypeExpanded === !0}
      @expanded-changed=${(e) => {
		this._statusStateTypeExpanded = e.detail.expanded;
	}}
    >
      <ha-icon
        slot="leading-icon"
        icon="mdi:format-list-bulleted-type"
      ></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("State type")}
      </div>
      <div class="content-panel-body">
        ${Rl.call(o, {
		stateSource: a,
		domainConfig: tc(i.domain),
		deviceClassOptions: uc(this.hass, i),
		badgeMode: !1,
		showInactiveTemplate: !0,
		showNameTemplate: !1,
		preserveStateConfig: !0,
		renderAreaPicker: () => Wl.call(this, {
			config: e,
			updateConfig: n
		}),
		renderEntityPicker: (n = "Main entity") => w`
            <div class="field">
              ${n ? w`<label>${this._t(n)}</label>` : ""}
              ${za.call(this, {
			value: e?.[t] || "",
			filterOptions: nu,
			onValueChanged: r
		})}
            </div>
          `
	})}
      </div>
    </ha-expansion-panel>
  `;
}
function Yl(e) {
	return w`
    <ha-expansion-panel
      class="content-panel status-content-panel"
      outlined
      .expanded=${this._statusContentExpanded === !0}
      @expanded-changed=${(e) => {
		this._statusContentExpanded = e.detail.expanded;
	}}
    >
      <ha-icon slot="leading-icon" icon="mdi:text-short"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Content")}
      </div>
      <div class="content-panel-body">${e}</div>
    </ha-expansion-panel>
  `;
}
function Xl(e, t) {
	let n = { ...e };
	return Object.prototype.hasOwnProperty.call(n, "entity") && (n[t] = n.entity, delete n.entity), n;
}
function Zl(e, t, n, r) {
	return this._renderTemplateInput(e, t, {
		value: r[t] || "",
		onValueChanged: (e) => this._updateStatusItem(n, { [t]: e })
	});
}
function Ql(e, t, n, r) {
	return this._renderColorControl(e, `status-${n}-${t}`, r[t] || "", (e) => this._updateStatusItem(n, { [t]: e }));
}
function $l() {
	return B.call(this, {
		label: "Icon",
		sourceKey: "entity_icon_source",
		entityKey: "entity",
		customIconKeys: [
			"entity_icon",
			"entity_icon_on",
			"entity_icon_off"
		],
		renderCustom() {
			return w`
        ${this._renderIconInput("", "entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "entity_icon_off")}
        </div>
      `;
		}
	});
}
function eu(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateStatusItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderStatusItemIconInput(t, r, e)
	};
	return B.call(r, {
		label: "Icon",
		sourceKey: "entity_icon_source",
		entityKey: "entity",
		customIconKeys: [
			"entity_icon",
			"entity_icon_on",
			"entity_icon_off"
		],
		renderCustom() {
			return w`
        ${this._renderIconInput("", "entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "entity_icon_off")}
        </div>
      `;
		}
	});
}
function tu() {
	return [
		{
			label: this._t("Standard"),
			value: "standard"
		},
		{
			label: this._t("Icon only"),
			value: "icon_only"
		},
		{
			label: this._t("Person"),
			value: "person"
		}
	];
}
var nu = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Binary Sensors",
		haDomains: ["binary_sensor"],
		value: "binary_sensor",
		domains: ["binary_sensor"]
	},
	{
		label: "Sensors",
		haDomains: ["sensor"],
		value: "sensor",
		domains: ["sensor"]
	}
], ru = d`
.state-type-panel,
.content-panel {
  display: block;
  --expansion-panel-content-padding: 0;
  border-radius: var(--ha-border-radius-md);
  --ha-card-border-radius: var(--ha-border-radius-md);
}

.state-type-panel > [slot="header"],
.content-panel > [slot="header"] {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

.state-type-panel > ha-icon,
.content-panel > ha-icon {
  color: var(--secondary-text-color);
}

.section > .interactions-form {
  margin-top: 0;
}

.content-panel-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.status-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.status-per-row-field {
  margin-left: auto;
  width: 128px;
  min-width: 128px;
}

.status-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.status-tabs {
  display: flex;
  align-items: end;
  gap: 6px;
  border-bottom: 1px solid var(--orbit-editor-border);
  padding-bottom: 2px;
  margin-bottom: 12px;
  overflow: visible;
}

.status-tabs.scroll-hint .status-tab-items {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
  mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
}

.status-tabs.wrapped {
  display: flex;
  align-items: start;
}

.status-tab-items {
  display: flex;
  align-items: end;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
}

.status-tabs.wrapped .status-tab-items {
  display: grid;
  grid-template-columns: repeat(
    var(--status-tabs-per-row, 3),
    32px
  );
  justify-content: start;
  flex: 1 1 auto;
  overflow-x: auto;
}

.status-tabs-scroll-indicator {
  width: 16px;
  min-width: 16px;
  height: 36px;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.78;
  pointer-events: none;
}

.status-tabs-scroll-indicator ha-icon {
  --mdc-icon-size: 18px;
}

.status-tab,
.status-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  width: 32px;
  min-width: 32px;
  height: 36px;
  padding: 0;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.6;
  cursor: pointer;
}

.status-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.status-tabs.wrapped .status-tab,
.status-tabs.wrapped .status-tab-add {
  width: 32px;
  min-width: 32px;
}

.status-editor-tools .status-tab-add {
  width: 34px;
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.status-tab-add {
  font-size: 24px;
  opacity: 0.9;
}

.status-editor-tools {
  display: flex;
  gap: 4px;
  margin-left: auto;
  justify-content: flex-end;
}

.status-tabs.scroll-hint .status-editor-tools {
  margin-left: 0;
}

.status-tabs.wrapped .status-editor-tools {
  display: grid;
  grid-template-columns: repeat(2, 34px);
  grid-template-rows: repeat(2, 34px);
  gap: 4px;
  min-width: max-content;
  align-self: start;
}

.status-tool-button {
  width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.status-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.status-tool-button ha-icon {
  --mdc-icon-size: 20px;
}
`, iu = class extends k {
	static svgCache = I;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_selectedStatusIndex: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_iconFileSearch: { state: !0 },
		_iconFilePickerOpen: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 },
		_statusStateTypeExpanded: { state: !0 },
		_statusContentExpanded: { state: !0 }
	};
	constructor() {
		super(), this._config = this._config || {}, this._selectedStatusIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._statusStateTypeExpanded = !1, this._statusContentExpanded = !1;
	}
	connectedCallback() {
		super.connectedCallback(), mo(this), kt(this, "orbit-status-card");
	}
	disconnectedCallback() {
		ho(this), super.disconnectedCallback();
	}
	_getColorStyle(e) {
		return _o(e);
	}
	_getColorPickerValue(e) {
		return vo(e);
	}
	_t(e, t) {
		return q(this.hass, e, t);
	}
	setConfig(e) {
		let { config: t, migrated: n } = Zt(e || {});
		this._config = fu(t || {}), this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(this._config).length - 1), n && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: fu(this._config) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		this._config = fu(Ci(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleInput(e, t) {
		this._updateConfig({ [e]: t.target.value });
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_handleEntityUpdate(e, t) {
		if (t) {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e === "entity" && Y(this._config) !== "entity") {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e === "entity") {
			this._clearMainEntity();
			return;
		}
		if (e === "tracker_entity") {
			this._updateConfig(H("tracker_entity", lu));
			return;
		}
		this._handleConfigUpdate(e, t);
	}
	_clearMainEntity() {
		if (this._config?.mode === "person") {
			this._updateConfig(H("entity", cu));
			return;
		}
		this._updateConfig(H("entity", ou));
	}
	_getStatusItems(e = this._config) {
		return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
			entity: e?.entity || "",
			...Qs(e),
			accent_on_color: e?.accent_on_color || "",
			accent_off_color: e?.accent_off_color || "",
			entity_icon_source: e?.entity_icon_source || "",
			entity_icon: e?.entity_icon || "",
			entity_icon_on: e?.entity_icon_on || "",
			entity_icon_off: e?.entity_icon_off || "",
			state_template: e?.state_template || "",
			name_template: e?.name_template || "",
			tap_action: e?.tap_action,
			hold_action: e?.hold_action,
			double_tap_action: e?.double_tap_action,
			entity_tap_action: e?.entity_tap_action,
			entity_hold_action: e?.entity_hold_action,
			entity_double_tap_action: e?.entity_double_tap_action
		}];
	}
	_handleStatusModeChange(e) {
		if (this._config?.mode === "icon_only" && e === "standard") {
			let t = this._getStatusItems(), n = t[Math.min(this._selectedStatusIndex || 0, t.length - 1)] || {};
			this._updateConfig({
				...V(su),
				mode: e,
				entities: void 0,
				entity: n.entity || void 0,
				...Qs(n),
				accent_on_color: n.accent_on_color,
				accent_off_color: n.accent_off_color,
				entity_icon_source: n.entity_icon_source,
				entity_icon: n.entity_icon,
				entity_icon_on: n.entity_icon_on,
				entity_icon_off: n.entity_icon_off,
				state_template: n.state_template,
				name_template: n.name_template,
				tap_action: n.tap_action,
				hold_action: n.hold_action,
				double_tap_action: n.double_tap_action,
				entity_tap_action: n.entity_tap_action,
				entity_hold_action: n.entity_hold_action,
				entity_double_tap_action: n.entity_double_tap_action
			});
			return;
		}
		this._updateConfig({
			mode: e,
			...e === "icon_only" ? {} : { entities: void 0 }
		});
	}
	_selectStatusItem(e) {
		this._selectedStatusIndex = e;
	}
	_addStatusItem() {
		let e = this._getStatusItems();
		this._selectedStatusIndex = e.length, this._updateConfig(V(su, { entities: [...e, { entity: "" }] }));
	}
	_duplicateStatusItem(e) {
		let t = this._getStatusItems(), n = t[e];
		if (!n) return;
		let r = [...t];
		r.splice(e + 1, 0, structuredClone(n)), this._selectedStatusIndex = e + 1, this._updateConfig(V(su, { entities: r }));
	}
	_removeStatusItem(e) {
		let t = this._getStatusItems();
		if (t.length <= 1) {
			this._updateConfig(H("entity", ou));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedStatusIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveStatusItem(e, t) {
		let n = this._getStatusItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedStatusIndex = r, this._updateConfig(V(su, { entities: i }));
	}
	_updateStatusItem(e, t) {
		let n = this._getStatusItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && Y(r) === "entity" && au(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, V(su)), this._updateConfig(i);
			return;
		}
		if (t.entity === "" && Y(r) === "entity") {
			this._updateConfig(H("entity", ou));
			return;
		}
		this._updateConfig({
			entity: r.entity || "",
			...Qs(r),
			accent_on_color: r.accent_on_color || "",
			accent_off_color: r.accent_off_color || "",
			entity_icon_source: r.entity_icon_source || "",
			entity_icon: r.entity_icon || "",
			entity_icon_on: r.entity_icon_on || "",
			entity_icon_off: r.entity_icon_off || "",
			state_template: r.state_template || "",
			name_template: r.name_template || "",
			tap_action: r.tap_action,
			hold_action: r.hold_action,
			double_tap_action: r.double_tap_action,
			entity_tap_action: r.entity_tap_action,
			entity_hold_action: r.entity_hold_action,
			entity_double_tap_action: r.entity_double_tap_action
		});
	}
	_renderInput(e, t, n = "", r = {}) {
		return bi.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t, n = {}) {
		return xi.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return Si.call(this, e, t, n);
	}
	_renderColor(e, t, n) {
		return Di.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return Oi.call(this, e, t, n, r, i);
	}
	_renderEntity(e, t, n) {
		return fo.call(this, e, t, n);
	}
	_renderStatusItemInteractions(e, t, n, r) {
		let i = {
			hass: this.hass,
			_config: t,
			_t: (e, t) => this._t(e, t),
			requestUpdate: () => this.requestUpdate(),
			_updateConfig: (t) => this._updateStatusItem(e, t)
		};
		return G.call(i, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: n,
					defaultVisible: !0,
					customDefaultLabel: n === "Current state" ? J : void 0
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: "none"
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: "none"
				},
				{
					key: "entity_tap_action",
					formKey: "icon_tap_action",
					label: "Icon tap behavior",
					defaultAction: r,
					defaultVisible: !0,
					customDefaultLabel: r === "Current state" ? J : void 0
				},
				{
					key: "entity_hold_action",
					formKey: "icon_hold_action",
					label: "Icon hold behavior",
					defaultAction: "none"
				},
				{
					key: "entity_double_tap_action",
					formKey: "icon_double_tap_action",
					label: "Icon double tap behavior",
					defaultAction: "none"
				}
			],
			context: {
				entity_id: t.entity,
				area_id: this._config?.area
			}
		});
	}
	_renderArea(e, t) {
		return po.call(this, e, t);
	}
	_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
		return Gr.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return qr.call(this, e);
	}
	_renderStatusItemIconInput(e, t, n, r = "mdi:information-outline or icon.svg") {
		let i = this._getStatusItems()[n] || {}, a = {
			hass: this.hass,
			_config: i,
			_iconPickerPrefix: `status-${n}-icon`,
			_t: (e, t) => this._t(e, t),
			_isImageIcon: (e) => this._isImageIcon(e),
			_resolveIconPath: (e) => this._resolveIconPath(e),
			_getInlineSvg: (e) => this._getInlineSvg(e),
			_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
			requestUpdate: () => this.requestUpdate(),
			renderRoot: this.renderRoot,
			_handleConfigUpdate: (e, t) => this._updateStatusItem(n, { [e]: t })
		};
		return Object.defineProperties(a, {
			_iconPickerKey: {
				get: () => this._iconPickerKey,
				set: (e) => {
					this._iconPickerKey = e;
				}
			},
			_iconPickerTab: {
				get: () => this._iconPickerTab,
				set: (e) => {
					this._iconPickerTab = e;
				}
			},
			_localIconFiles: {
				get: () => this._localIconFiles,
				set: (e) => {
					this._localIconFiles = e;
				}
			},
			_orbitIconFiles: {
				get: () => this._orbitIconFiles,
				set: (e) => {
					this._orbitIconFiles = e;
				}
			},
			_localIconFilesLoading: {
				get: () => this._localIconFilesLoading,
				set: (e) => {
					this._localIconFilesLoading = e;
				}
			},
			_orbitIconFilesLoading: {
				get: () => this._orbitIconFilesLoading,
				set: (e) => {
					this._orbitIconFilesLoading = e;
				}
			}
		}), Gr.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return Ur(e);
	}
	_resolveIconPath(e) {
		return Wr(e);
	}
	_getInlineSvg(e) {
		return F.call(this, e, { forceColor: !0 });
	}
	_renderStatusSection() {
		return Gl.call(this);
	}
	render() {
		return w`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card v{version}", { version: t.status })}
        </div>
      </div>
    `;
	}
	static styles = [vs, ru];
};
customElements.define("orbit-status-card-editor", iu);
function au(e) {
	Object.assign(e, V(ou));
}
var ou = [
	...Zs,
	"accent_on_color",
	"accent_off_color",
	"entity_icon_source",
	"entity_icon",
	"entity_icon_on",
	"entity_icon_off",
	"state_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], su = ["entity", ...ou], cu = [
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	"accent_on_color",
	"accent_off_color",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], lu = ["eta_entity"], uu = [
	"entity",
	...Zs,
	"accent_on_color",
	"accent_off_color",
	"entity_icon_source",
	"entity_icon",
	"entity_icon_on",
	"entity_icon_off",
	"entity_icon_svg_color_override",
	"entity_icon_on_svg_color_override",
	"entity_icon_off_svg_color_override",
	"state_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], du = [
	"type",
	"mode",
	"name",
	"entity",
	...Zs,
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	"accent_on_color",
	"accent_off_color",
	"entity_icon_source",
	"entity_icon",
	"entity_icon_on",
	"entity_icon_off",
	"entity_icon_svg_color_override",
	"entity_icon_on_svg_color_override",
	"entity_icon_off_svg_color_override",
	"state_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action",
	"wrap",
	"items_per_row",
	"separate_cards",
	"entities",
	"grid_options",
	"view_layout"
];
function fu(e) {
	let t = _u(e);
	t.mode !== "icon_only" && delete t.entities, pu(t), hu(t), gu(t);
	let n = {}, r = /* @__PURE__ */ new Set();
	return du.forEach((e) => {
		Object.prototype.hasOwnProperty.call(t, e) && (n[e] = e === "entities" && Array.isArray(t[e]) ? t[e].map(mu) : t[e], r.add(e));
	}), Object.keys(t).forEach((e) => {
		r.has(e) || (n[e] = t[e]);
	}), n;
}
function pu(e) {
	if (e?.mode !== "icon_only" || e.state_source !== "area_count" || !Array.isArray(e.entities) || e.entities.length === 0) return;
	let t = Qs(e);
	e.entities = e.entities.map((e) => {
		let n = typeof e == "string" ? { entity: e } : { ...e || {} };
		return n.state_source === void 0 && (Object.assign(n, t), hu(n)), n;
	}), Zs.forEach((t) => {
		delete e[t];
	});
}
function mu(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = _u(e);
	return hu(t), gu(t), vu(t, uu);
}
function hu(e) {
	e?.state_source === "area_count" && (delete e.entity, delete e.main_entity);
}
function gu(e) {
	e?.state_source === "area_count" && (e.tap_action?.action === "Current state" && delete e.tap_action, e.entity_tap_action?.action === "Current state" && delete e.entity_tap_action);
}
function _u(e = {}) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0 && e !== ""));
}
function vu(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/cards/status-card.js
var yu = class extends k {
	static svgCache = I;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_cardName: { type: String },
			_statusText: { type: String },
			_icon: { type: String },
			_nameColor: { type: String },
			_statusColor: { type: String },
			_iconColor: { type: String },
			_circleColor: { type: String },
			_navigationPath: { type: String },
			_personPicture: { type: String },
			_personZoneIcon: { type: String },
			_personBattery1: { type: Object },
			_personBattery2: { type: Object },
			_statusItems: { type: Array },
			_templateRevision: { type: Number },
			...xc
		};
	}
	constructor() {
		super(), Sc.call(this), this._activeEntitiesStatusIndex = 0;
	}
	static getConfigElement() {
		return document.createElement("orbit-status-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-status-card",
			mode: "standard",
			entity: ""
		};
	}
	getLayoutOptions() {
		if (this._config?.mode === "icon_only") {
			let e = Z(this._config).length, t = bu(this._config, e);
			return {
				grid_columns: Math.max(1, t),
				grid_min_columns: .5,
				grid_rows: "auto"
			};
		}
		return {
			grid_columns: 3,
			grid_min_columns: 2
		};
	}
	setConfig(e) {
		this._config = Zt(e).config;
		let t = e.accent_off_color || "theme";
		this._nameColor = this._computeFullColor(t), this._statusColor = this._computeFullColor(t), this._iconColor = this._computeIconColor(t), this._circleColor = this._computeCircleColor(t), this._statusItems = [];
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && It.call(this, this._getTemplateEntries()), tl.call(this, e);
	}
	disconnectedCallback() {
		Lt.call(this), this._clearMainIconHoldTimer(), this._clearStatusItemHoldTimer(), this._clearDoubleTapTimer(), Ec.call(this), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return Nn.call(this, e, this._getRelevantEntities(), {
			hasTemplates: Pn(this._config),
			includeZones: this._config?.mode === "person"
		});
	}
	_handleAction(e, t = null) {
		if (e?.action === "Current state") {
			this._activeEntitiesStatusIndex = e.status_index ?? 0, wc.call(this);
			return;
		}
		return He.call(this, e, t);
	}
	_renderActiveEntitiesDialog() {
		let e = this._config?.mode === "icon_only" ? Z(this._config)[this._activeEntitiesStatusIndex] || {} : this._config;
		return Kc.call(this, Cc(fc(this.hass, e)));
	}
	_t(e, t) {
		return q(this.hass, e, t);
	}
	_handleTap(e) {
		if (!j(this)) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityTap(e);
				return;
			}
			M.call(this, e, this._getStatusItemEntityId(0), this._getCardTapAction(), this._getCardDoubleTapAction());
		}
	}
	_handleDoubleTap(e) {
		if (this._isMainIconEvent(e)) {
			this._handleMainEntityDoubleTap(e);
			return;
		}
		N.call(this, e, this._config.entity, this._getCardDoubleTapAction());
	}
	_isMainIconEvent(e) {
		if (e.composedPath().some((e) => e?.classList && (e.classList.contains("circle") || e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")))) return !0;
		let t = (this.shadowRoot?.querySelector(".status-circle"))?.getBoundingClientRect();
		return t ? e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom : !1;
	}
	_handleMainEntityTap(e) {
		if (j(this)) return;
		if (this._shouldSuppressMainIconTap(e)) {
			this._stopEvent(e);
			return;
		}
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		let t = this._getStatusItemEntityId(0), n = this._config?.mode === "icon_only" ? Z(this._config)[0] || {} : this._config;
		!t && Y(n) !== "area_count" || M.call(this, e, t, this._getMainEntityTapAction() || this._getCardTapAction(), this._getMainEntityDoubleTapAction());
	}
	_handleMainEntityDoubleTap(e) {
		N.call(this, e, this._config.entity, this._getMainEntityDoubleTapAction());
	}
	_handleCardTapAction() {
		let e = this._getCardTapAction(), t = this._getStatusItemEntityId(0);
		if (e.action && e.action !== "navigate") {
			this._handleAction(e, t);
			return;
		}
		this._navigate(e.navigation_path || this._navigationPath || "/lovelace/home");
	}
	_handleCardPointerDown(e) {
		if (j(this) || this._isMainIconEvent(e)) return;
		this._stopEvent(e), this._clearStatusItemHoldTimer();
		let t = this._getCardHoldAction();
		t && (this._statusItemHoldTimer = setTimeout(() => {
			this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.entity);
		}, this._LONG_PRESS_DELAY));
	}
	_handleCardPointerUp(e) {
		this._isMainIconEvent(e) || (this._stopEvent(e), this._clearStatusItemHoldTimer());
	}
	_handleCardPointerCancel(e) {
		this._isMainIconEvent(e) || (this._stopEvent(e), this._clearStatusItemHoldTimer());
	}
	_handleCardContextMenu(e) {
		if (this._isMainIconEvent(e)) return;
		this._stopEvent(e);
		let t = this._getCardHoldAction();
		t && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.entity));
	}
	_handleStatusItemClick(e, t = 0) {
		if (this._statusItemLongPressTriggered) {
			this._statusItemLongPressTriggered = !1, this._stopEvent(e);
			return;
		}
		let n = Y(this._statusItems?.[t]) === "area_count", r = this._getStatusItemEntityId(t);
		if (!r && !n) return;
		let i = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t), a = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t);
		M.call(this, e, r, i?.action ? i.action === "Current state" ? {
			...i,
			status_index: t
		} : i : { action: "more-info" }, a);
	}
	_handleStatusItemDoubleClick(e, t = 0) {
		N.call(this, e, this._getStatusItemEntityId(t), this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t));
	}
	_handleStatusItemPointerDown(e, t = 0) {
		if (j(this)) return;
		this._stopEvent(e), this._clearStatusItemHoldTimer();
		let n = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityHoldAction(t) : this._getStatusItemCardHoldAction(t);
		n && (this._statusItemHoldTimer = setTimeout(() => {
			this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t));
		}, this._LONG_PRESS_DELAY));
	}
	_handleStatusItemPointerUp(e) {
		this._stopEvent(e), this._clearStatusItemHoldTimer();
	}
	_handleStatusItemPointerCancel(e) {
		this._stopEvent(e), this._clearStatusItemHoldTimer();
	}
	_handleStatusItemContextMenu(e, t = 0) {
		this._stopEvent(e);
		let n = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityHoldAction(t) : this._getStatusItemCardHoldAction(t);
		n && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t)));
	}
	_navigate(e) {
		return Ke.call(this, e);
	}
	_handlePersonBadgeStop(e) {
		e.currentTarget?.dataEntity && e.stopPropagation();
	}
	_handlePersonBadgePointerUp(e) {
		let t = e.currentTarget?.dataEntity;
		t && (e.stopPropagation(), this._personBadgeActionFired = !0, this._openPersonBadgeMoreInfo(t));
	}
	_handlePersonBadgeClick(e) {
		let t = e.currentTarget?.dataEntity;
		if (t) {
			if (e.stopPropagation(), this._personBadgeActionFired) {
				this._personBadgeActionFired = !1;
				return;
			}
			this._openPersonBadgeMoreInfo(t);
		}
	}
	_openPersonBadgeMoreInfo(e) {
		this.dispatchEvent(new CustomEvent("hass-more-info", {
			detail: { entityId: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_computeFullColor(e) {
		return it.call(this, e);
	}
	_computeIconColor(e) {
		return at.call(this, e);
	}
	_computeCircleColor(e) {
		return ot.call(this, e);
	}
	_getMainStateObj() {
		let e = this._config.entity;
		return e && this.hass ? this.hass.states[e] : null;
	}
	formatState(e) {
		return nn(e);
	}
	_getEntityActiveState(e) {
		return rn(e);
	}
	_isImageIcon(e) {
		return Sn(e);
	}
	_resolveIconPath(e) {
		return Cn(e);
	}
	_getInlineSvg(e, t = !0) {
		return F.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return wn(e, t);
	}
	_evaluateStateTemplate(e, t) {
		return P.call(this, e, t);
	}
	_getTemplateEntries() {
		if (this._config?.mode === "icon_only") return Z(this._config).flatMap((e) => (Y(e) === "area_count" ? [] : [
			e.state_template,
			e.active_template,
			e.inactive_template,
			e.name_template
		]).filter(Boolean).map((t) => ({
			template: t,
			entityId: e.entity || ""
		})));
		let e = this._config?.mode === "person" ? this._config?.tracker_entity || "" : this._config?.entity || "";
		return (Y(this._config) === "area_count" ? [] : [
			this._config?.state_template,
			this._config?.active_template,
			this._config?.inactive_template,
			this._config?.name_template
		]).filter(Boolean).map((t) => ({
			template: t,
			entityId: e
		}));
	}
	_getRelevantEntities() {
		return this._config?.mode === "icon_only" ? Z(this._config).flatMap((e) => Y(e) === "area_count" ? hc(this.hass, e) : [e.entity]) : Y(this._config) === "area_count" ? hc(this.hass, this._config) : [
			this._config?.entity,
			this._config?.tracker_entity,
			this._config?.eta_entity,
			this._config?.battery_entity_1,
			this._config?.battery_entity_2
		];
	}
	get _LONG_PRESS_DELAY() {
		return 500;
	}
	_handleMainIconPointerDown(e) {
		if (j(this)) return;
		if (this._isDuplicateTouchEvent(e)) {
			this._stopEvent(e);
			return;
		}
		this._trackPointerEvent(e), this._stopEvent(e), e.currentTarget?.setPointerCapture?.(e.pointerId), this._mainIconPointerDown = !0, this._mainIconHoldFired = !1, this._mainIconSuppressUntil = 0, this._clearMainIconHoldTimer();
		let t = this._getMainEntityHoldAction();
		t && (this._mainIconHoldTimer = setTimeout(() => {
			this._mainIconHoldFired = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.entity);
		}, this._LONG_PRESS_DELAY));
	}
	_handleMainIconPointerUp(e) {
		if (this._isDuplicateTouchEvent(e)) {
			this._stopEvent(e);
			return;
		}
		this._trackPointerEvent(e), this._stopEvent(e);
		let t = this._mainIconHoldFired;
		if (this._clearMainIconHoldTimer(), this._mainIconPointerDown = !1, t) {
			this._mainIconSuppressClick = !0, this._mainIconSuppressUntil = Date.now() + 1e3;
			return;
		}
		this._handleMainEntityTap(e), this._mainIconSuppressClick = !0;
	}
	_handleMainIconPointerCancel(e) {
		if (this._isDuplicateTouchEvent(e)) {
			this._stopEvent(e);
			return;
		}
		if (this._trackPointerEvent(e), this._stopEvent(e), !this._getMainEntityHoldAction()) {
			this._clearMainIconHoldTimer(), this._mainIconPointerDown = !1;
			return;
		}
	}
	_handleMainIconClick(e) {
		this._stopEvent(e), this._mainIconSuppressClick &&= !1;
	}
	_handleMainIconContextMenu(e) {
		this._stopEvent(e);
		let t = this._getMainEntityHoldAction();
		t && this._mainIconPointerDown && !this._mainIconHoldFired && (this._clearMainIconHoldTimer(), this._mainIconHoldFired = !0, this._mainIconSuppressClick = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.entity));
	}
	_clearMainIconHoldTimer() {
		this._mainIconHoldTimer &&= (clearTimeout(this._mainIconHoldTimer), null);
	}
	_clearStatusItemHoldTimer() {
		this._statusItemHoldTimer &&= (clearTimeout(this._statusItemHoldTimer), null);
	}
	_clearDoubleTapTimer() {
		return Ue.call(this);
	}
	_getCardHoldAction() {
		return ll.call(this);
	}
	_getCardDoubleTapAction() {
		return ul.call(this);
	}
	_getMainEntityHoldAction() {
		return dl.call(this);
	}
	_getMainEntityTapAction() {
		return fl.call(this);
	}
	_getMainEntityDoubleTapAction() {
		return pl.call(this);
	}
	_getCardTapAction() {
		return ml.call(this);
	}
	_getStatusItemCardTapAction(e = 0) {
		return gl.call(this, e);
	}
	_getStatusItemCardHoldAction(e = 0) {
		return _l.call(this, e);
	}
	_getStatusItemCardDoubleTapAction(e = 0) {
		return vl.call(this, e);
	}
	_getStatusItemMainEntityTapAction(e = 0) {
		return yl.call(this, e);
	}
	_getStatusItemMainEntityDoubleTapAction(e = 0) {
		return bl.call(this, e);
	}
	_getStatusItemMainEntityHoldAction(e = 0) {
		return xl.call(this, e);
	}
	_isIconOnlyMode() {
		return this._config?.mode === "icon_only";
	}
	_isPersonMode() {
		return this._config?.mode === "person";
	}
	_getStatusItemEntityId(e = 0) {
		let t = this._statusItems?.[e];
		return t?.entityId || t?.entity || this._config.entity;
	}
	_getStatusColumnCount(e = this._statusItems?.length || 1) {
		return bu(this._config, e);
	}
	_getStatusRowCount(e = this._statusItems?.length || 1) {
		return xu(this._config, e);
	}
	_isStatusItemMainIconEvent(e) {
		return e.composedPath().some((e) => e?.classList && (e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")));
	}
	_trackPointerEvent(e) {
		e.type?.startsWith("pointer") && (this._lastMainIconPointerEventAt = Date.now());
	}
	_isDuplicateTouchEvent(e) {
		return !!(e.type?.startsWith("touch") && this._lastMainIconPointerEventAt && Date.now() - this._lastMainIconPointerEventAt < 750);
	}
	_shouldSuppressMainIconTap(e) {
		return !this._mainIconSuppressUntil || Date.now() > this._mainIconSuppressUntil ? !1 : !e || this._isMainIconEvent(e);
	}
	_stopEvent(e) {
		e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	}
	render() {
		return Sl.call(this);
	}
	static styles = [...Ml, Nl];
};
function bu(e = {}, t = 1) {
	return Js({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
function xu(e = {}, t = 1) {
	return Ys({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
jt({
	tag: "orbit-status-card",
	cardClass: yu,
	name: "Orbit Status Card",
	description: "Responsive status card",
	version: t.status,
	getEntitySuggestion: Cu
});
var Su = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function Cu(e, t) {
	let n = In(t);
	if (n === "person") return { config: {
		type: "custom:orbit-status-card",
		mode: "person",
		entity: t
	} };
	if (Su.has(n)) return null;
	let r = {
		label: q(e, "Standard"),
		config: {
			type: "custom:orbit-status-card",
			mode: "standard",
			entity: t
		}
	};
	return Rn(e, t) ? [r, {
		label: q(e, "Icon only"),
		config: {
			type: "custom:orbit-status-card",
			mode: "icon_only",
			entity: t
		}
	}] : { config: r.config };
}
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function wu(e) {
	!e.has("_config") && !e.has("hass") || (this._actions = Tu(this._config).map((e) => Eu.call(this, e)));
}
function Tu(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_color: e.accent_color,
		main_entity_icon_source: e.main_entity_icon_source,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action
	}];
}
function Eu(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.accent_color || this._config.accent_color || "theme", i = Ou(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r), s = Du(e, t), c = s === "custom" && (e.main_entity_icon || e.icon) || "", l = s === "custom" && e.main_entity_icon ? "main_entity_icon" : s === "custom" && e.icon ? "icon" : "", u = c || "mdi:play-circle";
	return {
		...e,
		entityId: t,
		stateObj: n,
		useStateIcon: !!n && !c,
		icon: u,
		iconColor: o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: l ? this._getSvgColorOverride(e, l) : !0
	};
}
function Du(e, t) {
	let n = e.main_entity_icon_source, r = !!t, i = !!(e.main_entity_icon || e.icon);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function Ou(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
//#endregion
//#region src/cards/action/renders/action-card.js
function ku() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t), i = ju(e, n);
	return w`
    <ha-card
      class="${t > 1 ? "grouped" : ""} ${t > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --action-count:${t};
        --action-columns:${n};
        --action-rows:${r};
      "
    >
      <div class="container action-container">
        ${i.map((e, t) => w`
          <div class="action-row">
            ${e.map((e, r) => Au.call(this, e, t * n + r))}
            ${Mu(e.length, n, "action-spacer")}
          </div>
        `)}
      </div>
    </ha-card>
  `;
}
function Au(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "", i = w`
    <div class="circle action-circle">
      ${this._isImageIcon(e.icon) ? w`
            <div class="main-image-icon">
              ${r ? L(r) : w`<img src=${n} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? w`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : w`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${an(e.stateObj) ? w`
            <ha-tile-badge
              class="entity-unavailable-badge"
              title=${this._t("Unavailable")}
              aria-label=${this._t("Unavailable")}
            >
              <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
            </ha-tile-badge>
          ` : ""}
    </div>
  `;
	return (this._actions?.length || 0) > 1 && !this._config?.separate_cards ? w`
      <div
        class="action-button ${e.isRunning ? "running" : ""}"
        role="button"
        tabindex="0"
        style="
          --action-card-background:${e.cardBackground};
          --action-icon-color:${e.iconColor};
        "
        @click=${(e) => this._handleTap(e, t)}
        @dblclick=${(e) => this._handleDoubleTap(e, t)}
        @pointerdown=${(e) => this._handlePointerDown(e, t)}
        @pointerup=${this._handlePointerUp}
        @pointerleave=${this._handlePointerCancel}
        @pointercancel=${this._handlePointerCancel}
        @contextmenu=${(e) => this._handleContextMenu(e, t)}
      >
        ${i}
      </div>
    ` : w`
    <ha-card
      class="action-button ${e.isRunning ? "running" : ""}"
      role="button"
      tabindex="0"
      style="
        --action-card-background:${e.cardBackground};
        --action-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleTap(e, t)}
      @dblclick=${(e) => this._handleDoubleTap(e, t)}
      @pointerdown=${(e) => this._handlePointerDown(e, t)}
      @pointerup=${this._handlePointerUp}
      @pointerleave=${this._handlePointerCancel}
      @pointercancel=${this._handlePointerCancel}
      @contextmenu=${(e) => this._handleContextMenu(e, t)}
    >
      ${i}
    </ha-card>
  `;
}
function ju(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Mu(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => w`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/cards/action/styles/action-card-styles.js
var Nu = [
	Ar,
	jr,
	d`
    ha-card {
      aspect-ratio: 0.94 / 1;
      border-radius: 15px;
    }

    ha-card.grouped {
      --orbit-grouped-item-gap: clamp(5px, 1.4cqw, 8px);
      aspect-ratio: auto;
      container-type: inline-size;
    }

    ha-card.grouped:not(.separate-cards) {
      background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
      overflow: hidden;
    }

    ha-card.grouped.separate-cards {
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border: var(--ha-card-border-width, 1px) solid transparent;
      box-shadow: none;
      overflow: visible;
    }

    .action-container {
      display: flex;
      flex-direction: column;
      gap: var(--orbit-grouped-item-gap);
      height: auto;
      padding: 0;
      box-sizing: border-box;
    }

    .action-row {
      display: flex;
      flex: 1 1 auto;
      gap: var(--orbit-grouped-item-gap);
      min-height: 0;
      width: 100%;
    }

    ha-card.grouped .action-row {
      flex: 0 0 auto;
    }

    .action-button {
      border-radius: 15px;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      flex: 1 1 0;
      align-items: center;
      justify-content: center;
      min-width: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .action-spacer {
      flex: 1 1 0;
      min-width: 0;
      visibility: hidden;
      pointer-events: none;
    }

    ha-card.grouped .action-button {
      aspect-ratio: 0.94 / 1;
      height: auto;
    }

    ha-card.grouped:not(.separate-cards) .action-button {
      --ha-card-background: transparent;
      --card-background-color: transparent;
      background: transparent !important;
      border: var(--ha-card-border-width, 1px) solid transparent;
      box-shadow: none;
    }

    ha-card.grouped .action-spacer {
      aspect-ratio: 0.94 / 1;
    }

    ha-card.grouped.separate-cards .action-button {
      border-radius: 15px;
      overflow: hidden;
    }

    .action-circle {
      width: min(84%, 84cqh);
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background: var(--action-card-background, rgba(var(--color-theme),0.05));
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
      position: relative;
      pointer-events: none;
    }

    .action-button.running .action-circle {
      background: color-mix(
        in srgb,
        var(--action-card-background, rgba(var(--color-theme),0.05)) 70%,
        var(--action-icon-color, currentColor)
      );
    }

    .action-circle .main-icon,
    .action-circle .main-image-icon {
      color: var(--action-icon-color);
    }

    .action-circle .main-icon {
      --orbit-main-icon-size: 58%;
    }

    .action-circle .main-image-icon {
      width: 58%;
      height: 58%;
    }
  `
];
//#endregion
//#region src/editors/action/sections/action.js
function Pu() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", { itemsPerRow: i, shouldWrapTabs: a, showTabScrollHint: o } = Pl({
		config: this._config,
		itemCount: e.length,
		perRowKey: "actions_per_row",
		defaultPerRow: 3
	});
	return w`
    <div class="section">
      ${Fl.call(this, {
		itemCount: e.length,
		classPrefix: "action",
		perRowKey: "actions_per_row",
		perRowLabel: "Actions per row",
		defaultPerRow: 3
	})}

      <div
        class="action-tabs ${a ? "wrapped" : ""} ${o ? "scroll-hint" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${a ? `--action-tabs-per-row: ${i};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => w`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectActionItem(n)}
            >
              ${n + 1}
            </button>
          `)}
        </div>

        ${o ? w`
              <div class="action-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            ` : ""}

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addActionItem()}
          >
            +
          </button>

          ${e.length > 1 ? w`
                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeActionItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${t === 0}
                  @click=${() => this._moveActionItem(t, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${t === e.length - 1}
                  @click=${() => this._moveActionItem(t, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>

      <div class="field">
        <label>${this._t("Main entity")}</label>

        ${za.call(this, {
		value: n.entity || "",
		filterOptions: Fu,
		activeFilter: r,
		onValueChanged: (e) => this._updateActionItem(t, { entity: e })
	})}
      </div>

      ${this._renderColorControl(["Accent", "Color"], `action-${t}-accent_color`, n.accent_color || "", (e) => this._updateActionItem(t, { accent_color: e }), this._config?.accent_color || "theme")}

      ${Iu.call(this, t, n)}

      ${n.entity ? this._renderActionItemInteractions(t, n) : ""}
    </div>
  `;
}
var Fu = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Automations",
		haDomains: ["automation"],
		value: "automation",
		domains: ["automation"]
	},
	{
		label: "Buttons",
		haDomains: ["button"],
		value: "button",
		domains: [
			"button",
			"input_button",
			"input_boolean"
		]
	},
	{
		label: "Cameras",
		haDomains: ["camera"],
		value: "camera",
		domains: ["camera"]
	},
	{
		label: "Scenes",
		haDomains: ["scene"],
		value: "scene",
		domains: ["scene"]
	},
	{
		label: "Scripts",
		haDomains: ["script"],
		value: "script",
		domains: ["script"]
	}
];
function Iu(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateActionItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderActionItemIconInput(t, r, e)
	};
	return B.call(r, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
		customIconKeys: ["main_entity_icon"],
		renderCustom() {
			return this._renderIconInput("", "main_entity_icon");
		}
	});
}
//#endregion
//#region src/common/editor/styles/action-editor.js
var Lu = d`
.action-tabs {
  display: flex;
  align-items: end;
  gap: 6px;
  border-bottom: 1px solid var(--orbit-editor-border);
  padding-bottom: 2px;
  margin-bottom: 12px;
  overflow: visible;
}

.action-tabs.scroll-hint .action-tab-items {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
  mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
}

.action-tabs.wrapped {
  display: flex;
  align-items: start;
}

.action-tab-items {
  display: flex;
  align-items: end;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
}

.action-tabs.wrapped .action-tab-items {
  display: grid;
  grid-template-columns: repeat(
    var(--action-tabs-per-row, 3),
    32px
  );
  justify-content: start;
  flex: 1 1 auto;
  overflow-x: auto;
}

.action-tabs-scroll-indicator {
  width: 16px;
  min-width: 16px;
  height: 36px;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.78;
  pointer-events: none;
}

.action-tabs-scroll-indicator ha-icon {
  --mdc-icon-size: 18px;
}

.action-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.action-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.action-per-row-field {
  margin-left: auto;
  width: 144px;
  min-width: 144px;
}

.action-tab,
.action-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  width: 32px;
  min-width: 32px;
  height: 36px;
  padding: 0;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.6;
  cursor: pointer;
}

.action-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.action-tabs.wrapped .action-tab,
.action-tabs.wrapped .action-tab-add {
  width: 32px;
  min-width: 32px;
}

.action-editor-tools .action-tab-add {
  width: 34px;
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.action-tab-add {
  font-size: 24px;
  opacity: 0.9;
}

.action-editor-tools {
  display: flex;
  gap: 4px;
  margin-left: auto;
  justify-content: flex-end;
}

.action-tabs.scroll-hint .action-editor-tools {
  margin-left: 0;
}

.action-tabs.wrapped .action-editor-tools {
  display: grid;
  grid-template-columns: repeat(2, 34px);
  grid-template-rows: repeat(2, 34px);
  gap: 4px;
  min-width: max-content;
  align-self: start;
}

.action-tool-button {
  width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.action-tool-button ha-icon {
  --mdc-icon-size: 20px;
}
`, Ru = class extends k {
	static svgCache = I;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_selectedActionIndex: { state: !0 },
		_actionEntityDomainFilter: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_iconFileSearch: { state: !0 },
		_iconFilePickerOpen: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 }
	};
	constructor() {
		super(), this._config = this._config || {}, this._selectedActionIndex = 0, this._actionEntityDomainFilter = "all", this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
	}
	connectedCallback() {
		super.connectedCallback(), mo(this), kt(this, "orbit-action-card");
	}
	disconnectedCallback() {
		ho(this), super.disconnectedCallback();
	}
	setConfig(e) {
		this._config = e || {}, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(e).length - 1);
	}
	_t(e, t) {
		return q(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = Wu(Ci(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_getActionItems(e = this._config) {
		return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
			entity: e?.main_entity || "",
			accent_color: e?.accent_color || "",
			main_entity_icon_source: e?.main_entity_icon_source || "",
			main_entity_icon: e?.main_entity_icon || "",
			tap_action: e?.tap_action,
			hold_action: e?.hold_action,
			double_tap_action: e?.double_tap_action
		}];
	}
	_selectActionItem(e) {
		this._selectedActionIndex = e;
	}
	_addActionItem() {
		let e = this._getActionItems();
		this._selectedActionIndex = e.length, this._updateConfig(V(Vu, { entities: [...e, { entity: "" }] }));
	}
	_removeActionItem(e) {
		let t = this._getActionItems();
		if (t.length <= 1) {
			this._updateConfig(H("main_entity", Bu));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedActionIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveActionItem(e, t) {
		let n = this._getActionItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedActionIndex = r, this._updateConfig(V(Vu, { entities: i }));
	}
	_updateActionItem(e, t) {
		let n = this._getActionItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && zu(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, V(Vu)), this._updateConfig(i);
			return;
		}
		if (t.entity === "") {
			this._updateConfig(H("main_entity", Bu));
			return;
		}
		this._updateConfig({
			main_entity: r.entity || "",
			accent_color: r.accent_color || "",
			main_entity_icon_source: r.main_entity_icon_source || "",
			main_entity_icon: r.main_entity_icon || "",
			tap_action: r.tap_action,
			hold_action: r.hold_action,
			double_tap_action: r.double_tap_action
		});
	}
	_getColorStyle(e) {
		return _o(e);
	}
	_getColorPickerValue(e) {
		return vo(e);
	}
	_renderActionItemInteractions(e, t) {
		let n = {
			hass: this.hass,
			_config: t,
			_t: (e, t) => this._t(e, t),
			requestUpdate: () => this.requestUpdate(),
			_updateConfig: (t) => this._updateActionItem(e, t)
		};
		return G.call(n, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: Vn(t.entity, "toggle"),
					defaultVisible: !0
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: "more-info"
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: "none"
				}
			],
			context: { entity_id: t.entity }
		});
	}
	_renderColor(e, t, n) {
		return Di.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return Oi.call(this, e, t, n, r, i);
	}
	_renderEntity(e, t, n) {
		return fo.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return Si.call(this, e, t, n);
	}
	_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
		return Gr.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return qr.call(this, e);
	}
	_renderActionItemIconInput(e, t, n, r = "mdi:palette or icon.svg") {
		let i = this._getActionItems()[n] || {}, a = {
			hass: this.hass,
			_config: i,
			_iconPickerPrefix: `action-${n}-icon`,
			_t: (e, t) => this._t(e, t),
			_isImageIcon: (e) => this._isImageIcon(e),
			_resolveIconPath: (e) => this._resolveIconPath(e),
			_getInlineSvg: (e) => this._getInlineSvg(e),
			_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
			requestUpdate: () => this.requestUpdate(),
			renderRoot: this.renderRoot,
			_handleConfigUpdate: (e, t) => this._updateActionItem(n, { [e]: t })
		};
		return Object.defineProperties(a, {
			_iconPickerKey: {
				get: () => this._iconPickerKey,
				set: (e) => {
					this._iconPickerKey = e;
				}
			},
			_iconPickerTab: {
				get: () => this._iconPickerTab,
				set: (e) => {
					this._iconPickerTab = e;
				}
			},
			_localIconFiles: {
				get: () => this._localIconFiles,
				set: (e) => {
					this._localIconFiles = e;
				}
			},
			_orbitIconFiles: {
				get: () => this._orbitIconFiles,
				set: (e) => {
					this._orbitIconFiles = e;
				}
			},
			_localIconFilesLoading: {
				get: () => this._localIconFilesLoading,
				set: (e) => {
					this._localIconFilesLoading = e;
				}
			},
			_orbitIconFilesLoading: {
				get: () => this._orbitIconFilesLoading,
				set: (e) => {
					this._orbitIconFilesLoading = e;
				}
			}
		}), Gr.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return Ur(e);
	}
	_resolveIconPath(e) {
		return Wr(e);
	}
	_getInlineSvg(e) {
		return F.call(this, e, { forceColor: !0 });
	}
	_renderActionSection() {
		return Pu.call(this);
	}
	render() {
		return w`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card v{version}", { version: t.action })}
        </div>
      </div>
    `;
	}
	static styles = [vs, Lu];
};
customElements.define("orbit-action-card-editor", Ru);
function zu(e) {
	Object.assign(e, V(Bu));
}
var Bu = [
	"accent_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"tap_action",
	"hold_action",
	"double_tap_action"
], Vu = ["main_entity", ...Bu], Hu = [
	"entity",
	"accent_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action"
], Uu = [
	"type",
	"main_entity",
	"accent_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"wrap",
	"actions_per_row",
	"separate_cards",
	"entities",
	"grid_options",
	"view_layout"
];
function Wu(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Uu.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(Gu) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Gu(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? e : Ku(e, Hu);
}
function Ku(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/cards/action-card.js
var qu = class extends k {
	static svgCache = I;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_icon: { type: String },
			_iconColor: { type: String },
			_cardBackground: { type: String },
			_isRunning: { type: Boolean },
			_actions: { type: Array }
		};
	}
	static getConfigElement() {
		return document.createElement("orbit-action-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-action-card",
			main_entity: "",
			accent_color: "theme"
		};
	}
	getLayoutOptions() {
		let e = Tu(this._config).length, t = Ju(this._config, e);
		return {
			grid_columns: Math.max(1, t * 1),
			grid_min_columns: .5,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		this._config = e;
		let t = e.accent_color || "theme";
		this._iconColor = this._computeIconColor(t), this._cardBackground = this._computeCircleColor(t), this._isRunning = !1, this._actions = [];
	}
	willUpdate(e) {
		return wu.call(this, e);
	}
	disconnectedCallback() {
		this._clearHoldTimer(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return Nn.call(this, e, Tu(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: Pn(this._config) });
	}
	_handleTap(e, t = 0) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		M.call(this, e, this._getActionEntityId(t), this._getTapAction(t), this._getDoubleTapAction(t));
	}
	_handleDoubleTap(e, t = 0) {
		N.call(this, e, this._getActionEntityId(t), this._getDoubleTapAction(t));
	}
	_clearDoubleTapTimer() {
		return Ue.call(this);
	}
	_getDoubleTapAction(e = 0) {
		let t = this._actions?.[e];
		return t?.double_tap_action?.action ? t.double_tap_action : this._config.double_tap_action?.action ? this._config.double_tap_action : null;
	}
	_handlePointerDown(e, t = 0) {
		j(this) || (this._stopEvent(e), this._clearHoldTimer(), this._holdTimer = setTimeout(() => {
			this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
		}, 500));
	}
	_handlePointerUp(e) {
		this._stopEvent(e), this._clearHoldTimer();
	}
	_handlePointerCancel(e) {
		this._stopEvent(e), this._clearHoldTimer();
	}
	_handleContextMenu(e, t = 0) {
		this._stopEvent(e), this._clearHoldTimer(), this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
	}
	_getTapAction(e = 0) {
		let t = this._actions?.[e];
		return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : Vn(this._getActionEntityId(e), "toggle");
	}
	_getHoldAction(e = 0) {
		let t = this._actions?.[e];
		return t?.hold_action?.action ? t.hold_action : this._config.hold_action?.action ? this._config.hold_action : { action: "more-info" };
	}
	_getActionEntityId(e = 0) {
		let t = this._actions?.[e];
		return t?.entityId || t?.entity || this._config.main_entity;
	}
	_getActionColumnCount(e = this._actions?.length || 1) {
		return Ju(this._config, e);
	}
	_getActionRowCount(e = this._actions?.length || 1) {
		return Ys({
			config: this._config,
			count: e,
			perRowKey: "actions_per_row"
		});
	}
	_handleAction(e, t = null) {
		return He.call(this, e, t);
	}
	_computeFullColor(e) {
		return it.call(this, e);
	}
	_computeIconColor(e) {
		return at.call(this, e);
	}
	_computeCircleColor(e) {
		return ot.call(this, e);
	}
	_isImageIcon(e) {
		return Sn(e);
	}
	_resolveIconPath(e) {
		return Cn(e);
	}
	_getInlineSvg(e, t = !0) {
		return F.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return wn(e, t);
	}
	_clearHoldTimer() {
		this._holdTimer &&= (clearTimeout(this._holdTimer), null);
	}
	_stopEvent(e) {
		e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	}
	render() {
		return ku.call(this);
	}
	static styles = Nu;
};
function Ju(e = {}, t = 1) {
	return Js({
		config: e,
		count: t,
		perRowKey: "actions_per_row"
	});
}
jt({
	tag: "orbit-action-card",
	cardClass: qu,
	name: "Orbit Action Card",
	description: "Compact scene, script, and automation launcher",
	version: t.action,
	getEntitySuggestion: Xu
});
var Yu = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function Xu(e, t) {
	return Yu.has(In(t)) ? { config: {
		type: "custom:orbit-action-card",
		main_entity: t
	} } : null;
}
//#endregion
//#region src/common/helpers/deck-padding.js
function Zu(e = {}) {
	let t = e?.attributes || {};
	return {
		top: rd(t.padding_top),
		right: rd(t.padding_right),
		bottom: rd(t.padding_bottom),
		left: rd(t.padding_left)
	};
}
function Qu(e = {}) {
	return Object.values(Zu(e)).some(Boolean);
}
function $u(e = {}) {
	return e?.attributes?.force_padding === !0;
}
function ed(e = {}) {
	return Qu(e) && ($u(e) || !nd(e?.card));
}
function td(e = {}) {
	return $u(e) && Qu(e);
}
function nd(e) {
	return Array.isArray(e) ? e.some((e) => nd(e)) : !e || typeof e != "object" ? typeof e == "string" ? /\bpadding(?:-(?:top|right|bottom|left))?\b/i.test(e) : !1 : Object.entries(e).some(([e, t]) => e.toLowerCase().includes("padding") || nd(t));
}
function rd(e) {
	if (e == null || e === "") return "";
	let t = e.toString().trim();
	return t ? /^-?\d+(\.\d+)?$/.test(t) ? `${t}px` : t : "";
}
//#endregion
//#region src/cards/deck/items.js
function id(e = {}) {
	return Array.isArray(e?.decks) ? e.decks.map((e) => e?.badge ? {
		attributes: e?.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	}) : [];
}
function ad(e = {}) {
	return [
		Q(e, "tap_action"),
		Q(e, "hold_action"),
		Q(e, "double_tap_action")
	].some(A);
}
function Q(e = {}, t) {
	let n = e?.attributes?.[t];
	return n?.action ? n : null;
}
function od(e = {}) {
	let t = ld(e);
	return e?.attributes?.entity || dd(e?.attributes?.tap_action) || dd(e?.attributes?.hold_action) || dd(e?.attributes?.double_tap_action) || dd(t?.tap_action) || dd(t?.hold_action) || dd(t?.double_tap_action) || t?.entity || null;
}
function sd(e = {}, t = !1) {
	let n = ld(e), r = td(e) ? ud(n) : n, i = r, a = [
		"tap_action",
		"hold_action",
		"double_tap_action"
	].filter((t) => A(Q(e, t)));
	return a.length && (i = { ...r }, a.forEach((e) => delete i[e])), t ? {
		...i,
		hide_background: !0
	} : i;
}
function cd(e = {}) {
	return e?.badge ? "badge" : "card";
}
function ld(e = {}) {
	return e?.badge || e?.card || {};
}
function ud(e) {
	return Array.isArray(e) ? e.map((e) => ud(e)) : !e || typeof e != "object" ? e : Object.entries(e).reduce((e, [t, n]) => (t.toLowerCase().includes("padding") || (e[t] = ud(n)), e), {});
}
function dd(e) {
	return e?.entity || e?.entity_id || null;
}
function fd(e = []) {
	return Math.max(0, e.findIndex((e) => e.attributes?.default));
}
function pd(e = []) {
	return e.map((e, t) => e.attributes?.default ? t : "").join(":");
}
//#endregion
//#region src/cards/deck/layout.js
function md(e = {}, t = 0) {
	let n = e?.attributes || {}, r = hd(n.left, 0), i = hd(n.top, 0);
	return `${[
		`--orbit-deck-overlay-left:${r}px`,
		`--orbit-deck-overlay-top:${i}px`,
		`--orbit-deck-overlay-z-index:${t + 1}`
	].join(";")};`;
}
function hd(e, t) {
	if (e == null || e === "") return t;
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function gd(e) {
	let t = hd(e, null);
	return t === null ? null : Math.max(0, t);
}
function _d(e = {}) {
	return e?.attributes?.fit === "crop" ? "crop" : "resize";
}
function vd(e, t, n, r, i) {
	if (i) return {
		width: n ?? e,
		height: r ?? t,
		scaleX: 1,
		scaleY: 1
	};
	if (n === null && r === null) return {
		width: e,
		height: t,
		scaleX: 1,
		scaleY: 1
	};
	if (n !== null && r === null) {
		let r = n / e;
		return {
			width: n,
			height: t * r,
			scaleX: r,
			scaleY: r
		};
	}
	if (n === null && r !== null) {
		let n = r / t;
		return {
			width: e * n,
			height: r,
			scaleX: n,
			scaleY: n
		};
	}
	return {
		width: n,
		height: r,
		scaleX: n / e,
		scaleY: r / t
	};
}
function yd(e = {}) {
	return [
		"equal",
		"dynamic",
		"custom"
	].includes(e?.tab_width_mode) ? e.tab_width_mode : "equal";
}
function bd(e = {}) {
	return [
		e.tab_font_size ? `--orbit-deck-tab-font-size:${e.tab_font_size};` : "",
		xd("--orbit-deck-tab-color", e.tab_color),
		xd("--orbit-deck-tab-active-color", e.tab_active_color),
		xd("--orbit-deck-tab-background-color", e.tab_background_color)
	].filter(Boolean).join("");
}
function xd(e, t) {
	return t ? `${e}:${it(t)};` : "";
}
function Sd(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Cd(e, t) {
	return Array.from({ length: Math.max(0, t - e) }, () => w`
    <div class="deck-spacer"></div>
  `);
}
//#endregion
//#region src/cards/deck/surface.js
function wd(e = []) {
	return e.map((e) => {
		if (!e?.element) return `${e?.index ?? ""}:none`;
		let t = Zu(e.item), n = $u(e.item), r = ed(e.item);
		return [
			e.index,
			e.kind || cd(e.item),
			ld(e.item)?.type || "",
			n ? "force" : "child",
			r ? t.top : "",
			r ? t.right : "",
			r ? t.bottom : "",
			r ? t.left : ""
		].join(":");
	}).join("|");
}
function Td(e, t) {
	return e?.querySelector?.(`.deck-item-interaction[data-deck-index="${t}"]`);
}
function Ed(e = {}, t = {}, n = 0) {
	let r = t?.attributes?.transparent_background;
	return e?.layout === "wrap" ? typeof r == "boolean" ? r : !e?.separate_cards : e?.layout === "overlay" ? n > 0 && r === !0 : e?.layout === "tabs" && r !== !1;
}
var Dd = {
	background: "transparent",
	"backdrop-filter": "none",
	"-webkit-backdrop-filter": "none",
	"border-color": "transparent",
	"box-shadow": "none"
};
function Od(e, t) {
	if (t) {
		e._orbitDeckSurfaceStyles ||= Object.fromEntries(Object.keys(Dd).map((t) => [t, {
			value: e.style.getPropertyValue(t),
			priority: e.style.getPropertyPriority(t)
		}])), kd(e), Ad(e);
		return;
	}
	let n = e._orbitDeckSurfaceStyles;
	n && (jd(e), Object.entries(n).forEach(([t, n]) => {
		n.value ? e.style.setProperty(t, n.value, n.priority) : e.style.removeProperty(t);
	}), delete e._orbitDeckSurfaceStyles);
}
function kd(e) {
	Object.entries(Dd).forEach(([t, n]) => {
		(e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important");
	});
}
function Ad(e) {
	e._orbitDeckSurfaceObserver || (e._orbitDeckSurfaceObserver = new MutationObserver(() => {
		e._orbitDeckSurfaceStyles && kd(e);
	}), e._orbitDeckSurfaceObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function jd(e) {
	e._orbitDeckSurfaceObserver?.disconnect(), e._orbitDeckSurfaceObserver = null;
}
function Md(e) {
	let t = /* @__PURE__ */ new Set();
	return Nd(e, t, /* @__PURE__ */ new WeakSet()), [...t];
}
function Nd(e, t, n) {
	!e || n.has(e) || (n.add(e), e.localName === "ha-card" && t.add(e), [e.shadowRoot, e].filter(Boolean).forEach((e) => {
		let r = e.querySelectorAll?.("*") || [];
		for (let e of r) e.localName === "ha-card" && t.add(e), e.shadowRoot && Nd(e, t, n);
	}));
}
function Pd(e, t, n) {
	Fd(e, n ? t : {
		top: "",
		right: "",
		bottom: "",
		left: ""
	}), e._orbitDeckPaddingApplied = n;
}
function Fd(e, t) {
	Id(e, "padding-top", t.top), Id(e, "padding-right", t.right), Id(e, "padding-bottom", t.bottom), Id(e, "padding-left", t.left);
}
function Id(e, t, n) {
	n ? (e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important") : e.style.removeProperty(t);
}
function Ld(e, t) {
	e._orbitDeckPadding = t, !e._orbitDeckPaddingObserver && (e._orbitDeckPaddingObserver = new MutationObserver(() => {
		e._orbitDeckPadding && Fd(e, e._orbitDeckPadding);
	}), e._orbitDeckPaddingObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function Rd(e) {
	e._orbitDeckPadding = null, e._orbitDeckPaddingObserver?.disconnect(), e._orbitDeckPaddingObserver = null;
}
//#endregion
//#region src/cards/deck/styles/deck-card-styles.js
var zd = d`
  ha-card.deck-card {
    border-radius: var(--ha-card-border-radius, 15px);
    overflow: visible;
  }

  ha-card.deck-card.wrap.separate-cards {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  ha-card.deck-card.overlay {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  .deck-item-interaction.transparent-background,
  .deck-item-interaction.transparent-background > * {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-card.empty {
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }

  .deck-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--orbit-deck-gap, 8px);
    padding: var(--orbit-deck-padding, 0);
  }

  .deck-row {
    display: flex;
    gap: var(--orbit-deck-gap, 8px);
    width: 100%;
  }

  .deck-item,
  .deck-spacer {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-item-interaction {
    display: block;
    height: 100%;
  }

  .deck-item-interaction.has-actions {
    cursor: pointer;
  }

  .deck-spacer {
    visibility: hidden;
    pointer-events: none;
  }

  .deck-visibility-observers {
    display: none !important;
  }

  .deck-tabs {
    display: flex;
    align-items: end;
    gap: 4px;
    border-bottom: none;
    box-shadow: inset 0 -2px 0 var(--divider-color);
    background: var(--orbit-deck-tab-background-color, transparent);
    overflow-x: auto;
  }

  .deck-tab {
    position: relative;
    min-width: 72px;
    min-height: 44px;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    color: var(--orbit-deck-tab-color, inherit);
    padding: 0 12px;
    font: inherit;
    font-size: var(--orbit-deck-tab-font-size, var(--ha-font-size-m, 14px));
    font-weight: var(--ha-font-weight-medium, 500);
    opacity: 0.62;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }

  .deck-card.tabs:not(.hide-tab-dividers) .deck-tab + .deck-tab::before {
    content: "";
    position: absolute;
    inset-inline-start: -3px;
    top: 8px;
    bottom: 0;
    width: 2px;
    background: var(--divider-color);
    pointer-events: none;
  }

  .deck-card.tabs.tab-width-equal .deck-tab {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-card.tabs.tab-width-dynamic .deck-tab {
    flex: 0 0 auto;
  }

  .deck-card.tabs.tab-width-custom .deck-tab {
    flex: 0 0 var(--orbit-deck-tab-width, 120px);
    min-width: var(--orbit-deck-tab-width, 120px);
  }

  .deck-tab.active {
    color: var(--orbit-deck-tab-active-color, var(--primary-color));
    border-bottom-color: var(--orbit-deck-tab-active-color, var(--primary-color));
    opacity: 1;
  }

  .deck-tab ha-icon {
    --mdc-icon-size: 20px;
  }

  .deck-tab-content {
    padding-top: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 15px);
  }

  .deck-overlay-main {
    position: relative;
    z-index: 0;
  }

  .deck-overlay-item {
    position: absolute;
    inset-inline-start: var(--orbit-deck-overlay-left, 0);
    top: var(--orbit-deck-overlay-top, 0);
    z-index: var(--orbit-deck-overlay-z-index, 1);
    flex: 0 0 auto;
    pointer-events: auto;
  }

  .deck-overlay-item.overlay-card {
    width: 100%;
  }

  .deck-overlay-item.overlay-badge {
    width: max-content;
  }

  .deck-overlay-content {
    display: block;
    transform-origin: top left;
  }

  .deck-overlay-item .deck-item-interaction {
    height: auto;
  }

  .deck-overlay-item.transparent-background,
  .deck-overlay-item.transparent-background .deck-overlay-content,
  .deck-overlay-item.transparent-background .deck-item-interaction,
  .deck-overlay-item.transparent-background .deck-item-interaction > * {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-width: 0;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-error-card {
    padding: 16px;
    background: color-mix(in srgb, var(--error-color) 14%, transparent);
    color: var(--primary-text-color);
  }

  .deck-error-title {
    font-weight: var(--ha-font-weight-bold, 700);
    margin-bottom: 8px;
  }
`, Bd = [
	"type",
	"layout",
	"items_per_row",
	"separate_cards",
	"tab_font_size",
	"tab_divider",
	"tab_width_mode",
	"tab_color",
	"tab_active_color",
	"tab_background_color",
	"decks",
	"grid_options",
	"view_layout"
], Vd = [
	"attributes",
	"badge",
	"card"
];
function Hd(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Bd.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "decks" && Array.isArray(e[r]) ? e[r].map(Gd) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Ud(e) {
	if (!Array.isArray(e?.decks)) return {
		config: e,
		changed: !1
	};
	let t = !1, n = e.decks.map((e) => {
		let n = e?.attributes || {};
		if (!Object.prototype.hasOwnProperty.call(n, "label")) return e;
		t = !0;
		let { label: r, ...i } = n;
		return {
			...e,
			attributes: {
				...i,
				name: n.name || r
			}
		};
	});
	return t ? {
		config: {
			...e,
			decks: n
		},
		changed: t
	} : {
		config: e,
		changed: t
	};
}
function Wd(e = {}) {
	return e?.badge ? {
		attributes: e.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	};
}
function Gd(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = {}, n = /* @__PURE__ */ new Set(), r = {
		...e,
		attributes: Kd(e.attributes || {})
	};
	return e.badge?.type ? (r.badge = e.badge, delete r.card) : e.card?.type ? (r.card = e.card, delete r.badge) : (delete r.badge, delete r.card), Vd.forEach((e) => {
		Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e], n.add(e));
	}), Object.keys(r).forEach((e) => {
		n.has(e) || (t[e] = r[e]);
	}), t;
}
function Kd(e = {}) {
	return Object.entries(e).reduce((e, [t, n]) => (n !== void 0 && n !== "" && (e[t] = n), e), {});
}
//#endregion
//#region src/editors/deck/item-helpers.js
function qd(e = {}, t) {
	let n = Jd(e);
	return n?.[t]?.action ? n[t] : t === "tap_action" && n?.entity ? "more-info" : "none";
}
function Jd(e = {}) {
	return e?.badge || e?.card || {};
}
function Yd(e = {}, t, n = "Card") {
	let r = Jd(e)?.type || "";
	if (!r) return n;
	let i = r.replace(/^custom:/, ""), a = (e?.badge ? window.customBadges || [] : window.customCards || []).find((e) => e.type === r || e.type === i);
	if (a?.name) return a.name;
	let o = e?.badge ? [`ui.panel.lovelace.editor.badges.${i}.name`, `ui.panel.lovelace.editor.badge.${i}.name`] : [`ui.panel.lovelace.editor.card.${i}.name`];
	for (let e of o) {
		let n = t?.localize?.(e);
		if (n && n !== e) return n;
	}
	return i.replace(/[-_]+/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function $(e) {
	return Xd(e) !== "none";
}
function Xd(e) {
	return typeof e == "string" ? e : e?.action || "none";
}
//#endregion
//#region src/editors/deck/native-pickers.js
async function Zd() {
	if (!this._badgePickerLoadRequested) {
		this._badgePickerLoadRequested = !0;
		try {
			window.loadCardHelpers && await window.loadCardHelpers(), customElements.get("hui-badge-picker") || await this._loadNativeBadgeModule({
				eventName: "ll-create-badge",
				dialogTag: "hui-dialog-create-badge"
			}), await Promise.race([customElements.whenDefined("hui-badge-picker"), new Promise((e) => setTimeout(e, 1500))]);
		} catch {} finally {
			this._badgePickerLoadRequested = !1, this.requestUpdate();
		}
	}
}
async function Qd() {
	if (!this._badgeEditorLoadRequested) {
		this._badgeEditorLoadRequested = !0;
		try {
			if (window.loadCardHelpers && await window.loadCardHelpers(), !customElements.get("hui-badge-element-editor")) {
				let e = this._findElementInShadowRoots(document, (e) => e.localName === "hui-view" && e._layoutElement), t = Number.isInteger(e?.index) ? e.index : 0;
				await this._loadNativeBadgeModule({
					eventName: "ll-edit-badge",
					dialogTag: "hui-dialog-edit-badge",
					detail: { path: [t, 0] },
					huiView: e
				});
			}
			await Promise.race([customElements.whenDefined("hui-badge-element-editor"), new Promise((e) => setTimeout(e, 1500))]);
		} catch {} finally {
			this._badgeEditorLoadRequested = !1, this.requestUpdate();
		}
	}
}
async function $d({ eventName: e, dialogTag: t, detail: n, huiView: r }) {
	let i = r || this._findElementInShadowRoots(document, (e) => e.localName === "hui-view" && e._layoutElement);
	if (!i) return;
	let a, o = (e) => {
		e.detail?.dialogTag === t && (e.preventDefault(), e.stopImmediatePropagation(), a = e.detail.dialogImport);
	};
	i.addEventListener("show-dialog", o);
	try {
		i._layoutElement.dispatchEvent(new CustomEvent(e, {
			detail: n,
			bubbles: !1,
			composed: !0
		}));
	} finally {
		i.removeEventListener("show-dialog", o);
	}
	typeof a == "function" && await a();
}
function ef(e, t) {
	let n = e.querySelectorAll?.("*") || [];
	for (let e of n) {
		if (t(e)) return e;
		if (e.shadowRoot) {
			let n = this._findElementInShadowRoots(e.shadowRoot, t);
			if (n) return n;
		}
	}
}
async function tf() {
	if (!this._cardPickerLoadRequested) {
		this._cardPickerLoadRequested = !0;
		try {
			window.loadCardHelpers && await window.loadCardHelpers(), await Promise.race([customElements.whenDefined("hui-card-picker"), new Promise((e) => setTimeout(e, 1500))]);
		} catch {} finally {
			this._cardPickerLoadRequested = !1, this.requestUpdate();
		}
	}
}
//#endregion
//#region src/editors/deck/sections/child-picker.js
function nf() {
	let e = this._childPickerType;
	return w`
    <div class="editor-tabs deck-child-type-tabs" role="tablist">
      ${[["badge", "Badges"], ["card", "Cards"]].map(([t, n]) => w`
        <button
          type="button"
          class="editor-tab ${e === t ? "active" : ""}"
          role="tab"
          aria-selected=${e === t ? "true" : "false"}
          @click=${() => {
		this._childPickerType = t;
	}}
        >
          ${this._t(n)}
        </button>
      `)}
    </div>
  `;
}
function rf(e, t) {
	return this._childPickerType === "badge" ? this._renderBadgePicker(e, t) : this._renderCardPicker(e, t);
}
function af(e, t) {
	return t?.badge?.type ? customElements.get("hui-badge-element-editor") ? w`
      <hui-badge-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.badge}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
      ></hui-badge-element-editor>
    ` : (this._ensureNativeBadgeEditor(), w`
        <div class="deck-card-picker-loading">
          <ha-spinner></ha-spinner>
        </div>
      `) : !this.hass || !this.lovelace ? w`` : customElements.get("hui-badge-picker") ? w`
    <hui-badge-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .badgePicked=${(t) => this._updateDeckBadge(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
    ></hui-badge-picker>
  ` : (this._ensureNativeBadgePicker(), w`
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `);
}
function of(e, t) {
	return t?.card?.type ? w`
      <hui-card-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.card}
        .showVisibilityTab=${["wrap", "tabs"].includes(this._config?.layout || "wrap")}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
      ></hui-card-element-editor>
    ` : !this.hass || !this.lovelace ? w`` : customElements.get("hui-card-picker") ? w`
    <hui-card-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cardPicked=${(t) => this._updateDeckCard(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
    ></hui-card-picker>
  ` : (this._ensureNativeCardPicker(), w`
      <hui-card-element-editor
        class="native-picker-preloader"
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${{
		type: "vertical-stack",
		cards: []
	}}
        @config-changed=${(e) => e.stopPropagation()}
      ></hui-card-element-editor>
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `);
}
//#endregion
//#region src/editors/deck/sections/style.js
function sf(e, t) {
	let n = t?.attributes || {}, r = this._config?.layout === "wrap", i = this._config?.layout === "tabs", a = this._config?.layout === "overlay" && e > 0, o = r || i || a, s = i || r && !this._config?.separate_cards, c = typeof n.transparent_background == "boolean" ? n.transparent_background : s;
	return w`
    <ha-expansion-panel
      class="deck-card-section deck-style-section"
      outlined
      .expanded=${this._styleSectionExpanded === !0}
      @expanded-changed=${(e) => {
		e.target === e.currentTarget && (this._styleSectionExpanded = e.detail.expanded);
	}}
    >
      <ha-icon slot="leading-icon" icon="mdi:palette"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Style")}
      </div>
      <div class="deck-card-section-content deck-style-content">
        ${i ? w`
              <div class="field-grid two-columns">
                ${this._renderAttributeSelector(e, {
		label: "Icon",
		selector: { icon: {} },
		value: n.icon || "",
		changeKey: "icon"
	})}
                ${this._renderAttributeSelector(e, {
		label: "Name",
		selector: { text: {} },
		value: n.name || n.label || "",
		changeKey: "name"
	})}
              </div>
            ` : ""}

        ${i && this._config?.tab_width_mode === "custom" ? this._renderAttributeSelector(e, {
		label: "Tab width",
		selector: { text: {} },
		value: n.width || "",
		changeKey: "width"
	}) : ""}

        ${a ? w`
              <div class="field editor-button-toggle-field">
                <div class="field-header">
                  <label>${this._t("Mode")}</label>
                  <ha-selector
                    class="editor-header-button-toggle deck-overlay-fit-toggle"
                    .hass=${this.hass}
                    .selector=${{ button_toggle: { options: [{
		label: this._t("Crop"),
		value: "crop"
	}, {
		label: this._t("Resize"),
		value: "resize"
	}] } }}
                    .value=${n.fit || "resize"}
                    @value-changed=${(t) => this._updateDeckAttributes(e, { fit: t.detail.value === "resize" ? void 0 : t.detail.value })}
                  ></ha-selector>
                </div>
              </div>
              <div class="field-grid four-columns deck-overlay-layout-grid">
                ${this._renderOverlayNumberSelector(e, {
		label: "Left",
		value: n.left,
		changeKey: "left",
		min: -1e4
	})}
                ${this._renderOverlayNumberSelector(e, {
		label: "Top",
		value: n.top,
		changeKey: "top",
		min: -1e4
	})}
                ${this._renderOverlayNumberSelector(e, {
		label: "Width",
		value: n.width,
		changeKey: "width"
	})}
                ${this._renderOverlayNumberSelector(e, {
		label: "Height",
		value: n.height,
		changeKey: "height"
	})}
              </div>
            ` : ""}

        ${o ? w`
              <label class="deck-force-padding-row">
                <span>${this._t("Transparent background")}</span>
                <ha-switch
                  .checked=${c}
                  @change=${(t) => {
		let n = t.target.checked;
		this._updateDeckAttributes(e, { transparent_background: n === s ? void 0 : n });
	}}
                ></ha-switch>
              </label>
            ` : ""}

        <label class="deck-force-padding-row">
          <span>${this._t("Force padding")}</span>
          <ha-switch
            .checked=${n.force_padding === !0}
            @change=${(t) => this._updateDeckAttributes(e, { force_padding: t.target.checked ? !0 : void 0 })}
          ></ha-switch>
        </label>

        <div class="field-grid four-columns deck-padding-grid">
          ${this._renderAttributeSelector(e, {
		label: "Top",
		selector: { text: {} },
		value: n.padding_top || "",
		changeKey: "padding_top"
	})}
          ${this._renderAttributeSelector(e, {
		label: "Bottom",
		selector: { text: {} },
		value: n.padding_bottom || "",
		changeKey: "padding_bottom"
	})}
          ${this._renderAttributeSelector(e, {
		label: "Left",
		selector: { text: {} },
		value: n.padding_left || "",
		changeKey: "padding_left"
	})}
          ${this._renderAttributeSelector(e, {
		label: "Right",
		selector: { text: {} },
		value: n.padding_right || "",
		changeKey: "padding_right"
	})}
        </div>
      </div>
    </ha-expansion-panel>
  `;
}
//#endregion
//#region src/editors/deck/styles.js
var cf = [
	vs,
	Lu,
	d`
    .deck-subtabs-row {
      display: flex;
      align-items: end;
      gap: 12px;
      border-bottom: 1px solid var(--orbit-editor-border);
      margin-bottom: 12px;
    }

    .deck-subtabs {
      flex: 1 1 auto;
      border-bottom: none;
    }

    .deck-layout-toggle {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
      width: auto;
      min-width: 270px;
      margin-bottom: 6px;
    }

    .deck-tab-width-toggle {
      width: auto;
      min-width: 260px;
    }

    .deck-overlay-fit-toggle {
      width: min(360px, 100%);
      min-width: 0;
    }

    .field-grid.two-columns {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 12px;
    }

    .field-grid.four-columns {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }

    .deck-tab-colors {
      margin-top: 12px;
    }

    .deck-tab-divider-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 36px;
      margin-top: 4px;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-normal, 20px);
    }

    .deck-card-tab-section {
      gap: 4px;
    }

    .deck-style-section {
      margin-top: 4px;
    }

    .deck-style-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-bottom: 0;
    }

    .deck-style-content .field-grid.two-columns {
      margin-bottom: 0;
    }

    .deck-force-padding-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 36px;
      margin: 0;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-normal, 20px);
    }

    .deck-padding-grid {
      margin-top: -4px;
      margin-bottom: -26px;
    }

    .deck-interactions-section .interactions-form {
      margin-top: 0;
    }

    .deck-default-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 6px 0 16px;
    }

    .deck-card-editor-frame {
      min-height: 160px;
    }

    .deck-child-type-tabs {
      margin: -4px 0 12px;
    }

    hui-badge-picker {
      display: block;
      min-height: 320px;
    }

    .deck-card-section {
      display: block;
      margin: 0;
      --expansion-panel-content-padding: 0;
      border-radius: var(--ha-border-radius-md);
      --ha-card-border-radius: var(--ha-border-radius-md);
    }

    .deck-card-section-content {
      padding: 12px;
    }

    .deck-card-section ha-icon {
      color: var(--secondary-text-color);
    }

    .deck-card-picker-loading {
      width: 100%;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .native-picker-preloader {
      display: none;
    }

    .deck-empty-editor {
      color: var(--secondary-text-color);
      padding: 24px 0;
    }
  `
], lf = Symbol.for("orbit-deck-card-preview-selected-index"), uf = class extends k {
	static properties = {
		hass: { attribute: !1 },
		lovelace: { attribute: !1 },
		_config: { state: !0 },
		_selectedTab: { state: !0 },
		_selectedDeckIndex: { state: !0 },
		_childPickerType: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_styleSectionExpanded: { state: !0 },
		_cardSectionExpanded: { state: !0 }
	};
	constructor() {
		super(), this._config = {}, this._selectedTab = "setup", this._selectedDeckIndex = 0, this._childPickerType = "badge", this._colorPickerKey = "", this._colorPickerTab = "picker", this._styleSectionExpanded = !1, this._cardSectionExpanded = !0;
	}
	connectedCallback() {
		super.connectedCallback(), mo(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		ho(this), super.disconnectedCallback();
	}
	setConfig(e) {
		let t = Jt(e || {}), n = Ud(t.config);
		this._config = {
			...n.config,
			layout: ["tabs", "overlay"].includes(t.config?.layout) ? t.config.layout : "wrap"
		}, this._selectedDeckIndex = Math.min(this._selectedDeckIndex || 0, Math.max(0, this._getDeckItems().length - 1));
		let r = this._getDeckItems()[this._selectedDeckIndex];
		this._childPickerType = r?.badge ? "badge" : "card", this._updateDocumentationContext(), (t.migrated || n.changed) && queueMicrotask(() => this._dispatchConfigChanged());
	}
	_t(e, t) {
		return q(this.hass, e, t);
	}
	_getColorPickerValue(e) {
		return vo(e);
	}
	_getColorStyle(e) {
		return _o(e);
	}
	_updateConfig(e) {
		this._config = Hd(Ci(this._config, e)), this._dispatchConfigChanged();
	}
	_dispatchConfigChanged() {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._getPreviewConfig() },
			bubbles: !0,
			composed: !0
		}));
	}
	_getPreviewConfig() {
		return {
			...this._config,
			[lf]: this._selectedDeckIndex || 0
		};
	}
	_getDeckItems(e = this._config) {
		return Array.isArray(e?.decks) ? e.decks.map(Wd) : [];
	}
	_selectDeckItem(e) {
		let t = this._getDeckItems()[e];
		this._selectedDeckIndex = e, this._childPickerType = t?.badge ? "badge" : "card", this._dispatchPreviewSelection(e);
	}
	_dispatchPreviewSelection(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: {
				...this._getPreviewConfig(),
				[lf]: e
			} },
			bubbles: !0,
			composed: !0
		}));
	}
	_addDeckItem() {
		let e = this._getDeckItems();
		this._selectedDeckIndex = e.length, this._selectedTab = "card", this._childPickerType = "badge", this.requestUpdate();
	}
	_removeDeckItem(e) {
		let t = this._getDeckItems().filter((t, n) => n !== e);
		this._selectedDeckIndex = Math.max(0, Math.min(e, t.length - 1)), this._updateConfig({ decks: t });
	}
	_duplicateDeckItem(e) {
		let t = this._getDeckItems(), n = t[e];
		if (!n) return;
		let r = [...t];
		r.splice(e + 1, 0, structuredClone(n)), this._selectedDeckIndex = e + 1, this._updateConfig({ decks: r });
	}
	_moveDeckItem(e, t) {
		let n = this._getDeckItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedDeckIndex = r, this._updateConfig({ decks: i });
	}
	_updateDeckItem(e, t) {
		let n = [...this._getDeckItems()];
		n[e] = {
			...n[e] || {},
			...t
		}, this._updateConfig({ decks: n });
	}
	_updateDeckAttributes(e, t) {
		let n = this._getDeckItems()[e] || {};
		this._updateDeckItem(e, { attributes: {
			...n.attributes || {},
			...t
		} });
	}
	_updateDeckCard(e, t) {
		let n = this._getDeckItems();
		if (e >= n.length) {
			this._selectedDeckIndex = n.length, this._updateConfig({ decks: [...n, {
				attributes: {},
				card: t
			}] });
			return;
		}
		this._updateDeckItem(e, {
			badge: void 0,
			card: t
		});
	}
	_updateDeckBadge(e, t) {
		let n = this._getDeckItems();
		if (e >= n.length) {
			this._selectedDeckIndex = n.length, this._updateConfig({ decks: [...n, {
				attributes: {},
				badge: t
			}] });
			return;
		}
		this._updateDeckItem(e, {
			badge: t,
			card: void 0
		});
	}
	_renderInput(e, t, n = "", r = {}) {
		return bi.call(this, e, t, n, r);
	}
	_renderNumberInput(e, t, n = {}) {
		return Si.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return Oi.call(this, e, t, n, r, i);
	}
	_renderSubTabs() {
		return w`
      <div class="deck-subtabs-row">
        <div class="editor-tabs deck-subtabs">
          ${["setup", "card"].map((e) => w`
            <button
              type="button"
              class="editor-tab ${this._selectedTab === e ? "active" : ""}"
              @click=${() => {
			this._selectedTab = e, this._updateDocumentationContext();
		}}
            >
              ${e === "setup" ? this._t("Setup") : this._t("Card")}
            </button>
          `)}
        </div>

        <ha-selector
          class="editor-header-button-toggle deck-layout-toggle"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
			{
				label: this._t("Wrap"),
				value: "wrap"
			},
			{
				label: this._t("Tabs"),
				value: "tabs"
			},
			{
				label: this._t("Overlay"),
				value: "overlay"
			}
		] } }}
          .value=${this._config?.layout || "wrap"}
          @value-changed=${(e) => {
			this._updateConfig({ layout: e.detail.value || "wrap" }), this._updateDocumentationContext();
		}}
        ></ha-selector>
      </div>
    `;
	}
	_updateDocumentationContext() {
		let e = this._selectedTab === "card" ? "card" : `setup-${this._config?.layout || "wrap"}`;
		kt(this, "orbit-deck-card", e);
	}
	_renderSetup() {
		let e = this._getDeckItems();
		return w`
      <div class="section deck-card-tab-section">
        ${this._config?.layout === "wrap" ? Fl.call(this, {
			itemCount: e.length,
			classPrefix: "action",
			wrapEnabled: !0,
			showWrapToggle: !1,
			perRowKey: "items_per_row",
			perRowLabel: "Items per row",
			defaultPerRow: 1
		}) : this._config?.layout === "tabs" ? w`
              ${this._renderTabWidthModeControl()}
              ${this._renderInput("Tab font size", "tab_font_size", "18px", {
			value: this._config?.tab_font_size || "",
			onValueChanged: (e) => this._updateConfig({ tab_font_size: e || void 0 })
		})}
              <label class="deck-tab-divider-row">
                <span>${this._t("Divider")}</span>
                <ha-switch
                  .checked=${this._config?.tab_divider !== !1}
                  @change=${(e) => this._updateConfig({ tab_divider: e.target.checked ? void 0 : !1 })}
                ></ha-switch>
              </label>
              <div class="field-grid two-columns deck-tab-colors">
                ${this._renderColorControl(["Inactive", "Color"], "tab_color", this._config?.tab_color || "", (e) => this._updateConfig({ tab_color: e || void 0 }), "primary-text-color")}
                ${this._renderColorControl(["Active", "Color"], "tab_active_color", this._config?.tab_active_color || "", (e) => this._updateConfig({ tab_active_color: e || void 0 }), "primary-color")}
                ${this._renderColorControl(["Background", "Color"], "tab_background_color", this._config?.tab_background_color || "", (e) => this._updateConfig({ tab_background_color: e || void 0 }), "card-background-color")}
              </div>
              ` : ""}
      </div>
    `;
	}
	_renderTabWidthModeControl() {
		return w`
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Tab width")}</label>

          <ha-selector
            class="editor-header-button-toggle deck-tab-width-toggle"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: [
			{
				label: this._t("Equal"),
				value: "equal"
			},
			{
				label: this._t("Dynamic"),
				value: "dynamic"
			},
			{
				label: this._t("Custom"),
				value: "custom"
			}
		] } }}
            .value=${this._config?.tab_width_mode || "equal"}
            @value-changed=${(e) => this._updateConfig({ tab_width_mode: e.detail.value || "equal" })}
          ></ha-selector>
        </div>
      </div>
    `;
	}
	_renderDeckTabs(e, t) {
		let { itemsPerRow: n, shouldWrapTabs: r } = Pl({
			config: this._config,
			itemCount: e.length,
			wrapEnabled: this._config?.layout === "wrap",
			defaultPerRow: 1
		});
		return w`
      <div
        class="action-tabs ${r ? "wrapped" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${r ? `--action-tabs-per-row: ${n};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => w`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectDeckItem(n)}
            >
              ${this._config?.layout === "overlay" && n === 0 ? this._t("Main") : n + 1}
            </button>
          `)}
        </div>

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addDeckItem()}
          >
            +
          </button>

          ${e.length > 0 && t < e.length ? w`
                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Duplicate")}
                  @click=${() => this._duplicateDeckItem(t)}
                >
                  <ha-icon icon="mdi:content-copy"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeDeckItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${t === 0}
                  @click=${() => this._moveDeckItem(t, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${t === e.length - 1}
                  @click=${() => this._moveDeckItem(t, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>
    `;
	}
	_renderChildTypeTabs() {
		return nf.call(this);
	}
	_renderChildPicker(e, t) {
		return rf.call(this, e, t);
	}
	_renderBadgePicker(e, t) {
		return af.call(this, e, t);
	}
	_renderCardPicker(e, t) {
		return of.call(this, e, t);
	}
	_renderDeckStyleControls(e, t) {
		return sf.call(this, e, t);
	}
	_renderAttributeSelector(e, { label: t, selector: n, value: r, changeKey: i }) {
		return w`
      <ha-selector
        .hass=${this.hass}
        .label=${this._t(t)}
        .selector=${n}
        .value=${r}
        @value-changed=${(t) => this._updateDeckAttributes(e, { [i]: t.detail.value || void 0 })}
      ></ha-selector>
    `;
	}
	_renderOverlayNumberSelector(e, { label: t, value: n, changeKey: r, min: i = 0 }) {
		return Si.call(this, t, r, {
			value: n ?? "",
			min: i,
			onValueChanged: (t) => this._updateDeckAttributes(e, { [r]: t === "" || t === null ? void 0 : t })
		});
	}
	_renderDeckCardSection(e, t) {
		return w`
      <ha-expansion-panel
        class="deck-card-section"
        outlined
        .expanded=${this._cardSectionExpanded !== !1}
        @expanded-changed=${(e) => {
			e.target === e.currentTarget && (this._cardSectionExpanded = e.detail.expanded);
		}}
      >
        <ha-icon slot="leading-icon" icon="mdi:cards-outline"></ha-icon>
        <div slot="header" role="heading" aria-level="3">
          ${Yd(t, this.hass, this._t("Card"))}
        </div>
        <div class="deck-card-section-content">
          ${t?.badge?.type || t?.card?.type ? "" : this._renderChildTypeTabs()}
          <div class="deck-card-editor-frame">
            ${this._renderChildPicker(e, t)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
	}
	_renderDeckInteractions(e, t) {
		let n = t?.attributes || {}, r = qd(t, "tap_action"), i = qd(t, "hold_action"), a = qd(t, "double_tap_action");
		return G.call(this, {
			expanded: !1,
			config: n,
			onChange: (t) => this._updateDeckAttributes(e, t),
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: r,
					defaultVisible: $(r),
					displayDefaultValue: $(r)
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: i,
					defaultVisible: $(i),
					displayDefaultValue: $(i)
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: a,
					defaultVisible: $(a),
					displayDefaultValue: $(a)
				}
			],
			context: { entity_id: n.entity || Jd(t)?.entity }
		});
	}
	async _ensureNativeBadgePicker() {
		return Zd.call(this);
	}
	async _ensureNativeBadgeEditor() {
		return Qd.call(this);
	}
	async _loadNativeBadgeModule(e) {
		return $d.call(this, e);
	}
	_findElementInShadowRoots(e, t) {
		return ef.call(this, e, t);
	}
	async _ensureNativeCardPicker() {
		return tf.call(this);
	}
	_renderCard() {
		let e = this._getDeckItems(), t = Math.min(this._selectedDeckIndex || 0, e.length), n = e[t], r = t === e.length;
		return w`
      <div class="section">
        ${this._renderDeckTabs(e, t)}

        ${n || r ? w`
              ${n && this._config?.layout === "tabs" ? w`
                    <label class="deck-default-toggle">
                      <span>${this._t("Default")}</span>
                      <ha-switch
                        .checked=${!!n.attributes?.default}
                        @change=${(e) => this._setDefaultDeck(t, e.target.checked)}
                      ></ha-switch>
                    </label>
                  ` : ""}

              ${n ? this._renderDeckStyleControls(t, n) : ""}

              ${n ? w`
                    <div class="deck-interactions-section">
                      ${this._renderDeckInteractions(t, n)}
                    </div>
                  ` : ""}

              ${this._renderDeckCardSection(t, n)}
            ` : w`<div class="deck-empty-editor">${this._t("Add a card to start.")}</div>`}
      </div>
    `;
	}
	_setDefaultDeck(e, t) {
		let n = this._getDeckItems().map((n, r) => ({
			...n,
			attributes: {
				...n.attributes || {},
				default: t && r === e ? !0 : void 0
			}
		}));
		this._updateConfig({ decks: n });
	}
	render() {
		return w`
      <div class="wrapper">
        ${this._renderSubTabs()}
        ${this._selectedTab === "setup" ? this._renderSetup() : this._renderCard()}

        <div class="editor-version">
          ${this._t("Orbit Deck Card v{version}", { version: t.deck })}
        </div>
      </div>
    `;
	}
	static styles = cf;
};
customElements.define("orbit-deck-card-editor", uf);
//#endregion
//#region src/cards/deck-card.js
var df = [
	"pointerdown",
	"click",
	"dblclick",
	"pointerup",
	"pointerleave",
	"pointercancel"
];
jt({
	tag: "orbit-deck-card",
	cardClass: class extends k {
		static get properties() {
			return {
				hass: {},
				preview: { type: Boolean },
				_config: { type: Object },
				_deckCards: { state: !0 },
				_selectedIndex: { state: !0 }
			};
		}
		constructor() {
			super(), this._config = {}, this.preview = !1, this._deckCards = [], this._selectedIndex = 0, this._cardHelpers = null, this._cardBuildKey = "", this._defaultSelectionKey = "", this._paddingApplyKey = "", this._overlayGeometryFrame = null, this._overlayGeometryObserver = null, this._overlayObservedTargets = /* @__PURE__ */ new Set(), this._overlayGeometryToken = 0, this._deckEntryGeneration = 0, this._deckInteractionListener = (e) => this._handleDeckInteractionEvent(e);
		}
		connectedCallback() {
			super.connectedCallback(), this._bindDeckItemActionListeners(), this._paddingApplyKey = "", this.requestUpdate();
		}
		disconnectedCallback() {
			this._cancelLongPress(), this._clearDoubleTapTimer(), this._clearOverlayGeometryObserver(), this._disconnectDeckEntryObservers(), this._unbindDeckItemActionListeners(), super.disconnectedCallback();
		}
		static getConfigElement() {
			return document.createElement("orbit-deck-card-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-deck-card",
				layout: "wrap",
				decks: []
			};
		}
		getLayoutOptions() {
			let e = id(this._config), t = Math.max(e.length, 1), n = this._getColumnCount(t);
			return {
				grid_columns: Math.max(1, n * 2),
				grid_min_columns: 1,
				grid_rows: "auto"
			};
		}
		setConfig(e) {
			let t = Jt(e || {}), n = ["tabs", "overlay"].includes(t.config?.layout) ? t.config.layout : "wrap";
			this._config = {
				...t.config,
				layout: n
			};
			let r = id(this._config), i = pd(r), a = fd(r);
			Number.isInteger(e?.[lf]) ? this._selectedIndex = Math.min(Math.max(0, e[lf]), Math.max(0, r.length - 1)) : i === this._defaultSelectionKey ? this._selectedIndex = Math.min(this._selectedIndex || 0, Math.max(0, r.length - 1)) : (this._selectedIndex = a, this._defaultSelectionKey = i), this._scheduleCardBuild();
		}
		updated(e) {
			(e.has("hass") || e.has("preview")) && this._deckCards.forEach((t) => {
				t.element && (e.has("hass") && (t.element.hass = this.hass), e.has("preview") && (t.element.preview = this.preview, t.element.editMode = this.preview));
			}), (e.has("_deckCards") || e.has("_config")) && this._applyDeckPaddingToEntries(), this._config?.layout === "overlay" ? (e.has("_deckCards") || e.has("_config")) && this._scheduleOverlayGeometrySync() : this._clearOverlayGeometryObserver();
		}
		_scheduleOverlayGeometrySync() {
			this._overlayGeometryFrame !== null && cancelAnimationFrame(this._overlayGeometryFrame);
			let e = ++this._overlayGeometryToken;
			this._overlayGeometryFrame = requestAnimationFrame(() => {
				this._overlayGeometryFrame = null, this._syncOverlayGeometry(e);
			});
		}
		async _syncOverlayGeometry(e) {
			if (this._config?.layout !== "overlay") return;
			let t = this.renderRoot.querySelector(".deck-overlay"), n = [...this.renderRoot.querySelectorAll(".deck-overlay-item")];
			if (!t || !n.length || (await Promise.all(this._deckCards.slice(1).map((e) => e?.element?.updateComplete instanceof Promise ? e.element.updateComplete.catch(() => {}) : Promise.resolve())), e !== this._overlayGeometryToken)) return;
			let r = t.clientWidth;
			n.forEach((e) => {
				let t = e.querySelector(".deck-overlay-content");
				if (!t) return;
				let n = e.classList.contains("overlay-badge");
				t.style.width = n ? "max-content" : `${r}px`, t.style.height = "auto";
			}), n.forEach((e) => this._applyOverlayItemGeometry(e)), this._observeOverlayGeometry(t, n);
		}
		_applyOverlayItemGeometry(e) {
			let t = Number(e.dataset.deckIndex), n = Number.isInteger(t) ? this._deckCards[t] : null, r = e.querySelector(".deck-overlay-content");
			if (!n || !r) return;
			let i = r.offsetWidth, a = r.offsetHeight;
			if (i <= 0 || a <= 0) return;
			let o = n.item?.attributes || {}, s = cd(n.item) === "badge", c = gd(o.width), l = gd(o.height), u = _d(n.item) === "crop", d = vd(i, a, c, l, u);
			e.style.width = `${d.width}px`, e.style.height = `${d.height}px`, e.style.overflow = u ? "hidden" : "visible", r.style.width = s ? "max-content" : `${i}px`, r.style.height = "auto", r.style.transform = u ? "none" : `scale(${d.scaleX}, ${d.scaleY})`, e.dataset.naturalWidth = String(i), e.dataset.naturalHeight = String(a);
		}
		_observeOverlayGeometry(e, t) {
			if (!window.ResizeObserver) return;
			this._overlayGeometryObserver ||= new ResizeObserver(() => {
				this._scheduleOverlayGeometrySync();
			});
			let n = new Set([e]);
			t.forEach((e) => {
				let t = e.querySelector(".deck-overlay-content");
				t && n.add(t);
			}), this._overlayObservedTargets.forEach((e) => {
				n.has(e) || this._overlayGeometryObserver.unobserve(e);
			}), n.forEach((e) => {
				this._overlayObservedTargets.has(e) || this._overlayGeometryObserver.observe(e);
			}), this._overlayObservedTargets = n;
		}
		_clearOverlayGeometryObserver() {
			this._overlayGeometryToken += 1, this._overlayGeometryFrame !== null && (cancelAnimationFrame(this._overlayGeometryFrame), this._overlayGeometryFrame = null), this._overlayGeometryObserver?.disconnect(), this._overlayObservedTargets.clear();
		}
		_getColumnCount(e) {
			return ["tabs", "overlay"].includes(this._config?.layout) ? 1 : Math.max(1, Math.min(e, Number(this._config?.items_per_row) || 1));
		}
		async _scheduleCardBuild() {
			let e = id(this._config), t = JSON.stringify(e.map((e, t) => ({
				kind: cd(e),
				config: sd(e, Ed(this._config, e, t))
			})));
			if (t === this._cardBuildKey) {
				this._deckCards = this._deckCards.map((t, n) => ({
					...t,
					item: e[n],
					index: n
				}));
				return;
			}
			this._cardBuildKey = t, this._disconnectDeckEntryObservers(), this._deckCards = e.map((e, t) => ({
				item: e,
				index: t
			}));
			let n = await this._loadCardHelpers(), r = e.map((e, t) => this._createDeckEntry(e, n, t, Ed(this._config, e, t)));
			t === this._cardBuildKey && (this._deckCards = r);
		}
		async _loadCardHelpers() {
			return !this._cardHelpers && window.loadCardHelpers && (this._cardHelpers = await window.loadCardHelpers()), this._cardHelpers;
		}
		_createDeckEntry(e, t, n, r = !1) {
			let i = cd(e), a = sd(e, r);
			if (!a.type) return {
				item: e,
				index: n,
				error: `No ${i} type configured`
			};
			try {
				let r = this._config?.layout !== "overlay" && Array.isArray(a.visibility) && a.visibility.length > 0, o = r ? this._createVisibilityAwareElement(i, a) : i === "badge" ? t.createBadgeElement(a) : t.createCardElement(a);
				o.hass = this.hass, o.preview = this.preview, o.editMode = this.preview, o.addEventListener("ll-rebuild", () => this._scheduleCardBuild(), { once: !0 });
				let s = {
					item: e,
					index: n,
					kind: i,
					element: o,
					visible: !o.hidden
				};
				if (r) {
					let e = i === "badge" ? "badge-visibility-changed" : "card-visibility-changed";
					o.addEventListener(e, (e) => {
						e.stopPropagation();
						let t = e.detail?.value !== !1 && !o.hidden, n = this._deckCards.find((e) => e.element === o) || s;
						n.visible !== t && (n.visible = t, this.requestUpdate(), this.updateComplete.then(() => {
							t && this._applyDeckCardPadding(n);
						}));
					}), o.load();
				}
				return s;
			} catch (t) {
				return {
					item: e,
					index: n,
					error: t?.message || "Unable to create card"
				};
			}
		}
		_createVisibilityAwareElement(e, t) {
			let n = document.createElement(e === "badge" ? "hui-badge" : "hui-card");
			return n.hass = this.hass, n.preview = this.preview, n.editMode = this.preview, n.config = t, n;
		}
		_disconnectDeckEntryObservers(e = this._deckCards) {
			this._deckEntryGeneration += 1, e.forEach((e) => {
				let t = e?.element;
				t && new Set([t, ...Md(t)]).forEach((e) => {
					disconnectDeckCardSurfaceObserver(e), Rd(e);
				});
			});
		}
		_isDeckEntryActive(e, t) {
			return this.isConnected && t === this._deckEntryGeneration && this._deckCards.includes(e);
		}
		_selectTab(e) {
			this._selectedIndex = e;
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handleAction(e, t = null) {
			return He.call(this, e, t);
		}
		_navigate(e) {
			return Ke.call(this, e);
		}
		_clearDoubleTapTimer() {
			return Ue.call(this);
		}
		_startLongPress(e, t, n) {
			return An.call(this, e, t, n);
		}
		_cancelLongPress() {
			return jn.call(this);
		}
		_finishLongPress(e) {
			return Mn.call(this, e);
		}
		_getDeckEntryFromEventTarget(e) {
			let t = Number(e?.dataset?.deckIndex);
			return Number.isInteger(t) && this._deckCards[t] || null;
		}
		_bindDeckItemActionListeners() {
			df.forEach((e) => {
				this.renderRoot.addEventListener(e, this._deckInteractionListener, !0);
			});
		}
		_unbindDeckItemActionListeners() {
			df.forEach((e) => {
				this.renderRoot.removeEventListener(e, this._deckInteractionListener, !0);
			});
		}
		_handleDeckInteractionEvent(e) {
			let t = e.composedPath().find((e) => e?.classList?.contains("deck-item-interaction") && e.getRootNode() === this.renderRoot);
			if (!t) return;
			let n = this._getDeckEntryFromEventTarget(t);
			e.type === "pointerdown" ? this._handleDeckItemPointerDown(e, n) : e.type === "click" ? this._handleDeckItemClick(e, n) : e.type === "dblclick" ? this._handleDeckItemDoubleClick(e, n) : e.type === "pointerup" ? this._finishLongPress(e) : (e.type === "pointercancel" || e.type === "pointerleave" && e.target === t) && this._cancelLongPress();
		}
		_handleDeckItemPointerDown(e, t) {
			if (!ad(t?.item)) return;
			e.stopPropagation();
			let n = Q(t?.item, "hold_action");
			if (A(n)) return this._startLongPress(e, od(t.item), n);
		}
		_handleDeckItemClick(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = Q(t?.item, "tap_action"), r = Q(t?.item, "double_tap_action");
			!A(n) && !A(r) || M.call(this, e, od(t.item), n || { action: "none" }, r);
		}
		_handleDeckItemDoubleClick(e, t) {
			let n = Q(t?.item, "double_tap_action");
			A(n) && N.call(this, e, od(t.item), n);
		}
		_renderInteractiveDeckEntry(e) {
			let t = ad(e?.item), n = Ed(this._config, e?.item, e?.index);
			return w`
      <div
        class="deck-item-interaction ${t ? "has-actions" : ""} ${n ? "transparent-background" : ""}"
        data-deck-index=${e?.index ?? ""}
      >
        ${this._renderDeckEntry(e)}
      </div>
    `;
		}
		_renderDeckEntry(e) {
			return e?.element ? e.element : w`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">${this._t("Configuration error")}</div>
        <div>${e?.error || "No card configured"}</div>
      </ha-card>
    `;
		}
		_applyDeckPaddingToEntries() {
			let e = this._deckCards.map((e) => Ed(this._config, e.item, e.index) ? "flat" : "native").join(":"), t = `${wd(this._deckCards)}|surface:${e}`;
			t !== this._paddingApplyKey && (this._paddingApplyKey = t, this._deckCards.forEach((e) => this._applyDeckCardPadding(e)));
		}
		_applyDeckCardPadding(e, t = 0) {
			let n = e?.element;
			if (!n) return;
			let r = this._deckEntryGeneration, i = Zu(e.item), a = ed(e.item);
			(n.updateComplete instanceof Promise ? n.updateComplete : Promise.resolve()).then(() => new Promise((e) => requestAnimationFrame(e))).then(() => {
				if (!this._isDeckEntryActive(e, r)) return;
				let o = Md(n), s = o[0] || null, c = Td(this.renderRoot, e.index), l = Ed(this._config, e.item, e.index);
				if (!(!s && !c)) {
					if ((a || l) && !s && t < 10 && window.setTimeout(() => this._applyDeckCardPadding(e, t + 1), 50), Od(n, l), o.forEach((e) => Od(e, l)), !a && !s?._orbitDeckPaddingApplied && !c?._orbitDeckPaddingApplied) {
						s && Rd(s);
						return;
					}
					c && Pd(c, i, !1), s && Pd(s, i, a), a && s ? (Ld(s, i), requestAnimationFrame(() => {
						this._isDeckEntryActive(e, r) && (c && Pd(c, i, !1), Pd(s, i, !0));
					})) : s && Rd(s);
				}
			}).catch(() => {});
		}
		_renderWrap(e) {
			let t = this._getVisibleDeckEntries(), n = this._deckCards.filter((e) => e.visible === !1), r = this._getColumnCount(t.length || 1), i = Sd(t, r);
			return w`
      <ha-card
        class="deck-card wrap ${e.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
        style="--deck-columns:${r};"
      >
        <div class="deck-wrap">
          ${i.map((e) => w`
            <div class="deck-row">
              ${e.map((e) => w`
                <div class="deck-item">
                  ${this._renderInteractiveDeckEntry(e)}
                </div>
              `)}
              ${Cd(e.length, r)}
            </div>
          `)}
        </div>
        ${this._renderVisibilityObservers(n)}
      </ha-card>
    `;
		}
		_renderTabs(e) {
			let t = Math.min(this._selectedIndex || 0, Math.max(0, e.length - 1)), n = this._getVisibleDeckEntries(), r = n.find((e) => e.index === t) || n[0], i = r?.index ?? t, a = this._deckCards.filter((e) => e !== r), o = yd(this._config), s = bd(this._config);
			return w`
      <ha-card
        class="deck-card tabs tab-width-${o} ${this._config?.tab_divider === !1 ? "hide-tab-dividers" : ""}"
        style=${s}
      >
        <div class="deck-tabs" role="tablist">
          ${n.map((e) => w`
            <button
              type="button"
              class="deck-tab ${e.index === i ? "active" : ""}"
              role="tab"
              aria-selected=${e.index === i ? "true" : "false"}
              style=${o === "custom" ? `--orbit-deck-tab-width:${e.item.attributes?.width || "120px"};` : ""}
              @click=${() => this._selectTab(e.index)}
            >
              ${e.item.attributes?.icon ? w`<ha-icon .icon=${e.item.attributes.icon}></ha-icon>` : ""}
              <span>${e.item.attributes?.name || e.item.attributes?.label || `Card ${e.index + 1}`}</span>
            </button>
          `)}
        </div>
        <div class="deck-tab-content">
          ${r ? this._renderInteractiveDeckEntry(r) : ""}
        </div>
        ${this._renderVisibilityObservers(a)}
      </ha-card>
    `;
		}
		_getVisibleDeckEntries() {
			return this._deckCards.filter((e) => e.visible !== !1);
		}
		_renderVisibilityObservers(e) {
			return e.length ? w`
      <div class="deck-visibility-observers" aria-hidden="true">
        ${e.map((e) => this._renderDeckEntry(e))}
      </div>
    ` : "";
		}
		_renderOverlay() {
			let e = this._deckCards[0], t = this._deckCards.slice(1);
			return w`
      <ha-card class="deck-card overlay">
        <div class="deck-overlay">
          <div class="deck-overlay-main deck-item">
            ${this._renderInteractiveDeckEntry(e)}
          </div>

          ${t.map((e, t) => w`
            <div
              class="deck-overlay-item deck-item ${_d(e.item)} ${e.item?.attributes?.transparent_background === !0 ? "transparent-background" : ""} overlay-${e.kind || cd(e.item)}"
              data-deck-index=${e.index}
              style=${md(e.item, t)}
            >
              <div class="deck-overlay-content">
                ${this._renderInteractiveDeckEntry(e)}
              </div>
            </div>
          `)}
        </div>
      </ha-card>
    `;
		}
		render() {
			let e = id(this._config);
			return e.length ? this._config?.layout === "tabs" ? this._renderTabs(e) : this._config?.layout === "overlay" ? this._renderOverlay() : this._renderWrap(e) : w`
        <ha-card class="deck-card empty">
          <div>${this._t("Add card")}</div>
        </ha-card>
      `;
		}
		static styles = zd;
	},
	name: "Orbit Deck Card",
	description: "Wrap or tab any Lovelace cards",
	version: t.deck
});
//#endregion
//#region src/common/helpers/badge-registration.js
function ff({ tag: e, badgeClass: t, name: n, description: r, version: a, documentationURL: o }) {
	customElements.get(e) || customElements.define(e, t), window.customBadges = window.customBadges || [];
	for (let t = window.customBadges.length - 1; t >= 0; --t) window.customBadges[t].type === e && window.customBadges.splice(t, 1);
	window.customBadges.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		documentationURL: o || Ot(e)
	}), i(n, a);
}
//#endregion
//#region src/badges/helpers/model.js
function pf() {
	let e = Y(this._config), t = this._getEntities(), n = Cc(t), r = e === "template" ? P.call(this, this._config?.state_template, "") ?? "unavailable" : "", i = this._config?.active_template?.trim() || "", a = e === "template" && i ? P.call(this, i, "") : null, o = this._config?.inactive_template?.trim() || "", s = e === "template" && o ? P.call(this, o, "") : null, c = !!o && zt(s), l = e === "template" ? zt(a ?? r) : n.length > 0, u = this._config?.display_style === "badge" && !this._config?.card_visibility ? !0 : l, d = t[0], f = cc(this._config), p = f[0] || "", m = d?.entity_id.split(".")[0] || this._config?.domain || "", ee = tc(m), te = this._config?.icon_source || (this._config?.icon ? "custom" : "domain"), ne = this._config?.icon || "", re = u ? this._config?.icon_on || ne : this._config?.icon_off || ne, ie = te === "custom" && re || ee.icon, h = u ? this._config?.accent_on_color ?? this._config?.color : this._config?.accent_off_color, g = !!(h && ![
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(h)), ae = !h || [
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(h) ? "theme" : h, oe = e === "template" && this._config?.name_template?.trim() || "", _ = oe ? P.call(this, oe, "") : null, v = String(_ ?? "").trim(), y = e === "template" && !d ? {
		entity_id: "sensor.orbit_status_badge_template",
		state: r || "unavailable",
		attributes: { friendly_name: v || "Template" }
	} : n[0] || t[0] || {
		entity_id: `${m || "sensor"}.orbit_status_badge`,
		state: u ? "on" : "off",
		attributes: p ? { device_class: p } : {}
	}, se = ["entity", "template"].includes(e) ? y : {
		entity_id: `${m}.orbit_status_badge`,
		state: y.state,
		attributes: p ? { device_class: p } : {}
	}, b = mc(this.hass, this._config), ce = this._config?.name, le = f.map((e) => sc(e)).join(", "), ue = (d && this.hass?.formatEntityName ? this.hass.formatEntityName(d) : "") || (e === "template" ? "Template" : b || le || ee.label), de = ce && this.hass?.formatEntityName && this.hass.formatEntityName(y, mf(ce, v)) || ue, fe = te === "custom" ? u && this._config?.icon_on ? "icon_on" : !u && this._config?.icon_off ? "icon_off" : this._config?.icon ? "icon" : "" : "";
	return {
		entities: t,
		activeEntities: n,
		isOn: u,
		inactiveTemplateActive: c,
		count: n.length,
		displayValue: e === "template" ? r : e === "entity" ? y.state : n.length,
		label: de,
		icon: ie,
		iconKey: fe,
		iconSource: te,
		stateSource: e,
		representativeStateObj: y,
		iconStateObj: se,
		displayStateObj: ["entity", "template"].includes(e) ? y : {
			entity_id: "sensor.orbit_status_badge_count",
			state: u ? "on" : "off",
			attributes: {
				count: n.length,
				friendly_name: de
			},
			last_changed: y.last_changed,
			last_updated: y.last_updated,
			context: y.context
		},
		defaultStateContent: e === "area_count" ? "count" : "state",
		hasIconColorOverride: g,
		iconColor: ae === "theme" ? gc(y, u) : it(ae)
	};
}
function mf(e, t) {
	let n = (e) => e?.type === "template" ? {
		type: "text",
		text: t
	} : e;
	return Array.isArray(e) ? e.map(n) : n(e);
}
//#endregion
//#region src/badges/styles/status-badge-styles.js
var hf = d`
  .card-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    width: 16px;
    height: 16px;
    border-radius: var(--ha-border-radius-md);
    background-color: var(--tile-badge-background-color);
    transition: background-color 280ms ease-in-out;
    box-sizing: border-box;
    user-select: none;
  }

  .card-badge[role="button"] {
    cursor: pointer;
  }

  .card-badge:focus-visible {
    outline: 2px solid var(--tile-badge-background-color);
    outline-offset: 2px;
  }

  .card-badge > * {
    color: var(--tile-badge-icon-color);
  }

  .card-badge .image-icon {
    width: 12px;
    height: 12px;
    color: var(--tile-badge-icon-color);
  }

  .image-icon {
    width: var(--ha-badge-icon-size, 18px);
    height: var(--ha-badge-icon-size, 18px);
    display: block;
    line-height: 0;
    color: var(--icon-color, var(--badge-color));
  }

  :host([heading-badge]) .image-icon {
    width: 18px;
    height: 18px;
  }

  :host([heading-badge]) .entity-picture {
    width: 18px;
    height: 18px;
    border-radius: var(--ha-border-radius-circle);
    object-fit: cover;
  }

  :host([heading-badge]) ha-state-icon {
    --mdc-icon-size: 18px;
  }

  .image-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .template-state {
    white-space: pre-line;
  }

`, gf = "sensor.orbit_status_badge_preview", _f = class extends k {
	static svgCache = I;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 },
		_contentExpanded: { state: !0 },
		_stateTypeExpanded: { state: !0 },
		_interactionsExpanded: { state: !0 },
		_templateRevision: { state: !0 }
	};
	constructor() {
		super(), this._config = {}, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._contentExpanded = !1, this._stateTypeExpanded = !1, this._interactionsExpanded = !1, this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts = 0;
	}
	connectedCallback() {
		super.connectedCallback(), mo(this), kt(this, "orbit-status-badge"), queueMicrotask(() => this._syncTemplateSubscriptions());
	}
	disconnectedCallback() {
		this._namePickerEnhanceFrame !== void 0 && (cancelAnimationFrame(this._namePickerEnhanceFrame), this._namePickerEnhanceFrame = void 0), Lt.call(this), ho(this), super.disconnectedCallback();
	}
	updated(e) {
		(e.has("hass") || e.has("_config")) && (this._syncTemplateSubscriptions(), this._namePickerEnhanceAttempts = 0), this._scheduleNamePickerEnhancement();
	}
	_scheduleNamePickerEnhancement() {
		Y(this._config) !== "template" || this._namePickerEnhanceFrame !== void 0 || (this._namePickerEnhanceFrame = requestAnimationFrame(() => {
			this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts += 1, this._enhanceNamePicker();
		}));
	}
	_syncTemplateSubscriptions() {
		let e = Y(this._config), t = [
			this._config?.state_template,
			this._config?.active_template,
			this._config?.inactive_template,
			this._config?.name_template
		], n = this._config?.display_style === "badge", r = (e === "template" ? n ? [this._config?.active_template, this._config?.inactive_template] : t : []).filter(Boolean).map((e) => ({
			template: e,
			entityId: ""
		}));
		It.call(this, r);
	}
	_enhanceNamePicker() {
		let e = this.shadowRoot?.querySelector(".status-badge-name-selector"), t = yf(e, "ha-entity-name-picker");
		if (!t) {
			this._namePickerEnhanceAttempts < 10 && this._scheduleNamePickerEnhancement();
			return;
		}
		if (this._namePickerEnhanceAttempts = 0, t.__orbitTemplateNameEnhanced) return;
		let n = t._getFilteredItems, r = t._validTypes, i = t._formatItem, a = t._pickerValueChanged;
		typeof n != "function" || typeof r != "function" || typeof i != "function" || typeof a != "function" || (t.__orbitTemplateNameEnhanced = !0, t._validTypes = (e) => new Set([...r.call(t, e), "template"]), t._formatItem = (e) => e?.type === "template" ? this._t("Template") : i.call(t, e), t._getFilteredItems = () => {
			let e = n.call(t), r = vf(t.value), i = t._editIndex != null && r[t._editIndex]?.type === "template";
			if (!r.some((e) => e?.type === "template") || i) {
				let t = String(P.call(this, this._config?.name_template, "") ?? "").trim(), n = this._t("Template"), r = t || this._t("Not configured");
				e.push({
					id: "___template___",
					primary: n,
					secondary: r,
					search_labels: {
						id: "___template___",
						primary: n,
						secondary: r
					},
					sorting_label: n
				});
			}
			return e;
		}, t._pickerValueChanged = (e) => {
			if (e.detail?.value !== "___template___") {
				a.call(t, e);
				return;
			}
			if (e.stopPropagation(), t.disabled) return;
			let n = vf(t.value), r = { type: "template" };
			t._editIndex == null ? n.push(r) : (n[t._editIndex] = r, t._editIndex = void 0), t._setValue(n), t._picker && (t._picker.value = void 0);
		}, t.requestUpdate());
	}
	setConfig(e) {
		this._config = oc(e || {});
	}
	_t(e, t) {
		return q(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = oc(Ci(this._config, e)), this._dispatchConfigChanged(this._config);
	}
	_dispatchConfigChanged(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleConfigUpdate(e, t) {
		let n = ["accent_on_color", "accent_off_color"].includes(e) && (!t || t === "theme");
		this._updateConfig({ [e]: n || t === "" ? void 0 : t });
	}
	_renderColor(e, t, n) {
		return Di.call(this, e, t, n);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return Gr.call(this, e, t, n);
	}
	_getColorStyle(e) {
		return _o(e);
	}
	_getColorPickerValue(e) {
		return vo(e);
	}
	_loadLocalIconFiles(e = "") {
		return qr.call(this, e);
	}
	_isImageIcon(e) {
		return Ur(e);
	}
	_resolveIconPath(e) {
		return Wr(e);
	}
	_getInlineSvg(e) {
		return F.call(this, e, { forceColor: !0 });
	}
	_getDeviceClassOptions() {
		return uc(this.hass, this._config);
	}
	_getStateContentHass() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), t = mc(this.hass, this._config), n = this._config?.name_template?.trim() || "", r = {
			entity_id: gf,
			state: "on",
			attributes: {
				count: 2,
				friendly_name: (Y(this._config) === "template" ? String(P.call(this, n, "") ?? "").trim() : "") || t || "Orbit status"
			},
			last_changed: e,
			last_updated: e,
			context: {
				id: "",
				parent_id: null,
				user_id: null
			}
		};
		return {
			...this.hass,
			entities: {
				...this.hass?.entities || {},
				[gf]: {
					entity_id: gf,
					platform: "orbit",
					area_id: pc(this._config)[0] || null,
					device_id: null
				}
			},
			states: {
				...this.hass?.states || {},
				[gf]: r
			}
		};
	}
	render() {
		let e = this._config?.display_style === "badge", n = this._getDeviceClassOptions(), r = Xs.find((e) => e.value === this._config?.domain), i = [
			...this._config?.show_name === !0 ? ["name"] : [],
			...this._config?.show_state === !1 ? [] : ["state"],
			...this._config?.show_icon === !1 ? [] : ["icon"]
		], a = Y(this._config), o = this._config?.entity || "", s = a === "entity" && o ? this.hass : this._getStateContentHass(), c = a === "entity" && o ? o : gf;
		return w`
      <div class="wrapper">
        <div class="section">
          <div class="field editor-button-toggle-field mode-field">
            <div class="field-header">
              <label>${this._t("Mode")}</label>
              <ha-selector
                class="editor-header-button-toggle"
                .hass=${this.hass}
                .selector=${{ button_toggle: { options: [{
			label: this._t("Header"),
			value: "header"
		}, {
			label: this._t("Badge"),
			value: "badge"
		}] } }}
                .value=${e ? "badge" : "header"}
                @value-changed=${(e) => this._handleConfigUpdate("display_style", e.detail.value === "badge" ? "badge" : void 0)}
              ></ha-selector>
            </div>
          </div>

          <ha-expansion-panel
            class="state-type-panel"
            outlined
            .expanded=${this._stateTypeExpanded}
            @expanded-changed=${(e) => {
			this._stateTypeExpanded = e.detail.expanded;
		}}
          >
            <ha-icon
              slot="leading-icon"
              icon="mdi:format-list-bulleted-type"
            ></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("State type")}
            </div>
            <div class="content-panel-body">
              ${Rl.call(this, {
			stateSource: a,
			domainConfig: r,
			deviceClassOptions: n,
			badgeMode: e,
			areaMultiple: !0
		})}
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel
            class="content-panel"
            outlined
            .expanded=${this._contentExpanded}
            @expanded-changed=${(e) => {
			this._contentExpanded = e.detail.expanded;
		}}
          >
            <ha-icon slot="leading-icon" icon="mdi:text-short"></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("Content")}
            </div>
            <div class="content-panel-body">
              ${e ? this._renderColor(["Background", "Color"], "card_color", "primary-color") : w`
                    <div class="field">
                      <ha-selector
                        class=${a === "template" ? "status-badge-name-selector" : ""}
                        .hass=${s}
                        .label=${this.hass?.localize("ui.panel.lovelace.editor.card.generic.name") || this._t("Name")}
                        .helper=${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.name_helper") || this._t("Visible if selected in state content")}
                        .selector=${{ entity_name: { entity_id: c } }}
                        .value=${this._config?.name}
                        @value-changed=${(e) => this._handleConfigUpdate("name", e.detail.value)}
                      ></ha-selector>
                    </div>
                  `}

              <div class="color-pair">
                ${this._renderColor(["Active", "Color"], "accent_on_color", e ? "white" : "theme")}
                ${this._renderColor(["Inactive", "Color"], "accent_off_color", e ? "white" : "theme")}
              </div>

              ${Ll.call(this, a)}

              ${e ? "" : w`
                    <div class="field">
                      <label>${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements") || this._t("Displayed elements")}</label>
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ select: {
			mode: "list",
			multiple: !0,
			options: [
				{
					value: "name",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.name") || this._t("Name")
				},
				{
					value: "state",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.state") || this._t("State")
				},
				{
					value: "icon",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.icon") || this._t("Icon")
				}
			]
		} }}
                        .value=${i}
                        @value-changed=${(e) => {
			let t = e.detail.value || [];
			this._updateConfig({
				show_name: t.includes("name") ? !0 : void 0,
				show_state: t.includes("state") ? void 0 : !1,
				show_icon: t.includes("icon") ? void 0 : !1
			});
		}}
                      ></ha-selector>
                    </div>
                    ${a === "template" ? "" : w`
                          <div class="field">
                            <ha-selector
                              .hass=${s}
                              .label=${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.state_content") || this._t("State content")}
                              .selector=${{ ui_state_content: {
			entity_id: c,
			allow_name: !0
		} }}
                              .value=${this._config?.state_content || (a === "entity" ? "state" : "count")}
                              @value-changed=${(e) => this._handleConfigUpdate("state_content", (() => {
			let t = e.detail.value;
			return !t || t === (a === "entity" ? "state" : "count") ? void 0 : t;
		})())}
                            ></ha-selector>
                          </div>
                        `}
                  `}
            </div>
          </ha-expansion-panel>

          ${Il.call(this, a)}
        </div>

        <div class="editor-version">
          ${this._t("Orbit Status Badge v{version}", { version: t.statusBadge })}
        </div>
      </div>
    `;
	}
	static styles = [...vs, d`
      .content-panel,
      .state-type-panel,
      .badge-interactions-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .content-panel > [slot="header"],
      .state-type-panel > [slot="header"],
      .badge-interactions-panel > [slot="header"] {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content-panel ha-icon,
      .state-type-panel ha-icon,
      .badge-interactions-panel > ha-icon {
        color: var(--secondary-text-color);
      }

      .content-panel-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
      }

      .native-picker-label {
        display: block;
      }

      .badge-interactions-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 12px;
      }
    `];
};
customElements.define("orbit-status-badge-editor", _f);
function vf(e) {
	return e ? typeof e == "string" ? [{
		type: "text",
		text: e
	}] : Array.isArray(e) ? [...e] : [e] : [];
}
function yf(e, t) {
	if (!e) return;
	if (e.matches?.(t)) return e;
	let n = e.shadowRoot?.querySelector(t);
	if (n) return n;
	for (let n of e.shadowRoot?.querySelectorAll("*") || []) {
		let e = yf(n, t);
		if (e) return e;
	}
}
//#endregion
//#region src/index.js
ff({
	tag: "orbit-status-badge",
	badgeClass: class extends k {
		static svgCache = I;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_isHeadingBadge: { state: !0 },
			_templateRevision: { state: !0 },
			...xc
		};
		constructor() {
			super(), Sc.call(this);
		}
		static getConfigElement() {
			return document.createElement("orbit-status-badge-editor");
		}
		static getStubConfig() {
			return {};
		}
		setConfig(e) {
			nc(e || {}), this._config = oc(e || {});
		}
		_t(e, t) {
			return q(this.hass, e, t);
		}
		connectedCallback() {
			super.connectedCallback(), this._isHeadingBadge = !!this.closest("hui-heading-badge"), this.toggleAttribute("heading-badge", this._isHeadingBadge), queueMicrotask(() => this._syncTemplateSubscriptions());
		}
		disconnectedCallback() {
			Lt.call(this), Ec.call(this), this._clearDoubleTapTimer(), this._cancelLongPress(), super.disconnectedCallback();
		}
		updated(e) {
			(e.has("hass") || e.has("_config")) && this._syncTemplateSubscriptions();
		}
		shouldUpdate(e) {
			if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass")) return !0;
			let t = e.get("hass"), n = this.hass;
			if (!t || !n || t.entities !== n.entities || t.devices !== n.devices || t.areas !== n.areas) return !0;
			let r = Y(this._config);
			return r === "template" ? !0 : (r === "area_count" ? hc(this.hass, this._config) : [this._config?.entity].filter(Boolean)).some((e) => t.states?.[e] !== n.states?.[e]);
		}
		_syncTemplateSubscriptions() {
			let e = Y(this._config), t = this._config?.state_template?.trim() || "", n = this._config?.active_template?.trim() || "", r = this._config?.inactive_template?.trim() || "", i = this._config?.name_template?.trim() || "", a = this._config?.display_style === "badge", o = (e === "template" ? a ? [n, r] : [
				t,
				n,
				r,
				i
			] : []).filter(Boolean).map((e) => ({
				template: e,
				entityId: ""
			}));
			It.call(this, o);
		}
		_getEntities() {
			return fc(this.hass, this._config);
		}
		_getModel() {
			return pf.call(this);
		}
		_handleAction(e, t = null) {
			if (e?.action === "Current state") {
				wc.call(this);
				return;
			}
			return He.call(this, e, t);
		}
		_navigate(e) {
			return Ke(e);
		}
		_clearDoubleTapTimer() {
			return Ue.call(this);
		}
		_cancelLongPress() {
			return jn.call(this);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handlePointerDown(e, t) {
			if (A(this._config?.hold_action)) return An.call(this, e, t, this._config?.hold_action);
		}
		_handlePointerEnd(e) {
			return Mn.call(this, e);
		}
		_handleTap(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = $s(this._config);
			return M.call(this, e, t, this._config?.tap_action || n, this._config?.double_tap_action);
		}
		_handleDoubleTap(e, t) {
			return N.call(this, e, t, this._config?.double_tap_action);
		}
		_renderIcon(e) {
			let t = this._config?.display_style === "badge", n = t ? "width:12px;height:12px;margin:0;" : "", r = t ? "width:16px;height:16px;margin:0;border-radius:var(--ha-border-radius-md);" : "", i = e.stateSource === "entity" && this._config?.show_entity_picture ? e.representativeStateObj.attributes?.entity_picture_local || e.representativeStateObj.attributes?.entity_picture : "";
			if (i) return w`
        <img
          class="entity-picture"
          slot="icon"
          src=${this.hass?.hassUrl ? this.hass.hassUrl(i) : i}
          alt=""
          style=${r}
        />
      `;
			if (!Sn(e.icon)) return w`
        <ha-state-icon
          slot="icon"
          .icon=${e.iconSource === "custom" ? e.icon : void 0}
          .stateObj=${e.iconSource === "custom" ? e.representativeStateObj : e.iconStateObj}
        ></ha-state-icon>
      `;
			if (Sn(e.icon)) {
				let t = Cn(e.icon), r = e.iconKey ? wn(this._config, e.iconKey) : !0;
				if (t.toLowerCase().split("?")[0].endsWith(".svg")) {
					let e = F.call(this, t, { forceColor: r });
					return e ? w`<span slot="icon" class="image-icon">${L(e)}</span>` : w`<img
              slot="icon"
              src=${t}
              alt=""
              style=${n}
            />`;
				}
				return w`<img
        slot="icon"
        src=${t}
        alt=""
        style=${n}
      />`;
			}
			return "";
		}
		_renderActiveEntitiesDialog(e) {
			return Kc.call(this, e.activeEntities);
		}
		render() {
			let e = this._getModel(), t = e.activeEntities[0]?.entity_id || e.entities[0]?.entity_id || null, n = A(this._config?.tap_action || $s(this._config)) || A(this._config?.hold_action) || A(this._config?.double_tap_action), r = this._config?.display_style === "badge", i = this._config?.card_visibility || "always", a = i === "always" || i === "state" && e.isOn || i === "template" && (e.isOn || e.inactiveTemplateActive), o = !r && this._config?.show_state !== !1, s = !r && this._config?.show_name === !0, c = r || this._config?.show_icon !== !1, l = this._config?.card_color ? it(this._config.card_color) : "var(--primary-color)", u = `--badge-color:${e.iconColor};`, d = [
				`--tile-badge-background-color:${l}`,
				`--tile-badge-icon-color:${e.hasIconColorOverride ? e.iconColor : "var(--white-color, #fff)"}`,
				"--mdc-icon-size:12px"
			].join(";"), f = w`
      ${c ? this._renderIcon(e) : ""}
      ${o ? e.stateSource === "template" ? w`<span class="template-state">${e.displayValue}</span>` : w`
              <state-display
                .hass=${this.hass}
                .stateObj=${e.displayStateObj}
                .content=${this._config?.state_content || e.defaultStateContent}
                .timeFormat=${this._config?.time_format}
                .name=${e.label}
                dash-unavailable
              ></state-display>
            ` : ""}
    `, p = {
				click: (e) => this._handleTap(e, t),
				dblclick: (e) => this._handleDoubleTap(e, t),
				pointerdown: (e) => this._handlePointerDown(e, t),
				pointerup: (e) => this._handlePointerEnd(e)
			}, m = this._renderActiveEntitiesDialog(e);
			return r && !a ? E : r ? w`
        <div
          class="card-badge"
          style=${d}
          role=${n ? "button" : "img"}
          tabindex=${n ? "0" : "-1"}
          title=${`${e.label}: ${e.displayValue}`}
          aria-label=${`${e.label}: ${e.displayValue}`}
          @click=${p.click}
          @dblclick=${p.dblclick}
          @pointerdown=${p.pointerdown}
          @pointerup=${p.pointerup}
          @pointercancel=${() => this._cancelLongPress()}
          @pointerleave=${() => this._cancelLongPress()}
        >
          ${f}
        </div>
        ${m}
      ` : w`${this._isHeadingBadge ? w`
          <ha-heading-badge
            .type=${n ? "button" : "text"}
            style=${[
				`--icon-color:${e.iconColor}`,
				"--ha-heading-badge-font-size:var(--ha-heading-card-title-font-size,var(--ha-font-size-l))",
				"--ha-heading-badge-font-weight:var(--ha-heading-card-title-font-weight,var(--ha-font-weight-normal))",
				"--ha-heading-badge-line-height:var(--ha-heading-card-title-line-height,var(--ha-line-height-normal))"
			].join(";")}
            .title=${`${e.label}: ${e.displayValue}`}
            aria-label=${`${e.label}: ${e.displayValue}`}
            @click=${p.click}
            @dblclick=${p.dblclick}
            @pointerdown=${p.pointerdown}
            @pointerup=${p.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${f}
          </ha-heading-badge>
        ` : w`
          <ha-badge
            .type=${n ? "button" : "badge"}
            .label=${s ? e.label : void 0}
            .iconOnly=${r || !o && !s}
            style=${u}
            .title=${`${e.label}: ${e.displayValue}`}
            aria-label=${`${e.label}: ${e.displayValue}`}
            @click=${p.click}
            @dblclick=${p.dblclick}
            @pointerdown=${p.pointerdown}
            @pointerup=${p.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${f}
          </ha-badge>
        `}${m}`;
		}
		static styles = [hf, Nl];
	},
	name: "Orbit Status Badge",
	description: "Displays an entity, area count, or template state",
	version: t.statusBadge
}), i("Orbit Cards", e);
//#endregion
