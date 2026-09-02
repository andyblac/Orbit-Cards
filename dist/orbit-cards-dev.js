//#region src/version.js
var e = "1.2.0-beta.5", t = {
	area: "1.1.0",
	status: "1.1.0",
	action: "1.1.0",
	deck: "1.1.0",
	statusBadge: "0.6.0"
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
})(e) : e, { is: m, defineProperty: h, getOwnPropertyDescriptor: g, getOwnPropertyNames: _, getOwnPropertySymbols: v, getPrototypeOf: ee } = Object, y = globalThis, te = y.trustedTypes, b = te ? te.emptyScript : "", x = y.reactiveElementPolyfillSupport, S = (e, t) => e, ne = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? b : null;
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
}, re = (e, t) => !m(e, t), ie = {
	attribute: !0,
	type: String,
	converter: ne,
	reflect: !1,
	useDefault: !1,
	hasChanged: re
};
Symbol.metadata ??= Symbol("metadata"), y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var C = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ie) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && h(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = g(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? ie;
	}
	static _$Ei() {
		if (this.hasOwnProperty(S("elementProperties"))) return;
		let e = ee(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(S("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
			let e = this.properties, t = [..._(e), ...v(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? ne : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ne : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? re)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[S("elementProperties")] = /* @__PURE__ */ new Map(), C[S("finalized")] = /* @__PURE__ */ new Map(), x?.({ ReactiveElement: C }), (y.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ae = globalThis, oe = (e) => e, w = ae.trustedTypes, se = w ? w.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ce = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + T, ue = `<${le}>`, E = document, de = () => E.createComment(""), fe = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, me = (e) => pe(e) || typeof e?.[Symbol.iterator] == "function", he = "[ 	\n\f\r]", ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, ve = />/g, ye = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, xe = /"/g, Se = /^(?:script|style|textarea|title)$/i, D = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), O = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), we = E.createTreeWalker(E, 129);
function Te(e, t) {
	if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return se === void 0 ? t : se.createHTML(t);
}
var Ee = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ge;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ge ? c[1] === "!--" ? o = _e : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = ye) : (Se.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = ye) : o = ve : o === ye ? c[0] === ">" ? (o = i ?? ge, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? ye : c[3] === "\"" ? xe : be) : o === xe || o === be ? o = ye : o === _e || o === ve ? o = ge : (o = ye, i = void 0);
		let d = o === ye && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ge ? n + ue : l >= 0 ? (r.push(s), n.slice(0, l) + ce + n.slice(l) + T + d) : n + T + (l === -2 ? t : d);
	}
	return [Te(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, De = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
		if (this.el = e.createElement(l, r), we.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = we.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ce)) {
					let t = u[o++], n = i.getAttribute(e).split(T), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Me : r[1] === "?" ? Ne : r[1] === "@" ? Pe : je
					}), i.removeAttribute(e);
				} else e.startsWith(T) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Se.test(i.tagName)) {
					let e = i.textContent.split(T), t = e.length - 1;
					if (t > 0) {
						i.textContent = w ? w.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], de()), we.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], de());
					}
				}
			} else if (i.nodeType === 8) if (i.data === le) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(T, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += T.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = E.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Oe(e, t, n = e, r) {
	if (t === O) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = fe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = Oe(e, i._$AS(e, t.values), i, r)), t;
}
var ke = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? E).importNode(t, !0);
		we.currentNode = r;
		let i = we.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ae(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Fe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = we.nextNode(), a++);
		}
		return we.currentNode = E, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ae = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = Oe(this, e, t), fe(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== O && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? me(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== k && fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(Te(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ke(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ce.get(e.strings);
		return t === void 0 && Ce.set(e.strings, t = new De(e)), t;
	}
	k(t) {
		pe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(de()), this.O(de()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = oe(e).nextSibling;
			oe(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, je = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = k;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Oe(this, e, t, 0), a = !fe(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Oe(this, r[n + o], t, o), s === O && (s = this._$AH[o]), a ||= !fe(s) || s !== this._$AH[o], s === k ? e = k : e !== k && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Me = class extends je {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === k ? void 0 : e;
	}
}, Ne = class extends je {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== k);
	}
}, Pe = class extends je {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Oe(this, e, t, 0) ?? k) === O) return;
		let n = this._$AH, r = e === k && n !== k || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== k && (n === k || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Fe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Oe(this, e);
	}
}, Ie = {
	M: ce,
	P: T,
	A: le,
	C: 1,
	L: Ee,
	R: ke,
	D: me,
	V: Oe,
	I: Ae,
	H: je,
	N: Ne,
	U: Pe,
	B: Me,
	F: Fe
}, Le = ae.litHtmlPolyfillSupport;
Le?.(De, Ae), (ae.litHtmlVersions ??= []).push("3.3.3");
var Re = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ae(t.insertBefore(de(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, ze = globalThis, A = class extends C {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Re(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return O;
	}
};
A._$litElement$ = !0, A.finalized = !0, ze.litElementHydrateSupport?.({ LitElement: A });
var Be = ze.litElementPolyfillSupport;
Be?.({ LitElement: A }), (ze.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/common/helpers/actions.js
function Ve(e, t = null) {
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
			let r = We(e, t, n);
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
function j(e) {
	return !!(e?.action && e.action !== "none");
}
function M(e) {
	let t = e;
	for (; t;) {
		let e = t.localName || "";
		if (e === "hui-card-picker" || e === "hui-dialog-add-card" || e === "hui-card-picker-card") return !0;
		let n = t.getRootNode?.();
		t = t.parentElement || (n instanceof ShadowRoot ? n.host : null);
	}
	return !1;
}
function N(e, t, n, r) {
	if (!M(this)) {
		if (Ue(e), this._clearDoubleTapTimer?.(), j(r)) {
			this._doubleTapTimer = setTimeout(() => {
				this._doubleTapTimer = null, this._handleAction(n, t);
			}, 250);
			return;
		}
		this._handleAction(n, t);
	}
}
function P(e, t, n) {
	M(this) || (Ue(e), this._clearDoubleTapTimer?.(), j(n) && this._handleAction(n, t));
}
function He() {
	this._doubleTapTimer &&= (clearTimeout(this._doubleTapTimer), null);
}
function Ue(e) {
	e?.preventDefault?.(), e?.stopPropagation?.(), e?.stopImmediatePropagation && e.stopImmediatePropagation();
}
function We(e, t, n) {
	let r = { ...e }, i = r.popup_options;
	for (let e of [
		"action",
		"popup_title",
		"popup_content",
		"popup_options",
		"title",
		"content"
	]) delete r[e];
	return {
		...r,
		...i || {},
		title: t,
		content: n
	};
}
function Ge(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function Ke(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function qe(e) {
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	N.call(this, e, t, n, r);
}
function Je(e) {
	P.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Ye(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	N.call(this, e, t, n, r);
}
function Xe(e) {
	P.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Ze(e) {
	if (!M(this)) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return $e.call(this, e);
		N.call(this, e, this._config.main_entity || this._config.entity, tt(this._config), this._config.double_tap_action);
	}
}
function Qe(e) {
	if (!M(this)) {
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return et.call(this, e);
		P.call(this, e, this._config.main_entity || this._config.entity, this._config.double_tap_action);
	}
}
function $e(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		N.call(this, e, null, tt(this._config), this._config.double_tap_action);
		return;
	}
	N.call(this, e, t, nt(this._config), this._config.main_entity_double_tap_action);
}
function et(e) {
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		P.call(this, e, null, this._config.double_tap_action);
		return;
	}
	P.call(this, e, t, this._config.main_entity_double_tap_action);
}
function tt(e = {}) {
	return e.tap_action?.action ? e.tap_action : {
		action: "navigate",
		navigation_path: e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function nt(e = {}) {
	return e.main_entity_tap_action?.action === "none" ? tt(e) : e.main_entity_tap_action || { action: "more-info" };
}
//#endregion
//#region src/common/helpers/long-press.js
function rt(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function it() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function at(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
//#endregion
//#region src/common/helpers/card-interactions.js
var ot = (e) => class extends e {
	get _LONG_PRESS_DELAY() {
		return 500;
	}
	_handleAction(e, t = null) {
		return Ve.call(this, e, t);
	}
	_navigate(e) {
		return Ge.call(this, e);
	}
	_clearDoubleTapTimer() {
		return He.call(this);
	}
	_startLongPress(e, t, n) {
		return rt.call(this, e, t, n);
	}
	_cancelLongPress() {
		return it.call(this);
	}
	_finishLongPress(e) {
		return at.call(this, e);
	}
	_stopEvent(e) {
		return Ue(e);
	}
};
//#endregion
//#region src/common/helpers/entities.js
function st(e, t = null) {
	let n;
	try {
		n = t?.formatEntityState?.(e);
	} catch {}
	if (n != null && n !== "") return n;
	let r = e.attributes.unit_of_measurement || "", i = e.state;
	return r ? `${i}${r}` : i === "on" || i === "off" ? i.toUpperCase() : i;
}
function ct(e) {
	if (!e) return !1;
	let t = e.entity_id.split(".")[0];
	return lt(e.state, t);
}
function lt(e, t = "") {
	let n = String(e ?? "").trim().toLowerCase();
	if (!n) return !1;
	if (!t) return !dt.has(n);
	if (ut.has(t)) return n !== "unavailable";
	if (["unavailable", "unknown"].includes(n) || n === "off" && t !== "alert") return !1;
	switch (t) {
		case "alarm_control_panel": return n !== "disarmed";
		case "alert": return n !== "idle";
		case "cover":
		case "valve": return n !== "closed";
		case "device_tracker":
		case "person": return n !== "not_home";
		case "lawn_mower": return !["docked", "paused"].includes(n);
		case "lock": return n !== "locked";
		case "media_player": return n !== "standby";
		case "vacuum": return ![
			"idle",
			"docked",
			"paused"
		].includes(n);
		case "plant": return n === "problem";
		case "group": return [
			"on",
			"home",
			"open",
			"locked",
			"problem"
		].includes(n);
		case "timer": return n === "active";
		case "camera": return ["streaming", "recording"].includes(n);
		default: return !0;
	}
}
var ut = new Set([
	"ai_task",
	"button",
	"conversation",
	"datetime",
	"event",
	"image",
	"infrared",
	"input_button",
	"notify",
	"radio_frequency",
	"scene",
	"stt",
	"tag",
	"tts",
	"wake_word"
]), dt = new Set([
	"",
	"false",
	"off",
	"no",
	"none",
	"null",
	"unknown",
	"unavailable",
	"closed",
	"closing",
	"locked",
	"locking",
	"unlocking",
	"jammed",
	"not_home",
	"idle",
	"standby",
	"docked",
	"disarmed",
	"below_horizon"
]);
function ft(e) {
	return e?.state?.toString().toLowerCase() === "unavailable";
}
function pt(e, t) {
	return ft(t) ? "unavailable" : e && !t ? "missing" : null;
}
//#endregion
//#region src/common/helpers/templates.js
var mt = "__ORBIT_TEMPLATE_RESULT_START_8C4F2A__", ht = "__ORBIT_TEMPLATE_RESULT_END_8C4F2A__";
function gt(e) {
	if (typeof e != "string") return e;
	let t = e.trim();
	return !t || F(t) ? e : `{{ ${t} }}`;
}
function F(e) {
	return /{{|{%|{#/.test(e || "");
}
function _t(e = []) {
	let t = this.hass?.connection;
	if (!this.isConnected || !t?.subscribeMessage) {
		vt.call(this);
		return;
	}
	let n = jt(this), r = Pt(this._config || {}), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = gt(t?.template || "")?.trim();
		if (!e) continue;
		let n = t?.entityId || "", a = Mt(e, n);
		i.set(a, {
			id: a,
			template: e,
			entityId: n,
			configSignature: r
		});
	}
	for (let [e, t] of n) {
		let r = i.get(e);
		(!r || r.configSignature !== t.configSignature) && (Nt(t), n.delete(e));
	}
	for (let e of i.values()) n.has(e.id) || kt.call(this, e);
}
function vt() {
	let e = this.__orbitTemplateSubscriptions;
	if (e) {
		for (let t of e.values()) Nt(t);
		e.clear();
	}
}
function I(e, t = "") {
	if (!e) return null;
	let n = gt(e)?.trim(), r = this.__orbitTemplateSubscriptions;
	return (r?.get(Mt(n, t)) || [...r?.values() || []].find((e) => e.template === n))?.result ?? null;
}
function yt(e, t = "") {
	if (!e) return "";
	let n = gt(e)?.trim();
	return this.__orbitTemplateSubscriptions?.get(Mt(n, t))?.error || "";
}
function bt(e, t = "") {
	let n = String(e ?? "").trim().toLowerCase(), r = Number(n);
	return n && Number.isFinite(r) ? r !== 0 : ["true", "yes"].includes(n) ? !0 : ["false", "no"].includes(n) ? !1 : lt(n, t);
}
function xt(e, t = null, n = "") {
	let r = String(e ?? "").trim();
	return St(r, t, n) || (r.includes("_") ? r.replace(/_+/g, " ").replace(/\b\p{L}/gu, (e) => e.toLocaleUpperCase()) : r.replace(/^\p{L}/u, (e) => e.toLocaleUpperCase()));
}
function St(e, t, n) {
	if (!e || !t) return "";
	let r = e.toLowerCase(), i = n ? [n] : Ct(t), a = /* @__PURE__ */ new Set();
	for (let e of i) {
		let n = [`component.${e}.entity_component._.state.${r}`, `state_badge.${e}.${r}`];
		for (let e of n) {
			let n = t.localize?.(e);
			n && n !== e && a.add(n);
		}
	}
	if (a.size === 1) return [...a][0];
	if (!n) return "";
	let o = st({
		entity_id: `${n}.orbit_template_state`,
		state: e,
		attributes: {}
	}, t);
	return o && o !== e ? o : "";
}
function Ct(e) {
	let t = Object.keys(e.states || {}).map((e) => e.split(".")[0]).filter(Boolean);
	return [...new Set([...t, ...wt])];
}
var wt = /* @__PURE__ */ "alarm_control_panel.alert.automation.binary_sensor.calendar.camera.climate.cover.device_tracker.fan.humidifier.input_boolean.lawn_mower.light.lock.media_player.person.plant.remote.script.siren.sun.switch.timer.update.vacuum.valve.water_heater".split(".");
function Tt(e) {
	let t = /* @__PURE__ */ new Map();
	return Dt(e, t), [...t.values()];
}
function Et(e) {
	let t = /* @__PURE__ */ new Map();
	return Ot(e, t), [...t.values()];
}
function Dt(e, t, n = "", r = "") {
	if (Array.isArray(e)) {
		e.forEach((e) => Dt(e, t, "", r));
		return;
	}
	if (!e || typeof e != "object") {
		if (typeof e == "string" && (n === "color" || n.endsWith("_color")) && F(e)) {
			let n = Mt(e, r);
			t.set(n, {
				template: e,
				entityId: r
			});
		}
		return;
	}
	let i = e.entity || e.main_entity || r;
	Object.entries(e).forEach(([e, n]) => Dt(n, t, e, i));
}
function Ot(e, t, n = "", r = "") {
	if (Array.isArray(e)) {
		e.forEach((e) => Ot(e, t, "", r));
		return;
	}
	if (!e || typeof e != "object") {
		if (typeof e == "string" && (/(^|_)icon$/.test(n) || n === "icon_template" || n.endsWith("_icon_template")) && F(e)) {
			let n = Mt(e, r);
			t.set(n, {
				template: e,
				entityId: r
			});
		}
		return;
	}
	let i = e.entity || e.main_entity || r;
	Object.entries(e).forEach(([n, r]) => {
		let a = n.match(/^(.*)_icon(?:_template)?$/)?.[1];
		Ot(r, t, n, a === void 0 ? i : e[a] || i);
	});
}
function kt(e) {
	let t = jt(this), { id: n, template: r, entityId: i, configSignature: a } = e, o = {
		configSignature: a,
		template: r,
		entityId: i,
		result: null,
		error: "",
		subscription: void 0
	};
	t.set(n, o);
	let s = [
		"{% set entity = states[orbit_entity_id] if orbit_entity_id else none %}",
		mt,
		r,
		ht
	].join(""), c = this.hass.connection.subscribeMessage((e) => {
		t.get(n) === o && ("error" in e ? (o.error = Ft(e.error), o.result = null) : (o.error = "", o.result = At(e.result)), this._templateRevision = (this._templateRevision || 0) + 1);
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
		t.get(n) === o && (o.subscription = void 0, o.error = Ft(e), o.result = null, this._templateRevision = (this._templateRevision || 0) + 1);
	});
}
function At(e) {
	let t = String(e ?? ""), n = t.indexOf(mt), r = t.lastIndexOf(ht);
	return n !== -1 && r > n ? t.slice(n + 38, r).trim() : t.trim();
}
function jt(e) {
	return e.__orbitTemplateSubscriptions ||= /* @__PURE__ */ new Map(), e.__orbitTemplateSubscriptions;
}
function Mt(e, t) {
	return JSON.stringify([e || "", t || ""]);
}
function Nt(e) {
	e.subscription?.then((e) => e()).catch(() => {});
}
function Pt(e) {
	try {
		return JSON.stringify(e);
	} catch {
		return "";
	}
}
function Ft(e) {
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
//#region src/common/helpers/colors.js
function It(e) {
	if (e = L.call(this, e), !e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return Yt(t) ? t : Bt(t);
}
function Lt(e) {
	if (e = L.call(this, e), !e) return "rgba(var(--color-theme), 0.3)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.3)" : Jt.call(this, t, 70);
}
function Rt(e) {
	if (e = L.call(this, e), !e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.05)" : Jt.call(this, t, 20);
}
function zt(e) {
	if (e = L.call(this, e), !e) return "rgba(var(--color-theme), 0.25)";
	let t = e.toString().trim();
	return Jt.call(this, t, 25);
}
function Bt(e) {
	let t = Xt(e);
	if (!t) return "rgb(var(--color-theme))";
	if (t === "light") return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
	let n = Wt(t);
	return Vt(t) ? n ? `rgb(var(--${n}))` : `var(--${t}-color, var(--${t}, rgb(var(--color-theme))))` : t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))`;
}
function Vt(e) {
	return Ht.has(Xt(e));
}
var Ht = new Set([
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
function Ut(e) {
	return !!Wt(e);
}
function Wt(e) {
	let t = Xt(e);
	return t && Gt(t).find(qt) || "";
}
function Gt(e) {
	let t = e.startsWith("color-") ? e.slice(6) : e, n = Kt[t] || [];
	return [`color-${t}`, ...n.map((e) => `color-${e}`)];
}
var Kt = {
	"blue-grey": ["bluegrey"],
	"dark-grey": ["darkgrey"],
	"deep-orange": ["deeporange"],
	"deep-purple": ["deeppurple"],
	"light-blue": ["lightblue"],
	"light-green": ["lightgreen"],
	"light-grey": ["lightgrey"]
};
function qt(e) {
	return typeof document > "u" ? !1 : [document.documentElement, document.body].filter(Boolean).some((t) => getComputedStyle(t).getPropertyValue(`--${e}`).trim());
}
function Jt(e, t) {
	if (e = L.call(this, e), !e) return "transparent";
	let n = e.toString().trim();
	return `color-mix(in srgb, transparent, ${Yt(n) ? n : Bt(n)} ${t}%)`;
}
function L(e) {
	if (!F(e)) return e;
	let t = this?._orbitColorTemplateEntityId || "";
	return I.call(this, e, t) || "";
}
function Yt(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function Xt(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
//#endregion
//#region src/common/helpers/card-name.js
function Zt(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.area_name) return Qt(e.area_name, e, t, n);
	if (e.room_name) return Qt(e.room_name, e, t, n);
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
function Qt(e, t, n, r = "") {
	return typeof e == "string" ? e : (Array.isArray(e) ? e : [e]).map((e) => $t(e, t, n)).filter(Boolean).join(" ") || r;
}
function $t(e, t, n) {
	if (!e) return "";
	if (typeof e == "string") return e;
	if (e.type === "text") return e.text || "";
	if (e.type === "area") return en(t, n) || "";
	if (e.type === "floor") return tn(t, n) || "";
	if (e.type === "device_class") return (Array.isArray(t.device_class) ? t.device_class : [t.device_class]).filter((e) => typeof e == "string" && e.trim()).map((e) => e.trim().replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase())).join(", ");
	let r = nn(t, n);
	return r && typeof n?.formatEntityName == "function" ? n.formatEntityName(r, { type: e.type }) || "" : e.type === "entity" && (r?.attributes?.friendly_name || r?.entity_id) || "";
}
function en(e, t) {
	let n = e.area;
	if (n && t?.areas?.[n]) return t.areas[n].name || "";
	let r = nn(e, t);
	return r && typeof t?.formatEntityName == "function" ? t.formatEntityName(r, { type: "area" }) : "";
}
function tn(e, t) {
	let n = e.area, r = n && t?.areas?.[n] ? t.areas[n].floor_id : "";
	if (r && t?.floors?.[r]) return t.floors[r].name || "";
	let i = nn(e, t);
	return i && typeof t?.formatEntityName == "function" ? t.formatEntityName(i, { type: "floor" }) : "";
}
function nn(e, t) {
	let n = e.main_entity || e.entity || "";
	return n && t?.states ? t.states[n] : null;
}
//#endregion
//#region src/common/helpers/documentation.js
var rn = "https://github.com/andyblac/Orbit-Cards/wiki", an = {
	"orbit-area-card-dev": {
		default: "Area-Card",
		card: "Area-Card#main-layout",
		status: "Area-Card#status-row",
		buttons: "Area-Card#side-buttons",
		curve: "Area-Card#curved-buttons",
		action: "Area-Card#action-button"
	},
	"orbit-room-card-dev": {
		default: "Area-Card",
		card: "Area-Card#main-layout",
		status: "Area-Card#status-row",
		buttons: "Area-Card#side-buttons",
		curve: "Area-Card#curved-buttons",
		action: "Area-Card#action-button"
	},
	"orbit-status-card-dev": { default: "Status-Card" },
	"orbit-action-card-dev": { default: "Action-Card" },
	"orbit-deck-card-dev": {
		default: "Deck-Card",
		"setup-wrap": "Deck-Card#wrap-layout",
		"setup-tabs": "Deck-Card#tabs-layout",
		"setup-overlay": "Deck-Card#overlay-layout",
		card: "Deck-Card#deck-items"
	}
};
function on(e = "") {
	return e.replace(/^custom:/, "");
}
function sn(e, t = "default") {
	let n = an[on(e)], r = n?.[t] || n?.default;
	return r ? `${rn}/${r}` : `${rn}`;
}
function cn(e, t, n = "default") {
	let r = sn(t, n);
	queueMicrotask(() => {
		let t = ln(e, "hui-dialog-edit-card") || ln(e, "hui-dialog-edit-badge");
		!t || t._documentationURL === r || (t._documentationURL = r, t.requestUpdate?.());
	});
}
function ln(e, t) {
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
function un({ tag: e, cardClass: t, name: n, description: r, version: a, getEntitySuggestion: o, documentationURL: s, aliases: c = [] }) {
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
		documentationURL: s || sn(e),
		getEntitySuggestion: o
	}), i(n, a);
}
//#endregion
//#region src/common/helpers/config-migration.js
function dn(e = {}) {
	let t = { ...e || {} }, n = !1;
	return t.type === "custom:orbit-room-card-dev" && (t.type = "custom:orbit-area-card-dev", n = !0), Object.prototype.hasOwnProperty.call(t, "room_name") && (t.area_name === void 0 && t.room_name !== void 0 && t.room_name !== "" && (t.area_name = t.room_name), delete t.room_name, n = !0), n = Dn(t) || n, n = yn(t) || n, {
		config: n ? t : e,
		migrated: n
	};
}
function fn(e = {}) {
	let t = { ...e || {} }, n = Dn(t);
	if (n = vn(t) || n, Array.isArray(t.entities)) {
		let e = t.entities.map((e) => {
			if (!e || typeof e == "string") return e;
			let t = { ...e }, r = Dn(t), i = vn(t), a = r || i;
			return n ||= a, a ? t : e;
		});
		n && (t.entities = e);
	}
	return {
		config: n ? t : e,
		migrated: n
	};
}
function pn(e = {}) {
	let t = { ...e || {} }, n = Dn(t);
	return n = bn(t) || n, n = xn(t) || n, {
		config: n ? t : e,
		migrated: n
	};
}
function mn(e = {}) {
	if (!Array.isArray(e?.decks)) return {
		config: e,
		migrated: !1
	};
	let t = !1, n = e.decks.map((e) => {
		if (!e?.card || typeof e.card != "object") return e;
		let n = hn(e.card);
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
function hn(e) {
	return gn(e, "orbit-status-card-dev") ? _n(e) : gn(e, "orbit-area-card-dev") || gn(e, "orbit-room-card-dev") ? dn(e) : gn(e, "orbit-action-card-dev") ? fn(e) : gn(e, "orbit-deck-card-dev") ? mn(e) : {
		config: e,
		migrated: !1
	};
}
function gn(e, t) {
	return e?.type === `custom:${t}` || e?.type === `custom:${t}-dev`;
}
function _n(e = {}) {
	let t = { ...e || {} }, n = Dn(t);
	if (n = Tn(t) || n, t.mode !== "person" && (n = En(t) || n), n = wn(t) || n, n = Cn(t) || n, n = bn(t) || n, Object.prototype.hasOwnProperty.call(t, "main_entity") && (t.entity === void 0 && t.main_entity !== void 0 && t.main_entity !== "" && (t.entity = t.main_entity), delete t.main_entity, n = !0), Array.isArray(t.entities)) {
		let e = t.entities.map((e) => {
			if (!e || typeof e == "string") return e;
			let t = { ...e }, r = Dn(t), i = Tn(t), a = En(t), o = wn(t), s = Cn(t), c = bn(t), l = r || i || a || o || s || c;
			return n ||= l, l ? t : e;
		});
		n && (t.entities = e);
	}
	return {
		config: n ? t : e,
		migrated: n
	};
}
function vn(e) {
	let t = !1;
	return t = R(e, "accent_color", "color") || t, t = Sn(e, "main_entity_") || t, t;
}
function yn(e) {
	let t = !1;
	t = R(e, "accent_color", "color") || t, t = Sn(e, "main_entity_") || t, t = R(e, "main_entity_state_template", "state_template") || t;
	for (let n of [
		"status1",
		"status2",
		"status3",
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
		let r = `${n}_icon_template`;
		Object.prototype.hasOwnProperty.call(e, r) && ((e[`${n}_icon_source`] === "template" && e[r] !== void 0 || e[`${n}_icon`] === void 0) && (e[`${n}_icon`] = e[r]), delete e[r], t = !0), t = R(e, `${n}_on_color`, `${n}_color_on`) || t, t = R(e, `${n}_off_color`, `${n}_color_off`) || t;
	}
	return t;
}
function bn(e) {
	let t = !1;
	return t = R(e, "accent_color_source", "color_source") || t, t = R(e, "accent_color", "color") || t, t = R(e, "accent_on_color", "color_on") || t, t = R(e, "accent_off_color", "color_off") || t, t;
}
function xn(e) {
	return Object.prototype.hasOwnProperty.call(e, "icon_template") ? ((e.icon_source === "template" && e.icon_template !== void 0 || e.icon === void 0) && (e.icon = e.icon_template), delete e.icon_template, !0) : !1;
}
function Sn(e, t) {
	let n = !1;
	for (let r of [
		"icon_source",
		"icon_template",
		"icon",
		"icon_on",
		"icon_off",
		"icon_svg_color_override",
		"icon_on_svg_color_override",
		"icon_off_svg_color_override"
	]) {
		let i = r === "icon_template" ? "icon" : r;
		n = R(e, `${t}${r}`, i) || n;
	}
	return n;
}
function R(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) ? (e[n] === void 0 && e[t] !== void 0 && (e[n] = e[t]), delete e[t], !0) : !1;
}
function Cn(e) {
	let t = Sn(e, "entity_");
	return t = Sn(e, "main_entity_") || t, t = xn(e) || t, t;
}
function wn(e) {
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
function Tn(e) {
	return Object.prototype.hasOwnProperty.call(e, "status_name") ? (e.name === void 0 && e.status_name !== void 0 && e.status_name !== "" && (e.name = e.status_name), delete e.status_name, !0) : !1;
}
function En(e) {
	let t = e.state_template !== void 0 && e.state_template !== "", n = e.label_template !== void 0 && e.label_template !== "";
	return !t && !n || e.state_source === "template" || e.state_source === "area_count" ? !1 : (e.state_source = "template", !0);
}
function Dn(e) {
	let t = !1;
	for (let n of Object.keys(e || {})) {
		if (!n.endsWith("_template")) continue;
		let r = gt(e[n]);
		r !== e[n] && (e[n] = r, t = !0);
	}
	return t;
}
//#endregion
//#region src/icons/fan.svg?raw
var On = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     width=\"120\"\n     height=\"120\"\n     viewBox=\"0 0 24 24\"\n     fill=\"none\">\n\n  <style>\n    .spinner {\n      transform-origin: center;\n      animation: spin 1.2s linear infinite;\n    }\n\n    @keyframes spin {\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  </style>\n\n  <g class=\"spinner\">\n    <path\n      fill=\"black\"\n      d=\"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z\"\n    />\n  </g>\n\n</svg>", kn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-fixed</title>\n\n  <!-- Frame -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Animated group (NO base transform!) -->\n    <g>\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Start OPEN via animation itself -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 -10\"\n        to=\"0 0\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n\n    </g>\n  </g>\n</svg>", An = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-variant-open</title>\n\n  <!-- Frame / roof -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <!-- Clip area -->\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Door group (FINAL STATE is open) -->\n    <g class=\"door\" transform=\"translate(0 -10)\">\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Optional SMIL animation (safe fallback style) -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 0\"\n        to=\"0 -10\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n    </g>\n\n  </g>\n</svg>", jn = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", Mn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\">\n  <g class=\"start\">\n    <path\n      fill=\"currentColor\"\n      d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"/>\n  </g>\n</svg>", Nn = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", Pn = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M 25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M 10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z M 17 30C15.894531 30 15 30.894531 15 32C15 33.105469 15.894531 34 17 34C18.105469 34 19 33.105469 19 32C19 30.894531 18.105469 30 17 30 Z M 25 30C23.894531 30 23 30.894531 23 32C23 33.105469 23.894531 34 25 34C26.105469 34 27 33.105469 27 32C27 30.894531 26.105469 30 25 30 Z M 33 30C31.894531 30 31 30.894531 31 32C31 33.105469 31.894531 34 33 34C34.105469 34 35 33.105469 35 32C35 30.894531 34.105469 30 33 30 Z M 13 38C11.894531 38 11 38.894531 11 40C11 41.105469 11.894531 42 13 42C14.105469 42 15 41.105469 15 40C15 38.894531 14.105469 38 13 38 Z M 21 38C19.894531 38 19 38.894531 19 40C19 41.105469 19.894531 42 21 42C22.105469 42 23 41.105469 23 40C23 38.894531 22.105469 38 21 38 Z M 29 38C27.894531 38 27 38.894531 27 40C27 41.105469 27.894531 42 29 42C30.105469 42 31 41.105469 31 40C31 38.894531 30.105469 38 29 38 Z M 37 38C35.894531 38 35 38.894531 35 40C35 41.105469 35.894531 42 37 42C38.105469 42 39 41.105469 39 40C39 38.894531 38.105469 38 37 38 Z M 9 46C7.894531 46 7 46.894531 7 48C7 49.105469 7.894531 50 9 50C10.105469 50 11 49.105469 11 48C11 46.894531 10.105469 46 9 46 Z M 17 46C15.894531 46 15 46.894531 15 48C15 49.105469 15.894531 50 17 50C18.105469 50 19 49.105469 19 48C19 46.894531 18.105469 46 17 46 Z M 25 46C23.894531 46 23 46.894531 23 48C23 49.105469 23.894531 50 25 50C26.105469 50 27 49.105469 27 48C27 46.894531 26.105469 46 25 46 Z M 33 46C31.894531 46 31 46.894531 31 48C31 49.105469 31.894531 50 33 50C34.105469 50 35 49.105469 35 48C35 46.894531 34.105469 46 33 46 Z M 41 46C39.894531 46 39 46.894531 39 48C39 49.105469 39.894531 50 41 50C42.105469 50 43 49.105469 43 48C43 46.894531 42.105469 46 41 46Z\"/></svg>", Fn = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Animated shower</title>\n  <desc id=\"desc\">A shower head icon with animated falling water droplets.</desc>\n  <style>\n    .fixture {\n      fill: #111111;\n    }\n\n    .drop {\n      fill: #1597d3;\n      opacity: 0;\n      transform-box: fill-box;\n      transform-origin: center;\n      animation: fall 1.35s linear infinite;\n    }\n\n    .drop:nth-child(1) { animation-delay: 0s; }\n    .drop:nth-child(2) { animation-delay: .18s; }\n    .drop:nth-child(3) { animation-delay: .36s; }\n    .drop:nth-child(4) { animation-delay: .54s; }\n    .drop:nth-child(5) { animation-delay: .72s; }\n    .drop:nth-child(6) { animation-delay: .9s; }\n    .drop:nth-child(7) { animation-delay: 1.08s; }\n    .drop:nth-child(8) { animation-delay: .12s; }\n    .drop:nth-child(9) { animation-delay: .3s; }\n    .drop:nth-child(10) { animation-delay: .48s; }\n    .drop:nth-child(11) { animation-delay: .66s; }\n    .drop:nth-child(12) { animation-delay: .84s; }\n\n    @keyframes fall {\n      0% {\n        opacity: 0;\n        transform: translateY(-8px) scale(.72);\n      }\n      18% {\n        opacity: 1;\n      }\n      72% {\n        opacity: .95;\n      }\n      100% {\n        opacity: 0;\n        transform: translateY(8px) scale(1);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .drop {\n        opacity: 1;\n        animation: none;\n      }\n    }\n  </style>\n\n  <path class=\"fixture\" d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z\"/>\n\n  <g id=\"water\">\n    <circle class=\"drop\" cx=\"17\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"13\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"21\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"29\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"37\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"9\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"17\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"41\" cy=\"48\" r=\"2\"/>\n  </g>\n</svg>\n", In = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Closing shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly closes from twenty percent closed to fully closed.</desc>\n  <style>\n    .shade-closing {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(3.943322);\n    }\n\n    .rail-closing {\n      transform: translateY(12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-closing {\n      animation: shade-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-closing {\n      animation: rail-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-closing {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(3.943322); }\n    }\n\n    @keyframes rail-closing {\n      from { transform: translateY(0); }\n      to   { transform: translateY(12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-closing\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"4.358\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-closing\" x=\"2.42\" y=\"8.694\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", Ln = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Opening shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly opens from fully closed to twenty percent closed.</desc>\n  <style>\n    .shade-opening {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(0.253593);\n    }\n\n    .rail-opening {\n      transform: translateY(-12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-opening {\n      animation: shade-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-opening {\n      animation: rail-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-opening {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(0.253593); }\n    }\n\n    @keyframes rail-opening {\n      from { transform: translateY(0); }\n      to   { transform: translateY(-12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-opening\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"17.185\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-opening\" x=\"2.42\" y=\"21.521\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", Rn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"120\" height=\"120\" fill=\"currentColor\">\n\n  <style>\n    .swirl {\n      transform-origin: 12px 14px;\n      animation: wash 1.5s ease-in-out infinite;\n    }\n\n    @keyframes wash {\n      0%,100% { transform: rotate(0deg); }\n      25%     { transform: rotate(-20deg); }\n      75%     { transform: rotate(20deg); }\n    }\n  </style>\n\n  <!-- machine -->\n  <path\n    fill=\"currentColor\"\n    d=\"M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2\n       M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4\n       M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4\n       M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z\" />\n\n  <!-- animated inner swirl -->\n  <path\n    class=\"swirl\"\n    fill=\"currentColor\"\n    d=\"M14.83,11.17\n       C16.39,12.73 16.39,15.27 14.83,16.83\n       C13.27,18.39 10.73,18.39 9.17,16.83\n       L14.83,11.17\" />\n</svg>", zn = [
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
], Bn = Object.freeze({
	"fan.svg": On,
	"garage-door_closed.svg": kn,
	"garage-door_open.svg": An,
	"motion_detected.svg": jn,
	"motion_off.svg": Mn,
	"motion_on.svg": Nn,
	"shower_off.svg": Pn,
	"shower_on.svg": Fn,
	"shutter-closing.svg": In,
	"shutter-opening.svg": Ln,
	"washing-machine-running.svg": Rn
});
function Vn(e) {
	return e?.startsWith("orbit:") && Bn[decodeURIComponent(e.slice(6).split("?")[0])] || "";
}
//#endregion
//#region src/common/helpers/icons.js
function Hn(e, t = "") {
	return F(e) ? I.call(this, e, t) || "" : e || "";
}
function Un(e, t) {
	let n = L.call(this, this._config.color || "theme");
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function Wn(e) {
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
function Gn(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function Kn(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function z(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = t.animate === !0, i = [
		e,
		n ? "forced" : "auto",
		r ? "animated" : "static"
	].join("::"), a = this.constructor.svgCache, o = a[i];
	if (typeof o == "string" && o !== "loading") return o;
	if (o === "loading") return Xn(i, this), "";
	let s = Vn(e);
	if (s) {
		let e = Jn(s, n, r);
		return a[i] = e, e;
	}
	return a[i] = "loading", Xn(i, this), Qn(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = Jn(e, n, r), a[i] = e, Zn(i);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete a[i], Zn(i);
	}), "";
}
function qn(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function Jn(e, t, n = !1) {
	let r = e.replace(/<svg\b[^>]*>/i, (e) => {
		let t = e.replace(/\swidth="[^"]*"/i, " width=\"100%\"").replace(/\sheight="[^"]*"/i, " height=\"100%\"");
		return n && (t = t.replace(/^<svg\b/i, "<svg data-orbit-animate=\"true\"")), t;
	});
	return t ? r.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : r;
}
var Yn = {};
function Xn(e, t) {
	t && (Yn[e] = Yn[e] || /* @__PURE__ */ new Set(), Yn[e].add(t));
}
function Zn(e) {
	let t = Yn[e];
	t && (delete Yn[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function Qn(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
//#endregion
//#region src/common/helpers/updates.js
function $n(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? tr(r, i) : !1;
}
function er(e) {
	return Object.entries(e || {}).some(([e, t]) => e.endsWith("_template") ? !0 : typeof t == "string" ? F(t) : t && typeof t == "object" ? er(t) : !1);
}
function tr(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
//#endregion
//#region src/common/helpers/suggestions.js
function nr(e = "") {
	return e.split(".")[0] || "";
}
function rr(e, t) {
	let n = e?.entities?.[t];
	if (n?.area_id) return n.area_id;
	let r = n?.device_id;
	return r && e?.devices?.[r]?.area_id || "";
}
function ir(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
//#endregion
//#region src/common/helpers/svg-cache.js
var B = {}, ar = {
	Stronger: "Stronger",
	Weaker: "Weaker",
	"Current state": "Current state",
	"Current activity": "Current activity",
	"No entities available for activity": "No entities available for activity",
	"Unable to load current activity": "Unable to load current activity",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	"This will turn off {count} active entities.": "This will turn off {count} active entities.",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
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
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Loading files...": "Loading files...",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colors",
	"No matching files": "No matching files",
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Person entity": "Person entity",
	Picker: "Picker",
	"Separate cards": "Separate cards",
	"State light color": "State light color",
	"State color (default)": "State color (default)",
	"State template": "State template",
	"Status {index}": "Status {index}",
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
	"Tracker entity": "Tracker entity",
	"Low sensors": "Low sensors",
	"Low sensors are only used when a device has no percentage sensor.": "Low sensors are only used when a device has no percentage sensor."
}, or = {
	Stronger: "Stronger",
	Weaker: "Weaker",
	"Current state": "Current state",
	"Current activity": "Current activity",
	"No entities available for activity": "No entities available for activity",
	"Unable to load current activity": "Unable to load current activity",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	"This will turn off {count} active entities.": "This will turn off {count} active entities.",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
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
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Loading files...": "Loading files...",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colours",
	"No matching files": "No matching files",
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Person entity": "Person entity",
	Picker: "Picker",
	"Separate cards": "Separate cards",
	"State light color": "State light colour",
	"State color (default)": "State colour (default)",
	"State template": "State template",
	"Status {index}": "Status {index}",
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
	"Tracker entity": "Tracker entity",
	"Low sensors": "Low sensors",
	"Low sensors are only used when a device has no percentage sensor.": "Low sensors are only used when a device has no percentage sensor."
}, sr = {
	Stronger: "Stärker",
	Weaker: "Schwächer",
	"Current state": "Aktueller Zustand",
	"Current activity": "Aktuelle Aktivität",
	"No entities available for activity": "Keine Entitäten für Aktivitäten verfügbar",
	"Unable to load current activity": "Aktuelle Aktivität konnte nicht geladen werden",
	"Currently {state}": "Derzeit {state}",
	"No active entities": "Keine aktiven Entitäten",
	"This will turn off {count} active entities.": "Dadurch werden {count} aktive Entitäten ausgeschaltet.",
	Always: "Immer",
	"Area Count": "Bereichszähler",
	Badge: "Abzeichen",
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
	"Curve buttons": "Bogen-Tasten",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-Entität",
	Files: "Dateien",
	"Icon only": "Nur Symbol",
	"Items per row": "Elemente pro Zeile",
	"Loading files...": "Dateien werden geladen...",
	"Lock curve button positions": "Bogen-Tastenpositionen sperren",
	"Main entity": "Hauptentität",
	"Move left": "Nach links verschieben",
	"Move right": "Nach rechts verschieben",
	"No matching colors": "Keine passenden Farben",
	"No matching actions": "Keine passenden Aktionen",
	"No matching files": "Keine passenden Dateien",
	"Person entity": "Personen-Entität",
	Picker: "Auswahl",
	"Separate cards": "Separate Karten",
	"State light color": "Lichtstatusfarbe",
	"State color (default)": "Statusfarbe (Standard)",
	"State template": "Zustandsvorlage",
	"Status {index}": "Status {index}",
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
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Low sensors": "Sensoren für niedrigen Batteriestand",
	"Low sensors are only used when a device has no percentage sensor.": "Sensoren für niedrigen Batteriestand werden nur verwendet, wenn ein Gerät keinen Prozentsensor hat."
}, cr = {
	Stronger: "Más fuerte",
	Weaker: "Más débil",
	"Current state": "Estado actual",
	"Current activity": "Actividad actual",
	"No entities available for activity": "No hay entidades disponibles para la actividad",
	"Unable to load current activity": "No se pudo cargar la actividad actual",
	"Currently {state}": "Actualmente {state}",
	"No active entities": "No hay entidades activas",
	"This will turn off {count} active entities.": "Esto apagará {count} entidades activas.",
	Always: "Siempre",
	"Area Count": "Recuento de área",
	Badge: "Insignia",
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
	"Curve buttons": "Botones curvos",
	Dynamic: "Dinámico",
	"ETA entity": "Entidad ETA",
	Files: "Archivos",
	"Icon only": "Solo icono",
	"Items per row": "Elementos por fila",
	"Loading files...": "Cargando archivos...",
	"Lock curve button positions": "Bloquear posiciones de botones curvos",
	"Main entity": "Entidad principal",
	"Move left": "Mover a la izquierda",
	"Move right": "Mover a la derecha",
	"No matching colors": "No hay colores coincidentes",
	"No matching actions": "No hay acciones coincidentes",
	"No matching files": "No hay archivos coincidentes",
	"Person entity": "Entidad de persona",
	Picker: "Selector",
	"Separate cards": "Tarjetas separadas",
	"State light color": "Color de luz de estado",
	"State color (default)": "Color de estado (predeterminado)",
	"State template": "Plantilla de estado",
	"Status {index}": "Estado {index}",
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
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Low sensors": "Sensores de batería baja",
	"Low sensors are only used when a device has no percentage sensor.": "Los sensores de batería baja solo se usan cuando un dispositivo no tiene un sensor de porcentaje."
}, lr = {
	Stronger: "Plus fort",
	Weaker: "Plus faible",
	"Current state": "État actuel",
	"Current activity": "Activité actuelle",
	"No entities available for activity": "Aucune entité disponible pour l’activité",
	"Unable to load current activity": "Impossible de charger l’activité actuelle",
	"Currently {state}": "Actuellement {state}",
	"No active entities": "Aucune entité active",
	"This will turn off {count} active entities.": "Cela éteindra {count} entités actives.",
	Always: "Toujours",
	"Area Count": "Comptage de zone",
	Badge: "Badge",
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
	"Curve buttons": "Boutons courbes",
	Dynamic: "Dynamique",
	"ETA entity": "Entité ETA",
	Files: "Fichiers",
	"Icon only": "Icône seule",
	"Items per row": "Éléments par ligne",
	"Loading files...": "Chargement des fichiers...",
	"Lock curve button positions": "Verrouiller les positions des boutons courbes",
	"Main entity": "Entité principale",
	"Move left": "Déplacer à gauche",
	"Move right": "Déplacer à droite",
	"No matching colors": "Aucune couleur correspondante",
	"No matching actions": "Aucune action correspondante",
	"No matching files": "Aucun fichier correspondant",
	"Person entity": "Entité personne",
	Picker: "Sélecteur",
	"Separate cards": "Cartes séparées",
	"State light color": "Couleur d’état de lumière",
	"State color (default)": "Couleur d’état (par défaut)",
	"State template": "Modèle d'état",
	"Status {index}": "Statut {index}",
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
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Low sensors": "Capteurs de batterie faible",
	"Low sensors are only used when a device has no percentage sensor.": "Les capteurs de batterie faible ne sont utilisés que lorsqu’un appareil ne possède pas de capteur de pourcentage."
}, ur = {
	Stronger: "Più forte",
	Weaker: "Più debole",
	"Current state": "Stato attuale",
	"Current activity": "Attività corrente",
	"No entities available for activity": "Nessuna entità disponibile per l’attività",
	"Unable to load current activity": "Impossibile caricare l’attività corrente",
	"Currently {state}": "Attualmente {state}",
	"No active entities": "Nessuna entità attiva",
	"This will turn off {count} active entities.": "Verranno disattivate {count} entità attive.",
	Always: "Sempre",
	"Area Count": "Conteggio area",
	Badge: "Badge",
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
	"Curve buttons": "Pulsanti curvi",
	Dynamic: "Dinamico",
	"ETA entity": "Entità ETA",
	Files: "File",
	"Icon only": "Solo icona",
	"Items per row": "Elementi per riga",
	"Loading files...": "Caricamento file...",
	"Lock curve button positions": "Blocca posizioni dei pulsanti curvi",
	"Main entity": "Entità principale",
	"Move left": "Sposta a sinistra",
	"Move right": "Sposta a destra",
	"No matching colors": "Nessun colore corrispondente",
	"No matching actions": "Nessuna azione corrispondente",
	"No matching files": "Nessun file corrispondente",
	"Person entity": "Entità persona",
	Picker: "Selettore",
	"Separate cards": "Schede separate",
	"State light color": "Colore stato luce",
	"State color (default)": "Colore stato (predefinito)",
	"State template": "Template stato",
	"Status {index}": "Stato {index}",
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
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Low sensors": "Sensori di batteria scarica",
	"Low sensors are only used when a device has no percentage sensor.": "I sensori di batteria scarica vengono usati solo quando un dispositivo non dispone di un sensore percentuale."
}, dr = {
	Stronger: "Sterker",
	Weaker: "Zwakker",
	"Current state": "Huidige status",
	"Current activity": "Huidige activiteit",
	"No entities available for activity": "Geen entiteiten beschikbaar voor activiteit",
	"Unable to load current activity": "Kan huidige activiteit niet laden",
	"Currently {state}": "Momenteel {state}",
	"No active entities": "Geen actieve entiteiten",
	"This will turn off {count} active entities.": "Hiermee worden {count} actieve entiteiten uitgeschakeld.",
	Always: "Altijd",
	"Area Count": "Gebiedstelling",
	Badge: "Badge",
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
	"Curve buttons": "Gebogen knoppen",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-entiteit",
	Files: "Bestanden",
	"Icon only": "Alleen icoon",
	"Items per row": "Items per rij",
	"Loading files...": "Bestanden laden...",
	"Lock curve button positions": "Posities van gebogen knoppen vergrendelen",
	"Main entity": "Hoofdentiteit",
	"Move left": "Naar links verplaatsen",
	"Move right": "Naar rechts verplaatsen",
	"No matching colors": "Geen overeenkomende kleuren",
	"No matching actions": "Geen overeenkomende acties",
	"No matching files": "Geen overeenkomende bestanden",
	"Person entity": "Persoon-entiteit",
	Picker: "Kiezer",
	"Separate cards": "Aparte kaarten",
	"State light color": "Statuskleur licht",
	"State color (default)": "Statuskleur (standaard)",
	"State template": "Statussjabloon",
	"Status {index}": "Status {index}",
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
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Low sensors": "Sensoren voor lage batterij",
	"Low sensors are only used when a device has no percentage sensor.": "Sensoren voor lage batterij worden alleen gebruikt als een apparaat geen percentagesensor heeft."
}, fr = {
	Stronger: "Mais forte",
	Weaker: "Mais fraco",
	"Current state": "Estado atual",
	"Current activity": "Atividade atual",
	"No entities available for activity": "Nenhuma entidade disponível para atividade",
	"Unable to load current activity": "Não foi possível carregar a atividade atual",
	"Currently {state}": "Atualmente {state}",
	"No active entities": "Nenhuma entidade ativa",
	"This will turn off {count} active entities.": "Isso desligará {count} entidades ativas.",
	Always: "Sempre",
	"Area Count": "Contagem da área",
	Badge: "Emblema",
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
	"Curve buttons": "Botões curvos",
	Dynamic: "Dinâmico",
	"ETA entity": "Entidade ETA",
	Files: "Arquivos",
	"Icon only": "Somente ícone",
	"Items per row": "Itens por linha",
	"Loading files...": "Carregando arquivos...",
	"Lock curve button positions": "Bloquear posições dos botões curvos",
	"Main entity": "Entidade principal",
	"Move left": "Mover para a esquerda",
	"Move right": "Mover para a direita",
	"No matching colors": "Nenhuma cor correspondente",
	"No matching actions": "Nenhuma ação correspondente",
	"No matching files": "Nenhum arquivo correspondente",
	"Person entity": "Entidade de pessoa",
	Picker: "Seletor",
	"Separate cards": "Cartões separados",
	"State light color": "Cor de estado da luz",
	"State color (default)": "Cor de estado (padrão)",
	"State template": "Modelo de estado",
	"Status {index}": "Status {index}",
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
	"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
	"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
	"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
	"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
	"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
	"Low sensors": "Sensores de bateria fraca",
	"Low sensors are only used when a device has no percentage sensor.": "Os sensores de bateria fraca só são usados quando um dispositivo não tem um sensor de porcentagem."
}, pr = {
	de: sr,
	en: ar,
	"en-gb": or,
	en_gb: or,
	es: cr,
	fr: lr,
	it: ur,
	nl: dr,
	"pt-br": fr,
	pt_br: fr
};
function V(e, t, n = {}) {
	let r = _r(e), i = r.replace("_", "-"), a = r.split("-")[0], o = mr(e, t) || gr(r, t) || gr(i, t) || gr(a, t) || pr.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function mr(e, t) {
	if (!e?.localize || !t) return null;
	let n = hr[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
var hr = {
	Activity: ["panel.logbook"],
	Add: ["ui.common.add"],
	Above: ["ui.components.selectors.numeric_threshold.crossed.above", "ui.panel.config.automation.editor.conditions.type.numeric_state.above"],
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
	Below: ["ui.components.selectors.numeric_threshold.crossed.below", "ui.panel.config.automation.editor.conditions.type.numeric_state.below"],
	"Binary sensors": ["component.binary_sensor.entity_component._.name_plural"],
	"Binary Sensors": ["component.binary_sensor.entity_component._.name_plural"],
	Badges: ["ui.panel.lovelace.editor.card.heading.badges", "ui.panel.lovelace.editor.badges.name"],
	Color: ["ui.panel.lovelace.editor.card.tile.color", "ui.dialogs.label-detail.color"],
	Clear: ["ui.common.clear"],
	Current: ["ui.common.current"],
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
	Divider: ["ui.panel.lovelace.editor.card.entities.entity_row.divider"],
	Default: ["ui.common.default"],
	"Device class": ["ui.components.device-class-picker.device_class"],
	Duplicate: ["ui.common.duplicate"],
	Equal: ["ui.components.selectors.select.options.equal"],
	Icon: ["ui.components.selectors.selector.types.icon", "ui.panel.lovelace.editor.card.generic.icon"],
	Hide: ["ui.common.hide"],
	Inactive: ["ui.components.color-picker.colors.inactive"],
	Interactions: ["ui.panel.lovelace.editor.card.tile.interactions", "ui.panel.lovelace.editor.card.generic.interactions"],
	Threshold: ["ui.components.selectors.selector.types.threshold", "ui.panel.config.automation.editor.conditions.type.numeric_state.threshold"],
	None: ["ui.common.none"],
	Accent: ["ui.components.color-picker.colors.accent"],
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
	Person: ["component.person.entity_component._.name"],
	Prefix: ["ui.panel.lovelace.editor.elements.prefix"],
	Primary: ["ui.components.color-picker.colors.primary"],
	Name: ["ui.common.name"],
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
	"State content": ["ui.panel.lovelace.editor.badge.entity.state_content"],
	Status: ["ui.panel.config.entities.picker.headers.status"],
	Style: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style", "ui.panel.lovelace.editor.features.types.numeric-input.style"],
	"Tap behavior": ["ui.panel.lovelace.editor.card.generic.tap_action"],
	Theme: ["ui.components.selectors.selector.types.theme", "ui.components.theme-picker.theme"],
	Template: ["ui.components.selectors.selector.types.template"],
	"Entity not found": ["ui.card.common.entity_not_found"],
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
function gr(e, t) {
	let n = pr[e]?.[t];
	return n === "" ? null : n;
}
function _r(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
//#endregion
//#region src/common/helpers/default-actions.js
var vr = {
	automation: "automation.trigger",
	button: "button.press",
	input_button: "input_button.press",
	scene: "scene.turn_on",
	script: "script.turn_on"
}, yr = new Set([
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
function br(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = vr[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : yr.has(n) ? { action: "toggle" } : { action: t };
}
//#endregion
//#region src/cards/area/helpers/model.js
function xr(e, t) {
	return e?.[`${t}_source`] === "template" ? "template" : "entity";
}
function Sr(e) {
	return [
		1,
		2,
		3
	].flatMap((t) => {
		let n = `status${t}`, r = e?.[`${n}_template`];
		return xr(e, n) === "template" && r ? [{
			template: r,
			entityId: e?.[n] || ""
		}] : [];
	});
}
function Cr(e, t, n = "") {
	let r = e?.[`${t}_icon_source`], i = !!(n || e?.[t]);
	return r === "custom" ? "custom" : r === "template" ? "template" : r === "none" ? "none" : r === "entity" && i ? "entity" : e?.[`${t}_icon`] ? "custom" : "none";
}
function wr(e, t, n) {
	if (!e) return "—";
	if (t === void 0 || t === "") return n(e);
	let r = Number(t), i = Number(e.state);
	if (!Number.isFinite(r) || !Number.isFinite(i)) return n(e);
	let a = e.attributes.unit_of_measurement || "";
	return `${i.toFixed(Math.max(0, r))}${a}`;
}
//#endregion
//#region src/cards/area/helpers/lifecycle.js
function Tr(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	this._cardName = this._getCardName("");
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = this._config?.state_template, a = this._evaluateStateTemplate(i, t), o = i ? bt(a, t?.split(".")[0] || "") : r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, o);
	let s = this._config.icon_on, c = this._config.icon_off, l = Wr(this._config, n, t), u = Hn.call(this, this._config.icon, t), d = ["custom", "template"].includes(l), f = n && this.hass?.areas?.[n] && this.hass.areas[n].icon || "mdi:sofa", p = l === "template" ? u : d && ((o ? s : c) || u) || "";
	this._mainStateObj = r, this._useNativeMainIcon = !!r && l !== "area" && l !== "template" && !p;
	let m = l === "template" && u ? "icon" : d && o && s ? "icon_on" : d && !o && c ? "icon_off" : d && u ? "icon" : "";
	this._icon = p || f, this._iconSvgForceColor = m ? this._getSvgColorOverride(m) : !0, this._statusItems = Er.call(this), this._buttonModels = Or.call(this), this._curveButtonModels = kr.call(this), this._actionButtonModel = Ar.call(this);
}
function Er() {
	return [
		1,
		2,
		3
	].map((e) => {
		let t = `status${e}`, n = this._config[t] || "", r = xr(this._config, t) === "template", i = this._config[`${t}_template`];
		if (r ? !i : !n) return null;
		let a = this.hass?.states[n], o = Cr(this._config, t, n), s = Hn.call(this, this._config[`${t}_icon`], n), c = ["custom", "template"].includes(o) ? s : !r && !a ? "mdi:alert-circle-outline" : "";
		return {
			entityId: n,
			stateObj: a,
			isTemplate: r,
			useStateIcon: o === "entity" && !!a,
			text: r ? String(this._evaluateStateTemplate(i, n) ?? "—") : wr(a, this._config[`status${e}_decimal_places`], (e) => this.formatState(e)),
			icon: c,
			iconPath: this._isImageIcon(c) ? this._resolveIconPath(c) : "",
			isImage: this._isImageIcon(c),
			isHaIcon: Dr(c)
		};
	}).filter(Boolean);
}
function Dr(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function Or() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => jr.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: Lr,
		getBackgroundColor: Ir
	})).filter(Boolean);
}
function kr() {
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
		let i = jr.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: Br,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function Ar() {
	let e = this._config.action_button;
	return e ? jr.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: br(e),
		defaultHoldAction: null,
		getIconColor: Vr,
		getBackgroundColor: null
	}) : null;
}
function jr(e, t, n, r) {
	let i = this.hass?.states[t], a = !!(t && !i), o = r.key || `${e}${n + 1}`, s = this._config?.[`${o}_state_template`], c = this._evaluateStateTemplate(s, t), l = t.split(".")[0], u = s ? bt(c, l) : Mr.has(l) ? !1 : this._getEntityActiveState(i), d = Fr.call(this, o, t), f = Pr.call(this, o, u) || (a ? "mdi:alert-circle-outline" : ""), p = this._isImageIcon(f), m = this._buttonIconStates?.get(o), h = !!(m && m.entityId === t && m.isOn !== u);
	return this._buttonIconStates ||= /* @__PURE__ */ new Map(), this._buttonIconStates.set(o, {
		entityId: t,
		isOn: u
	}), {
		entityId: t,
		stateObj: i,
		useStateIcon: !!i && (d === "entity" || d !== "template" && !f),
		holdAction: this._config?.[`${o}_hold_action`] || r.defaultHoldAction,
		doubleTapAction: this._config?.[`${o}_double_tap_action`] || null,
		tapAction: this._config?.[`${o}_tap_action`] || r.defaultAction,
		backgroundColor: a ? "color-mix(in srgb, var(--error-color) 12%, transparent)" : r.getBackgroundColor ? r.getBackgroundColor.call(this, o, i, u) : "",
		icon: f,
		iconColor: a ? "var(--error-color)" : r.getIconColor.call(this, o, i, u),
		iconPath: p ? this._resolveIconPath(f) : "",
		svgForceColor: Nr.call(this, o, u),
		animateIcon: h,
		isImage: p
	};
}
var Mr = new Set(/* @__PURE__ */ "ai_task.button.conversation.date.datetime.event.image.infrared.input_button.input_datetime.input_number.input_select.input_text.notify.number.radio_frequency.scene.select.sensor.stt.tag.text.time.tts.wake_word.weather".split("."));
function Nr(e, t) {
	let n = Fr.call(this, e);
	if (!["custom", "template"].includes(n)) return !0;
	let r = this._config?.[`${e}_icon`], i = n === "template" ? r ? `${e}_icon` : "" : t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : r ? `${e}_icon` : "";
	return i ? this._getSvgColorOverride(i) : !0;
}
function Pr(e, t) {
	let n = this._config?.[`${e}_icon_on`], r = this._config?.[`${e}_icon_off`], i = Fr.call(this, e), a = Hn.call(this, this._config?.[`${e}_icon`], this._config?.[e] || "");
	return i === "entity" ? "" : i === "template" ? a : (t ? n : r) || a || "";
}
function Fr(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "template" ? "template" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] || this._config?.[`${e}_icon_on`] || this._config?.[`${e}_icon_off`] ? "custom" : "entity";
}
function Ir(e, t, n) {
	if (n) return this._computeButtonBackground(Rr.call(this, e, t));
	let r = L.call(this, Hr.call(this, e, !1));
	return !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : Jt.call(this, r, 10);
}
function Lr(e, t, n) {
	if (n) return this._computeFullColor(Rr.call(this, e, t));
	let r = L.call(this, Hr.call(this, e, !1));
	return r.startsWith("rgba(") ? r : this._computeIconColor(r);
}
function Rr(e, t) {
	let n = L.call(this, Hr.call(this, e, !0));
	return n === "light" ? this._getEntityColor(t) || this._config.color || "theme" : n;
}
function zr(e, t, n) {
	let r = L.call(this, this._config.color || "theme");
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : n ? this._computeFullColor(r) : Jt.call(this, r, 40);
}
function Br(e, t, n) {
	let r = Hr.call(this, e, n, ""), i = L.call(this, r);
	return i && i !== "theme" ? Ur.call(this, e, t, n, i) : zr.call(this, e, t, n);
}
function Vr(e, t, n) {
	let r = Hr.call(this, e, n, ""), i = L.call(this, r);
	return i && i !== "theme" ? Ur.call(this, e, t, n, i) : zr.call(this, e, t, n);
}
function Hr(e, t, n = "theme") {
	return this._config?.[`${e}_color_source`] === "template" ? this._config?.[`${e}_color`] || n : this._config?.[`${e}_color_${t ? "on" : "off"}`] || n;
}
function Ur(e, t, n, r) {
	return n ? Lr.call(this, e, t, !0) : r.startsWith("rgba(") ? r : Jt.call(this, r, 40);
}
function Wr(e = {}, t, n) {
	let r = e.icon_source, i = !!t, a = !!n;
	return r === "custom" ? r : r === "template" ? "template" : r === "area" && i ? "area" : r === "entity" && a ? "entity" : i ? "area" : a ? "entity" : "area";
}
//#endregion
//#region node_modules/lit-html/directive.js
var Gr = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Kr = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), qr = class {
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
}, Jr = class extends qr {
	constructor(e) {
		if (super(e), this.it = k, e.type !== Gr.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === k || e == null) return this._t = void 0, this.it = e;
		if (e === O) return e;
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
Jr.directiveName = "unsafeHTML", Jr.resultType = 1;
var H = Kr(Jr);
//#endregion
//#region src/cards/area/renders/buttons.js
function Yr(e) {
	if (!e) return null;
	let t = pt(e.entityId, e.stateObj), n = t ? this._t(t === "missing" ? "Entity not found" : "Unavailable") : "";
	return D`
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
        ${e.isImage ? D`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? H(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon)) : ""}
              </div>
            ` : e.useStateIcon && e.stateObj ? D`
                <ha-state-icon
                  .stateObj=${e.stateObj}
                  style="color:${e.iconColor};"
                ></ha-state-icon>
              ` : D`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
        ${t ? D`
              <ha-tile-badge
                class="entity-unavailable-badge ${t === "missing" ? "entity-missing-badge" : ""}"
                title=${n}
                aria-label=${n}
              >
                <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
              </ha-tile-badge>
            ` : ""}
      </button>
    `;
}
//#endregion
//#region src/cards/area/renders/area-card.js
function Xr() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return D`
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
              ${Zr.call(this)}
            </div>
          </div>

          ${e.length ? D`
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
            ${this._isImageIcon(this._icon) ? D`
                  <div
                    class="main-image-icon"
                    style="color:${this._iconColor};"
                  >
                    ${n ? H(n) : D`<img src=${t} alt="" />`}
                  </div>
                ` : this._useNativeMainIcon && this._mainStateObj ? D`
                    <ha-state-icon
                      class="main-icon"
                      .stateObj=${this._mainStateObj}
                      style="color:${this._iconColor}"
                    ></ha-state-icon>
                  ` : D`
                  <ha-icon
                    class="main-icon"
                    .icon=${this._icon}
                    style="color:${this._iconColor}"
                  ></ha-icon>
                `}

            ${$r.call(this, this._config.main_entity || this._config.entity, this._mainStateObj)}
          </div>

        </div>

      </div>
    </ha-card>
  `;
}
function Zr() {
	let e = this._statusItems || [];
	if (!e.length) return this._statusText || "";
	let t = this._config?.status_separator || "|";
	return e.map((e, n) => D`
    ${n > 0 ? D`
          <span class="status-separator">
            ${t}
          </span>
        ` : ""}
    <span class="status-item">
      ${Qr.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function Qr(e) {
	if (!e.isTemplate && pt(e.entityId, e.stateObj) === "missing") {
		let e = this._t("Entity not found");
		return D`
      <ha-icon
        class="status-prefix-icon"
        .icon=${"mdi:alert-circle-outline"}
        title=${e}
        aria-label=${e}
        style="color:var(--error-color)"
      ></ha-icon>
    `;
	}
	return !e.icon && !e.useStateIcon ? "" : e.isImage ? D`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? H(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.useStateIcon && e.stateObj ? D`
      <ha-state-icon
        class="status-prefix-icon"
        .stateObj=${e.stateObj}
      ></ha-state-icon>
    ` : e.isHaIcon ? D`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : D`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  `;
}
function $r(e, t) {
	let n = pt(e, t);
	if (!n) return "";
	let r = this._t(n === "missing" ? "Entity not found" : "Unavailable");
	return D`
    <ha-tile-badge
      class="entity-unavailable-badge ${n === "missing" ? "entity-missing-badge" : ""}"
      title=${r}
      aria-label=${r}
    >
      <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
    </ha-tile-badge>
  `;
}
//#endregion
//#region node_modules/lit-html/directive-helpers.js
var { I: ei } = Ie, ti = (e) => e, ni = () => document.createComment(""), ri = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new ei(r.insertBefore(ni(), i), r.insertBefore(ni(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = ti(e).nextSibling;
				ti(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, ii = (e, t, n = e) => (e._$AI(t, n), e), ai = {}, oi = (e, t = ai) => e._$AH = t, si = (e) => e._$AH, ci = (e) => {
	e._$AR(), e._$AA.remove();
}, li = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, ui = Kr(class extends qr {
	constructor(e) {
		if (super(e), e.type !== Gr.CHILD) throw Error("repeat() can only be used in text expressions");
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
		let i = si(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = ii(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = ii(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = ii(i[d], a[m]), ri(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = ii(i[f], a[p]), ri(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = li(o, p, m), u = li(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
			let t = u.get(o[p]), n = t === void 0 ? null : i[t];
			if (n === null) {
				let t = ri(e, i[d]);
				ii(t, a[p]), c[p] = t;
			} else c[p] = ii(n, a[p]), ri(e, i[d], n), i[t] = null;
			p++;
		} else ci(i[f]), f--;
		else ci(i[d]), d++;
		for (; p <= m;) {
			let t = ri(e, c[m + 1]);
			ii(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && ci(e);
		}
		return this.ut = o, oi(e, c), O;
	}
});
//#endregion
//#region src/cards/area/renders/curve-buttons.js
function di() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return D`
      <div class="curve-buttons">

        ${ui(e, (e, t) => t, (e) => e.empty ? D`
              <div class="curve-button pos-${e.position}"></div>
            ` : D`
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
              ${e.isImage ? D`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${H(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
                    </div>
                  ` : e.useStateIcon && e.stateObj ? D`
                      <ha-state-icon
                        .stateObj=${e.stateObj}
                        style="color:${e.iconColor};"
                      ></ha-state-icon>
                    ` : D`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
              ${pi.call(this, e.entityId, e.stateObj)}
            </button>
          `)}

      ${t ? fi.call(this, t) : ""}

      </div>
    `;
}
function fi(e) {
	return D`
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
      ${e.isImage ? D`
            <div
              class="curve-image-icon"
              style="color:${e.iconColor};"
            >
              ${H(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
            </div>
          ` : e.useStateIcon && e.stateObj ? D`
              <ha-state-icon
                .stateObj=${e.stateObj}
                style="color:${e.iconColor};"
              ></ha-state-icon>
            ` : D`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
      ${pi.call(this, e.entityId, e.stateObj)}
    </button>
  `;
}
function pi(e, t) {
	let n = pt(e, t);
	if (!n) return "";
	let r = this._t(n === "missing" ? "Entity not found" : "Unavailable");
	return D`
    <ha-tile-badge
      class="entity-unavailable-badge ${n === "missing" ? "entity-missing-badge" : ""}"
      title=${r}
      aria-label=${r}
    >
      <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
    </ha-tile-badge>
  `;
}
//#endregion
//#region src/common/styles/header.js
var mi = d`
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
`, hi = d`
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
`, gi = d`
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

  .entity-unavailable-badge.entity-missing-badge {
    --tile-badge-background-color: var(--error-color);
  }
`, _i = d`
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
`, vi = d`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`, yi = d`
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
`, bi = d`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`, xi = d`
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
`, Si = d`
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
`, Ci = d`
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
`, wi = d`
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
`, Ti = [
	hi,
	mi,
	gi,
	vi,
	_i,
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
	Ci,
	wi,
	yi,
	bi,
	xi,
	Si
];
//#endregion
//#region src/common/editor/helpers/icon.js
function U(e, t) {
	return Array.isArray(t) ? Ei(e, t.map((t) => U(e, t))) : e._t ? e._t(t) : t;
}
function Ei(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Di(e)).join(" ") : t.join(" ");
}
function Di(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function Oi(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function ki(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Ai(e, t) {
	let n = this._config?.[t] || "", r = `${this._iconPickerPrefix || "icon"}-${t}`, i = n && this._isImageIcon(n) ? "files" : "ha", a = this._iconPickerKey === r && this._iconPickerTab || i;
	return a === "files" && !this._orbitIconFilesLoading && !this._localIconFilesLoading && !(this._orbitIconFiles || []).length && !(this._localIconFiles || []).length && queueMicrotask(() => this._loadLocalIconFiles?.(n)), D`
    <div class="field">
      ${e ? D`<label>${U(this, e)}</label>` : ""}

      <div
        class="icon-picker-panel"
        @click=${(e) => e.stopPropagation()}
      >
        <div class="icon-tabs">
          <button
            type="button"
            class=${a === "ha" ? "active" : ""}
            aria-label=${U(this, "Icons")}
            title=${U(this, "Icons")}
            @click=${() => {
		this._iconPickerKey = r, this._iconPickerTab = "ha";
	}}
          >
            ${U(this, "Icons")}
          </button>
          <button
            type="button"
            class=${a === "files" ? "active" : ""}
            aria-label=${U(this, "Files")}
            title=${U(this, "Files")}
            @click=${() => {
		this._iconPickerKey = r, this._iconPickerTab = "files", this._loadLocalIconFiles?.(n);
	}}
          >
            ${U(this, "Files")}
          </button>
        </div>

        ${a === "files" ? Fi.call(this, t, n) : Pi.call(this, t, n)}
      </div>
    </div>
  `;
}
function ji({ label: e = "Icon", sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", defaultSource: r = "entity", defaultSourceLabel: i = "Entity", areaKey: a = "area", allowArea: o = !1, allowNone: s = !1, customIconKeys: c = [], templateKey: l, legacySourceKey: u, legacyTemplateKeys: d = [], renderCustom: f } = {}) {
	let p = Mi(u && this._config?.[t] == null ? {
		...this._config,
		[t]: this._config?.[u]
	} : this._config, {
		sourceKey: t,
		entityKey: n,
		defaultSource: r,
		areaKey: a,
		allowArea: o,
		allowNone: s,
		customIconKeys: c
	}), m = p === "custom", h = p === "template", g = c[0] || "icon", _ = l || `${g}_template`, v = F(this._config?.[g]) ? this._config[g] : "", ee = this._config?.[_] || d.map((e) => this._config?.[e]).find(Boolean) || v, y = [
		s ? {
			label: U(this, "None"),
			value: "none"
		} : null,
		o ? {
			label: U(this, "Area"),
			value: "area"
		} : null,
		{
			label: U(this, i),
			value: r
		},
		{
			label: U(this, "Custom"),
			value: "custom"
		},
		{
			label: U(this, "Template"),
			value: "template"
		}
	].filter(Boolean);
	return D`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${U(this, e)}</label>

        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: y } }}
          .value=${p}
          @value-changed=${(e) => {
		let n = e.detail.value || (s ? "none" : "custom");
		_ === g && p !== n && [p, n].includes("template") && this._handleConfigUpdate(g, ""), _ !== g && p === "template" && n !== "template" && v && (this._handleConfigUpdate(_, v), this._handleConfigUpdate(g, "")), this._handleConfigUpdate(t, n);
	}}
        ></ha-selector>
      </div>

      ${m && f ? f.call(this) : ""}
      ${h ? D`
            <div class="field icon-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${ee}
                @value-changed=${(e) => {
		v && this._handleConfigUpdate(g, ""), this._handleConfigUpdate(_, e.detail.value || "");
	}}
              ></ha-selector>
            </div>
          ` : ""}
    </div>
  `;
}
function Mi(e = {}, { sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", defaultSource: r = "entity", areaKey: i = "area", allowArea: a = !1, allowNone: o = !1, customIconKeys: s = [] } = {}) {
	let c = e[t], l = a && !!e[i], u = !!(e[n] || e.entity), d = r === "domain" ? !!e.domain : u, f = s.some((t) => !!e[t]);
	if (c === "custom") return "custom";
	if (c === "template") return "template";
	if (c === "none" && o) return "none";
	if (c === "area" && l) return "area";
	if (c === r && d) return r;
	if (a) {
		if (l) return "area";
		if (u) return "entity";
	}
	return f ? "custom" : o ? "none" : d ? r : a ? "area" : r;
}
async function Ni(e = "") {
	let t = ea(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([qi(), Ji()]);
	this._orbitIconFiles = na(n), this._localIconFiles = na([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function Pi(e, t) {
	return D`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${t && !this._isImageIcon(t) ? t : ""}
      @value-changed=${(t) => {
		this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-icon-picker>
  `;
}
function Fi(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [], i = Ii([...n, ...r]);
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? D`
      <div class="icon-picker-note">${U(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? D`
      <div class="icon-picker-note">
        ${U(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : D`
    <ha-generic-picker
      .value=${t && this._isImageIcon(t) ? t : ""}
      .getItems=${(e) => Ri(i, e)}
      .rowRenderer=${(e) => zi.call(this, e)}
      .valueRenderer=${(e) => Bi.call(this, i.find((t) => t.id === e))}
      .notFoundLabel=${U(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${!0}
      @value-changed=${(t) => {
		t.stopPropagation(), this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-generic-picker>
  `;
}
function Ii(e) {
	return na(e).map((e) => {
		let t = ta(e), n = Li(e);
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
function Li(e) {
	return `${e.source ? `${e.source}:` : ""}${(e.name || e.file || "").trim().replace(/\s+/g, "-")}`;
}
function Ri(e, t = "") {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => Object.values(e.search_labels || {}).some((e) => String(e).toLowerCase().includes(n))) : e;
}
function zi(e) {
	return D`
    <ha-combo-box-item type="button" compact>
      ${Vi.call(this, e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function Bi(e) {
	return e ? D`
    ${Vi.call(this, e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function Vi(e) {
	return e?.iconFile ? D`
    <span
      slot="start"
      class="file-picker-preview"
      style=${Ui()}
    >
      ${Hi.call(this, e.iconFile)}
    </span>
  ` : "";
}
function Hi(e) {
	let t = ta(e), n = this._resolveIconPath(t);
	if (!n) return D``;
	let r = this._getInlineSvg ? this._getInlineSvg(n) : "", i = this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? !1, a = Ui(), o = Wi(i);
	return D`
    <span
      class="file-picker-preview-inner"
      style=${a}
    >
      ${r ? D`${H(Gi(r))}` : D`
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
function Ui() {
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
function Wi(e) {
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
function Gi(e) {
	if (!e) return "";
	let t = Ki(e.replace(/<\?xml[^>]*>/gi, "").trim()), n = t.match(/<svg\b[^>]*>/i)?.[0];
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
function Ki(e) {
	let t = "(?!none\\b|currentColor\\b|transparent\\b|inherit\\b|url\\()(?:rgb\\([^)]*\\)|rgba\\([^)]*\\)|hsl\\([^)]*\\)|hsla\\([^)]*\\)|[^\"';)]+)";
	return e.replace(RegExp(`\\s(fill|stroke)=(["'])${t}\\2`, "gi"), (e, t) => ` ${t}="currentColor"`).replace(RegExp(`(fill|stroke)\\s*:\\s*${t}`, "gi"), (e, t) => `${t}:currentColor`);
}
async function qi() {
	return zn.filter(Qi).map((e) => $i(e, "orbit"));
}
async function Ji() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await Yi([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await Xi();
	return [
		...e,
		...t,
		...n
	].filter(Qi).map((e) => $i(e, "local"));
}
async function Yi(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(Qi).map((e) => $i(e));
	} catch {}
	return [];
}
async function Xi() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function Zi(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function Qi(e) {
	return Oi(Zi(e));
}
function $i(e, t = "") {
	let n = Zi(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function ea(e) {
	if (!e || !Qi(e)) return null;
	let t = Zi(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function ta(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function na(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
//#endregion
//#region src/common/editor/helpers/inputs.js
function ra(e, t) {
	return Array.isArray(t) ? ia(e, t.map((t) => ra(e, t))) : e._t ? e._t(t) : t;
}
function ia(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : aa(e)).join(" ") : t.join(" ");
}
function aa(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function oa(e, t, n, r = {}) {
	let i = r.externalLabel === !0, a = r.value ?? this._config?.[t] ?? "", o = r.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return D`
      <div class="field">
        ${i ? D`<label>${ra(this, e)}</label>` : ""}

        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : ra(this, e)}
          .selector=${{ text: {} }}
          .value=${a}
          .placeholder=${n}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function sa(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.hideLabel === !0, a = n.required !== !1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return D`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : ra(this, e)}
          .selector=${{ template: {} }}
          .required=${a}
          .value=${r}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function ca(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.min ?? 0, a = n.step ?? 1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return D`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${ra(this, e)}
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
function la(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function W(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function G(e, t = []) {
	return W([e, ...t]);
}
function ua(e, t = []) {
	return W([e, ...t.map((t) => `${e}${t}`)]);
}
//#endregion
//#region src/common/editor/helpers/labels.js
function K(e, t, n) {
	return Array.isArray(t) ? da(e, t.map((t) => K(e, t, n))) : e._t ? e._t(t, n) : t;
}
function da(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : fa(e)).join(" ") : t.join(" ");
}
function fa(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
//#endregion
//#region src/common/editor/helpers/entity-filter-scroll-guard.js
var pa = !1;
function ma() {
	if (pa) return;
	let e = Element.prototype.scrollIntoView;
	Element.prototype.scrollIntoView = function(...t) {
		if (ga(this)) {
			ha(this);
			return;
		}
		return e.apply(this, t);
	}, pa = !0;
}
function ha(e) {
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
function ga(e) {
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
//#endregion
//#region src/common/editor/helpers/color-picker.js
function _a(e, t, n) {
	let r = this._config?.[t] || "";
	return va.call(this, e, t, r, (e) => this._handleConfigUpdate(t, e), n);
}
function va(e, t, n, r, i, a = !0) {
	Ma.call(this);
	let o = !a && F(n) ? "" : n, s = xa.call(this, o, i), c = $a(o || s), l = this._colorPickerKey === t && this._colorPickerTab || c, u = !a && l === "template" ? $a(s) === "template" ? "theme" : $a(s) : l;
	return D`
    <div class="field">
      <div class="color-row">
        <div
          class="color-popover"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="color-tabs">
            <button
              type="button"
              class=${u === "picker" ? "active" : ""}
              aria-label=${K(this, "Picker")}
              title=${K(this, "Picker")}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "picker", this._themeColorPickerOpen = !1;
		let e = o || s;
		if (e && !eo(e)) {
			let t = this._getColorPickerValue(e);
			t && r(t);
		}
	}}
            >
              <ha-icon icon="mdi:eyedropper"></ha-icon>
            </button>
            <button
              type="button"
              class=${u === "theme" ? "active" : ""}
              aria-label=${K(this, "Theme")}
              title=${K(this, "Theme")}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "theme", this._themeColorPickerOpen = !1, this._themeColorSearch = "";
	}}
            >
              <ha-icon icon="mdi:palette-swatch"></ha-icon>
            </button>
            ${a ? D`
                  <button
                    type="button"
                    class=${u === "template" ? "active" : ""}
                    aria-label=${K(this, "Template")}
                    title=${K(this, "Template")}
                    @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "template", this._themeColorPickerOpen = !1;
	}}
                  >
                    <ha-icon icon="mdi:code-braces"></ha-icon>
                  </button>
                ` : ""}
          </div>

          ${u === "template" ? ba.call(this, e, o, r) : u === "theme" ? D`
                ${Ca.call(this, e, o, r, s, t)}
              ` : D`
                ${Sa.call(this, e, o, r, s)}
              `}
        </div>
      </div>
    </div>
  `;
}
function ya({ label: e = "Color", onLabel: t = ["Active", "Color"], offLabel: n = ["Inactive", "Color"], onKey: r, offKey: i, sourceKey: a, templateKey: o, legacySourceKey: s, legacyTemplateKey: c, config: l = this._config || {}, onUpdate: u = (e, t) => this._handleConfigUpdate(e, t), onPreviewValue: d, offPreviewValue: f, pickerPrefix: p = "" } = {}) {
	let m = r?.replace(/(?:_on_color|_color_on)$/, "") || "color", h = a || `${m}_color_source`, g = o || `${m}_color`, _ = l[h] ?? (s ? l[s] : void 0), v = l[g] ?? (c ? l[c] : void 0), ee = _ === "template";
	return D`
    <div class="color-pair-control">
      <div class="field-header color-pair-source-header">
        <label>${K(this, e)}</label>
        <ha-selector
          class="color-pair-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
		label: K(this, "Custom"),
		value: "custom"
	}, {
		label: K(this, "Template"),
		value: "template"
	}] } }}
          .value=${ee ? "template" : "custom"}
          @value-changed=${(e) => {
		let t = e.detail.value === "template" ? "template" : "custom";
		t === "custom" && (F(l[r]) && u(r, void 0), F(l[i]) && u(i, void 0)), u(h, t);
	}}
        ></ha-selector>
      </div>

      ${ee ? D`
            <div class="field color-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${v || ""}
                @value-changed=${(e) => u(g, e.detail.value || "")}
              ></ha-selector>
            </div>
          ` : D`
            <div class="color-pair">
              ${va.call(this, t, `${p}${r}`, l[r] || "", (e) => u(r, e), d, !1)}
              ${va.call(this, n, `${p}${i}`, l[i] || "", (e) => u(i, e), f, !1)}
            </div>
          `}
    </div>
  `;
}
function ba(e, t, n) {
	return D`
    <div class="color-template-input">
      <ha-selector
        .hass=${this.hass}
        .label=${e ? K(this, e) : K(this, "Template")}
        .selector=${{ template: {} }}
        .value=${F(t) ? t : ""}
        @value-changed=${(e) => n(e.detail.value || "")}
      ></ha-selector>
    </div>
  `;
}
function xa(e, t) {
	return t || e || "theme";
}
function Sa(e, t, n, r = t) {
	let i = eo(t) ? this._getColorPickerValue(t) : "", a = i || (eo(t) ? this._getColorPickerValue(t) : this._getColorPickerValue(t || r)) || "#000000";
	return D`
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

      ${i ? D`
            <span
              class="native-color-picker-swatch"
              style=${`background-color:${i};`}
            ></span>
            <span class="native-color-picker-text">
              ${e ? D`
                    <span class="native-color-picker-label">
                      ${K(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value">
                ${i.toUpperCase()}
              </span>
            </span>
          ` : D`
            <span class="native-color-picker-empty-swatch"></span>
            <span class="native-color-picker-text">
              ${e ? D`
                    <span class="native-color-picker-label">
                      ${K(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value empty"></span>
            </span>
          `}

      ${i ? D`
            <button
              type="button"
              class="native-color-picker-clear"
              aria-label=${K(this, "Clear")}
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
function Ca(e, t, n, r = t, i = "") {
	let a = t || r, o = $a(a) === "theme" ? Ia(a) || "theme" : "", s = ja.call(this), c = wa.call(this, s, o);
	return D`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .getItems=${Ta.call(this, i, c)}
        .label=${e ? K(this, e) : ""}
        .value=${o}
        .rowRenderer=${(e) => Ea.call(this, e)}
        .valueRenderer=${(e) => Da.call(this, c.find((t) => t.id === e))}
        .notFoundLabel=${K(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${!0}
        @value-changed=${(e) => {
		e.stopPropagation(), n(e.detail.value || "");
	}}
      ></ha-generic-picker>
    </div>
  `;
}
function wa(e, t) {
	return !t || e.some((e) => e.id === t) ? e : [...e, Pa.call(this, {
		id: t,
		source: "theme"
	})];
}
function Ta(e, t) {
	this._themeColorItemGetters ||= /* @__PURE__ */ new Map();
	let n = this._themeColorItemGetters.get(e);
	return n ? n.items = t : (n = {
		items: t,
		getItems: () => n.items
	}, this._themeColorItemGetters.set(e, n)), n.getItems;
}
function Ea(e) {
	return D`
    <ha-combo-box-item type="button" compact>
      ${Oa.call(this, e)}
      <span slot="headline">${e.primary}</span>
      ${ka.call(this, e)}
    </ha-combo-box-item>
  `;
}
function Da(e) {
	return e ? D`
    ${Oa.call(this, e)}
    <span slot="headline">${e.primary}</span>
    ${ka.call(this, e)}
  ` : "";
}
function Oa(e) {
	return e.id === "theme" ? D`
      <ha-icon
        slot="start"
        class="theme-color-default-icon"
        icon="mdi:palette"
      ></ha-icon>
    ` : D`
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
function ka(e) {
	return e.isThemeColor ? D`
      <span
        slot="end"
        class="theme-source-badge theme-source-badge-theme"
        aria-label=${K(this, "Theme")}
      >T</span>
    ` : e.isStandardFallback ? D`
        <span
          slot="end"
          class="theme-source-badge theme-source-badge-standard"
          aria-label=${K(this, "Standard")}
        >S</span>
      ` : "";
}
function Aa() {
	let e = [], t = /* @__PURE__ */ new Set();
	for (let n of Qa) {
		let r = Pa.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	for (let n of La.call(this)) {
		let r = Pa.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	return e;
}
function ja() {
	let e = Na.call(this);
	if (this._themeColorItemsCache && this._themeColorItemsCacheKey === e) return this._themeColorItemsCache;
	let t = Aa.call(this);
	return this._themeColorItemsCache = t, this._themeColorItemsCacheKey = e, t;
}
function Ma() {
	let e = Na.call(this);
	if (this._themeColorItemsCacheKey === e || this._themeColorWarmupScheduled === e) return;
	this._themeColorWarmupScheduled = e;
	let t = () => {
		this._themeColorWarmupScheduled === e && (ja.call(this), this._themeColorWarmupScheduled = "");
	};
	if (window.requestIdleCallback) {
		window.requestIdleCallback(t, { timeout: 500 });
		return;
	}
	window.setTimeout(t, 0);
}
function Na() {
	return `${this?.hass?.locale?.language || this?.hass?.language || ""}|${this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || ""}|${this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? ""}|${Ra.call(this)}`;
}
function Pa(e) {
	let t = Fa(typeof e == "string" ? { id: e } : e), n = Ja(t.id), r = n && Ya(t.id), i = !r && (t.source === "theme" || Ka.call(this, t.id)), a = t.label ? K(this, t.label) : Xa.call(this, t.id);
	return {
		id: t.id,
		primary: a,
		secondary: n ? K(this, "Color") : K(this, "Theme"),
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
function Fa(e) {
	return {
		...e,
		id: Ia(e.id),
		label: e.label || null
	};
}
function Ia(e) {
	if (!e) return "";
	let t = e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""), n = t.startsWith("color-") ? t.slice(6) : t;
	return Za[n] || n;
}
function La() {
	return za.call(this).map((e) => Ha(e)).filter(Ua).map((e) => ({
		id: e,
		source: "theme"
	})).sort((e, t) => Xa.call(this, e.id).localeCompare(Xa.call(this, t.id), this?.hass?.locale?.language || this?.hass?.language || void 0, { sensitivity: "base" }));
}
function Ra() {
	return Ba.call(this).map(([e, t]) => `${e}:${t}`).join(",");
}
function za() {
	return Ba.call(this).map(([e]) => e).sort();
}
function Ba() {
	let e = /* @__PURE__ */ new Set(), t = [], n = Va.call(this);
	for (let [r, i] of Object.entries(n)) {
		let n = r.toLowerCase();
		Wa(n, i) && (e.has(n) || (e.add(n), t.push([n, i])));
	}
	return t.sort(([e], [t]) => e.localeCompare(t));
}
function Va() {
	let e = this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || "", t = e ? this?.hass?.themes?.themes?.[e] : null;
	if (!t) return {};
	let { modes: n, ...r } = t, i = this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? !1 ? n?.dark : n?.light;
	return {
		...r,
		...i || {}
	};
}
function Ha(e) {
	return e.startsWith("color-") ? e.slice(6) : e;
}
function Ua(e) {
	return !!e && !/^\d+$/.test(e);
}
function Wa(e, t) {
	return !e || !(e.startsWith("color-") || e.startsWith("google-") || e.endsWith("-color") || e.includes("-color-")) ? !1 : Ga(t);
}
function Ga(e) {
	let t = e == null ? "" : e.toString().trim();
	return t ? /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(/i.test(t) || /^var\(\s*--[a-z0-9-_]*color[a-z0-9-_]*/i.test(t) || /^\d+\s*,\s*\d+\s*,\s*\d+/.test(t) : !1;
}
function Ka(e) {
	let t = new Set(za.call(this));
	return qa(e).some((e) => t.has(e));
}
function qa(e) {
	let t = Ia(e);
	if (!t) return [];
	let n = t.startsWith("color-") ? t : `color-${t}`;
	return t.endsWith("-color") ? [t, n] : [n, t];
}
function Ja(e) {
	return e === "theme" || e === "primary-color" || e === "accent-color" || Vt(e);
}
function Ya(e) {
	return Vt(e) && !Ut(e);
}
function Xa(e) {
	return e === "theme" ? K(this, "State color (default)") : e === "light" ? K(this, "State light color") : e === "primary-color" ? K(this, "Primary") : e === "primary-text-color" ? K(this, "Primary text color") : e === "card-background-color" ? K(this, "Card background") : e === "secondary-background-color" ? K(this, "Secondary background color") : e === "accent-color" ? K(this, "Accent") : e.replaceAll("-", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
var Za = {
	bluegrey: "blue-grey",
	darkgrey: "dark-grey",
	deeporange: "deep-orange",
	deeppurple: "deep-purple",
	lightblue: "light-blue",
	lightgreen: "light-green",
	lightgrey: "light-grey"
}, Qa = [
	{
		id: "theme",
		label: "State color (default)"
	},
	{
		id: "light",
		label: "State light color"
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
function $a(e) {
	let t = e?.toString().trim();
	return t ? F(t) ? "template" : eo(t) ? "picker" : "theme" : "theme";
}
function eo(e) {
	let t = e?.toString().trim().toLowerCase();
	return !!(t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")));
}
//#endregion
//#region src/common/editor/helpers/actions.js
function to(e, t) {
	let n = lo[t];
	return co(e?.hass, t) || (n ? K(e, n) : void 0) || t;
}
var no = /* @__PURE__ */ new WeakMap();
function ro(e) {
	if (!ao(e)) return;
	let t = document.scrollingElement;
	t && no.set(e.currentTarget, {
		scrollingElement: t,
		scrollLeft: t.scrollLeft,
		scrollTop: t.scrollTop
	});
}
function io(e) {
	if (!ao(e)) return;
	let t = no.get(e.currentTarget);
	if (!t) return;
	let n = () => {
		t.scrollingElement.scrollLeft = t.scrollLeft, t.scrollingElement.scrollTop = t.scrollTop;
	};
	n(), setTimeout(n, 0), requestAnimationFrame(n), setTimeout(n, 100);
}
function ao(e) {
	return e.composedPath().some((e) => e?.tagName === "HA-NAVIGATION-PICKER");
}
var oo = {
	capture: !0,
	handleEvent: ro
}, so = {
	capture: !0,
	handleEvent: io
};
function co(e, t) {
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
var lo = {
	"Current state": "Current state",
	"current-activity": "Current activity",
	"call-service": "Perform action",
	"more-info": "More info",
	navigate: "Navigate",
	none: "Nothing",
	popup: "Popup",
	"perform-action": "Perform action",
	toggle: "Toggle",
	url: "URL"
};
function uo({ interactions: e = [], title: t = "Interactions", expanded: n = !1, context: r = {}, config: i = this._config, onChange: a } = {}) {
	let o = e.filter(Boolean);
	if (!o.length) return "";
	let s = o.filter((e) => fo(i, e)), c = o.filter((e) => !s.includes(e)), l = [{
		name: "interactions",
		type: "expandable",
		flatten: !0,
		expanded: n,
		icon: "mdi:gesture-tap-button",
		schema: [...s.map((e) => po(e, r, i, this)), {
			name: "",
			type: "optional_actions",
			flatten: !0,
			schema: c.map((e) => po(e, r, i, this))
		}]
	}], u = mo(i, o);
	return D`
    <ha-form
      class="interactions-form"
      @click=${so}
      @pointerdown=${oo}
      .hass=${this.hass}
      .data=${u}
      .schema=${l}
      .computeLabel=${(e) => _o(this, e, o, t)}
      @value-changed=${(e) => {
		e.stopPropagation();
		let t = ho(e.detail.value || {}, o, i);
		a ? a(t) : this._updateConfig(t), this.requestUpdate?.();
	}}
    ></ha-form>
  `;
}
function fo(e = {}, t) {
	return t.defaultVisible && !yo(e?.[t.key]);
}
function po(e, t, n, r) {
	let i = vo(e.defaultAction), a = n?.[e.key], o = e.customActions || [], s = vo(a);
	if (o.length > 0 && !a || e.customDefaultLabel && !a || o.includes(s)) {
		let t = bo(i, o), n = a ? [] : [{
			value: "__default__",
			label: `${K(r, "Default")} (${e.customDefaultLabel ? K(r, e.customDefaultLabel) : to(r, i)})`
		}];
		return {
			name: e.formKey || e.key,
			selector: { select: {
				mode: "dropdown",
				options: [...n, ...t.map((e) => ({
					value: e,
					label: to(r, e)
				}))]
			} }
		};
	}
	return {
		name: e.formKey || e.key,
		selector: { ui_action: {
			actions: bo(i, o),
			default_action: i
		} },
		...t ? { context: t } : {}
	};
}
function mo(e = {}, t) {
	return t.reduce((t, n) => {
		let r = n.formKey || n.key;
		if (n.customDefaultLabel && !e?.[n.key]) return t[r] = "__default__", t;
		if (n.customActions?.includes(vo(e?.[n.key]))) return t[r] = vo(e[n.key]), t;
		let i = e?.[n.key] || (n.displayDefaultValue ? xo(n.defaultAction) : void 0);
		return i && typeof i == "object" && i.action !== "popup" && (!yo(i) || vo(n.defaultAction) !== "none") && (t[r] = So(i)), t;
	}, {});
}
function ho(e, t, n = {}) {
	return t.reduce((t, r) => {
		let i = r.formKey || r.key;
		if ((e[i] === "__default__" || r.customActions?.includes(e[i])) && typeof e[i] == "string") return t[r.key] = e[i] === "__default__" ? void 0 : { action: e[i] }, t;
		let a = n?.[r.key], o = Co(go(e[i], a), r.defaultAction);
		return t[r.key] = n?.[r.key]?.action === "popup" && !(i in e) ? n[r.key] : o, t;
	}, {});
}
function go(e, t) {
	if (!e || typeof e != "object" || e.action !== "more-info" || e.entity || e.entity_id || t?.action !== "more-info") return e;
	let n = t.entity || t.entity_id;
	return n ? {
		...e,
		entity: n
	} : e;
}
function _o(e, t, n, r) {
	return t.name === "interactions" ? K(e, r) : K(e, n.find((e) => (e.formKey || e.key) === t.name)?.label || t.name);
}
function vo(e) {
	let t = typeof e == "string" ? e : e?.action || "none";
	return t === "call-service" ? "perform-action" : t;
}
function yo(e) {
	return e?.action === "none";
}
function bo(e, t = []) {
	let n = [
		...t,
		"more-info",
		"toggle",
		"navigate",
		"url",
		"perform-action",
		"assist"
	];
	e && e !== "none" && !n.includes(e) && n.unshift(e);
	let r = [...new Set(n)];
	return e === "none" ? r : [...r, "none"];
}
function xo(e) {
	return typeof e == "string" ? { action: e } : e || { action: "none" };
}
function So(e) {
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
function Co(e, t) {
	if (!(!e || typeof e != "object") && !(e.action === "none" && vo(t) === "none")) {
		if (e.action === "perform-action") {
			let t = {
				...e,
				action: "call-service",
				service: e.perform_action || e.service || ""
			};
			return e.data && !e.service_data && (t.service_data = e.data), delete t.perform_action, delete t.data, wo(t);
		}
		return wo(e);
	}
}
function wo(e) {
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
function To({ value: e = "", includeDomains: t, excludeDomains: n, multiple: r = !1, onValueChanged: i, filterOptions: a, activeFilter: o = "all", className: s = "entity-picker" } = {}) {
	let c = a?.length ? a.map((e) => ({
		...e,
		label: Eo.call(this, e)
	})) : null, l = c ? Oo(c) : t;
	return r ? D`
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
    ` : c?.length ? ko.call(this, {
		value: e,
		includeDomains: t,
		excludeDomains: n,
		filters: c,
		activeFilter: o,
		className: s,
		onValueChanged: i
	}) : D`
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
function Eo(e) {
	if (e.haDomains?.length) {
		let t = e.haDomains.map((e) => Do(this?.hass, e)).filter(Boolean);
		if (t.length) return t.join(" / ");
	}
	return K(this, e.label);
}
function Do(e, t) {
	if (!e?.localize || !t) return null;
	let n = [`component.${t}.entity_component._.name_plural`, `component.${t}.entity_component._.name`];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Oo(e = []) {
	if (e.some((e) => e.value === "all" && (!e.domains || e.domains.length === 0))) return;
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => e.domains?.forEach((e) => t.add(e))), [...t];
}
function ko({ value: e, includeDomains: t, excludeDomains: n, filters: r, activeFilter: i, className: a, onValueChanged: o }) {
	ma();
	let s = r.map((e) => ({
		id: e.value,
		label: e.label
	}));
	return D`
    <ha-generic-picker
      class=${a}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Entity"}
      .getItems=${(e, i) => Ao.call(this, {
		search: e,
		section: i,
		filters: r,
		includeDomains: t,
		excludeDomains: n
	})}
      .valueRenderer=${(e) => Mo.call(this, e)}
      .rowRenderer=${No}
      .sections=${s}
      .selectedSection=${i || r[0]?.value || "all"}
      @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
      @value-changed=${(e) => o?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function Ao({ search: e, section: t, filters: n, includeDomains: r, excludeDomains: i }) {
	let a = n.find((e) => e.value === (t || "all"))?.domains, o = a?.length ? a : r, s = new Set(i || []), c = (e || "").trim().toLowerCase();
	return Object.values(this.hass?.states || {}).filter((e) => {
		let t = Ro(e.entity_id);
		return o?.length && !o.includes(t) ? !1 : !s.has(t);
	}).map((e) => jo.call(this, e)).filter((e) => Po(e, c)).sort(Fo);
}
function jo(e) {
	let t = Io(e), n = Ro(e.entity_id), r = Lo(this.hass, e);
	return {
		id: e.entity_id,
		primary: t,
		secondary: r,
		sorting_label: `${t}_${e.entity_id}`,
		stateObj: e,
		domain: n,
		domainLabel: zo(n),
		searchText: [
			t,
			e.entity_id,
			n,
			zo(n),
			r,
			e.attributes?.device_class
		].filter(Boolean).join(" ").toLowerCase()
	};
}
function Mo(e) {
	let t = this.hass?.states?.[e], n = t ? Io(t) : e, r = t ? Lo(this.hass, t) : void 0;
	return D`
    ${t ? D`<state-badge slot="start" .stateObj=${t}></state-badge>` : ""}
    <span slot="headline">${n}</span>
    ${r ? D`<span slot="supporting-text">${r}</span>` : ""}
  `;
}
function No(e, t) {
	return D`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <state-badge slot="start" .stateObj=${e.stateObj}></state-badge>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? D`<span slot="supporting-text">${e.secondary}</span>` : ""}
      <div slot="trailing-supporting-text" class="domain">
        ${e.domainLabel}
      </div>
    </ha-combo-box-item>
  `;
}
function Po(e, t) {
	return t ? t.split(/\s+/).every((t) => e.searchText.includes(t)) : !0;
}
function Fo(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function Io(e) {
	return e.attributes?.friendly_name || e.entity_id;
}
function Lo(e, t) {
	let n = e?.entities?.[t.entity_id], r = n?.device_id ? e?.devices?.[n.device_id] : void 0, i = n?.area_id || r?.area_id || t.attributes?.area_id;
	return i ? e?.areas?.[i]?.name : void 0;
}
function Ro(e = "") {
	return e.split(".")[0] || "";
}
function zo(e = "") {
	return e.split("_").filter(Boolean).map((e) => e[0]?.toUpperCase() + e.slice(1)).join(" ");
}
function Bo({ value: e = "", onValueChanged: t, className: n = "entity-picker" } = {}) {
	return D`
    <ha-generic-picker
      class=${n}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Area"}
      .getItems=${() => Vo.call(this)}
      .valueRenderer=${(e) => Uo.call(this, e)}
      .rowRenderer=${Wo}
      @value-changed=${(e) => t?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function Vo() {
	return Object.values(this.hass?.areas || {}).map((e) => Ho.call(this, e)).sort(Ko);
}
function Ho(e) {
	let t = e.name || e.area_id, n = Go(this.hass, e);
	return {
		id: e.area_id,
		primary: t,
		secondary: n,
		sorting_label: t,
		icon: e.icon || "mdi:texture-box"
	};
}
function Uo(e) {
	let t = this.hass?.areas?.[e], n = t ? Ho.call(this, t) : {
		id: e,
		primary: e,
		icon: "mdi:texture-box"
	};
	return D`
    <ha-icon slot="start" .icon=${n.icon}></ha-icon>
    <span slot="headline">${n.primary}</span>
    ${n.secondary ? D`<span slot="supporting-text">${n.secondary}</span>` : ""}
  `;
}
function Wo(e, t) {
	return D`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? D`<span slot="supporting-text">${e.secondary}</span>` : ""}
    </ha-combo-box-item>
  `;
}
function Go(e, t) {
	let n = t.floor_id;
	return n ? e?.floors?.[n]?.name : void 0;
}
function Ko(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function qo(e, t, n) {
	return D`
    <div class="field">
      ${e ? D`<label>${K(this, e, n)}</label>` : ""}

      ${To.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function Jo(e, t) {
	return D`
    <div class="field">
      ${Bo.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleConfigUpdate ? this._handleConfigUpdate(t, e) : this._updateConfig({ [t]: e })
	})}
    </div>
  `;
}
//#endregion
//#region src/common/editor/helpers/helpers.js
function Yo(e) {
	e._editorPopoverCloseHandler || (e._editorPopoverCloseHandler = (t) => {
		!e._iconPickerKey && !e._colorPickerKey || Zo(t.composedPath?.() || []) || (e._iconPickerKey = "", e._colorPickerKey = "", e._iconFilePickerOpen = !1, e._iconFileSearch = "", e._themeColorPickerOpen = !1, e._themeColorSearch = "", e.requestUpdate?.());
	}, document.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0));
}
function Xo(e) {
	e._editorPopoverCloseHandler &&= (document.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), null);
}
function Zo(e) {
	return e.some((e) => {
		let t = e?.classList, n = e?.tagName?.toLowerCase?.();
		return t?.contains("icon-popover") || t?.contains("color-popover") || t?.contains("icon-preview") || t?.contains("color-preview") || t?.contains("color-control-button") || t?.contains("mdc-menu-surface") || n === "ha-generic-picker" || n === "ha-icon-picker" || n === "ha-combo-box" || n === "ha-combo-box-item" || n === "mwc-list" || n === "mwc-list-item";
	});
}
function Qo(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${Bt(n)};` : "background-color: rgb(var(--color-theme));";
}
function $o(e) {
	let t = e?.toString().trim();
	return t && (rs(t) || is(t) || es(t)) || "#ffffff";
}
function es(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = Wt(n), i = Ut(n) ? ns(r) : "", a = Vt(n) ? ns(`${n}-color`) : "", o = ns(n), s = n.startsWith("color-") ? "" : ns(`color-${n}`);
	return ts(i, t) || ts(a, t) || ts(o, t) || ts(s, t) || "";
}
function ts(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = rs(n);
	if (r) return r;
	let i = is(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? es(a[1], t) : "";
}
function ns(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function rs(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function is(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return as(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? as(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function as(e, t, n) {
	return `#${os(e)}${os(t)}${os(n)}`;
}
function os(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
//#endregion
//#region src/common/editor/helpers/name-picker.js
function ss({ label: e = "Name", valueKey: t, legacyValueKey: n = "", entityKey: r = "main_entity", areaKey: i = "area", deviceClassKey: a = "device_class", defaultType: o = "", defaultMode: s = "composed", modeKey: c = t, templateKey: l = "", templateLabel: u = "Template" } = {}) {
	return cs.call(this), l || !customElements.get("ha-entity-name-picker") ? ls.call(this, {
		label: e,
		valueKey: t,
		entityKey: r,
		areaKey: i,
		deviceClassKey: a,
		defaultType: o,
		defaultMode: s,
		modeKey: c,
		templateKey: l,
		templateLabel: u
	}) : D`
    <div class="field name-picker-field">
      <ha-entity-name-picker
        .hass=${this.hass}
        .label=${this._t(e)}
        .entityId=${As.call(this, {
		entityKey: r,
		areaKey: i
	})}
        .value=${xs(this._config, {
		valueKey: t,
		legacyValueKey: n,
		entityKey: r,
		areaKey: i,
		defaultType: o
	})}
        @value-changed=${(e) => {
		e.stopPropagation(), ws.call(this, {
			valueKey: t,
			legacyValueKey: n,
			value: Ts(e.detail.value, this._config, {
				entityKey: r,
				areaKey: i,
				defaultType: o
			})
		});
	}}
      ></ha-entity-name-picker>
    </div>
  `;
}
function cs() {
	customElements.get("ha-entity-name-picker") || this._namePickerRenderQueued || (this._namePickerRenderQueued = !0, customElements.whenDefined("ha-entity-name-picker").then(() => {
		this._namePickerRenderQueued = !1, this.requestUpdate?.();
	}));
}
function ls(e) {
	let t = ms(this._config, hs(this, e.modeKey), e);
	return D`
    <div class="field name-picker-field name-picker-fallback">
      <div class="field-header">
        <label>${this._t(e.label)}</label>

        <ha-selector
          class="editor-header-button-toggle name-picker-mode-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
		{
			label: Ps(this, "composed"),
			value: "composed"
		},
		{
			label: Ps(this, "custom"),
			value: "custom"
		},
		...e.templateKey ? [{
			label: this._t("Template"),
			value: "template"
		}] : []
	] } }}
          .value=${t}
          @value-changed=${(t) => {
		t.stopPropagation();
		let n = t.detail.value || "composed";
		if (gs(this, e.modeKey, n), !(e.templateKey && (this._updateConfig({
			[e.valueKey]: void 0,
			...e.legacyValueKey ? { [e.legacyValueKey]: void 0 } : {},
			[e.templateKey]: n === "template" ? this._config?.[e.templateKey] : void 0
		}), n === "template" || n === "composed"))) {
			if (n === "composed") {
				ws.call(this, {
					valueKey: e.valueKey,
					legacyValueKey: e.legacyValueKey,
					value: void 0
				});
				return;
			}
			if (typeof Cs(this._config, e) != "string") {
				ws.call(this, {
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

      ${t === "template" ? this._renderTemplateInput(e.templateLabel, e.templateKey, { hideLabel: !0 }) : t === "custom" ? us.call(this, e) : ds.call(this, e)}
    </div>
  `;
}
function us(e) {
	return D`
    <ha-selector
      class="name-picker-custom-input"
      .hass=${this.hass}
      .selector=${{ text: {} }}
      .value=${typeof Cs(this._config, e) == "string" ? Cs(this._config, e) : ""}
      @value-changed=${(t) => {
		t.stopPropagation(), ws.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: t.detail.value || void 0
		});
	}}
    ></ha-selector>
  `;
}
function ds(e) {
	let t = _s(this._config, e), n = ys.call(this, t, e);
	return D`
    <ha-generic-picker
      class="name-picker-composed-picker"
      .hass=${this.hass}
      .value=${""}
      .placeholder=${this._t(e.label)}
      .getItems=${() => n}
      allow-custom-value
      .customValueLabel=${Ls(this)}
      .rowRenderer=${(e) => D`
        <ha-combo-box-item type="button" compact>
          <span slot="headline">${e.primary}</span>
          ${e.secondary ? D`<span slot="supporting-text">${e.secondary}</span>` : ""}
        </ha-combo-box-item>
      `}
      .noSort=${!0}
      .searchLabel=${Is(this)}
      @value-changed=${(n) => {
		n.stopPropagation();
		let r = bs(n.detail.value);
		r && (gs(this, e.modeKey, "composed"), ws.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: Ts([...t, r], this._config, e)
		}));
	}}
    >
      <div slot="field" class="name-picker-composed-field">
        ${t.map((n, r) => fs.call(this, n, r, t, e))}

        <button
          type="button"
          class="name-picker-add-chip"
          @click=${(e) => ps(e)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          <span>${Fs(this)}</span>
        </button>
      </div>
    </ha-generic-picker>
  `;
}
function fs(e, t, n, r) {
	return D`
    <button
      type="button"
      class="name-picker-chip"
      @click=${(e) => ps(e)}
    >
      <ha-icon icon="mdi:drag-horizontal-variant"></ha-icon>
      <span>${vs.call(this, e)}</span>
      <ha-icon
        class="name-picker-chip-remove"
        icon="mdi:close"
        @click=${(e) => {
		e.preventDefault(), e.stopPropagation();
		let i = n.filter((e, n) => n !== t);
		ws.call(this, {
			valueKey: r.valueKey,
			legacyValueKey: r.legacyValueKey,
			value: Ts(i, this._config, r)
		});
	}}
      ></ha-icon>
    </button>
  `;
}
function ps(e) {
	e.preventDefault(), e.stopPropagation(), e.currentTarget?.closest("ha-generic-picker")?.open?.();
}
function ms(e = {}, t, n) {
	if (n.templateKey && Ss(e, n.templateKey)) return "template";
	let r = Cs(e, n);
	return typeof r == "string" ? "custom" : r ? "composed" : t || n.defaultMode || "composed";
}
function hs(e, t) {
	return e._namePickerModes?.[t];
}
function gs(e, t, n) {
	e._namePickerModes = {
		...e._namePickerModes,
		[t]: n
	};
}
function _s(e = {}, t) {
	let n = xs(e, t);
	return !n || typeof n == "string" ? [] : Array.isArray(n) ? n : [n];
}
function vs(e) {
	return e ? e.type === "text" ? `"${e.text || ""}"` : e.type === "area" ? this._t("Area") : e.type === "entity" ? this._t("Entity") : e.type === "device_class" ? this._t("Device class") : Rs(this, e.type) : "";
}
function ys(e = [], t) {
	let n = [], r = new Set(e.filter((e) => e?.type && e.type !== "text").map((e) => e.type)), i = t.areaKey && this._config?.[t.areaKey] ? this.hass?.areas?.[this._config[t.areaKey]] : null, a = As.call(this, t), o = a ? this.hass?.states?.[a] : null, s = Os(this._config, t);
	if (s && !r.has("device_class") && n.push({
		id: "device_class",
		primary: this._t("Device class"),
		secondary: s
	}), i && !r.has("area")) n.push({
		id: "area",
		primary: this._t("Area"),
		secondary: i.name || ""
	});
	else if (o && !r.has("area")) {
		let e = Ms(this.hass, o, "area");
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
			secondary: Ms(this.hass, o, "entity")
		});
		let e = Ms(this.hass, o, "device");
		e && !r.has("device") && n.push({
			id: "device",
			primary: Rs(this, "device"),
			secondary: e
		});
		let i = Ns(this.hass, this._config?.[t.areaKey]) || Ms(this.hass, o, "floor");
		i && !r.has("floor") && n.push({
			id: "floor",
			primary: Rs(this, "floor"),
			secondary: i
		});
	}
	return n;
}
function bs(e) {
	if (e) return [
		"area",
		"device",
		"device_class",
		"entity",
		"floor"
	].includes(e) ? { type: e } : {
		type: "text",
		text: e
	};
}
function xs(e = {}, t) {
	let n = Cs(e, t);
	if (n !== void 0) return n;
	if (t.defaultType === "area" && e[t.areaKey]) return { type: "area" };
	if (t.defaultType === "entity" && (e[t.entityKey] || e.entity)) return { type: "entity" };
	if (t.defaultType === "device_class" && Ds(e, t).length) return { type: "device_class" };
}
function Ss(e = {}, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0 && e[t] !== "";
}
function Cs(e = {}, t) {
	if (Ss(e, t.valueKey)) return e[t.valueKey];
	if (t.legacyValueKey && Ss(e, t.legacyValueKey)) return e[t.legacyValueKey];
}
function ws({ valueKey: e, legacyValueKey: t, value: n }) {
	if (t && typeof this._updateConfig == "function") {
		this._updateConfig({
			[e]: n,
			[t]: void 0
		});
		return;
	}
	this._handleConfigUpdate(e, n);
}
function Ts(e, t = {}, n) {
	if (!(Array.isArray(e) && e.length === 0) && e && !(n.defaultType && Es(t, n) && ks(e, n.defaultType))) return e;
}
function Es(e = {}, t) {
	return t.defaultType === "area" ? !!e[t.areaKey] : t.defaultType === "entity" ? !!(e[t.entityKey] || e.entity) : t.defaultType === "device_class" ? Ds(e, t).length > 0 : !1;
}
function Ds(e = {}, t = {}) {
	let n = e?.[t.deviceClassKey || "device_class"];
	return (Array.isArray(n) ? n : [n]).filter((e) => typeof e == "string").map((e) => e.trim()).filter(Boolean);
}
function Os(e = {}, t = {}) {
	return Ds(e, t).map((e) => e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase())).join(", ");
}
function ks(e, t) {
	let n = Array.isArray(e) ? e : [e];
	return n.length === 1 && n[0] && typeof n[0] == "object" && n[0].type === t;
}
function As(e) {
	return this._config?.[e.entityKey] || this._config?.entity || js(this.hass, this._config?.[e.areaKey]);
}
function js(e, t) {
	if (!e || !t) return "";
	let n = e.entities || {}, r = e.devices || {};
	for (let i of Object.keys(e.states || {})) {
		let e = n[i];
		if (e?.area_id === t || e?.device_id && r[e.device_id]?.area_id === t) return i;
	}
	return "";
}
function Ms(e, t, n) {
	return !t || typeof e?.formatEntityName != "function" ? n === "entity" && (t?.attributes?.friendly_name || t?.entity_id) || "" : e.formatEntityName(t, { type: n }) || "";
}
function Ns(e, t) {
	let n = t && e?.areas?.[t] ? e.areas[t].floor_id : "";
	return n && e?.floors?.[n] && e.floors[n].name || "";
}
function Ps(e, t) {
	let n = `ui.components.entity.entity-name-picker.mode_${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t === "custom" ? e._t("Custom") : "Composed";
}
function Fs(e) {
	let t = "ui.components.entity.entity-name-picker.add", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Add");
}
function Is(e) {
	let t = "ui.components.entity.entity-name-picker.search", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Search");
}
function Ls(e) {
	let t = "ui.components.entity.entity-name-picker.custom_name", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Name");
}
function Rs(e, t) {
	let n = `ui.components.entity.entity-name-picker.types.${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t;
}
//#endregion
//#region src/editors/area/sections/area.js
function zs() {
	return D`
    <div class="section">
      ${Vs.call(this)}

      ${this._renderArea("Area", "area")}

      ${this._renderColor("Color", "color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${Hs.call(this)}
      ${this._config?.main_entity ? this._renderTemplateInput("State template", "state_template") : ""}

      ${uo.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: Bs(this._config),
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
function Bs(e = {}) {
	return {
		action: "navigate",
		navigation_path: e.tap_action?.navigation_path || e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function Vs() {
	return ss.call(this, {
		label: "Name",
		valueKey: "area_name",
		legacyValueKey: "room_name",
		entityKey: "main_entity",
		areaKey: "area",
		defaultType: "area"
	});
}
function Hs() {
	return ji.call(this, {
		label: "Icon",
		sourceKey: "icon_source",
		templateKey: "icon",
		entityKey: "main_entity",
		areaKey: "area",
		allowArea: !0,
		customIconKeys: [
			"icon",
			"icon_on",
			"icon_off"
		],
		renderCustom() {
			return D`
        ${this._renderIconInput("", "icon")}

        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
        </div>
      `;
		}
	});
}
//#endregion
//#region src/editors/area/sections/buttons.js
function Us() {
	let e = this._selectedButtonIndex || 1;
	return D`
    <div class="section">
      ${Ws.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${Gs.call(this, e)}
    </div>
  `;
}
function Ws(e, t, n) {
	return D`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
      ${e.map((e) => D`
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
function Gs(e) {
	let t = `button${e}`, n = this._areaButtonDomainFilter || "all";
	return D`
    <div class="sub-section selected-button-section">
      <div class="field">
        <label>${this._t("Entity")}</label>

        ${To.call(this, {
		value: this._config?.[t] || "",
		filterOptions: Ks,
		activeFilter: n,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
      </div>

      ${this._renderColorPair({
		label: "Color",
		onKey: `${t}_color_on`,
		offKey: `${t}_color_off`,
		onPreviewValue: "theme",
		offPreviewValue: "theme"
	})}

      ${ji.call(this, {
		label: "Icon",
		sourceKey: `${t}_icon_source`,
		templateKey: `${t}_icon`,
		entityKey: t,
		customIconKeys: [
			`${t}_icon`,
			`${t}_icon_on`,
			`${t}_icon_off`
		],
		renderCustom() {
			return D`
            ${this._renderIconInput("", `${t}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${t}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${t}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${t}_state_template`)}

      ${uo.call(this, {
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
var Ks = [
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
function qs() {
	let e = this._selectedCurveButtonIndex || 1;
	return D`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock curve button positions")}</span>
        <ha-switch
          .checked=${!!this._config?.curve_buttons_lock_position}
          @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.checked })}
        ></ha-switch>
      </label>

      <div class="curve-divider"></div>

      ${Ys.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${Xs.call(this, `curve_button${e}`, "", "more-info", { index: e }, {
		showColors: !0,
		filteredEntity: !0,
		filterKey: "_areaCurveButtonDomainFilter",
		filters: Qs
	})}
    </div>
  `;
}
function Js() {
	let e = br(this._config?.action_button);
	return D`
    <div class="section">
      ${Xs.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function Ys(e, t, n) {
	return D`
    <div class="editor-segment-menu">
      ${e.map((e) => D`
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
function Xs(e, t, n, r = {}, i = {}) {
	let a = this._config?.[e];
	return D`
    <div class="sub-section selected-button-section">
      ${t ? D`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? $s.call(this, "Entity", e, i) : this._renderEntity("Entity", e)}

      ${i.showColors ? this._renderColorPair({
		label: "Color",
		onKey: `${e}_color_on`,
		offKey: `${e}_color_off`,
		onPreviewValue: this._config?.color || "theme",
		offPreviewValue: this._config?.color || "theme"
	}) : ""}

      ${ji.call(this, {
		label: "Icon",
		sourceKey: `${e}_icon_source`,
		templateKey: `${e}_icon`,
		entityKey: e,
		customIconKeys: [
			`${e}_icon`,
			`${e}_icon_on`,
			`${e}_icon_off`
		],
		renderCustom() {
			return D`
            ${this._renderIconInput("", `${e}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${e}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${e}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${e}_state_template`)}

      ${uo.call(this, {
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
var Zs = [
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
], Qs = [
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
function $s(e, t, n = {}) {
	let r = this[n.filterKey || "_areaActionButtonDomainFilter"] || "all", i = n.filters || Zs;
	return D`
    <div class="field">
      <label>${this._t(e)}</label>

      ${To.call(this, {
		value: this._config?.[t] || "",
		filterOptions: i,
		activeFilter: r,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
//#endregion
//#region src/common/editor/styles/editor-styles.js
var ec = [
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
.name-picker-mode-selector,
.color-pair-source-selector {
  flex: 0 1 auto;
  width: auto;
  max-width: 100%;
}

.editor-button-toggle-field .field-header,
.main-entity-icon-source-field .field-header,
.name-picker-fallback .field-header {
  min-height: 40px;
}

.color-pair-control {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

.color-pair-source-header {
  min-height: 40px;
}

.color-pair-source-header > label {
  flex: 0 0 auto;
  white-space: nowrap;
}

.name-picker-field ha-entity-name-picker,
.name-picker-custom-input,
.name-picker-composed-picker {
  display: block;
  width: 100%;
}

.name-picker-composed-picker {
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
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
  flex-wrap: wrap;
  gap: 8px;
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

.status-badge-device-class-groups {
  display: grid;
  gap: 16px;
  margin-top: 8px;
}

.status-badge-device-class-group-label {
  color: var(--secondary-text-color);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
}

.status-area-count-low-sensors-hint {
  color: var(--secondary-text-color);
  font-size: 12px;
  line-height: 1.35;
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
  gap: 0;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.color-tabs button {
  position: relative;
  flex: 1 1 0;
  min-width: 44px;
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

.color-tabs button ha-icon {
  --mdc-icon-size: 20px;
  pointer-events: none;
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

.color-template-input {
  position: relative;
}

.color-template-input ha-selector {
  display: block;
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

.icon-source-template-field ha-selector {
  display: block;
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
  margin-top: 0;
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
], tc = class extends A {
	static svgCache = B;
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
		super.connectedCallback(), Yo(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		Xo(this), super.disconnectedCallback();
	}
	_getColorStyle(e) {
		return Qo(e);
	}
	_getColorPickerValue(e) {
		return $o(e);
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	setConfig(e) {
		let { config: t, migrated: n } = dn(e || {});
		this._config = uc(t || {}), this._updateDocumentationContext(), n && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: uc(this._config) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		let t = { ...e };
		Object.prototype.hasOwnProperty.call(t, "tap_action") && t.tap_action !== void 0 && (t.navigate = void 0);
		let n = la(this._config, t), r = Mi(n, {
			sourceKey: "icon_source",
			templateKey: "icon",
			entityKey: "main_entity",
			areaKey: "area",
			allowArea: !0,
			customIconKeys: [
				"icon",
				"icon_on",
				"icon_off"
			]
		}), i = Object.prototype.hasOwnProperty.call(t, "icon_source") && !["custom", "template"].includes(t.icon_source), a = r !== "custom" && n.icon === "";
		(i || a) && (n.icon = void 0), this._config = uc(la(n, {})), this.dispatchEvent(new CustomEvent("config-changed", {
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
		this._updateConfig(G("main_entity", ic));
	}
	_clearStatusEntity(e) {
		this._updateConfig(ua(e, ac));
	}
	_clearButtonEntity(e) {
		this._updateConfig(ua(e, oc));
	}
	_clearCurveButtonEntity(e) {
		this._updateConfig(ua(e, sc));
	}
	_clearActionButtonEntity(e) {
		this._updateConfig(ua(e, cc));
	}
	_renderInput(e, t, n = "", r = {}) {
		return oa.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t, n = {}) {
		return sa.call(this, e, t, n);
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_renderColor(e, t, n) {
		return _a.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return va.call(this, e, t, n, r, i);
	}
	_renderColorPair(e) {
		return ya.call(this, e);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return Ai.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return Ni.call(this, e);
	}
	_isImageIcon(e) {
		return Oi(e);
	}
	_resolveIconPath(e) {
		return ki(e);
	}
	_getInlineSvg(e) {
		return z.call(this, e, { forceColor: !0 });
	}
	_renderEntity(e, t, n) {
		return qo.call(this, e, t, n);
	}
	_renderArea(e, t) {
		return Jo.call(this, e, t);
	}
	_renderAreaSection() {
		return zs.call(this);
	}
	_renderStatusSection() {
		let e = this._selectedStatusIndex || 1, t = `status${e}`, n = xr(this._config, t);
		return D`
      <div class="section">
        <div class="selector-pair status-settings-row">
          <div class="status-separator-field">
            ${this._renderInput("Separator", "status_separator", "|")}
          </div>

          ${this._renderColorControl("Color", "status_color", this._config?.status_color || this._config?.color || "", (e) => this._handleConfigUpdate("status_color", e), this._config?.status_color || this._config?.color || "")}
        </div>

        <div
          class="editor-segment-menu"
          style="--editor-segment-columns: 3;"
        >
          ${[
			1,
			2,
			3
		].map((t) => D`
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
          <div class="field main-entity-icon-source-field">
            <div class="field-header">
              <label>${this._t("State")}</label>
              <ha-selector
                class="main-entity-icon-source-selector"
                .hass=${this.hass}
                .selector=${{ button_toggle: { options: [{
			label: this._t("Entity"),
			value: "entity"
		}, {
			label: this._t("Template"),
			value: "template"
		}] } }}
                .value=${n}
                @value-changed=${(e) => {
			this._handleConfigUpdate(`${t}_source`, e.detail.value || "entity");
		}}
              ></ha-selector>
            </div>
          </div>
          ${n === "template" ? this._renderTemplateInput("", `${t}_template`, {
			hideLabel: !0,
			required: !1
		}) : this._renderEntity("", t)}

          ${ji.call(this, {
			label: ["Prefix", "Icon"],
			sourceKey: `status${e}_icon_source`,
			templateKey: `status${e}_icon`,
			entityKey: `status${e}`,
			allowNone: !0,
			customIconKeys: [`status${e}_icon`],
			renderCustom() {
				return this._renderIconInput("", `status${e}_icon`, "mdi:thermometer / icon.svg / 🌡️");
			}
		})}

          ${n === "entity" ? this._renderInput("Display precision", `status${e}_decimal_places`, "entity default") : ""}
        </div>
      </div>
    `;
	}
	_renderButtonsSection() {
		return Us.call(this);
	}
	_renderCurvedButtonsSection() {
		return qs.call(this);
	}
	_renderActionButtonSection() {
		return Js.call(this);
	}
	_renderEditorTabs() {
		return D`
      <div class="editor-tabs">
        ${nc.map((e) => D`
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
		cn(this, this._config?.type || "orbit-area-card-dev", this._activeSection || "card");
	}
	_renderActiveSection() {
		let e = nc.find((e) => e.key === this._activeSection) || nc[0];
		return this[e.render]();
	}
	render() {
		return D`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Area Card (Dev) v{version}", { version: t.area })}
        </div>
      </div>
    `;
	}
	static styles = [ec];
}, nc = [
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
], rc = class extends tc {};
customElements.get("orbit-area-card-dev-editor") || customElements.define("orbit-area-card-dev-editor", tc), customElements.get("orbit-room-card-dev-editor") || customElements.define("orbit-room-card-dev-editor", rc);
var ic = [
	"state_template",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action"
], ac = [
	"_icon_source",
	"_icon",
	"_decimal_places"
], oc = [
	"_color_source",
	"_color",
	"_color_on",
	"_color_off",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], sc = [
	"_color_source",
	"_color",
	"_color_on",
	"_color_off",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], cc = [
	"_color_source",
	"_color",
	"_color_on",
	"_color_off",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], lc = [
	"type",
	"area_name",
	"room_name",
	"area",
	"color",
	"main_entity",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override",
	"state_template",
	"navigate",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"status_color",
	"status_separator",
	...[
		1,
		2,
		3
	].flatMap((e) => [
		`status${e}_source`,
		`status${e}`,
		`status${e}_template`,
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
		`button${e}_color_source`,
		`button${e}_color`,
		`button${e}_color_on`,
		`button${e}_color_off`,
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
		`curve_button${e}_color_source`,
		`curve_button${e}_color`,
		`curve_button${e}_color_on`,
		`curve_button${e}_color_off`,
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
	"action_button_color_source",
	"action_button_color",
	"action_button_color_on",
	"action_button_color_off",
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
function uc(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return lc.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
//#endregion
//#region src/cards/area-card.js
var dc = class extends ot(A) {
	static svgCache = B;
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
		return document.createElement("orbit-area-card-dev-editor");
	}
	static getStubConfig(e) {
		let t = hc(e), n = {
			type: "custom:orbit-area-card-dev",
			color: "blue",
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
		this._config = dn(e).config, this._areaColor = this._computeFullColor(this._config.color), this._statusColor = this._computeFullColor(this._config.status_color || this._config.color), this._iconColor = this._computeIconColor(this._config.color), this._circleColor = this._computeCircleColor(this._config.color);
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && _t.call(this, this._getTemplateEntries()), Tr.call(this, e);
	}
	disconnectedCallback() {
		vt.call(this), this._cancelLongPress(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return $n.call(this, e, this._getRelevantEntities(), { hasTemplates: er(this._config) });
	}
	_toggleEntity(e, t, n = null) {
		return Ke.call(this, e, t, n);
	}
	_handleButtonClick(e) {
		return qe.call(this, e);
	}
	_handleButtonDoubleClick(e) {
		return Je.call(this, e);
	}
	_handleCurveButtonClick(e) {
		return Ye.call(this, e);
	}
	_handleCurveButtonDoubleClick(e) {
		return Xe.call(this, e);
	}
	_handleTap(e) {
		return Ze.call(this, e);
	}
	_handleCardPointerDown(e) {
		if (M(this) || fc(e)) return;
		let t = this._config?.hold_action;
		if (!(!t?.action || t.action === "none")) return this._startLongPress(e, this._config.main_entity || this._config.entity, t);
	}
	_handleCardDoubleTap(e) {
		return Qe.call(this, e);
	}
	_handleMainEntityTap(e) {
		return $e.call(this, e);
	}
	_handleMainEntityDoubleTap(e) {
		return et.call(this, e);
	}
	_handleMainEntityPointerDown(e) {
		if (!M(this)) return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
	}
	_handleButtonPointerDown(e) {
		if (M(this)) return;
		let t = e.currentTarget;
		return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
	}
	_computeFullColor(e) {
		return It.call(this, e);
	}
	_computeIconColor(e) {
		return Lt.call(this, e);
	}
	_computeCircleColor(e) {
		return Rt.call(this, e);
	}
	_computeButtonBackground(e) {
		return zt.call(this, e);
	}
	_getCardName(e = "Card") {
		return Zt(this._config, this.hass, e);
	}
	formatState(e) {
		return st(e, this.hass);
	}
	_getEntityActiveState(e) {
		return ct(e);
	}
	_getMainIconColor(e, t) {
		return Un.call(this, e, t);
	}
	_getEntityColor(e) {
		return Wn(e);
	}
	_isImageIcon(e) {
		return Gn(e);
	}
	_resolveIconPath(e) {
		return Kn(e);
	}
	_getInlineSvg(e, t = !0, n = !1) {
		return z.call(this, e, {
			forceColor: t,
			animate: n
		});
	}
	_getSvgColorOverride(e) {
		return qn(this._config, e);
	}
	_evaluateStateTemplate(e, t) {
		return I.call(this, e, t);
	}
	_getTemplateEntries() {
		let e = this._config?.state_template ? [{
			template: this._config.state_template,
			entityId: this._config?.main_entity || ""
		}] : [];
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
		return [
			...e,
			...Sr(this._config),
			...Tt(this._config),
			...Et(this._config)
		];
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
		return Yr.call(this, e);
	}
	_renderCurveButtons() {
		return di.call(this);
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	render() {
		return Xr.call(this);
	}
	static styles = Ti;
};
function fc(e) {
	return e.composedPath().some((e) => e?.classList ? e.classList.contains("entity-button") || e.classList.contains("curve-button") || e.classList.contains("action-button") : !1);
}
var pc = class extends dc {};
un({
	tag: "orbit-area-card-dev",
	cardClass: dc,
	name: "Orbit Area Card (Dev)",
	description: "Responsive area card",
	version: t.area,
	getEntitySuggestion: gc,
	aliases: [{
		tag: "orbit-room-card-dev",
		cardClass: pc
	}]
});
var mc = new Set([
	"light",
	"fan",
	"climate",
	"media_player",
	"switch",
	"cover",
	"lock"
]);
function hc(e) {
	return Object.keys(e?.areas || {}).sort((t, n) => {
		let r = e.areas[t]?.name || t, i = e.areas[n]?.name || n;
		return r.localeCompare(i, void 0, { sensitivity: "base" });
	})[0] || "";
}
function gc(e, t) {
	let n = nr(t);
	if (!mc.has(n)) return null;
	let r = rr(e, t), i = {
		type: "custom:orbit-area-card-dev",
		main_entity: t,
		color: n === "light" ? "light" : "theme"
	};
	return r && (i.area = r), { config: i };
}
//#endregion
//#region src/common/helpers/card-layout.js
function _c({ config: e = {}, count: t = 1, wrapKey: n = "wrap", perRowKey: r, defaultColumns: i = 3 }) {
	if (!e[n]) return Math.max(1, t);
	let a = Number(e[r]);
	return Math.max(1, Math.min(t, (Number.isFinite(a) ? Math.floor(a) : i) || 1));
}
function vc(e) {
	let t = _c(e);
	return Math.max(1, Math.ceil((e?.count || 1) / t));
}
//#endregion
//#region src/common/helpers/status-badge.js
var yc = "unavailable", bc = [
	{
		value: yc,
		label: "Unavailable",
		icon: "mdi:alert-circle-outline",
		staticIcon: !0
	},
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
	},
	{
		value: "sensor",
		label: "Sensors",
		icon: "mdi:gauge",
		requiresDeviceClass: !0
	}
], q = "Current state", J = "current-activity", xc = new Set([
	"date",
	"enum",
	"timestamp",
	"uptime"
]), Sc = [
	"state_source",
	"area",
	"domain",
	"domains",
	"device_class",
	"threshold",
	"thresholds",
	"hide",
	"active_template",
	"inactive_template"
];
function Cc(e = {}) {
	return Object.fromEntries(Sc.map((t) => [t, e[t]]));
}
function wc(e = {}) {
	let t = Z(e);
	return t === "entity" ? { action: "more-info" } : t === "area_count" ? { action: q } : { action: "none" };
}
var Tc = new Map(bc.map((e) => [e.value, e])), Ec = /* @__PURE__ */ new WeakMap();
async function Dc(e) {
	let t = e?.connection;
	if (!t?.sendMessagePromise) return {};
	let n = Ec.get(t);
	return n || (n = {
		resources: {},
		promise: t.sendMessagePromise({
			type: "frontend/get_icons",
			category: "entity_component"
		}).then((e) => (n.resources = e?.resources || {}, n.resources)).catch(() => n.resources)
	}, Ec.set(t, n)), n.promise;
}
function Y(e = "") {
	return Tc.get(e) || {
		value: e,
		label: e ? e.replaceAll("_", " ") : "Status",
		icon: "mdi:shape"
	};
}
function X(e = {}) {
	let t = Array.isArray(e?.domains) && e.domains.length ? e.domains : Array.isArray(e?.domain) ? e.domain : [e?.domain];
	return [...new Set(t.filter((e) => typeof e == "string" && e.trim()).map((e) => e.trim()))];
}
function Z(e = {}) {
	let t = e.state_source || "entity";
	if ([
		"entity",
		"area_count",
		"template"
	].includes(t)) return t;
	throw Error(`Invalid state_source "${t}". Expected "entity", "area_count", or "template".`);
}
function Oc(e = {}) {
	let t = Z(e), n = X(e).some((e) => Y(e).requiresDeviceClass);
	if (t === "area_count" && n && Q(e).length === 0) throw Error("Orbit Status Badge (Dev) requires \"device_class\" for the selected domains.");
	return t;
}
function kc(e = {}) {
	if (!Object.prototype.hasOwnProperty.call(e, "hide")) return [{ type: "hidden" }];
	if (!Array.isArray(e.hide)) return [];
	let t = [], n = /* @__PURE__ */ new Set(), r = !1;
	return e.hide.forEach((e) => {
		if (e === "hidden" && !r) {
			r = !0, t.push({ type: "hidden" });
			return;
		}
		if (e === "low" && !t.some((e) => e.type === "low")) {
			t.push({ type: "low" });
			return;
		}
		let i = typeof e?.label == "string" ? e.label.trim() : "";
		!i || n.has(i) || (n.add(i), t.push({
			type: "label",
			label: i
		}));
	}), t;
}
function Ac(e = []) {
	return e.map((e) => ["hidden", "low"].includes(e?.type) ? e.type : { label: e?.label });
}
function jc(e, t, n = {}) {
	let r = kc(n), i = e?.entities?.[t];
	return r.some((n) => {
		if (n.type === "hidden") return !!(i?.hidden_by || i?.hidden);
		if (n.type === "low") {
			let n = e?.states?.[t];
			return t.startsWith("binary_sensor.") && n?.attributes?.device_class === "battery";
		}
		return n.type === "label" && Array.isArray(i?.labels) && i.labels.includes(n.label);
	});
}
function Mc(e = {}) {
	let t = pn(e).config, n = Z(t), r = { ...t };
	Object.keys(r).forEach((e) => {
		(r[e] === "" || r[e] === void 0) && delete r[e];
	}), n === "area_count" && X(r).includes("unavailable") && (delete r.device_class, delete r.threshold, delete r.thresholds);
	let i = Q(r), a = n === "area_count" && i.includes("battery"), o = n === "area_count" && X(r).includes("sensor");
	if (i.length === 0 ? delete r.device_class : r.device_class = i.length === 1 ? i[0] : i, !a) delete r.threshold;
	else {
		let e = Number(r.threshold);
		!Number.isFinite(e) || e === 20 ? delete r.threshold : r.threshold = Math.min(100, Math.max(0, e));
	}
	if (!o) delete r.thresholds;
	else {
		let e = Object.fromEntries(Object.entries(r.thresholds || {}).flatMap(([e, t]) => {
			if (!i.includes(e) || e === "battery") return [];
			let n = Number(t?.value), r = Rc(e), a = ["above", "below"].includes(t?.direction) ? t.direction : r;
			return !Number.isFinite(n) || n === 0 && a === r ? [] : [[e, {
				value: n,
				direction: a
			}]];
		}));
		Object.keys(e).length ? r.thresholds = e : delete r.thresholds;
	}
	return delete r.include_low_sensors, r.show_state === !0 && delete r.show_state, r.show_icon === !0 && delete r.show_icon, r.show_name === !1 && delete r.show_name, r.show_entity_picture === !1 && delete r.show_entity_picture, Object.prototype.hasOwnProperty.call(r, "hide") && (r.hide = Ac(kc(r)), r.hide.length === 1 && r.hide[0] === "hidden" && delete r.hide), r.card_visibility === "always" && delete r.card_visibility, n === "entity" ? (delete r.state_source, delete r.area, delete r.domain, delete r.domains, delete r.device_class, delete r.state_template, delete r.active_template, delete r.inactive_template, delete r.name_template, delete r.hide, r.state_content === "state" && delete r.state_content, r.tap_action?.action === "more-info" && delete r.tap_action) : n === "area_count" ? (r.state_source = "area_count", delete r.entity, delete r.state_template, delete r.active_template, delete r.inactive_template, delete r.name_template, r.state_content === "count" && delete r.state_content, r.tap_action?.action === "Current state" && delete r.tap_action) : (r.state_source = "template", r.display_style !== "badge" && delete r.entity, delete r.area, delete r.domain, delete r.domains, delete r.device_class, delete r.hide, r.state_content === "state" && delete r.state_content, r.tap_action?.action === "none" && delete r.tap_action), r.hold_action?.action === "none" && delete r.hold_action, r.double_tap_action?.action === "none" && delete r.double_tap_action, r.icon_source === "domain" && (delete r.icon_source, delete r.icon, delete r.icon_on, delete r.icon_off), [
		"",
		"theme",
		"state",
		"state-active"
	].includes(r.color_on) && delete r.color_on, [
		"",
		"theme",
		"state",
		"state-inactive"
	].includes(r.color_off) && delete r.color_off, r;
}
function Nc(e = "") {
	return e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Pc(e = "") {
	return Nc(e);
}
function Fc(e, t = {}) {
	let n = Q(t);
	return n.length ? n.map((e) => Pc(e)).join(", ") : X(t).map((t) => V(e, Y(t).label)).join(", ");
}
function Q(e = {}) {
	let t = Array.isArray(e?.device_class) ? e.device_class : [e?.device_class];
	return [...new Set(t.filter((e) => typeof e == "string").map((e) => e.trim()).filter(Boolean))];
}
function Ic(e = {}) {
	let t = Number(e.threshold);
	return Number.isFinite(t) ? Math.min(100, Math.max(0, t)) : 20;
}
function Lc(e = {}, t = "") {
	let n = e.thresholds?.[t] || {}, r = Number(n.value), i = Rc(t);
	return {
		value: Number.isFinite(r) ? r : 0,
		direction: ["above", "below"].includes(n.direction) ? n.direction : i
	};
}
function Rc(e = "") {
	return e === "signal_strength" ? "below" : "above";
}
function zc(e, t = {}) {
	if (!Bc(t)) return "";
	let n = Q(t);
	if (n.length !== 1) return "";
	let r = n[0], i, a, o;
	if (r === "battery") i = "below", a = Ic(t), o = "%";
	else if (X(t).includes("sensor") && !xc.has(r)) {
		let n = Lc(t, r);
		i = n.direction, a = n.value, o = Vc(e, r);
	} else return "";
	return `${V(e, i === "below" ? "Below" : "Above").replace(/^\p{L}/u, (e) => e.toLocaleLowerCase())} ${st({
		entity_id: "sensor.orbit_status_threshold",
		state: String(a),
		attributes: {
			device_class: r,
			...o ? { unit_of_measurement: o } : {}
		}
	}, e)}`;
}
function Bc(e = {}) {
	return Z(e) === "area_count" ? Q(e).some((t) => t === "battery" || X(e).includes("sensor") && !xc.has(t)) : !1;
}
function Vc(e, t) {
	return t === "power" ? "W" : Object.values(e?.states || {}).find((e) => e.entity_id.startsWith("sensor.") && e.attributes?.device_class === t && e.attributes?.unit_of_measurement)?.attributes?.unit_of_measurement || "";
}
function Hc(e = [], t = {}, n = ct) {
	let r = Z(t) === "area_count";
	if (r && X(t).includes("unavailable")) return e;
	let i = Q(t), a = r && i.includes("battery"), o = r && X(t).includes("sensor");
	if (!a && !o) return e.filter(n);
	let s = Ic(t);
	return e.filter((e) => {
		let r = e?.attributes?.device_class;
		if (r === "battery" && a) {
			let t = Wc(e?.state);
			return Number.isFinite(t) ? t <= s : e?.entity_id?.startsWith("binary_sensor.") && n(e);
		}
		if (e?.entity_id?.startsWith("sensor.") && o) {
			if (xc.has(r)) return Uc(e?.state);
			let n = r === "power" ? Gc(e) : Wc(e?.state);
			if (Number.isFinite(n)) {
				let e = Lc(t, r);
				return e.direction === "below" ? n <= e.value : n > e.value;
			}
			return !1;
		}
		return n(e);
	});
}
function Uc(e) {
	let t = e?.toString().trim().toLowerCase();
	return !!t && ![
		"unknown",
		"unavailable",
		"none"
	].includes(t);
}
function Wc(e) {
	let t = e?.toString().trim();
	if (!t) return NaN;
	let n = Number(t);
	return Number.isFinite(n) ? n : NaN;
}
function Gc(e) {
	let t = Wc(e?.state);
	if (!Number.isFinite(t)) return NaN;
	let n = {
		mW: .001,
		W: 1,
		kW: 1e3,
		MW: 1e6,
		GW: 1e9,
		TW: 0xe8d4a51000
	}[e?.attributes?.unit_of_measurement || "W"];
	return n === void 0 ? NaN : t * n;
}
function Kc(e, t) {
	return e?.attributes?.device_class || (t === "switch" ? "switch" : "");
}
function qc(e, t = {}) {
	let n = X(t), r = Q(t), i = /* @__PURE__ */ new Map();
	if (!n.length) return [];
	let a = (e, t = "") => {
		e && (i.has(e) || i.set(e, /* @__PURE__ */ new Set()), t && i.get(e).add(t));
	}, o = e?.connection && Ec.get(e.connection)?.resources || {};
	return n.forEach((e) => {
		Object.keys(o[e] || {}).forEach((t) => {
			t !== "_" && a(t, e);
		});
	}), Object.values(e?.states || {}).forEach((e) => {
		let t = e.entity_id.split(".")[0];
		n.includes(t) && a(Kc(e, t), t);
	}), r.forEach((e) => a(e)), [...i].sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => ({
		value: e,
		domains: [...t],
		label: Pc(e)
	}));
}
function Jc(e, t = {}, n = []) {
	if (n.includes("unavailable")) return [];
	let r = new Set(n), i = new Map(qc(e, t).map((e) => [e.value, e]));
	return Q(t).filter((e) => {
		let t = i.get(e)?.domains || [];
		return !t.length || t.some((e) => r.has(e));
	});
}
function Yc(e, t = {}) {
	let n = Qc(t), r = X(t), i = Q(t);
	if (!e || !n.length || !r.length || r.some((e) => Y(e).requiresDeviceClass) && !i.length) return [];
	if (r.includes("unavailable")) return Object.values(e.states || {}).filter((r) => r.state === "unavailable" && n.includes(rr(e, r.entity_id)) && !jc(e, r.entity_id, t));
	let a = i.includes("battery") && r.some((e) => ["sensor", "binary_sensor"].includes(e)), o = Object.values(e.states || {}).filter((o) => {
		let s = o.entity_id.split(".")[0], c = r.includes(s) || a && ["sensor", "binary_sensor"].includes(s), l = !i.length || i.includes(Kc(o, s));
		return c && n.includes(rr(e, o.entity_id)) && l && !jc(e, o.entity_id, t);
	});
	return i.includes("battery") ? Xc(e, o) : o;
}
function Xc(e, t) {
	let n = /* @__PURE__ */ new Map();
	return t.forEach((t) => {
		if (t?.attributes?.device_class !== "battery") {
			n.set(t.entity_id, [t]);
			return;
		}
		let r = e?.entities?.[t.entity_id]?.device_id || t.entity_id;
		n.set(r, [...n.get(r) || [], t]);
	}), [...n.values()].flatMap((e) => {
		let t = e.filter((e) => e.entity_id.startsWith("sensor."));
		return t.length ? t : e;
	});
}
function Zc(e, t = {}) {
	if (Z(t) === "entity" || t.display_style === "badge" && t.entity) {
		let n = t.entity || t.main_entity || "", r = e?.states?.[n];
		return r ? [r] : [];
	}
	return Yc(e, t);
}
function Qc(e = {}) {
	return Array.isArray(e.area) ? e.area.filter(Boolean) : [e.area].filter(Boolean);
}
function $c(e, t = {}) {
	return Qc(t).map((t) => e?.areas?.[t]?.name || t).filter(Boolean).join(", ");
}
function el(e, t = {}) {
	if (X(t).includes("unavailable")) {
		let n = Qc(t);
		return Object.values(e?.states || {}).filter((r) => n.includes(rr(e, r.entity_id)) && !jc(e, r.entity_id, t)).map((e) => e.entity_id);
	}
	return Yc(e, t).map((e) => e.entity_id);
}
function tl(e, t = !1) {
	if (e.state === "unavailable") return "var(--state-unavailable-color)";
	let n = e.entity_id.split(".")[0], r = e.attributes || {};
	if (n === "light" && t && Array.isArray(r.rgb_color)) return rl(r.rgb_color);
	let i = nl(e.state), a = t ? "active" : "inactive";
	return [
		r.device_class ? `--state-${n}-${r.device_class}-${i}-color` : "",
		`--state-${n}-${i}-color`,
		`--state-${n}-${a}-color`,
		`--state-${a}-color`
	].filter(Boolean).reduceRight((e, t) => `var(${t}, ${e})`, "var(--state-icon-color, var(--secondary-text-color))");
}
function nl(e = "") {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function rl(e) {
	let [t, n, r] = il(e);
	return n < .4 && (n < .1 ? r = 225 : n = .4), `#${al(t, n, r).map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function il([e, t, n]) {
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
function al(e, t, n) {
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
var ol = {
	_activeEntitiesOpen: { state: !0 },
	_activeEntitiesConfirmOpen: { state: !0 },
	_activeEntitiesDurationNow: { state: !0 }
};
function sl() {
	this._activeEntitiesOpen = !1, this._activeEntitiesConfirmOpen = !1, this._activeEntitiesDurationNow = Date.now(), this._activeEntitiesDurationTimer = null, this._activeEntityRegistryEntries = /* @__PURE__ */ new Map(), this._activeEntityRegistryEntryPromises = /* @__PURE__ */ new Map();
}
function cl() {
	this._activeEntitiesOpen = !0, this._activeEntitiesDurationNow = Date.now(), ll.call(this);
}
function ll() {
	this._activeEntitiesDurationTimer === null && (this._activeEntitiesDurationTimer = window.setInterval(() => {
		if (!this._activeEntitiesOpen) {
			ul.call(this);
			return;
		}
		this._activeEntitiesDurationNow = Date.now();
	}, 6e4));
}
function ul() {
	this._activeEntitiesDurationTimer !== null && (window.clearInterval(this._activeEntitiesDurationTimer), this._activeEntitiesDurationTimer = null);
}
function dl(e) {
	return this._activeEntitiesOpen && e.has("hass");
}
function fl(e = []) {
	e.forEach((e) => {
		let t = e?.entity_id, n = this.hass?.entities?.[t];
		if (!t || n?.platform !== "switch_as_x" || this._activeEntityRegistryEntries.has(t) || this._activeEntityRegistryEntryPromises.has(t)) return;
		let r = this.hass?.callWS?.({
			type: "config/entity_registry/get",
			entity_id: t
		});
		r && (this._activeEntityRegistryEntryPromises.set(t, r), r.then((e) => {
			this._activeEntityRegistryEntries.set(t, e || null);
		}).catch(() => {
			this._activeEntityRegistryEntries.set(t, null);
		}).finally(() => {
			this._activeEntityRegistryEntryPromises.delete(t), this._activeEntitiesOpen && this.requestUpdate();
		}));
	});
}
function pl() {
	this._activeEntitiesOpen = !1, this._activeEntitiesConfirmOpen = !1, ul.call(this);
}
function ml(e, t = []) {
	return !e || !t.length ? Promise.resolve() : this.hass?.callService(e.domain, e.service, { entity_id: t }) || Promise.resolve();
}
function hl(e) {
	e && queueMicrotask(() => this.dispatchEvent(new CustomEvent("hass-more-info", {
		detail: { entityId: e },
		bubbles: !0,
		composed: !0
	})));
}
function gl(e) {
	e && (pl.call(this), Ge(`/config/devices/device/${e}`));
}
//#endregion
//#region src/common/helpers/active-entities.js
var _l = {
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
}, vl = /* @__PURE__ */ new Map(), yl = /* @__PURE__ */ new Map();
function bl(e, t) {
	let n = t?.entity_id?.split(".")[0] || "", r = _l[n];
	return !r || n === "cover" && !(t.attributes?.supported_features & 2) || n === "lock" && !(t.attributes?.supported_features & 1) || e?.services?.[n] && !e.services[n][r.service] ? null : {
		domain: n,
		...r
	};
}
function xl(e) {
	if (!e.length) return null;
	let t = e[0].control;
	return e.every(({ control: e }) => e.domain === t.domain && e.service === t.service) ? t : null;
}
function Sl(e, t) {
	let n = e?.formatEntityName?.(t) || t?.attributes?.friendly_name || t?.entity_id || "", r = Cl(e, t);
	if (!r || n.length <= r.length) return n;
	let i = RegExp(`^${Ll(r)}(?:\\s*[-–—:|]\\s*|\\s+)`, "i");
	return n.replace(i, "").trim() || n;
}
function Cl(e, t) {
	let n = rr(e, t?.entity_id) || t?.attributes?.area_id || "";
	return e?.areas?.[n]?.name?.trim() || "";
}
function wl(e, t, n = null, r = Tl(e)) {
	let i = t?.entity_id || "", a = e?.entities?.[i]?.device_id;
	if (!a) return null;
	let o = r.filter((t) => e?.entities?.[t.entity_id]?.device_id === a);
	if (o.length === 1) return o[0];
	if (o.length > 1) return El(e, t, o, n);
	let s = rr(e, i);
	if (!s) return null;
	let c = e?.areas?.[s]?.name?.trim() || "", l = Rl(Sl(e, t)), u = r.filter((t) => {
		if (rr(e, t.entity_id) !== s) return !1;
		let n = e?.entities?.[t.entity_id]?.device_id, r = e?.devices?.[n];
		return Rl(Vl(r?.name_by_user || r?.name || "", c)) === l;
	});
	return u.length === 1 ? u[0] : null;
}
function Tl(e) {
	return Object.values(e?.states || {}).filter((e) => e?.entity_id?.startsWith("sensor.") && e.attributes?.device_class === "power" && Number.isFinite(Number(e.state)));
}
function El(e, t, n, r) {
	let i = t?.entity_id || "", a = [...new Set([...zl(e, t), ...Bl(e, t, r)])], o = Rl(i.split(".")[1] || ""), s = n.map((t) => {
		let n = Rl(Sl(e, t)), r = Rl(t.entity_id.split(".")[1] || ""), i = 0;
		return r === `${o}power` && (i += 4), a.some((e) => n === `${e}power`) && (i += 4), o && r.startsWith(o) && (i += 1), a.some((e) => n.startsWith(e)) && (i += 1), {
			candidate: t,
			score: i
		};
	}).sort((e, t) => t.score - e.score);
	return s[0].score >= 4 && s[0].score > (s[1]?.score || 0) ? s[0].candidate : null;
}
function Dl(e) {
	let t = e?.locale?.language || e?.language || "en";
	return vl.has(t) || vl.set(t, new Intl.Collator(t, {
		numeric: !0,
		sensitivity: "base"
	})), vl.get(t);
}
function Ol(e, t) {
	if (!t) return "";
	let n = e?.formatEntityState?.(t);
	if (n) return n;
	let r = String(t?.state || "").replaceAll("_", " ");
	return r ? r[0].toUpperCase() + r.slice(1) : "";
}
function kl(e, t, n) {
	return e.compare(t.name, n.name) || t.stateObj.entity_id.localeCompare(n.stateObj.entity_id);
}
function Al(e, t = "", n = 0) {
	let r = 132 + e.reduce((e, { name: t, areaName: n }) => Math.max(e, t.length, n?.length || 0), 0) * 8, i = n ? 16 + n * 52 + Math.max(0, n - 1) * 8 : 0, a = 104 + t.length * 12 + i;
	return Math.min(520, Math.max(360, a, r));
}
function jl(e, t, n = Date.now()) {
	let r = Date.parse(t?.last_changed || "");
	if (!Number.isFinite(r)) return "";
	let i = Math.max(0, n - r), a, o;
	i >= 864e5 ? (a = "days", o = Math.round(i / 864e5)) : i >= 36e5 ? (a = "hours", o = Math.round(i / 36e5)) : (a = "minutes", o = Math.max(1, Math.round(i / 6e4)));
	let s = String(e?.locale?.language || e?.language || "en").replace("_", "-");
	try {
		let e = Fl(s).format({ [a]: o });
		return s.toLowerCase().startsWith("en") ? e.replace(/\b(days?|hours?|minutes?)\b/, (e) => e[0].toUpperCase() + e.slice(1)) : e;
	} catch {
		let e = a.slice(0, -1), t = o === 1 ? e : a;
		return `${o} ${t[0].toUpperCase()}${t.slice(1)}`;
	}
}
function Ml(e, t) {
	return e?.services?.[t.domain]?.[t.service]?.name;
}
function Nl(e) {
	return `color:${Wn(e) || tl(e, !0)};--mdc-icon-size:36px`;
}
function Pl(e, t = []) {
	let n = /* @__PURE__ */ new Map(), r = [];
	return t.forEach((t) => {
		let i = e?.entities?.[t.entity_id]?.device_id;
		if (!i) {
			r.push({ stateObj: t });
			return;
		}
		n.set(i, [...n.get(i) || [], t]);
	}), [...[...n.entries()].flatMap(([t, n]) => {
		if (n.length === 1) return [{ stateObj: n[0] }];
		let r = n[0], i = e?.devices?.[t], a = i?.name_by_user || i?.name || Sl(e, r), o = Il(n, "last_changed"), s = Il(n, "last_updated");
		return [{
			stateObj: {
				...r,
				entity_id: `sensor.orbit_unavailable_device_${t}`,
				state: "unavailable",
				attributes: {
					...r.attributes,
					friendly_name: a
				},
				last_changed: o || r.last_changed,
				last_updated: s || r.last_updated
			},
			name: a,
			areaName: Cl(e, r),
			icon: "mdi:devices",
			deviceId: t,
			entityCount: n.length
		}];
	}), ...r];
}
function Fl(e) {
	return yl.has(e) || yl.set(e, new Intl.DurationFormat(e, { style: "long" })), yl.get(e);
}
function Il(e, t) {
	return e.map((e) => e?.[t]).filter(Boolean).sort()[0] || "";
}
function Ll(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Rl(e) {
	return String(e || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}
function zl(e, t) {
	let n = e?.entities?.[t?.entity_id] || {};
	return [...new Set([
		Sl(e, t),
		n.name,
		t?.attributes?.friendly_name
	].map(Rl).filter(Boolean))];
}
function Bl(e, t, n) {
	if (!t?.entity_id?.startsWith("light.")) return [];
	let r = n?.options?.switch_as_x?.entity_id, i = e?.states?.[r];
	if (i) return zl(e, i);
	let a = e?.entities?.[t.entity_id]?.device_id;
	if (!a) return [];
	let o = Object.values(e?.states || {}).filter((n) => {
		if (!n?.entity_id?.startsWith("switch.")) return !1;
		let r = e?.entities?.[n.entity_id], i = Date.parse(n.last_changed || ""), o = Date.parse(t.last_changed || ""), s = Number.isFinite(i) && Number.isFinite(o) && Math.abs(i - o) <= 2e3;
		return r?.device_id === a && n.state === t.state && s;
	});
	return o.length === 1 ? zl(e, o[0]) : [];
}
function Vl(e, t) {
	return t ? String(e || "").replace(RegExp(`^${Ll(t)}(?:\\s*[-–—:|]\\s*|\\s+)`, "i"), "").trim() : e;
}
//#endregion
//#region src/common/renders/active-entities-dialog.js
function Hl(e = [], t = {}) {
	if (!this._activeEntitiesOpen) return k;
	let n = Dl(this.hass), r = t.domain === yc, i = r ? Pl(this.hass, e) : e.map((e) => ({ stateObj: e }));
	fl.call(this, i.map((e) => e.stateObj));
	let a = r ? [] : Tl(this.hass), o = i.map((e) => {
		let { stateObj: t } = e, n = r ? null : bl(this.hass, t);
		return {
			...e,
			stateObj: t,
			control: n,
			name: e.name || Sl(this.hass, t),
			areaName: e.areaName || Cl(this.hass, t),
			powerStateObj: r ? null : wl(this.hass, t, this._activeEntityRegistryEntries.get(t.entity_id), a),
			serviceName: n ? Ml(this.hass, n) : ""
		};
	}).sort((e, t) => kl(n, e, t)), s = o.filter((e) => e.control), c = [...o.reduce((e, t) => {
		let n = t.stateObj.entity_id.split(".")[0], r = t.stateObj.attributes?.device_class || n, i = `${n}:${r}`, a = e.get(i) || {
			key: i,
			label: r.replaceAll("_", " "),
			stateObj: t.stateObj,
			icon: t.icon,
			count: 0
		};
		return !a.icon && t.icon && (a.icon = t.icon), a.count += 1, e.set(i, a), e;
	}, /* @__PURE__ */ new Map()).values()], l = xl(s), u = l ? Ml(this.hass, l) : "", d = zc(this.hass, t), f = Bc(t) ? d : Ol(this.hass, o[0]?.stateObj), p = d ? this._t("Currently {state}", { state: d }) : f ? this._t("Currently {state}", { state: f }) : this._t("Current state"), m = Al(o, p, c.length);
	return D`
    <ha-adaptive-dialog
      .open=${!0}
      width="small"
      style=${[
		`--ha-dialog-width-sm:${m}px`,
		`--mdc-dialog-min-width:${m}px`,
		`--mdc-dialog-max-width:${m}px`
	].join(";")}
      @closed=${(e) => {
		e.stopPropagation(), pl.call(this);
	}}
    >
      <ha-icon-button
        slot="headerNavigationIcon"
        .label=${this.hass?.localize?.("ui.common.close")}
        @click=${() => pl.call(this)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <span slot="headerTitle">${p}</span>
      ${o.length ? l ? D`
            <ha-button
              class="active-entities-subtype-pill"
              slot="headerActionItems"
              appearance="filled"
              aria-label=${u}
              @click=${async () => {
		if (l.service === "turn_off") {
			this._activeEntitiesConfirmOpen = !0;
			return;
		}
		await ml.call(this, l, s.map((e) => e.stateObj.entity_id)), pl.call(this);
	}}
            >
              ${c.length === 1 ? D`
                    <span class="active-entities-subtype-count">
                      <ha-icon .icon=${l.icon}></ha-icon>
                      <span>(${o.length})</span>
                    </span>
                  ` : c.map((e) => D`
                    <span
                      class="active-entities-subtype-count"
                      title=${e.label}
                    >
                      ${e.icon ? D`<ha-icon .icon=${e.icon}></ha-icon>` : D`
                            <ha-state-icon
                              .hass=${this.hass}
                              .stateObj=${e.stateObj}
                            ></ha-state-icon>
                          `}
                      <span>(${e.count})</span>
                    </span>
                  `)}
            </ha-button>
          ` : D`
              <ha-button
                class="active-entities-subtype-pill active-entities-subtype-pill-static"
                slot="headerActionItems"
                appearance="filled"
                aria-disabled="true"
                tabindex="-1"
              >
                ${c.length === 1 ? D`<span>(${o.length})</span>` : c.map((e) => D`
                      <span
                        class="active-entities-subtype-count"
                        title=${e.label}
                      >
                        ${e.icon ? D`<ha-icon .icon=${e.icon}></ha-icon>` : D`
                              <ha-state-icon
                                .hass=${this.hass}
                                .stateObj=${e.stateObj}
                              ></ha-state-icon>
                            `}
                        <span>(${e.count})</span>
                      </span>
                    `)}
              </ha-button>
            ` : ""}
      <div class="active-entities-dialog-content">
        ${o.length ? o.map(({ stateObj: e, name: t, areaName: n, control: r, serviceName: i, icon: a, deviceId: o, entityCount: s, powerStateObj: c }) => D`
              <div class="active-entity-row">
                ${r ? D`
                      <button
                        type="button"
                        class="active-entity-control-button"
                        aria-label=${i}
                        title=${i}
                        @click=${(t) => {
		t.stopPropagation(), ml.call(this, r, [e.entity_id]);
	}}
                      >
                        <ha-state-icon
                          .hass=${this.hass}
                          .stateObj=${e}
                          style=${Nl(e)}
                        ></ha-state-icon>
                      </button>
                    ` : a ? D`
                      <button
                        type="button"
                        class="active-entity-control-button active-entity-device-button"
                        aria-label=${t}
                        @click=${() => gl.call(this, o)}
                      >
                        <ha-icon
                          .icon=${a}
                          style=${Nl(e)}
                        ></ha-icon>
                      </button>
                    ` : D`
                      <ha-state-icon
                        .hass=${this.hass}
                        .stateObj=${e}
                        style=${Nl(e)}
                      ></ha-state-icon>
                    `}
                <button
                  type="button"
                  class="active-entity-info"
                  @click=${() => o ? gl.call(this, o) : hl.call(this, e.entity_id)}
                >
                  <span class="active-entity-name">${t}</span>
                  ${n ? D`
                        <span class="active-entity-area">${n}</span>
                      ` : k}
                  <span class="active-entity-state-line">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${e}
                    ></state-display>
                    ${s ? D`<span>(${s})</span>` : k}
                    ${c ? D`
                          <span aria-hidden="true">-</span>
                          <state-display
                            .hass=${this.hass}
                            .stateObj=${c}
                          ></state-display>
                        ` : k}
                    <span aria-hidden="true">-</span>
                    <span>${jl(this.hass, e, this._activeEntitiesDurationNow)}</span>
                  </span>
                </button>
              </div>
            `) : D`
              <div class="active-entities-empty">
                ${this._t("No active entities")}
              </div>
            `}
      </div>
    </ha-adaptive-dialog>
    ${this._activeEntitiesConfirmOpen && l?.service === "turn_off" ? D`
          <ha-dialog
            .open=${!0}
            type="alert"
            width="small"
            .preventScrimClose=${!0}
            @closed=${(e) => {
		e.stopPropagation(), this._activeEntitiesConfirmOpen = !1;
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
              ${this._t("This will turn off {count} active entities.", { count: s.length })}
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
		await ml.call(this, l, s.map((e) => e.stateObj.entity_id)), this._activeEntitiesConfirmOpen = !1, pl.call(this);
	}}
              >
                ${u || this.hass?.localize?.("ui.card.common.turn_off")}
              </ha-button>
            </ha-dialog-footer>
          </ha-dialog>
        ` : k}
  `;
}
//#endregion
//#region src/common/helpers/current-activity-dialog.js
var Ul = 140, Wl = "calc(100dvh - 216px)", Gl = {
	_currentActivityOpen: { state: !0 },
	_currentActivityCard: { state: !0 },
	_currentActivityLoading: { state: !0 },
	_currentActivityError: { state: !0 },
	_currentActivityHeight: { state: !0 },
	_currentActivityScope: { state: !0 },
	_currentActivityCurrentEntityIds: { state: !0 },
	_currentActivityAllEntityIds: { state: !0 },
	_currentActivityShowScopeToggle: { state: !0 },
	_currentActivityStartDate: { state: !0 },
	_currentActivityEndDate: { state: !0 },
	_currentActivityHasDateRangePicker: { state: !0 },
	_currentActivityHeightLocked: { state: !0 },
	_currentActivityTitleDetail: { state: !0 }
};
function Kl() {
	this._currentActivityOpen = !1, this._currentActivityCard = null, this._currentActivityLoading = !1, this._currentActivityError = "", this._currentActivityHeight = `${Ul}px`, this._currentActivityScope = "current", this._currentActivityCurrentEntityIds = [], this._currentActivityAllEntityIds = [], this._currentActivityShowScopeToggle = !1;
	let { startDate: e, endDate: t } = nu();
	this._currentActivityStartDate = e, this._currentActivityEndDate = t, this._currentActivityHasDateRangePicker = !!customElements.get("ha-date-range-picker"), this._currentActivityHeightLocked = !1, this._currentActivityTitleDetail = "", this._currentActivityRequest = 0, this._currentActivityHeightTimer = null;
}
function ql(e = [], t = e, n = !1, r = "") {
	let i = eu(e), a = eu(t);
	this._currentActivityScope = "current", this._currentActivityCurrentEntityIds = i, this._currentActivityAllEntityIds = a, this._currentActivityShowScopeToggle = !!n, this._currentActivityTitleDetail = String(r || "").trim();
	let { startDate: o, endDate: s } = nu();
	this._currentActivityStartDate = o, this._currentActivityEndDate = s, this._currentActivityHeightLocked = !1, this._currentActivityOpen = !0, Zl.call(this, "current");
}
function Jl(e) {
	let t = e === "all" ? "all" : "current";
	t !== this._currentActivityScope && (this._currentActivityScope = t, Zl.call(this, t));
}
function Yl(e = [], t = e) {
	if (!this._currentActivityOpen) return;
	let n = this._currentActivityCurrentEntityIds, r = this._currentActivityAllEntityIds, i = eu([...n, ...e]), a = eu(t), o = !tu(n, i), s = !tu(r, a);
	if (!o && !s || (this._currentActivityCurrentEntityIds = i, this._currentActivityAllEntityIds = a, !(this._currentActivityScope === "all" ? s : o))) return;
	let c = this._currentActivityScope === "all" ? a : i, l = this._currentActivityCard;
	if (l?.localName === "ha-logbook" && c.length) {
		l.hass = this.hass, l.entityIds = c;
		return;
	}
	Zl.call(this, this._currentActivityScope);
}
function Xl(e = {}) {
	let t = ru(e.startDate), n = ru(e.endDate);
	if (!t || !n || n <= t) return;
	this._currentActivityStartDate = t, this._currentActivityEndDate = n, this._currentActivityHeightLocked = !0, this._currentActivityHeight = Wl;
	let r = this._currentActivityCard;
	if (r?.localName === "ha-logbook") {
		this._currentActivityRequest += 1, window.clearTimeout(this._currentActivityHeightTimer), this._currentActivityHeightTimer = null, this._currentActivityLoading = !1, this._currentActivityError = "", r.hass = this.hass, r.time = { range: [t, n] }, r.requestUpdate?.();
		return;
	}
	Zl.call(this, this._currentActivityScope);
}
async function Zl(e) {
	let t = e === "all" ? this._currentActivityAllEntityIds : this._currentActivityCurrentEntityIds, n = ++this._currentActivityRequest;
	if (this._currentActivityCard = null, this._currentActivityLoading = !0, this._currentActivityError = "", this._currentActivityHeight = this._currentActivityHeightLocked ? Wl : `${Ul}px`, window.clearTimeout(this._currentActivityHeightTimer), this._currentActivityHeightTimer = null, !t.length) {
		this._currentActivityLoading = !1, this._currentActivityError = this._t("No entities available for activity");
		return;
	}
	try {
		if (!window.loadCardHelpers) throw Error("Home Assistant card helpers are unavailable");
		let e = await window.loadCardHelpers();
		this._currentActivityHasDateRangePicker = await iu(e), e.createCardElement({
			type: "logbook",
			target: { entity_id: t },
			hours_to_show: 24
		}), await customElements.whenDefined("ha-logbook");
		let r = document.createElement("ha-logbook");
		if (n !== this._currentActivityRequest) return;
		r.hass = this.hass, r.time = Ql.call(this), r.entityIds = t, r.virtualize = !0, r.narrow = !0, this._currentActivityCard = r, au.call(this, r, n);
	} catch (e) {
		if (n !== this._currentActivityRequest) return;
		this._currentActivityError = e?.message || this._t("Unable to load current activity");
	} finally {
		n === this._currentActivityRequest && (this._currentActivityLoading = !1);
	}
}
function Ql() {
	return this._currentActivityHeightLocked ? { range: [this._currentActivityStartDate, this._currentActivityEndDate] } : { recent: 1440 * 60 };
}
function $l() {
	this._currentActivityOpen = !1, this._currentActivityCard = null, this._currentActivityLoading = !1, this._currentActivityError = "", this._currentActivityHeight = `${Ul}px`, this._currentActivityScope = "current", this._currentActivityCurrentEntityIds = [], this._currentActivityAllEntityIds = [], this._currentActivityShowScopeToggle = !1;
	let { startDate: e, endDate: t } = nu();
	this._currentActivityStartDate = e, this._currentActivityEndDate = t, this._currentActivityHeightLocked = !1, this._currentActivityTitleDetail = "", this._currentActivityRequest += 1, window.clearTimeout(this._currentActivityHeightTimer), this._currentActivityHeightTimer = null;
}
function eu(e = []) {
	return [...new Set(e.filter(Boolean))];
}
function tu(e = [], t = []) {
	return e.length === t.length && e.every((e, n) => e === t[n]);
}
function nu() {
	let e = /* @__PURE__ */ new Date();
	return {
		startDate: /* @__PURE__ */ new Date(e.getTime() - 1440 * 60 * 1e3),
		endDate: e
	};
}
function ru(e) {
	return !(e instanceof Date) || Number.isNaN(e.getTime()) ? null : new Date(e);
}
async function iu(e) {
	if (customElements.get("ha-date-range-picker")) return !0;
	try {
		return e.createCardElement({ type: "energy-date-selection" }), await Promise.race([customElements.whenDefined("ha-date-range-picker").then(() => !0), new Promise((e) => window.setTimeout(() => e(!1), 3e3))]);
	} catch {
		return !1;
	}
}
function au(e, t, n = 0) {
	this._currentActivityHeightLocked || (window.clearTimeout(this._currentActivityHeightTimer), this._currentActivityHeightTimer = window.setTimeout(async () => {
		if (t !== this._currentActivityRequest || e !== this._currentActivityCard || this._currentActivityHeightLocked) return;
		await e.updateComplete;
		let r = e.localName === "ha-logbook" ? e : e.shadowRoot?.querySelector("ha-logbook");
		await r?.updateComplete;
		let i = r?.shadowRoot?.querySelector("ha-logbook-renderer");
		await i?.updateComplete;
		let a = i?.shadowRoot?.querySelector(".container"), o = i?.shadowRoot?.querySelector("lit-virtualizer"), s = Math.max(a?.scrollHeight || 0, o?.scrollHeight || 0), c = Number.parseFloat(this._currentActivityHeight) || Ul;
		this._currentActivityHeight = `${Math.max(Ul, c, s)}px`, n < 50 ? au.call(this, e, t, n + 1) : this._currentActivityHeightTimer = null;
	}, 100));
}
//#endregion
//#region src/common/renders/current-activity-dialog.js
function ou() {
	return this._currentActivityOpen ? (this._currentActivityCard && (this._currentActivityCard.hass = this.hass), D`
    <ha-adaptive-dialog
      class="current-activity-dialog"
      .open=${!0}
      flexcontent
      width="small"
      @closed=${(e) => {
		e.stopPropagation(), $l.call(this);
	}}
    >
      <ha-icon-button
        slot="headerNavigationIcon"
        .label=${this.hass?.localize?.("ui.common.close")}
        @click=${() => $l.call(this)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <span slot="headerTitle">
        ${this._t("Activity")}${this._currentActivityTitleDetail ? ` · ${this._currentActivityTitleDetail}` : ""}
      </span>
      ${this._currentActivityShowScopeToggle ? D`
            <ha-selector
              slot="headerActionItems"
              class="current-activity-scope-selector"
              .hass=${this.hass}
              .selector=${{ button_toggle: { options: [{
		label: this._t("Current"),
		value: "current"
	}, {
		label: this._t("All"),
		value: "all"
	}] } }}
              .value=${this._currentActivityScope || "current"}
              @value-changed=${(e) => {
		e.stopPropagation(), Jl.call(this, e.detail.value);
	}}
            ></ha-selector>
          ` : k}
      ${this._currentActivityHasDateRangePicker ? D`
            <div class="current-activity-date-browser">
              <ha-date-range-picker
                .startDate=${this._currentActivityStartDate}
                .endDate=${this._currentActivityEndDate}
                .timePicker=${!0}
                backdrop
                @value-changed=${(e) => {
		e.stopPropagation(), Xl.call(this, e.detail.value);
	}}
              ></ha-date-range-picker>
            </div>
          ` : k}
      <div
        class="current-activity-dialog-content"
        style=${`--current-activity-height:${this._currentActivityHeight || "140px"}`}
      >
        ${this._currentActivityLoading ? D`
              <div class="current-activity-dialog-message">
                <ha-circular-progress active></ha-circular-progress>
              </div>
            ` : this._currentActivityError ? D`
                <div class="current-activity-dialog-message">
                  ${this._currentActivityError}
                </div>
              ` : this._currentActivityCard || k}
      </div>
    </ha-adaptive-dialog>
  `) : k;
}
//#endregion
//#region src/cards/status/helpers/attributes.js
function $(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function su(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function cu(e, t, n) {
	let r = $(t, "color");
	return e.color_source === "template" ? e.color || r || "theme" : n ? e.color_on || r || "theme" : e.color_off || r || "theme";
}
function lu(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (uu.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
var uu = [
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
function du(e, t) {
	let n = $(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return su(e) || r || "/lovelace/home";
}
//#endregion
//#region src/common/helpers/zones.js
var fu = /* @__PURE__ */ new WeakMap();
function pu(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = fu.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [mu(e), e]))
	};
	return fu.set(t, i), i;
}
function mu(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function hu(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	if (this._config.mode === "person") {
		bu.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = gu(this._config);
		this._statusItems = e.map((e) => _u.call(this, e, this._config)), yu.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.entity, n = _u.call(this, { entity: t }, this._config);
	this._statusItems = [n], yu.call(this, n);
}
function gu(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.entity,
		...Cc(e),
		color_source: e.color_source,
		color: e.color,
		color_on: e.color_on,
		color_off: e.color_off,
		icon_source: e.icon_source,
		icon: e.icon,
		icon_on: e.icon_on,
		icon_off: e.icon_off,
		entity_icon_source: e.entity_icon_source,
		entity_icon_template: e.entity_icon_template,
		entity_icon: e.entity_icon,
		entity_icon_on: e.entity_icon_on,
		entity_icon_off: e.entity_icon_off,
		entity_icon_svg_color_override: e.entity_icon_svg_color_override,
		entity_icon_on_svg_color_override: e.entity_icon_on_svg_color_override,
		entity_icon_off_svg_color_override: e.entity_icon_off_svg_color_override,
		state_template: e.state_template,
		label_template: e.label_template,
		name_template: e.name_template,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action,
		entity_tap_action: e.entity_tap_action,
		entity_hold_action: e.entity_hold_action,
		entity_double_tap_action: e.entity_double_tap_action
	}];
}
function _u(e, t = {}) {
	let n = {
		...t,
		...e
	}, r = Z(n), i = e.entity || t.entity, a = r === "area_count" ? Yc(this.hass, n) : [], o = Hc(a, n, (e) => this._getEntityActiveState(e)), s = r === "area_count" ? o[0] || a[0] || null : i && this.hass ? this.hass.states[i] : null, c = i || s?.entity_id || "", l = X(n)[0] || "", u = c.split(".")[0] || l;
	n.entity = c;
	let d = n.mode !== "icon_only" && Object.prototype.hasOwnProperty.call(n, "name") && n.name !== void 0 && n.name !== "", f = r === "template" && n.state_template ? this._evaluateStateTemplate(n.state_template, c) : null, p = r === "template" && n.active_template ? this._evaluateStateTemplate(n.active_template, c) : null, m = r === "template" && n.inactive_template ? this._evaluateStateTemplate(n.inactive_template, c) : null, h = r !== "area_count" && n.name_template ? this._evaluateStateTemplate(n.name_template, c) : null, g = r === "template" && n.label_template ? this._evaluateStateTemplate(n.label_template, c) : null, _ = h === null ? d ? Qt(n.name, n, this.hass) : r === "area_count" ? X(n).includes("unavailable") ? V(this.hass, "Unavailable") : Q(n).length ? Q(n).map(Nc).join(", ") : X(n).map((e) => Y(e).label).join(", ") : $(s, "friendly_name") || c || V(this.hass, "Status") : String(h), v = g === null ? r === "template" ? n.state_template ? xt(f, this.hass, u) : s ? $(s, "label") || this.formatState(s) : "" : r === "area_count" ? String(o.length) : $(s, "label") || (s ? this.formatState(s) : "") : String(g), ee = n.icon_on ?? n.entity_icon_on, y = n.icon_off ?? n.entity_icon_off, te = !!(n.state_template || n.active_template || n.inactive_template), b = r === "template" ? te ? bt(p, u) ? !0 : bt(m, u) ? !1 : bt(f, u) : s ? lu(s, (e) => this._getEntityActiveState(e)) : !1 : r === "area_count" ? o.length > 0 : lu(s, (e) => this._getEntityActiveState(e), f), x = vu(n, c), S = Hn.call(this, n.icon, c), ne = x === "template" ? S : x === "custom" && ((b ? ee : y) || S) || "", re = ne || (r === "area_count" ? Y(l).icon : c && !s ? "mdi:alert-circle-outline" : "mdi:information-outline"), ie = Q(n)[0] || "", C = r === "area_count" && Y(l).staticIcon, ae = r === "area_count" ? {
		entity_id: `${l || "sensor"}.orbit_status_card`,
		state: s?.state ?? (b ? "on" : "off"),
		attributes: ie ? { device_class: ie } : {}
	} : s, oe = x === "template" && S ? "icon" : x === "custom" && b && ee ? n.icon_on ? "icon_on" : "entity_icon_on" : x === "custom" && !b && y ? n.icon_off ? "icon_off" : "entity_icon_off" : x === "custom" && S ? n.icon ? "icon" : "entity_icon" : "", w = cu(n, s, b), se = du(n, s), ce = this._computeFullColor(w), T = this._computeFullColor(w), le = this._computeCircleColor(w), ue = c && !s ? "var(--error-color)" : b ? this._computeFullColor(w) : this._computeIconColor(w);
	return {
		...e,
		entityId: c,
		stateObj: s,
		nativeIconStateObj: ae,
		useStateIcon: !!ae && x !== "template" && !ne && !C,
		cardName: _,
		statusText: v,
		icon: re,
		navigationPath: se,
		nameColor: ce,
		statusColor: T,
		circleColor: le,
		iconColor: ue,
		svgForceColor: oe ? this._getSvgColorOverride(n, oe) : !0,
		suppressEntityIssueBadge: r === "area_count" && X(n).includes("unavailable")
	};
}
function vu(e, t) {
	let n = e.icon_source ?? e.entity_icon_source, r = !!t, i = !!(e.icon || e.icon_on || e.icon_off || e.entity_icon || e.entity_icon_on || e.entity_icon_off);
	return n === "custom" ? "custom" : n === "template" ? "template" : n === "domain" && e.domain ? "domain" : n === "entity" && r ? "entity" : i ? "custom" : e.state_source === "area_count" ? "domain" : "entity";
}
function yu(e) {
	this._cardName = e.cardName ?? V(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._mainStateObj = e.stateObj || null, this._mainIconStateObj = e.nativeIconStateObj || e.stateObj || null, this._useNativeMainIcon = e.useStateIcon ?? !1, this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function bu() {
	let e = this._config.entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null, o = Object.prototype.hasOwnProperty.call(this._config, "name") && this._config.name !== void 0 && this._config.name !== "";
	this._cardName = o ? Qt(this._config.name, this._config, this.hass) : $(i, "friendly_name") || $(r, "friendly_name") || e || t || V(this.hass, "Person");
	let s = this._config.name_template ? this._evaluateStateTemplate(this._config.name_template, t) : null;
	s !== null && (this._cardName = String(s));
	let c = r ? Su.call(this, r) : "", l = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = l ? `${c} | ${l}` : c;
	let u = lu(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), d = cu(this._config, r, u);
	this._personPicture = $(i, "entity_picture") || $(r, "entity_picture") || "", this._personZoneIcon = xu.call(this, r, i), this._personBattery1 = Cu.call(this, this._config.battery_entity_1), this._personBattery2 = Cu.call(this, this._config.battery_entity_2), this._icon = $(i, "icon") || $(r, "icon") || "mdi:account", this._navigationPath = du(this._config, r), this._nameColor = this._computeFullColor(d), this._statusColor = this._computeFullColor(d), this._circleColor = this._computeCircleColor(d), this._iconColor = u ? this._computeFullColor(d) : this._computeIconColor(d), this._iconSvgForceColor = !0;
}
function xu(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = pu(this.hass), r = t?.entity_id;
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
function Su(e) {
	let t = e?.state;
	return t ? t === "home" ? V(this.hass, "Home") : t === "not_home" ? V(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function Cu(e) {
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
function wu() {
	return j(this._config.hold_action) ? this._config.hold_action : null;
}
function Tu() {
	return j(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function Eu() {
	return j(this._config.entity_hold_action) ? this._config.entity_hold_action : null;
}
function Du() {
	let e = Au(this), t = e.entity_tap_action;
	return t?.action ? t : Z(e) === "area_count" ? { action: q } : ku.call(this);
}
function Ou() {
	return j(this._config.entity_double_tap_action) ? this._config.entity_double_tap_action : null;
}
function ku() {
	let e = Au(this), t = Z(e);
	if (t === "area_count") return e.tap_action?.action ? e.tap_action : { action: J };
	if (t === "template") return e.tap_action?.action ? e.tap_action : { action: "more-info" };
	let n = {
		action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate",
		navigation_path: this._navigationPath || "/lovelace/home"
	}, r = this._config.tap_action;
	return r?.action ? r : n;
}
function Au(e) {
	if (e._config?.mode !== "icon_only") return e._config || {};
	let t = Array.isArray(e._config?.entities) ? e._config.entities[0] : null;
	return t && typeof t == "object" ? {
		...e._config,
		...t
	} : e._config || {};
}
function ju(e = 0) {
	let t = this._statusItems?.[e];
	return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : Z(t) === "area_count" ? {
		action: J,
		status_index: e
	} : { action: "more-info" };
}
function Mu(e = 0) {
	let t = this._statusItems?.[e];
	return j(t?.hold_action) ? t.hold_action : j(this._config.hold_action) ? this._config.hold_action : null;
}
function Nu(e = 0) {
	let t = this._statusItems?.[e];
	return j(t?.double_tap_action) ? t.double_tap_action : j(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function Pu(e = 0) {
	let t = this._statusItems?.[e];
	return t?.entity_tap_action?.action ? t.entity_tap_action : this._config.entity_tap_action?.action ? this._config.entity_tap_action : Z(t) === "area_count" ? {
		action: q,
		status_index: e
	} : this._getStatusItemCardTapAction(e);
}
function Fu(e = 0) {
	let t = this._statusItems?.[e];
	return j(t?.entity_double_tap_action) ? t.entity_double_tap_action : j(this._config.entity_double_tap_action) ? this._config.entity_double_tap_action : null;
}
function Iu(e = 0) {
	let t = this._statusItems?.[e];
	return t?.entity_hold_action?.action ? t.entity_hold_action.action === "none" ? null : t.entity_hold_action : this._config.entity_hold_action?.action ? this._config.entity_hold_action.action === "none" ? null : this._config.entity_hold_action : null;
}
//#endregion
//#region src/cards/status/helpers/interactions.js
var Lu = (e) => class extends e {
	_handleTap(e) {
		if (!M(this)) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityTap(e);
				return;
			}
			N.call(this, e, this._getStatusItemEntityId(0), this._getCardTapAction(), this._getCardDoubleTapAction());
		}
	}
	_handleDoubleTap(e) {
		if (this._isMainIconEvent(e)) {
			this._handleMainEntityDoubleTap(e);
			return;
		}
		P.call(this, e, this._config.entity, this._getCardDoubleTapAction());
	}
	_isMainIconEvent(e) {
		if (e.composedPath().some((e) => e?.classList && (e.classList.contains("circle") || e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")))) return !0;
		let t = this.shadowRoot?.querySelector(".status-circle")?.getBoundingClientRect();
		return t ? e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom : !1;
	}
	_handleMainEntityTap(e) {
		if (M(this)) return;
		if (this._shouldSuppressMainIconTap(e)) {
			this._stopEvent(e);
			return;
		}
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		let t = this._getStatusItemEntityId(0), n = this._getMainEntityTapAction() || this._getCardTapAction();
		!t && !Ru(n) || N.call(this, e, t, n, this._getMainEntityDoubleTapAction());
	}
	_handleMainEntityDoubleTap(e) {
		P.call(this, e, this._config.entity, this._getMainEntityDoubleTapAction());
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
		if (M(this) || this._isMainIconEvent(e)) return;
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
		let n = this._getStatusItemEntityId(t), r = this._isStatusItemMainIconEvent(e), i = r ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t), a = r ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t);
		!n && !Ru(i) || N.call(this, e, n, i?.action ? zu(i, t) : { action: "more-info" }, zu(a, t));
	}
	_handleStatusItemDoubleClick(e, t = 0) {
		P.call(this, e, this._getStatusItemEntityId(t), zu(this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t), t));
	}
	_handleStatusItemPointerDown(e, t = 0) {
		if (M(this)) return;
		this._stopEvent(e), this._clearStatusItemHoldTimer();
		let n = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityHoldAction(t) : this._getStatusItemCardHoldAction(t);
		n && (this._statusItemHoldTimer = setTimeout(() => {
			this._statusItemLongPressTriggered = !0, this._handleAction(zu(n, t), this._getStatusItemEntityId(t));
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
		n && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(zu(n, t), this._getStatusItemEntityId(t)));
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
	_handleMainIconPointerDown(e) {
		if (M(this)) return;
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
		this._trackPointerEvent(e), this._stopEvent(e), this._getMainEntityHoldAction() || (this._clearMainIconHoldTimer(), this._mainIconPointerDown = !1);
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
	_getCardHoldAction() {
		return wu.call(this);
	}
	_getCardDoubleTapAction() {
		return Tu.call(this);
	}
	_getMainEntityHoldAction() {
		return Eu.call(this);
	}
	_getMainEntityTapAction() {
		return Du.call(this);
	}
	_getMainEntityDoubleTapAction() {
		return Ou.call(this);
	}
	_getCardTapAction() {
		return ku.call(this);
	}
	_getStatusItemCardTapAction(e = 0) {
		return ju.call(this, e);
	}
	_getStatusItemCardHoldAction(e = 0) {
		return Mu.call(this, e);
	}
	_getStatusItemCardDoubleTapAction(e = 0) {
		return Nu.call(this, e);
	}
	_getStatusItemMainEntityTapAction(e = 0) {
		return Pu.call(this, e);
	}
	_getStatusItemMainEntityDoubleTapAction(e = 0) {
		return Fu.call(this, e);
	}
	_getStatusItemMainEntityHoldAction(e = 0) {
		return Iu.call(this, e);
	}
};
function Ru(e) {
	let t = e?.action;
	return t === "Current state" || t === "current-activity" ? !0 : t === "more-info" ? !!(e.entity || e.entity_id) : [
		"navigate",
		"url",
		"perform-action",
		"call-service",
		"fire-dom-event",
		"popup",
		"none"
	].includes(t);
}
function zu(e, t) {
	return ["Current state", "current-activity"].includes(e?.action) ? {
		...e,
		status_index: t
	} : e;
}
//#endregion
//#region src/common/helpers/editor-preview.js
function Bu(e) {
	let t = e;
	for (; t;) {
		let e = t.localName || "";
		if (e === "hui-dialog-edit-card" || e === "hui-dialog-edit-badge") return !0;
		let n = t.getRootNode?.();
		t = t.parentElement || t.assignedSlot || n?.host || null;
	}
	return !1;
}
//#endregion
//#region src/common/editor/helpers/group-options.js
function Vu({ config: e = {}, itemCount: t = 0, wrapEnabled: n = !!e?.wrap, perRowKey: r = "items_per_row", defaultPerRow: i = 3, scrollThreshold: a = 6 } = {}) {
	let o = Math.max(1, Number(e?.[r]) || i), s = !!n && t > o;
	return {
		itemsPerRow: o,
		shouldWrapTabs: s,
		showTabScrollHint: !s && t > a || s && o > a
	};
}
function Hu({ itemCount: e = 0, classPrefix: t, wrapKey: n = "wrap", wrapEnabled: r = !!this._config?.[n], showWrapToggle: i = !0, showSeparateToggle: a = e > 1, separateKey: o = "separate_cards", perRowKey: s = "items_per_row", perRowLabel: c = "Items per row", defaultPerRow: l = 3 } = {}) {
	let u = t || "action";
	return D`
    <div class="${u}-group-options">
      ${i ? D`
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

      ${a ? D`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Separate cards")}</span>
              <ha-switch
                .checked=${!!this._config?.[o]}
                @change=${(e) => this._updateConfig({ [o]: e.target.checked })}
              ></ha-switch>
            </label>
          ` : ""}

      ${r ? D`
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
function Uu(e = "entity") {
	let t = this._config?.icon_source || (this._config?.icon ? "custom" : "domain");
	return D`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Icon")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
		{
			label: this._t(e === "entity" ? "Entity" : e === "area_count" ? "Domain" : "Default"),
			value: "domain"
		},
		{
			label: this._t("Custom"),
			value: "custom"
		},
		{
			label: this._t("Template"),
			value: "template"
		}
	] } }}
          .value=${t}
          @value-changed=${(e) => {
		let n = e.detail.value;
		if (t !== n && [t, n].includes("template") && this._handleConfigUpdate("icon", ""), ["custom", "template"].includes(n)) {
			this._handleConfigUpdate("icon_source", n);
			return;
		}
		this._updateConfig({
			icon_source: void 0,
			icon: void 0,
			icon_on: void 0,
			icon_off: void 0
		});
	}}
        ></ha-selector>
      </div>

      ${t === "custom" ? D`
            ${this._renderIconInput("", "icon")}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], "icon_on")}
              ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
            </div>
          ` : ""}
      ${t === "template" ? D`
            <div class="field icon-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${this._config?.icon || ""}
                @value-changed=${(e) => this._handleConfigUpdate("icon", e.detail.value || "")}
              ></ha-selector>
            </div>
          ` : ""}
    </div>
  `;
}
function Wu({ stateSource: e, deviceClassOptions: t, badgeMode: n, showActiveTemplate: r = !0, showInactiveTemplate: i = n, showStateTemplate: a = !1, showLabelTemplate: o = !1, showNameTemplate: s = !n, preserveStateConfig: c = !1, renderEntityPicker: l, areaMultiple: u = !1, renderAreaPicker: d }) {
	let f = X(this._config), p = Q(this._config), m = f.map((e) => ({
		domain: e,
		label: this._t(Y(e).label),
		options: t.filter((t) => t.domains?.includes(e))
	})).filter((e) => e.options.length), h = t.filter((e) => !e.domains?.length);
	h.length && m.push({
		domain: "",
		label: this._t("Other"),
		options: h
	});
	let g = Ju(this.hass, f, p), _ = n ? this._config?.card_visibility || "always" : e, v = n ? [
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
	return D`
    <div class="field main-entity-icon-source-field">
      ${n ? D`
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
        <label>${this._t(n ? "Visibility" : "State")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: v } }}
          .value=${_}
          @value-changed=${(e) => {
		let t = e.detail.value || (n ? "always" : "entity");
		if (n) {
			this._updateConfig(t === "always" ? {
				card_visibility: void 0,
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0,
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
				thresholds: void 0,
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
				thresholds: void 0,
				state_template: void 0,
				name_template: void 0,
				state_content: void 0
			});
			return;
		}
		if (c) {
			this._updateConfig(t === "entity" ? {
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0,
				state_template: void 0,
				label_template: void 0,
				active_template: void 0,
				inactive_template: void 0
			} : t === "area_count" ? {
				state_source: "area_count",
				entity: void 0,
				state_template: void 0,
				label_template: void 0,
				active_template: void 0,
				inactive_template: void 0
			} : {
				state_source: "template",
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0
			});
			return;
		}
		this._updateConfig(t === "entity" ? {
			state_source: void 0,
			area: void 0,
			domain: void 0,
			device_class: void 0,
			thresholds: void 0,
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
			thresholds: void 0,
			state_content: void 0
		});
	}}
        ></ha-selector>
      </div>

      ${!n && e === "entity" ? l ? l() : D`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${!1}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
            ` : !n && e === "area_count" ? D`
            ${d ? d() : u ? Qu.call(this, {
		config: this._config,
		updateConfig: (e) => this._updateConfig(e)
	}) : D`
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

            ${$u.call(this, {
		config: this._config,
		updateConfig: (e) => this._updateConfig(e)
	})}

            ${t.length > 0 ? D`
                  <div class="field">
                    <label>${this._t("Device class")}</label>
                    <div class="status-badge-device-class-groups">
                      ${m.map((e) => D`
                        <div class="status-badge-device-class-group">
                          <div class="status-badge-device-class-group-label">
                            ${e.label}
                          </div>
                          <div class="status-badge-device-class-options">
                            ${e.options.map((e) => D`
                              <ha-checkbox
                                .checked=${p.includes(e.value)}
                                .value=${e.value}
                                @change=${(t) => {
		let n = t.target.checked ? [...new Set([...p, e.value])] : p.filter((t) => t !== e.value);
		this._updateConfig({
			device_class: n.length ? n : void 0,
			threshold: n.includes("battery") ? this._config?.threshold : void 0,
			thresholds: Zu(this._config?.thresholds, n)
		});
	}}
                              >${e.label}</ha-checkbox>
                            `)}
                          </div>
                        </div>
                      `)}
                    </div>
                  </div>
                ` : ""}

            ${p.includes("battery") ? D`
                  <div class="field">
                    <ha-selector
                      .hass=${this.hass}
                      .label=${this._t("Threshold")}
                      .selector=${{ number: {
		min: 0,
		max: 100,
		step: 1,
		mode: "box",
		unit_of_measurement: "%"
	} }}
                      .value=${this._config?.threshold ?? 20}
                      @value-changed=${(e) => this._handleConfigUpdate("threshold", e.detail.value === "" || e.detail.value === void 0 ? void 0 : Number(e.detail.value))}
                    ></ha-selector>
                  </div>
                ` : ""}

            ${g.map((e) => {
		let t = Yu(this._config, e), n = Vc(this.hass, e);
		return D`
                <div class="field sensor-threshold-field">
                  <div class="field-header">
                    <label>${Pc(e)}</label>
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ button_toggle: { options: [{
			label: this._t(e === "signal_strength" ? "Stronger" : "Above"),
			value: "above"
		}, {
			label: this._t(e === "signal_strength" ? "Weaker" : "Below"),
			value: "below"
		}] } }}
                      .value=${t.direction}
                      @value-changed=${(t) => Xu.call(this, e, { direction: t.detail.value })}
                    ></ha-selector>
                  </div>
                  <ha-selector
                    .hass=${this.hass}
                    .label=${this._t("Threshold")}
                    .selector=${{ number: {
			step: .1,
			mode: "box",
			...n ? { unit_of_measurement: n } : {}
		} }}
                    .value=${t.value}
                    @value-changed=${(t) => Xu.call(this, e, { value: t.detail.value === "" || t.detail.value === void 0 ? 0 : Number(t.detail.value) })}
                  ></ha-selector>
                </div>
              `;
	})}

            ${qu.call(this)}
          ` : _ === "template" ? D`
              ${n ? "" : l ? l("") : D`
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
                      .selector=${{ entity: {} }}
                      .required=${!1}
                      .value=${this._config?.entity || ""}
                      @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
                    ></ha-selector>
                    `}
              ${r ? Gu.call(this, {
		key: "active_template",
		label: "Active template"
	}) : ""}
              ${i ? D`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Inactive template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.inactive_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("inactive_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${Ku.call(this, this._config?.inactive_template, this._config?.entity || "")}
                    </div>
                  ` : ""}
              ${a ? Gu.call(this, {
		key: "state_template",
		label: "State"
	}) : ""}
              ${o ? Gu.call(this, {
		key: "label_template",
		label: "Label"
	}) : ""}
              ${s ? D`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Name template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.name_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("name_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${Ku.call(this, this._config?.name_template)}
                    </div>
                  ` : ""}
            ` : ""}
    </div>
  `;
}
function Gu({ key: e, label: t }) {
	return D`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${this._t(t)}
        .selector=${{ template: {} }}
        .required=${!1}
        .value=${this._config?.[e] || ""}
        @value-changed=${(t) => this._handleConfigUpdate(e, t.detail.value || void 0)}
      ></ha-selector>
      ${Ku.call(this, this._config?.[e], this._config?.entity || "")}
    </div>
  `;
}
function Ku(e, t = "") {
	let n = yt.call(this, e, t);
	return n ? D`<ha-alert alert-type="error">${n}</ha-alert>` : "";
}
function qu() {
	let e = kc(this._config), t = e.some((e) => e.type === "hidden"), n = e.some((e) => e.type === "low"), r = Q(this._config).includes("battery"), i = e.filter((e) => e.type === "label").map((e) => e.label), a = ({ hidden: e = t, low: r = n, labels: a = i } = {}) => {
		this._updateConfig({ hide: Ac([
			...e ? [{ type: "hidden" }] : [],
			...r ? [{ type: "low" }] : [],
			...a.map((e) => ({
				type: "label",
				label: e
			}))
		]) });
	};
	return D`
    <div class="field">
      <label>${this._t("Hide")}</label>

      <div class="status-badge-hide-hidden-row">
        <button
          type="button"
          class=${t ? "name-picker-chip" : "name-picker-add-chip"}
          @click=${() => a({ hidden: !t })}
        >
          <ha-icon icon=${t ? "mdi:eye-off" : "mdi:plus"}></ha-icon>
          <span>${this._t("Hidden entities")}</span>
          ${t ? D`<ha-icon
                class="name-picker-chip-remove"
                icon="mdi:close"
              ></ha-icon>` : ""}
        </button>

        ${r ? D`
              <button
                type="button"
                class=${n ? "name-picker-chip" : "name-picker-add-chip"}
                @click=${() => a({ low: !n })}
              >
                <ha-icon icon=${n ? "mdi:battery-alert" : "mdi:plus"}></ha-icon>
                <span>${this._t("Low sensors")}</span>
                ${n ? D`<ha-icon
                      class="name-picker-chip-remove"
                      icon="mdi:close"
                    ></ha-icon>` : ""}
              </button>
            ` : ""}
      </div>

      ${r ? D`
            <div class="status-area-count-low-sensors-hint">
              ${this._t("Low sensors are only used when a device has no percentage sensor.")}
            </div>
          ` : ""}

      <ha-selector
        .hass=${this.hass}
        .selector=${{ label: { multiple: !0 } }}
        .value=${i}
        @value-changed=${(e) => a({ labels: Array.isArray(e.detail.value) ? e.detail.value : [] })}
      ></ha-selector>
    </div>
  `;
}
function Ju(e, t, n) {
	return t.includes("sensor") ? n.filter((t) => t !== "battery" && !xc.has(t) && Object.values(e?.states || {}).some((e) => e.entity_id.startsWith("sensor.") && e.attributes?.device_class === t)) : [];
}
function Yu(e = {}, t) {
	return Lc(e, t);
}
function Xu(e, t = {}) {
	let n = Yu(this._config, e);
	this._updateConfig({ thresholds: {
		...this._config?.thresholds || {},
		[e]: {
			...n,
			...t
		}
	} });
}
function Zu(e = {}, t = []) {
	let n = Object.fromEntries(Object.entries(e || {}).filter(([e]) => t.includes(e) && e !== "battery"));
	return Object.keys(n).length ? n : void 0;
}
function Qu({ config: e = this._config || {}, updateConfig: t = (e) => this._updateConfig(e) } = {}) {
	let n = Array.isArray(e.area), r = n ? e.area : [], i = Object.values(this.hass?.areas || {}).sort((e, t) => (e.name || e.area_id).localeCompare(t.name || t.area_id)), a = i.map((e) => e.area_id), o = n && a.length > 0 && a.every((e) => r.includes(e)), s = [
		{
			value: "__all__",
			label: this._t("All")
		},
		{
			value: "__multiple__",
			label: this._t("Multiple")
		},
		...i.map((e) => ({
			value: e.area_id,
			label: e.name || e.area_id
		}))
	];
	return D`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${this._t("Area")}
        .selector=${{ select: {
		mode: "dropdown",
		options: s
	} }}
        .value=${o ? "__all__" : n ? "__multiple__" : e.area || ""}
        @value-changed=${(n) => {
		let r = n.detail.value || "";
		t({ area: r === "__all__" ? a : r === "__multiple__" ? e.area ? [e.area].flat().filter(Boolean) : [] : r });
	}}
      ></ha-selector>
    </div>

    ${n && !o ? D`
          <div class="field">
            <label>${this._t("Areas")}</label>
            <div class="status-badge-device-class-options">
              ${i.map((e) => D`
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
function $u({ config: e = this._config || {}, updateConfig: t = (e) => this._updateConfig(e) } = {}) {
	let n = X(e), r = Array.isArray(e.domains) || Array.isArray(e.domain), i = [{
		value: "__multiple__",
		label: this._t("Multiple")
	}, ...bc.map((e) => ({
		value: e.value,
		label: this._t(e.label)
	}))], a = (n, i = r) => {
		let a = Jc(this.hass, e, n);
		t({
			domain: n[0] || void 0,
			domains: i ? n : void 0,
			device_class: a.length ? a : void 0,
			threshold: a.includes("battery") ? e.threshold : void 0,
			thresholds: Zu(e.thresholds, a)
		});
	};
	return D`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${this._t("Domain")}
        .selector=${{ select: {
		mode: "dropdown",
		options: i
	} }}
        .value=${r ? "__multiple__" : n[0] || ""}
        @value-changed=${(e) => {
		let t = e.detail.value || "";
		a(t === "__multiple__" ? n : [t].filter(Boolean), t === "__multiple__");
	}}
      ></ha-selector>
    </div>

    ${r ? D`
          <div class="field">
            <label>${this._t("Domains")}</label>
            <div class="status-badge-device-class-options">
              ${bc.map((e) => D`
                <ha-checkbox
                  .checked=${n.includes(e.value)}
                  @change=${(t) => {
		let r = t.target.checked ? [...new Set([...n, e.value])] : n.filter((t) => t !== e.value);
		t.target.checked && e.value === "unavailable" ? r = ["unavailable"] : t.target.checked && (r = r.filter((e) => e !== "unavailable")), a(r);
	}}
                >${this._t(e.label)}</ha-checkbox>
              `)}
            </div>
          </div>
        ` : ""}
  `;
}
//#endregion
//#region src/editors/status/sections/status.js
function ed() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = n ? "entity" : Z(this._config), i = r === "area_count" ? J : r === "template" || t || n ? "more-info" : "navigate", a = this._config?.tap_action?.action || i, o = r === "area_count" ? q : t || n ? a : "more-info";
	return D`
    <div class="section">
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Mode")}</label>

          <ha-selector
            class="editor-header-button-toggle status-mode-selector"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: ud.call(this) } }}
            .value=${e}
            @value-changed=${(e) => this._handleStatusModeChange(e.detail.value || "standard")}
          ></ha-selector>
        </div>
      </div>
    </div>

    ${t ? nd.call(this, {
		cardActionDefault: i,
		mainEntityActionDefault: o
	}) : D`
          <div class="section">
            ${n ? ad.call(this, D`
                  ${td.call(this)}
                  ${this._renderEntity("Person entity", "entity")}
                  ${this._renderEntity("Tracker entity", "tracker_entity")}
                  ${this._renderEntity("ETA entity", "eta_entity")}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_1", { index: 1 })}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_2", { index: 2 })}
                  ${this._renderColorPair({
		label: "Color",
		onLabel: ["Active", "Color"],
		offLabel: ["Inactive", "Color"],
		onKey: "color_on",
		offKey: "color_off",
		sourceKey: "color_source",
		templateKey: "color",
		legacySourceKey: "accent_color_source",
		legacyTemplateKey: "accent_color"
	})}
                `) : D`
                  ${id.call(this, this._config, "entity", (e) => this._updateConfig(e), (e) => this._handleEntityUpdate("entity", e))}
                  ${ad.call(this, D`
                    ${td.call(this)}
                    ${this._renderColorPair({
		label: "Color",
		onLabel: ["Active", "Color"],
		offLabel: ["Inactive", "Color"],
		onKey: "color_on",
		offKey: "color_off",
		sourceKey: "color_source",
		templateKey: "color",
		legacySourceKey: "accent_color_source",
		legacyTemplateKey: "accent_color"
	})}
                    ${cd.call(this, r)}
                    ${r === "template" ? D`
                          ${this._renderTemplateInput("State template", "state_template", { required: !1 })}
                          ${this._renderTemplateInput("Label template", "label_template", { required: !1 })}
                        ` : ""}
                  `)}
                `}

            ${this._config?.entity || r !== "entity" ? uo.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: i,
				customActions: [J],
				defaultVisible: !0,
				customDefaultLabel: rd(i)
			},
			{
				key: "hold_action",
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none",
				customActions: [J]
			},
			{
				key: "double_tap_action",
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none",
				customActions: [J]
			},
			{
				key: "entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: o,
				customActions: [J],
				customDefaultLabel: rd(o)
			},
			{
				key: "entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none",
				customActions: [J]
			},
			{
				key: "entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none",
				customActions: [J]
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
function td() {
	let e = Z(this._config), t = e === "area_count";
	return ss.call(this, {
		label: this.hass.localize("ui.panel.lovelace.editor.card.generic.name"),
		valueKey: "name",
		entityKey: "entity",
		defaultType: t ? "device_class" : "entity",
		defaultMode: e === "template" ? "template" : "composed",
		modeKey: `name:${e}`,
		templateKey: "name_template"
	});
}
function nd({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {}, a = Z(i), o = a === "area_count", s = o ? J : e, c = o ? q : t, { itemsPerRow: l, shouldWrapTabs: u, showTabScrollHint: d } = Vu({
		config: this._config,
		itemCount: n.length,
		defaultPerRow: 3
	});
	return D`
    <div class="section">
      ${Hu.call(this, {
		itemCount: n.length,
		classPrefix: "status",
		defaultPerRow: 3
	})}

      <div
        class="status-tabs ${u ? "wrapped" : ""} ${d ? "scroll-hint" : ""} ${n.length > 1 ? "has-tools" : ""}"
        style=${u ? `--status-tabs-per-row: ${l};` : ""}
      >
        <div class="status-tab-items">
          ${n.map((e, t) => D`
            <button
              type="button"
              class="status-tab ${t === r ? "active" : ""}"
              @click=${() => this._selectStatusItem(t)}
            >
              ${t + 1}
            </button>
          `)}
        </div>

        ${d ? D`
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

          ${n.length > 1 ? D`
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

      ${id.call(this, i, "entity", (e) => this._updateStatusItem(r, e), (e) => this._updateStatusItem(r, { entity: e }))}

      ${ad.call(this, D`

        ${this._renderColorPair({
		label: "Color",
		onLabel: ["Active", "Color"],
		offLabel: ["Inactive", "Color"],
		onKey: "color_on",
		offKey: "color_off",
		sourceKey: "color_source",
		templateKey: "color",
		legacySourceKey: "accent_color_source",
		legacyTemplateKey: "accent_color",
		config: i,
		pickerPrefix: `status-${r}-`,
		onUpdate: (e, t) => this._updateStatusItem(r, { [e]: t })
	})}

        ${ld.call(this, r, i, o)}

        ${a === "template" ? D`
              ${sd.call(this, "State template", "state_template", r, i)}
              ${sd.call(this, "Label template", "label_template", r, i)}
            ` : ""}
      `)}

      ${i.entity || a !== "entity" ? this._renderStatusItemInteractions(r, i, s, c) : ""}
    </div>
  `;
}
function rd(e) {
	if (e === "Current state") return q;
	if (e === "current-activity") return "Current activity";
}
function id(e, t, n, r) {
	let i = {
		...e,
		entity: e?.[t] || ""
	}, a = Z(i), o = {
		hass: this.hass,
		_config: i,
		_t: this._t.bind(this),
		_updateConfig: (e) => n(od(e, t)),
		_handleConfigUpdate: (e, r) => n(od({ [e]: r }, t))
	};
	return D`
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
        ${Wu.call(o, {
		stateSource: a,
		deviceClassOptions: qc(this.hass, i),
		badgeMode: !1,
		showActiveTemplate: !0,
		showInactiveTemplate: !0,
		showStateTemplate: !1,
		showLabelTemplate: !1,
		showNameTemplate: !1,
		preserveStateConfig: !0,
		renderAreaPicker: () => Qu.call(this, {
			config: e,
			updateConfig: n
		}),
		renderEntityPicker: (n = "Main entity") => D`
            <div class="field">
              ${n ? D`<label>${this._t(n)}</label>` : ""}
              ${To.call(this, {
			value: e?.[t] || "",
			filterOptions: dd,
			onValueChanged: r
		})}
            </div>
          `
	})}
      </div>
    </ha-expansion-panel>
  `;
}
function ad(e) {
	return D`
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
function od(e, t) {
	let n = { ...e };
	return Object.prototype.hasOwnProperty.call(n, "entity") && (n[t] = n.entity, delete n.entity), n;
}
function sd(e, t, n, r) {
	return this._renderTemplateInput(e, t, {
		required: !1,
		value: r[t] || "",
		onValueChanged: (e) => this._updateStatusItem(n, { [t]: e })
	});
}
function cd(e = "entity") {
	let t = e === "area_count";
	return ji.call(this, {
		label: "Icon",
		sourceKey: "icon_source",
		legacySourceKey: "entity_icon_source",
		templateKey: "icon",
		legacyTemplateKeys: ["entity_icon_template"],
		entityKey: "entity",
		defaultSource: t ? "domain" : "entity",
		defaultSourceLabel: t ? "Domain" : "Entity",
		customIconKeys: [
			"icon",
			"icon_on",
			"icon_off"
		],
		renderCustom() {
			return D`
        ${this._renderIconInput("", "icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
        </div>
      `;
		}
	});
}
function ld(e, t, n = !1) {
	let r = this, i = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, n) => r._updateStatusItem(e, { [t]: n }),
		_renderIconInput: (t, n) => r._renderStatusItemIconInput(t, n, e)
	};
	return ji.call(i, {
		label: "Icon",
		sourceKey: "icon_source",
		legacySourceKey: "entity_icon_source",
		templateKey: "icon",
		legacyTemplateKeys: ["entity_icon_template"],
		entityKey: "entity",
		defaultSource: n ? "domain" : "entity",
		defaultSourceLabel: n ? "Domain" : "Entity",
		customIconKeys: [
			"icon",
			"icon_on",
			"icon_off"
		],
		renderCustom() {
			return D`
        ${this._renderIconInput("", "icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
        </div>
      `;
		}
	});
}
function ud() {
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
var dd = [
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
], fd = d`
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
`, pd = [
	...Sc,
	"color_source",
	"color",
	"color_on",
	"color_off",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override",
	"state_template",
	"label_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], md = ["entity", ...pd], hd = [
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	"color_source",
	"color",
	"color_on",
	"color_off",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], gd = ["eta_entity"], _d = /* @__PURE__ */ "state_source.entity.area.domain.domains.device_class.threshold.thresholds.hide.active_template.inactive_template.entity_tap_action.entity_hold_action.entity_double_tap_action.color_source.color.color_on.color_off.icon_source.icon.icon_on.icon_off.icon_svg_color_override.icon_on_svg_color_override.icon_off_svg_color_override.state_template.label_template.name_template.tap_action.hold_action.double_tap_action".split("."), vd = [
	"state_source",
	"entity",
	"area",
	"domain",
	"domains",
	"device_class",
	"threshold",
	"thresholds",
	"hide",
	"active_template",
	"inactive_template"
], yd = [
	"color_source",
	"color",
	"color_on",
	"color_off",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override"
], bd = [
	"tap_action",
	"hold_action",
	"double_tap_action"
], xd = [
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], Sd = [
	"type",
	"mode",
	...vd,
	...xd,
	"name",
	"name_template",
	...yd,
	"state_template",
	"label_template",
	...bd,
	"grid_options",
	"view_layout"
], Cd = [
	"type",
	"mode",
	"name",
	"name_template",
	"entity",
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	...xd,
	...yd,
	...bd,
	"grid_options",
	"view_layout"
], wd = [
	"type",
	"mode",
	"wrap",
	"separate_cards",
	"items_per_row",
	"entities",
	...bd,
	"grid_options",
	"view_layout"
];
function Td(e) {
	Object.assign(e, W(pd));
}
function Ed(e) {
	let t = Dd(Id(e));
	t.mode !== "icon_only" && delete t.entities, jd(t), t.mode !== "person" && t.mode !== "icon_only" && (t.state_source = Z(t)), Nd(t), Pd(t);
	let n = {}, r = /* @__PURE__ */ new Set();
	return Ad(t).forEach((e) => {
		Object.prototype.hasOwnProperty.call(t, e) && (n[e] = e === "entities" && Array.isArray(t[e]) ? t[e].map(Md) : t[e], r.add(e));
	}), Object.keys(t).forEach((e) => {
		r.has(e) || (n[e] = t[e]);
	}), n;
}
function Dd(e = {}) {
	let t = { ...e };
	return t.color_source === void 0 && t.accent_color_source !== void 0 && (t.color_source = t.accent_color_source), t.color === void 0 && (t.color_source === "template" || F(t.accent_color)) && t.accent_color !== void 0 && (t.color = t.accent_color), t.color_source !== void 0 && delete t.accent_color_source, t.color !== void 0 && delete t.accent_color, t.icon_source === void 0 && t.entity_icon_source !== void 0 && (t.icon_source = t.entity_icon_source), t.icon_source === "template" && t.icon === void 0 && (t.icon = t.icon_template || t.entity_icon_template || t.entity_icon), [
		["icon", "entity_icon"],
		["icon_on", "entity_icon_on"],
		["icon_off", "entity_icon_off"],
		["icon_svg_color_override", "entity_icon_svg_color_override"],
		["icon_on_svg_color_override", "entity_icon_on_svg_color_override"],
		["icon_off_svg_color_override", "entity_icon_off_svg_color_override"]
	].forEach(([e, n]) => {
		t[e] === void 0 && t[n] !== void 0 && !(e === "icon" && t.icon_source === "template") && (t[e] = t[n]), delete t[n];
	}), delete t.entity_icon_source, delete t.entity_icon_template, delete t.icon_template, t;
}
function Od(e = {}) {
	let t = (e) => !!(e && typeof e == "object" && !Array.isArray(e) && (e.accent_color_source !== void 0 || F(e.accent_color) || e.entity_icon_source !== void 0 || e.entity_icon_template !== void 0 || e.entity_icon !== void 0 || e.entity_icon_on !== void 0 || e.entity_icon_off !== void 0 || e.icon_template !== void 0));
	return t(e) || Array.isArray(e.entities) && e.entities.some(t);
}
function kd(e) {
	if (e === "Current state") return q;
	if (e === "current-activity") return "Current activity";
}
function Ad(e) {
	return e?.mode === "person" ? Cd : e?.mode === "icon_only" ? wd : Sd;
}
function jd(e) {
	if (e?.mode !== "icon_only" || e.state_source !== "area_count" || !Array.isArray(e.entities) || e.entities.length === 0) return;
	let t = Cc(e);
	e.entities = e.entities.map((e) => {
		let n = typeof e == "string" ? { entity: e } : { ...e || {} };
		return n.state_source === void 0 && (Object.assign(n, t), Nd(n)), n;
	}), Sc.forEach((t) => delete e[t]);
}
function Md(e) {
	if (typeof e == "string") return Ld({
		state_source: "entity",
		entity: e
	}, _d);
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = Dd(Id(e));
	return t.state_source = Z(t), Nd(t), Fd(t), Ld(t, _d);
}
function Nd(e) {
	e?.state_source === "area_count" && (delete e.entity, delete e.main_entity, delete e.include_low_sensors);
}
function Pd(e) {
	e?.state_source === "area_count" && (e.tap_action?.action === "current-activity" && delete e.tap_action, e.entity_tap_action?.action === "Current state" && delete e.entity_tap_action);
}
function Fd(e) {
	Pd(e);
}
function Id(e = {}) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0 && e !== ""));
}
function Ld(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/editors/status-card-editor.js
var Rd = Symbol.for("orbit-status-card-dev-preview-selected-index"), zd = class extends A {
	static svgCache = B;
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
		_statusContentExpanded: { state: !0 },
		_deviceClassRevision: { state: !0 }
	};
	constructor() {
		super(), this._config = this._config || {}, this._selectedStatusIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._statusStateTypeExpanded = !1, this._statusContentExpanded = !1, this._deviceClassRevision = 0;
	}
	connectedCallback() {
		super.connectedCallback(), Yo(this), cn(this, "orbit-status-card-dev");
	}
	disconnectedCallback() {
		Xo(this), super.disconnectedCallback();
	}
	updated(e) {
		e.has("hass") && this._loadDeviceClasses();
	}
	_loadDeviceClasses() {
		let e = this.hass?.connection;
		!e || e === this._deviceClassConnection || (this._deviceClassConnection = e, Dc(this.hass).then(() => {
			this._deviceClassConnection === e && (this._deviceClassRevision += 1);
		}));
	}
	_getColorStyle(e) {
		return Qo(e);
	}
	_getColorPickerValue(e) {
		return $o(e);
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	setConfig(e) {
		let t = Od(e || {}), { config: n, migrated: r } = _n(e || {});
		this._config = Ed(n || {}), this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(this._config).length - 1), (r || t) && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._getPreviewConfig(Ed(this._config)) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		this._config = Ed(la(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._getPreviewConfig() },
			bubbles: !0,
			composed: !0
		}));
	}
	_getPreviewConfig(e = this._config) {
		return {
			...e,
			[Rd]: this._selectedStatusIndex || 0
		};
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
		if (e === "entity" && Z(this._config) !== "entity") {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e === "entity") {
			this._clearMainEntity();
			return;
		}
		if (e === "tracker_entity") {
			this._updateConfig(G("tracker_entity", gd));
			return;
		}
		this._handleConfigUpdate(e, t);
	}
	_clearMainEntity() {
		if (this._config?.mode === "person") {
			this._updateConfig(G("entity", hd));
			return;
		}
		this._updateConfig(G("entity", pd));
	}
	_getStatusItems(e = this._config) {
		return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
			entity: e?.entity || "",
			...Cc(e),
			color_source: e?.color_source || e?.accent_color_source || "",
			color: e?.color || e?.accent_color || "",
			accent_color_source: e?.accent_color_source || "",
			accent_color: e?.accent_color || "",
			color_on: e?.color_on || "",
			color_off: e?.color_off || "",
			icon_source: e?.icon_source || e?.entity_icon_source || "",
			icon: e?.icon || e?.entity_icon || "",
			icon_on: e?.icon_on || e?.entity_icon_on || "",
			icon_off: e?.icon_off || e?.entity_icon_off || "",
			entity_icon_source: e?.entity_icon_source || "",
			entity_icon_template: e?.entity_icon_template || "",
			entity_icon: e?.entity_icon || "",
			entity_icon_on: e?.entity_icon_on || "",
			entity_icon_off: e?.entity_icon_off || "",
			state_template: e?.state_template || "",
			label_template: e?.label_template || "",
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
				...W(md),
				mode: e,
				entities: void 0,
				entity: n.entity || void 0,
				...Cc(n),
				color_source: n.color_source,
				color: n.color,
				accent_color_source: n.accent_color_source,
				accent_color: n.accent_color,
				color_on: n.color_on,
				color_off: n.color_off,
				icon_source: n.icon_source,
				icon: n.icon,
				icon_on: n.icon_on,
				icon_off: n.icon_off,
				entity_icon_source: n.entity_icon_source,
				entity_icon_template: n.entity_icon_template,
				entity_icon: n.entity_icon,
				entity_icon_on: n.entity_icon_on,
				entity_icon_off: n.entity_icon_off,
				state_template: n.state_template,
				label_template: n.label_template,
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
		this._selectedStatusIndex = e, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._getPreviewConfig() },
			bubbles: !0,
			composed: !0
		}));
	}
	_addStatusItem() {
		let e = this._getStatusItems();
		this._selectedStatusIndex = e.length, this._updateConfig(W(md, { entities: [...e, { entity: "" }] }));
	}
	_duplicateStatusItem(e) {
		let t = this._getStatusItems(), n = t[e];
		if (!n) return;
		let r = [...t];
		r.splice(e + 1, 0, structuredClone(n)), this._selectedStatusIndex = e + 1, this._updateConfig(W(md, { entities: r }));
	}
	_removeStatusItem(e) {
		let t = this._getStatusItems();
		if (t.length <= 1) {
			this._updateConfig(G("entity", pd));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedStatusIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveStatusItem(e, t) {
		let n = this._getStatusItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedStatusIndex = r, this._updateConfig(W(md, { entities: i }));
	}
	_updateStatusItem(e, t) {
		let n = this._getStatusItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && Z(r) === "entity" && Td(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, W(md)), this._updateConfig(i);
			return;
		}
		if (t.entity === "" && Z(r) === "entity") {
			this._updateConfig(G("entity", pd));
			return;
		}
		this._updateConfig({
			entity: r.entity || "",
			...Cc(r),
			color_source: r.color_source || "",
			color: r.color || "",
			accent_color_source: r.accent_color_source || "",
			accent_color: r.accent_color || "",
			color_on: r.color_on || "",
			color_off: r.color_off || "",
			icon_source: r.icon_source || "",
			icon: r.icon || "",
			icon_on: r.icon_on || "",
			icon_off: r.icon_off || "",
			entity_icon_source: r.entity_icon_source || "",
			entity_icon_template: r.entity_icon_template || "",
			entity_icon: r.entity_icon || "",
			entity_icon_on: r.entity_icon_on || "",
			entity_icon_off: r.entity_icon_off || "",
			state_template: r.state_template || "",
			label_template: r.label_template || "",
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
		return oa.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t, n = {}) {
		return sa.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return ca.call(this, e, t, n);
	}
	_renderColor(e, t, n) {
		return _a.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return va.call(this, e, t, n, r, i);
	}
	_renderColorPair(e) {
		return ya.call(this, e);
	}
	_renderEntity(e, t, n) {
		return qo.call(this, e, t, n);
	}
	_renderStatusItemInteractions(e, t, n, r) {
		let i = {
			hass: this.hass,
			_config: t,
			_t: (e, t) => this._t(e, t),
			requestUpdate: () => this.requestUpdate(),
			_updateConfig: (t) => this._updateStatusItem(e, t)
		};
		return uo.call(i, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: n,
					customActions: [J],
					defaultVisible: !0,
					customDefaultLabel: kd(n)
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: "none",
					customActions: [J]
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: "none",
					customActions: [J]
				},
				{
					key: "entity_tap_action",
					formKey: "icon_tap_action",
					label: "Icon tap behavior",
					defaultAction: r,
					customActions: [J],
					customDefaultLabel: kd(r)
				},
				{
					key: "entity_hold_action",
					formKey: "icon_hold_action",
					label: "Icon hold behavior",
					defaultAction: "none",
					customActions: [J]
				},
				{
					key: "entity_double_tap_action",
					formKey: "icon_double_tap_action",
					label: "Icon double tap behavior",
					defaultAction: "none",
					customActions: [J]
				}
			],
			context: {
				entity_id: t.entity,
				area_id: this._config?.area
			}
		});
	}
	_renderArea(e, t) {
		return Jo.call(this, e, t);
	}
	_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
		return Ai.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return Ni.call(this, e);
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
		}), Ai.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return Oi(e);
	}
	_resolveIconPath(e) {
		return ki(e);
	}
	_getInlineSvg(e) {
		return z.call(this, e, { forceColor: !0 });
	}
	_renderStatusSection() {
		return ed.call(this);
	}
	render() {
		return D`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card (Dev) v{version}", { version: t.status })}
        </div>
      </div>
    `;
	}
	static styles = [ec, fd];
};
customElements.get("orbit-status-card-dev-editor") || customElements.define("orbit-status-card-dev-editor", zd);
//#endregion
//#region src/cards/status/renders/status-card.js
function Bd() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = qd(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
	return D`
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
        ${n ? Vd.call(this, t, i) : D`
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
          ${e === "person" ? Ud.call(this) : this._isImageIcon(this._icon) ? D`
                <div
                  class="main-image-icon"
                >
                  ${c ? H(c) : D`<img src=${s} alt="" />`}
                </div>
              ` : this._useNativeMainIcon && this._mainIconStateObj ? D`
                <ha-state-icon
                  class="main-icon"
                  .stateObj=${this._mainIconStateObj}
                ></ha-state-icon>
              ` : D`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
          ${Gd.call(this, this._config.entity, this.hass?.states?.[this._config.entity])}
        </div>

        ${e === "icon_only" ? D`
              <div
                class="status-badge"
                ?hidden=${!o}
              >
                ${o}
              </div>
            ` : D`
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
    ${this._renderCurrentActivityDialog()}
  `;
}
function Vd(e, t) {
	return D`
    <div class="status-icon-grid">
      ${Jd(e, t).map((e, n) => D`
        <div class="status-icon-row">
          ${e.map((e, r) => Hd.call(this, e, n * t + r))}
          ${Yd(e.length, t, "status-icon-spacer")}
        </div>
      `)}
    </div>
  `;
}
function Hd(e, t) {
	let n = this._config?.[Rd], r = Bu(this) && Number.isInteger(n) && n === t ? "orbit-editor-preview-selected" : "", i = qd(e.statusText), a = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", o = a ? this._getInlineSvg(a, e.svgForceColor) : "", s = D`
    <div class="circle status-circle">
      ${this._isImageIcon(e.icon) ? D`
            <div class="main-image-icon">
              ${o ? H(o) : D`<img src=${a} alt="" />`}
            </div>
          ` : e.useStateIcon && e.nativeIconStateObj ? D`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.nativeIconStateObj}
            ></ha-state-icon>
          ` : D`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${e.suppressEntityIssueBadge ? "" : Gd.call(this, e.entityId, e.stateObj)}
    </div>

    <div
      class="status-badge"
      ?hidden=${!i}
    >
      ${i}
    </div>
  `;
	return (this._statusItems?.length || 0) > 1 && !this._config?.separate_cards ? D`
      <div
        class="status-icon-item ${r}"
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
        ${s}
      </div>
    ` : D`
    <ha-card
      class="status-icon-item ${r}"
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
      ${s}
    </ha-card>
  `;
}
function Ud() {
	return D`
    <div class="person-main-icon">
      ${this._personPicture ? D`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          ` : D`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${Wd.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? Wd.call(this, "battery-1", null, this._personBattery1.color, this._personBattery1.entityId, this._personBattery1.stateObj) : ""}

      ${this._personBattery2 ? Wd.call(this, "battery-2", null, this._personBattery2.color, this._personBattery2.entityId, this._personBattery2.stateObj) : ""}
    </div>
  `;
}
function Wd(e, t, n, r = null, i = null) {
	let a = Kd(i);
	return D`
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
        ${i ? D`
              <ha-state-icon
                class=${a ? "charging" : ""}
                .stateObj=${i}
              ></ha-state-icon>
            ` : D`<ha-icon .icon=${t}></ha-icon>`}
      </span>
      ${Gd.call(this, r, i)}
    </span>
  `;
}
function Gd(e, t) {
	let n = pt(e, t);
	if (!n) return "";
	let r = this._t(n === "missing" ? "Entity not found" : "Unavailable");
	return D`
    <ha-tile-badge
      class="entity-unavailable-badge ${n === "missing" ? "entity-missing-badge" : ""}"
      title=${r}
      aria-label=${r}
    >
      <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
    </ha-tile-badge>
  `;
}
function Kd(e) {
	let t = e?.attributes || {};
	return String(t.icon || "").toLowerCase().includes("battery-charging") || t.battery_charging === !0 || t.is_charging === !0 || t.charging === !0;
}
function qd(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
function Jd(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Yd(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => D`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/common/styles/editor-preview-selection.js
var Xd = d`
  .orbit-editor-preview-selected {
    isolation: isolate;
    position: relative;
  }

  .orbit-editor-preview-selected::before {
    border: 2px solid var(--primary-color);
    border-radius: inherit;
    box-sizing: border-box;
    content: "";
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 100;
  }

`, Zd = [
	mi,
	hi,
	gi,
	Xd,
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
], Qd = d`
  ha-adaptive-dialog {
    --ha-dialog-min-height: auto;
    --ha-bottom-sheet-height: auto;
  }

  .active-entities-dialog-content {
    min-width: 0;
    padding: 0 var(--ha-space-4, 16px);
  }

  .active-entities-subtype-pill {
    min-width: 0;
  }

  .active-entities-subtype-pill::part(base) {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding-inline: 8px;
  }

  .active-entities-subtype-pill-static {
    pointer-events: none;
  }

  .active-entities-subtype-count {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    text-transform: none;
  }

  .active-entities-subtype-count ha-state-icon,
  .active-entities-subtype-count ha-icon {
    width: 24px;
    height: 24px;
    color: currentColor;
    --mdc-icon-size: 24px;
  }

  .active-entity-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--ha-space-3, 12px);
    min-height: 52px;
    padding: 6px 0;
  }

  .active-entity-row::before {
    position: absolute;
    top: 0;
    right: -12px;
    left: -12px;
    border-top: 1px solid var(--divider-color);
    content: "";
    pointer-events: none;
  }

  .active-entity-row > ha-state-icon,
  .active-entity-row > ha-icon {
    flex: 0 0 auto;
    margin: 12px;
    transform: translateX(-4px);
  }

  .active-entity-row ha-state-icon,
  .active-entity-row ha-icon {
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
    margin: 6px;
    padding: 0;
    transform: translateX(-4px);
    place-items: center;
    border: 0;
    border-radius: 50%;
    outline: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .active-entity-device-button {
    width: 36px;
    height: 36px;
    margin: 12px;
    transform: translateX(-4px);
  }

  .active-entity-control-button ha-state-icon,
  .active-entity-control-button ha-icon {
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
`, $d = d`
  .current-activity-dialog {
    --ha-dialog-width-sm: 640px;
    --mdc-dialog-min-width: min(640px, calc(100vw - 32px));
    --mdc-dialog-max-width: min(640px, calc(100vw - 32px));
    --mdc-dialog-min-height: 0px;
    --ha-dialog-min-height: 0px;
    --ha-bottom-sheet-height: auto;
  }

  .current-activity-dialog-content {
    min-width: 0;
    height: min(
      var(--current-activity-height, 140px),
      calc(100dvh - 216px)
    );
    max-height: calc(100dvh - 216px);
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-4, 16px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .current-activity-scope-selector {
    width: 180px;
  }

  .current-activity-date-browser {
    display: flex;
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-3, 12px);
  }

  .current-activity-date-browser ha-date-range-picker {
    width: 100%;
  }

  .current-activity-dialog-content > ha-logbook {
    display: block;
    height: 100%;
    max-height: calc(100dvh - 216px);
  }

  .current-activity-dialog-message {
    display: grid;
    min-height: 120px;
    place-items: center;
    color: var(--secondary-text-color);
    text-align: center;
  }

  @media (max-width: 600px) {
    .current-activity-scope-selector {
      width: 156px;
    }

    .current-activity-dialog-content {
      padding-inline: 0;
    }

    .current-activity-date-browser {
      padding-inline: 0;
    }
  }

  @media (max-width: 870px), (max-height: 500px) {
    .current-activity-dialog {
      --ha-bottom-sheet-height: min(
        90dvh,
        calc(
          100dvh - max(var(--safe-area-inset-top, 0px), 48px)
        )
      );
      --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height);
      --dialog-content-padding: 0;
    }

    .current-activity-dialog-content {
      flex: 1 1 auto;
      min-height: 0;
      height: auto;
      max-height: none;
    }

    .current-activity-dialog-content > ha-logbook {
      min-height: 0;
      max-height: none;
    }
  }
`, ef = class extends Lu(ot(A)) {
	static svgCache = B;
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
			...ol,
			...Gl
		};
	}
	constructor() {
		super(), sl.call(this), Kl.call(this), this._activeEntitiesStatusIndex = 0, this._currentActivityStatusIndex = 0;
	}
	static getConfigElement() {
		return document.createElement("orbit-status-card-dev-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-status-card-dev",
			mode: "standard",
			entity: ""
		};
	}
	getLayoutOptions() {
		if (this._config?.mode === "icon_only") {
			let e = gu(this._config).length, t = tf(this._config, e);
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
		this._config = _n(e).config;
		let t = this._config.color_off || "theme";
		this._nameColor = this._computeFullColor(t), this._statusColor = this._computeFullColor(t), this._iconColor = this._computeIconColor(t), this._circleColor = this._computeCircleColor(t), this._statusItems = [];
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && (_t.call(this, this._getTemplateEntries()), this._syncCurrentActivityEntities()), hu.call(this, e);
	}
	_syncCurrentActivityEntities() {
		if (!this._currentActivityOpen) return;
		let e = this._currentActivityStatusIndex ?? 0, t = this._config?.mode === "icon_only" ? gu(this._config)[e] || {} : this._config || {}, n = Zc(this.hass, t), r = Hc(n, t, (e) => this._getEntityActiveState(e)).map((e) => e.entity_id);
		Yl.call(this, r, n.map((e) => e.entity_id));
	}
	disconnectedCallback() {
		vt.call(this), this._clearMainIconHoldTimer(), this._clearStatusItemHoldTimer(), this._clearDoubleTapTimer(), ul.call(this), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return dl.call(this, e) ? !0 : $n.call(this, e, this._getRelevantEntities(), {
			hasTemplates: er(this._config),
			includeZones: this._config?.mode === "person"
		});
	}
	_handleAction(e, t = null) {
		if (e?.action === "Current state") {
			$l.call(this), this._activeEntitiesStatusIndex = e.status_index ?? 0, cl.call(this);
			return;
		}
		if (e?.action === "current-activity") {
			pl.call(this);
			let t = e.status_index ?? 0;
			this._currentActivityStatusIndex = t;
			let n = this._config?.mode === "icon_only" ? gu(this._config)[t] || {} : this._config || {}, r = Zc(this.hass, n), i = Hc(r, n, (e) => this._getEntityActiveState(e)).map((e) => e.entity_id), a = Z(n) === "area_count", o = a ? r.map((e) => e.entity_id) : i, s = Fc(this.hass, n);
			ql.call(this, i, o, a, s);
			return;
		}
		return Ve.call(this, e, t);
	}
	_renderActiveEntitiesDialog() {
		let e = this._config?.mode === "icon_only" ? gu(this._config)[this._activeEntitiesStatusIndex] || {} : this._config;
		return Hl.call(this, Hc(Zc(this.hass, e), e, (e) => this._getEntityActiveState(e)), e);
	}
	_renderCurrentActivityDialog() {
		return ou.call(this);
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	_computeFullColor(e) {
		return It.call(this, e);
	}
	_computeIconColor(e) {
		return Lt.call(this, e);
	}
	_computeCircleColor(e) {
		return Rt.call(this, e);
	}
	_getMainStateObj() {
		let e = this._config.entity;
		return e && this.hass ? this.hass.states[e] : null;
	}
	formatState(e) {
		return st(e, this.hass);
	}
	_getEntityActiveState(e) {
		return ct(e);
	}
	_isImageIcon(e) {
		return Gn(e);
	}
	_resolveIconPath(e) {
		return Kn(e);
	}
	_getInlineSvg(e, t = !0) {
		return z.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return qn(e, t);
	}
	_evaluateStateTemplate(e, t) {
		return I.call(this, e, t);
	}
	_getTemplateEntries() {
		if (this._config?.mode === "icon_only") return [
			...gu(this._config).flatMap((e) => (Z(e) === "area_count" ? [] : [
				e.state_template,
				e.active_template,
				e.inactive_template,
				e.label_template,
				e.name_template
			]).filter(Boolean).map((t) => ({
				template: t,
				entityId: e.entity || ""
			}))),
			...Tt(this._config),
			...Et(this._config)
		];
		let e = this._config?.mode === "person" ? this._config?.tracker_entity || "" : this._config?.entity || "";
		return [
			...(Z(this._config) === "area_count" ? [] : [
				this._config?.state_template,
				this._config?.active_template,
				this._config?.inactive_template,
				this._config?.label_template,
				this._config?.name_template
			]).filter(Boolean).map((t) => ({
				template: t,
				entityId: e
			})),
			...Tt(this._config),
			...Et(this._config)
		];
	}
	_getRelevantEntities() {
		return this._config?.mode === "icon_only" ? gu(this._config).flatMap((e) => Z(e) === "area_count" ? el(this.hass, e) : [e.entity]) : Z(this._config) === "area_count" ? el(this.hass, this._config) : [
			this._config?.entity,
			this._config?.tracker_entity,
			this._config?.eta_entity,
			this._config?.battery_entity_1,
			this._config?.battery_entity_2
		];
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
		return tf(this._config, e);
	}
	_getStatusRowCount(e = this._statusItems?.length || 1) {
		return nf(this._config, e);
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
	render() {
		return Bd.call(this);
	}
	static styles = [
		...Zd,
		Qd,
		$d
	];
};
function tf(e = {}, t = 1) {
	return _c({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
function nf(e = {}, t = 1) {
	return vc({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
un({
	tag: "orbit-status-card-dev",
	cardClass: ef,
	name: "Orbit Status Card (Dev)",
	description: "Responsive status card",
	version: t.status,
	getEntitySuggestion: af
});
var rf = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function af(e, t) {
	let n = nr(t);
	if (n === "person") return { config: {
		type: "custom:orbit-status-card-dev",
		mode: "person",
		entity: t
	} };
	if (rf.has(n)) return null;
	let r = {
		label: V(e, "Standard"),
		config: {
			type: "custom:orbit-status-card-dev",
			mode: "standard",
			entity: t
		}
	};
	return ir(e, t) ? [r, {
		label: V(e, "Icon only"),
		config: {
			type: "custom:orbit-status-card-dev",
			mode: "icon_only",
			entity: t
		}
	}] : { config: r.config };
}
//#endregion
//#region src/cards/action/helpers/model.js
function of(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		color: e.color,
		icon_source: e.icon_source,
		icon: e.icon,
		icon_svg_color_override: e.icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action
	}];
}
function sf(e, t) {
	let n = e.icon_source, r = !!t, i = !!e.icon;
	return n === "custom" ? "custom" : n === "template" ? "template" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function cf(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function lf(e) {
	!e.has("_config") && !e.has("hass") && !e.has("_templateRevision") || (this._actions = of(this._config).map((e) => uf.call(this, e)));
}
function uf(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.color || this._config.color || "theme";
	this._orbitColorTemplateEntityId = t || "";
	let i = cf(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r);
	this._orbitColorTemplateEntityId = "";
	let s = sf(e, t), c = ["custom", "template"].includes(s) ? Hn.call(this, e.icon, t) : "", l = ["custom", "template"].includes(s) && c ? "icon" : "", u = c || (t && !n ? "mdi:alert-circle-outline" : "mdi:play-circle");
	return {
		...e,
		entityId: t,
		stateObj: n,
		useStateIcon: !!n && s !== "template" && !c,
		icon: u,
		iconColor: t && !n ? "var(--error-color)" : o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: l ? this._getSvgColorOverride(e, l) : !0
	};
}
//#endregion
//#region src/cards/action/renders/action-card.js
function df() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t), i = pf(e, n);
	return D`
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
        ${i.map((e, t) => D`
          <div class="action-row">
            ${e.map((e, r) => ff.call(this, e, t * n + r))}
            ${mf(e.length, n, "action-spacer")}
          </div>
        `)}
      </div>
    </ha-card>
  `;
}
function ff(e, t) {
	let n = pt(e.entityId, e.stateObj), r = n ? this._t(n === "missing" ? "Entity not found" : "Unavailable") : "", i = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", a = i ? this._getInlineSvg(i, e.svgForceColor) : "", o = D`
    <div class="circle action-circle">
      ${this._isImageIcon(e.icon) ? D`
            <div class="main-image-icon">
              ${a ? H(a) : D`<img src=${i} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? D`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : D`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${n ? D`
            <ha-tile-badge
              class="entity-unavailable-badge ${n === "missing" ? "entity-missing-badge" : ""}"
              title=${r}
              aria-label=${r}
            >
              <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
            </ha-tile-badge>
          ` : ""}
    </div>
  `;
	return (this._actions?.length || 0) > 1 && !this._config?.separate_cards ? D`
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
        ${o}
      </div>
    ` : D`
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
      ${o}
    </ha-card>
  `;
}
function pf(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function mf(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => D`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/cards/action/styles/action-card-styles.js
var hf = [
	hi,
	gi,
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
function gf() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", { itemsPerRow: i, shouldWrapTabs: a, showTabScrollHint: o } = Vu({
		config: this._config,
		itemCount: e.length,
		perRowKey: "actions_per_row",
		defaultPerRow: 3
	});
	return D`
    <div class="section">
      ${Hu.call(this, {
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
          ${e.map((e, n) => D`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectActionItem(n)}
            >
              ${n + 1}
            </button>
          `)}
        </div>

        ${o ? D`
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

          ${e.length > 1 ? D`
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

        ${To.call(this, {
		value: n.entity || "",
		filterOptions: _f,
		activeFilter: r,
		onValueChanged: (e) => this._updateActionItem(t, { entity: e })
	})}
      </div>

      ${this._renderColorControl("Color", `action-${t}-color`, n.color || "", (e) => this._updateActionItem(t, { color: e }), this._config?.color || "theme")}

      ${vf.call(this, t, n)}

      ${n.entity ? this._renderActionItemInteractions(t, n) : ""}
    </div>
  `;
}
var _f = [
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
function vf(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateActionItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderActionItemIconInput(t, r, e)
	};
	return ji.call(r, {
		label: "Icon",
		sourceKey: "icon_source",
		templateKey: "icon",
		entityKey: "entity",
		customIconKeys: ["icon"],
		renderCustom() {
			return this._renderIconInput("", "icon");
		}
	});
}
//#endregion
//#region src/common/editor/styles/action-editor.js
var yf = d`
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
`, bf = class extends A {
	static svgCache = B;
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
		super.connectedCallback(), Yo(this), cn(this, "orbit-action-card-dev");
	}
	disconnectedCallback() {
		Xo(this), super.disconnectedCallback();
	}
	setConfig(e) {
		let { config: t, migrated: n } = fn(e || {});
		this._config = Ef(t || {}), this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(this._config).length - 1), n && queueMicrotask(() => this._dispatchConfigChanged(this._config));
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = Ef(la(this._config, e)), this._dispatchConfigChanged(this._config);
	}
	_dispatchConfigChanged(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
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
			color: e?.color || "",
			icon_source: e?.icon_source || "",
			icon: e?.icon || "",
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
		this._selectedActionIndex = e.length, this._updateConfig(W(Cf, { entities: [...e, { entity: "" }] }));
	}
	_removeActionItem(e) {
		let t = this._getActionItems();
		if (t.length <= 1) {
			this._updateConfig(G("main_entity", Sf));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedActionIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveActionItem(e, t) {
		let n = this._getActionItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedActionIndex = r, this._updateConfig(W(Cf, { entities: i }));
	}
	_updateActionItem(e, t) {
		let n = this._getActionItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && xf(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, W(Cf)), this._updateConfig(i);
			return;
		}
		if (t.entity === "") {
			this._updateConfig(G("main_entity", Sf));
			return;
		}
		this._updateConfig({
			main_entity: r.entity || "",
			color: r.color || "",
			icon_source: r.icon_source || "",
			icon: r.icon || "",
			tap_action: r.tap_action,
			hold_action: r.hold_action,
			double_tap_action: r.double_tap_action
		});
	}
	_getColorStyle(e) {
		return Qo(e);
	}
	_getColorPickerValue(e) {
		return $o(e);
	}
	_renderActionItemInteractions(e, t) {
		let n = {
			hass: this.hass,
			_config: t,
			_t: (e, t) => this._t(e, t),
			requestUpdate: () => this.requestUpdate(),
			_updateConfig: (t) => this._updateActionItem(e, t)
		};
		return uo.call(n, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: br(t.entity, "toggle"),
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
		return _a.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return va.call(this, e, t, n, r, i);
	}
	_renderEntity(e, t, n) {
		return qo.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return ca.call(this, e, t, n);
	}
	_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
		return Ai.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return Ni.call(this, e);
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
		}), Ai.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return Oi(e);
	}
	_resolveIconPath(e) {
		return ki(e);
	}
	_getInlineSvg(e) {
		return z.call(this, e, { forceColor: !0 });
	}
	_renderActionSection() {
		return gf.call(this);
	}
	render() {
		return D`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card (Dev) v{version}", { version: t.action })}
        </div>
      </div>
    `;
	}
	static styles = [ec, yf];
};
customElements.get("orbit-action-card-dev-editor") || customElements.define("orbit-action-card-dev-editor", bf);
function xf(e) {
	Object.assign(e, W(Sf));
}
var Sf = [
	"color",
	"icon_source",
	"icon",
	"tap_action",
	"hold_action",
	"double_tap_action"
], Cf = ["main_entity", ...Sf], wf = [
	"entity",
	"color",
	"icon_source",
	"icon",
	"icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action"
], Tf = [
	"type",
	"wrap",
	"actions_per_row",
	"separate_cards",
	"main_entity",
	"color",
	"icon_source",
	"icon",
	"icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entities",
	"grid_options",
	"view_layout"
];
function Ef(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Tf.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(Df) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Df(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? e : Of(e, wf);
}
function Of(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/cards/action-card.js
var kf = class extends ot(A) {
	static svgCache = B;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_icon: { type: String },
			_iconColor: { type: String },
			_cardBackground: { type: String },
			_isRunning: { type: Boolean },
			_actions: { type: Array },
			_templateRevision: { type: Number }
		};
	}
	static getConfigElement() {
		return document.createElement("orbit-action-card-dev-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-action-card-dev",
			main_entity: "",
			color: "theme"
		};
	}
	getLayoutOptions() {
		let e = of(this._config).length, t = Af(this._config, e);
		return {
			grid_columns: Math.max(1, t * 1),
			grid_min_columns: .5,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		this._config = fn(e).config;
		let t = this._config.color || "theme";
		this._iconColor = this._computeIconColor(t), this._cardBackground = this._computeCircleColor(t), this._isRunning = !1, this._actions = [];
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && _t.call(this, [...Tt(this._config), ...Et(this._config)]), lf.call(this, e);
	}
	disconnectedCallback() {
		vt.call(this), this._clearHoldTimer(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return $n.call(this, e, of(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: er(this._config) });
	}
	_handleTap(e, t = 0) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		N.call(this, e, this._getActionEntityId(t), this._getTapAction(t), this._getDoubleTapAction(t));
	}
	_handleDoubleTap(e, t = 0) {
		P.call(this, e, this._getActionEntityId(t), this._getDoubleTapAction(t));
	}
	_getDoubleTapAction(e = 0) {
		let t = this._actions?.[e];
		return t?.double_tap_action?.action ? t.double_tap_action : this._config.double_tap_action?.action ? this._config.double_tap_action : null;
	}
	_handlePointerDown(e, t = 0) {
		M(this) || (this._stopEvent(e), this._clearHoldTimer(), this._holdTimer = setTimeout(() => {
			this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
		}, this._LONG_PRESS_DELAY));
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
		return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : br(this._getActionEntityId(e), "toggle");
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
		return Af(this._config, e);
	}
	_getActionRowCount(e = this._actions?.length || 1) {
		return vc({
			config: this._config,
			count: e,
			perRowKey: "actions_per_row"
		});
	}
	_computeFullColor(e) {
		return It.call(this, e);
	}
	_computeIconColor(e) {
		return Lt.call(this, e);
	}
	_computeCircleColor(e) {
		return Rt.call(this, e);
	}
	_isImageIcon(e) {
		return Gn(e);
	}
	_resolveIconPath(e) {
		return Kn(e);
	}
	_getInlineSvg(e, t = !0) {
		return z.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return qn(e, t);
	}
	_clearHoldTimer() {
		this._holdTimer &&= (clearTimeout(this._holdTimer), null);
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	render() {
		return df.call(this);
	}
	static styles = hf;
};
function Af(e = {}, t = 1) {
	return _c({
		config: e,
		count: t,
		perRowKey: "actions_per_row"
	});
}
un({
	tag: "orbit-action-card-dev",
	cardClass: kf,
	name: "Orbit Action Card (Dev)",
	description: "Compact scene, script, and automation launcher",
	version: t.action,
	getEntitySuggestion: Mf
});
var jf = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function Mf(e, t) {
	return jf.has(nr(t)) ? { config: {
		type: "custom:orbit-action-card-dev",
		main_entity: t
	} } : null;
}
//#endregion
//#region src/common/helpers/deck-padding.js
function Nf(e = {}) {
	let t = e?.attributes || {};
	return {
		top: zf(t.padding_top),
		right: zf(t.padding_right),
		bottom: zf(t.padding_bottom),
		left: zf(t.padding_left)
	};
}
function Pf(e = {}) {
	return Object.values(Nf(e)).some(Boolean);
}
function Ff(e = {}) {
	return e?.attributes?.force_padding === !0;
}
function If(e = {}) {
	return Pf(e) && (Ff(e) || !Rf(e?.card));
}
function Lf(e = {}) {
	return Ff(e) && Pf(e);
}
function Rf(e) {
	return Array.isArray(e) ? e.some((e) => Rf(e)) : !e || typeof e != "object" ? typeof e == "string" ? /\bpadding(?:-(?:top|right|bottom|left))?\b/i.test(e) : !1 : Object.entries(e).some(([e, t]) => e.toLowerCase().includes("padding") || Rf(t));
}
function zf(e) {
	if (e == null || e === "") return "";
	let t = e.toString().trim();
	return t ? /^-?\d+(\.\d+)?$/.test(t) ? `${t}px` : t : "";
}
//#endregion
//#region src/cards/deck/items.js
function Bf(e = {}) {
	return Array.isArray(e?.decks) ? e.decks.map((e) => e?.badge ? {
		attributes: e?.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	}) : [];
}
function Vf(e = {}) {
	return [
		Hf(e, "tap_action"),
		Hf(e, "hold_action"),
		Hf(e, "double_tap_action")
	].some(j);
}
function Hf(e = {}, t) {
	let n = e?.attributes?.[t];
	return n?.action ? n : null;
}
function Uf(e = {}) {
	let t = Kf(e);
	return e?.attributes?.entity || Jf(e?.attributes?.tap_action) || Jf(e?.attributes?.hold_action) || Jf(e?.attributes?.double_tap_action) || Jf(t?.tap_action) || Jf(t?.hold_action) || Jf(t?.double_tap_action) || t?.entity || null;
}
function Wf(e = {}, t = !1) {
	let n = Kf(e), r = Lf(e) ? qf(n) : n, i = r, a = [
		"tap_action",
		"hold_action",
		"double_tap_action"
	].filter((t) => j(Hf(e, t)));
	return a.length && (i = { ...r }, a.forEach((e) => delete i[e])), t ? {
		...i,
		hide_background: !0
	} : i;
}
function Gf(e = {}) {
	return e?.badge ? "badge" : "card";
}
function Kf(e = {}) {
	return e?.badge || e?.card || {};
}
function qf(e) {
	return Array.isArray(e) ? e.map((e) => qf(e)) : !e || typeof e != "object" ? e : Object.entries(e).reduce((e, [t, n]) => (t.toLowerCase().includes("padding") || (e[t] = qf(n)), e), {});
}
function Jf(e) {
	return e?.entity || e?.entity_id || null;
}
function Yf(e = []) {
	return Math.max(0, e.findIndex((e) => e.attributes?.default));
}
function Xf(e = []) {
	return e.map((e, t) => e.attributes?.default ? t : "").join(":");
}
//#endregion
//#region src/cards/deck/layout.js
function Zf(e = {}, t = 0) {
	let n = e?.attributes || {}, r = Qf(n.left, 0), i = Qf(n.top, 0);
	return `${[
		`--orbit-deck-overlay-left:${r}px`,
		`--orbit-deck-overlay-top:${i}px`,
		`--orbit-deck-overlay-z-index:${t + 1}`
	].join(";")};`;
}
function Qf(e, t) {
	if (e == null || e === "") return t;
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function $f(e) {
	let t = Qf(e, null);
	return t === null ? null : Math.max(0, t);
}
function ep(e = {}) {
	return e?.attributes?.fit === "crop" ? "crop" : "resize";
}
function tp(e, t, n, r, i) {
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
function np(e = {}) {
	return [
		"equal",
		"dynamic",
		"custom"
	].includes(e?.tab_width_mode) ? e.tab_width_mode : "equal";
}
function rp(e = {}) {
	return [
		e.tab_font_size ? `--orbit-deck-tab-font-size:${e.tab_font_size};` : "",
		ip.call(this, "--orbit-deck-tab-color", e.tab_color),
		ip.call(this, "--orbit-deck-tab-active-color", e.tab_active_color),
		ip.call(this, "--orbit-deck-tab-background-color", e.tab_background_color)
	].filter(Boolean).join("");
}
function ip(e, t) {
	return t ? `${e}:${It.call(this, t)};` : "";
}
function ap(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function op(e, t) {
	return Array.from({ length: Math.max(0, t - e) }, () => D`
    <div class="deck-spacer"></div>
  `);
}
//#endregion
//#region src/cards/deck/surface.js
function sp(e = []) {
	return e.map((e) => {
		if (!e?.element) return `${e?.index ?? ""}:none`;
		let t = Nf(e.item), n = Ff(e.item), r = If(e.item);
		return [
			e.index,
			e.kind || Gf(e.item),
			Kf(e.item)?.type || "",
			n ? "force" : "child",
			r ? t.top : "",
			r ? t.right : "",
			r ? t.bottom : "",
			r ? t.left : ""
		].join(":");
	}).join("|");
}
function cp(e, t) {
	return e?.querySelector?.(`.deck-item-interaction[data-deck-index="${t}"]`);
}
function lp(e = {}, t = {}, n = 0) {
	let r = t?.attributes?.transparent_background;
	return e?.layout === "wrap" ? typeof r == "boolean" ? r : !e?.separate_cards : e?.layout === "overlay" ? n > 0 && r === !0 : e?.layout === "tabs" && r !== !1;
}
var up = {
	background: "transparent",
	"backdrop-filter": "none",
	"-webkit-backdrop-filter": "none",
	"border-color": "transparent",
	"box-shadow": "none"
};
function dp(e, t) {
	if (t) {
		e._orbitDeckSurfaceStyles ||= Object.fromEntries(Object.keys(up).map((t) => [t, {
			value: e.style.getPropertyValue(t),
			priority: e.style.getPropertyPriority(t)
		}])), fp(e), pp(e);
		return;
	}
	let n = e._orbitDeckSurfaceStyles;
	n && (mp(e), Object.entries(n).forEach(([t, n]) => {
		n.value ? e.style.setProperty(t, n.value, n.priority) : e.style.removeProperty(t);
	}), delete e._orbitDeckSurfaceStyles);
}
function fp(e) {
	Object.entries(up).forEach(([t, n]) => {
		(e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important");
	});
}
function pp(e) {
	e._orbitDeckSurfaceObserver || (e._orbitDeckSurfaceObserver = new MutationObserver(() => {
		e._orbitDeckSurfaceStyles && fp(e);
	}), e._orbitDeckSurfaceObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function mp(e) {
	e._orbitDeckSurfaceObserver?.disconnect(), e._orbitDeckSurfaceObserver = null;
}
function hp(e) {
	let t = /* @__PURE__ */ new Set();
	return gp(e, t, /* @__PURE__ */ new WeakSet()), [...t];
}
function gp(e, t, n) {
	!e || n.has(e) || (n.add(e), e.localName === "ha-card" && t.add(e), [e.shadowRoot, e].filter(Boolean).forEach((e) => {
		let r = e.querySelectorAll?.("*") || [];
		for (let e of r) e.localName === "ha-card" && t.add(e), e.shadowRoot && gp(e, t, n);
	}));
}
function _p(e, t, n) {
	vp(e, n ? t : {
		top: "",
		right: "",
		bottom: "",
		left: ""
	}), e._orbitDeckPaddingApplied = n;
}
function vp(e, t) {
	yp(e, "padding-top", t.top), yp(e, "padding-right", t.right), yp(e, "padding-bottom", t.bottom), yp(e, "padding-left", t.left);
}
function yp(e, t, n) {
	n ? (e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important") : e.style.removeProperty(t);
}
function bp(e, t) {
	e._orbitDeckPadding = t, !e._orbitDeckPaddingObserver && (e._orbitDeckPaddingObserver = new MutationObserver(() => {
		e._orbitDeckPadding && vp(e, e._orbitDeckPadding);
	}), e._orbitDeckPaddingObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function xp(e) {
	e._orbitDeckPadding = null, e._orbitDeckPaddingObserver?.disconnect(), e._orbitDeckPaddingObserver = null;
}
//#endregion
//#region src/cards/deck/styles/deck-card-styles.js
var Sp = [Xd, d`
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
    min-height: 132px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .deck-empty-preview {
    width: min(100%, 360px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .deck-empty-illustration {
    width: 132px;
    height: 76px;
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: 1.45fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 6px;
    transform: rotate(-2deg);
  }

  .deck-empty-tile {
    min-width: 0;
    padding: 9px;
    border: 1px solid color-mix(
      in srgb,
      var(--primary-color) 28%,
      var(--divider-color)
    );
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-color) 9%,
      var(--card-background-color)
    );
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
  }

  .deck-empty-tile-main {
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }

  .deck-empty-tile-top,
  .deck-empty-tile-bottom {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .deck-empty-orbit {
    width: 26px;
    height: 26px;
    border: 3px solid var(--primary-color);
    border-radius: 50%;
    position: relative;
    box-sizing: border-box;
  }

  .deck-empty-orbit::after {
    content: "";
    position: absolute;
    width: 7px;
    height: 7px;
    inset-inline-end: -5px;
    top: 1px;
    border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 0 2px var(--card-background-color);
  }

  .deck-empty-dot {
    width: 11px;
    height: 11px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: var(--primary-color);
    opacity: 0.82;
  }

  .deck-empty-line {
    width: 100%;
    height: 5px;
    border-radius: 999px;
    background: var(--primary-text-color);
    opacity: 0.28;
  }

  .deck-empty-line.short {
    width: 64%;
  }

  .deck-empty-copy {
    min-width: 0;
  }

  .deck-empty-title {
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-l, 16px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.35;
  }

  .deck-empty-modes {
    margin-top: 5px;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
    line-height: 1.4;
    white-space: nowrap;
  }

  @media (max-width: 360px) {
    .deck-empty-preview {
      gap: 16px;
    }

    .deck-empty-illustration {
      width: 108px;
      height: 68px;
    }
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

  .deck-item.orbit-editor-preview-resized {
    flex: 0 0 var(--orbit-editor-preview-width, 50%);
  }

  .deck-row:has(.orbit-editor-preview-resized) {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .deck-item.orbit-editor-preview-resized >
    .deck-item-interaction.orbit-editor-preview-selected {
    height: auto;
    width: 100%;
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
`], Cp = [
	"type",
	"layout",
	"items_per_row",
	"separate_cards",
	"tab_width_mode",
	"tab_font_size",
	"tab_divider",
	"tab_color",
	"tab_active_color",
	"tab_background_color",
	"decks",
	"grid_options",
	"view_layout"
], wp = [
	"attributes",
	"badge",
	"card"
], Tp = [
	"default",
	"icon",
	"name",
	"width",
	"fit",
	"left",
	"top",
	"height",
	"transparent_background",
	"force_padding",
	"padding_top",
	"padding_bottom",
	"padding_left",
	"padding_right",
	"tap_action",
	"hold_action",
	"double_tap_action"
];
function Ep(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Cp.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "decks" && Array.isArray(e[r]) ? e[r].map(kp) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Dp(e) {
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
function Op(e = {}) {
	return e?.badge ? {
		attributes: e.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	};
}
function kp(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = {}, n = /* @__PURE__ */ new Set(), r = {
		...e,
		attributes: Ap(jp(e.attributes || {}), Tp)
	};
	return e.badge?.type ? (r.badge = e.badge, delete r.card) : e.card?.type ? (r.card = e.card, delete r.badge) : (delete r.badge, delete r.card), wp.forEach((e) => {
		Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e], n.add(e));
	}), Object.keys(r).forEach((e) => {
		n.has(e) || (t[e] = r[e]);
	}), t;
}
function Ap(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
function jp(e = {}) {
	return Object.entries(e).reduce((e, [t, n]) => (n !== void 0 && n !== "" && (e[t] = n), e), {});
}
//#endregion
//#region src/editors/deck/item-helpers.js
function Mp(e = {}) {
	return e?.badge || e?.card || {};
}
function Np(e = {}, t, n = "Card") {
	let r = Mp(e)?.type || "";
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
//#endregion
//#region src/editors/deck/native-pickers.js
async function Pp() {
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
async function Fp() {
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
async function Ip({ eventName: e, dialogTag: t, detail: n, huiView: r }) {
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
function Lp(e, t) {
	let n = e.querySelectorAll?.("*") || [];
	for (let e of n) {
		if (t(e)) return e;
		if (e.shadowRoot) {
			let n = this._findElementInShadowRoots(e.shadowRoot, t);
			if (n) return n;
		}
	}
}
async function Rp() {
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
function zp() {
	let e = this._childPickerType;
	return D`
    <div class="editor-tabs deck-child-type-tabs" role="tablist">
      ${[["badge", "Badges"], ["card", "Cards"]].map(([t, n]) => D`
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
function Bp(e, t) {
	return this._childPickerType === "badge" ? this._renderBadgePicker(e, t) : this._renderCardPicker(e, t);
}
function Vp(e, t) {
	return t?.badge?.type ? customElements.get("hui-badge-element-editor") ? D`
      <hui-badge-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.badge}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
      ></hui-badge-element-editor>
    ` : (this._ensureNativeBadgeEditor(), D`
        <div class="deck-card-picker-loading">
          <ha-spinner></ha-spinner>
        </div>
      `) : !this.hass || !this.lovelace ? D`` : customElements.get("hui-badge-picker") ? D`
    <hui-badge-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .badgePicked=${(t) => this._updateDeckBadge(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
    ></hui-badge-picker>
  ` : (this._ensureNativeBadgePicker(), D`
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `);
}
function Hp(e, t) {
	return t?.card?.type ? D`
      <hui-card-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.card}
        .showVisibilityTab=${["wrap", "tabs"].includes(this._config?.layout || "wrap")}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
      ></hui-card-element-editor>
    ` : !this.hass || !this.lovelace ? D`` : customElements.get("hui-card-picker") ? D`
    <hui-card-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cardPicked=${(t) => this._updateDeckCard(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
    ></hui-card-picker>
  ` : (this._ensureNativeCardPicker(), D`
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
function Up(e, t) {
	let n = t?.attributes || {}, r = this._config?.layout === "wrap", i = this._config?.layout === "tabs", a = this._config?.layout === "overlay" && e > 0, o = r || i || a, s = i || r && !this._config?.separate_cards, c = typeof n.transparent_background == "boolean" ? n.transparent_background : s;
	return D`
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
        ${i ? D`
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

        ${a ? D`
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

        ${o ? D`
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
var Wp = [
	ec,
	yf,
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
], Gp = Symbol.for("orbit-deck-card-dev-preview-selected-index"), Kp = class extends A {
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
		super.connectedCallback(), Yo(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		Xo(this), super.disconnectedCallback();
	}
	setConfig(e) {
		let t = mn(e || {}), n = Dp(t.config), r = {
			...n.config,
			layout: ["tabs", "overlay"].includes(t.config?.layout) ? t.config.layout : "wrap"
		};
		this._config = Ep(r), this._selectedDeckIndex = Math.min(this._selectedDeckIndex || 0, Math.max(0, this._getDeckItems().length - 1));
		let i = this._getDeckItems()[this._selectedDeckIndex];
		this._childPickerType = i?.badge ? "badge" : "card", this._updateDocumentationContext(), (t.migrated || n.changed) && queueMicrotask(() => this._dispatchConfigChanged());
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	_getColorPickerValue(e) {
		return $o(e);
	}
	_getColorStyle(e) {
		return Qo(e);
	}
	_updateConfig(e) {
		this._config = Ep(la(this._config, e)), this._dispatchConfigChanged();
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
			[Gp]: this._selectedDeckIndex || 0
		};
	}
	_getDeckItems(e = this._config) {
		return Array.isArray(e?.decks) ? e.decks.map(Op) : [];
	}
	_selectDeckItem(e) {
		let t = this._getDeckItems()[e];
		this._selectedDeckIndex = e, this._childPickerType = t?.badge ? "badge" : "card", this._dispatchPreviewSelection(e);
	}
	_dispatchPreviewSelection(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: {
				...this._getPreviewConfig(),
				[Gp]: e
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
		return oa.call(this, e, t, n, r);
	}
	_renderNumberInput(e, t, n = {}) {
		return ca.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return va.call(this, e, t, n, r, i);
	}
	_renderSubTabs() {
		return D`
      <div class="deck-subtabs-row">
        <div class="editor-tabs deck-subtabs">
          ${["setup", "card"].map((e) => D`
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
		cn(this, "orbit-deck-card-dev", e);
	}
	_renderSetup() {
		let e = this._getDeckItems();
		return D`
      <div class="section deck-card-tab-section">
        ${this._config?.layout === "wrap" ? Hu.call(this, {
			itemCount: e.length,
			classPrefix: "action",
			wrapEnabled: !0,
			showWrapToggle: !1,
			perRowKey: "items_per_row",
			perRowLabel: "Items per row",
			defaultPerRow: 1
		}) : this._config?.layout === "tabs" ? D`
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
		return D`
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
		let { itemsPerRow: n, shouldWrapTabs: r } = Vu({
			config: this._config,
			itemCount: e.length,
			wrapEnabled: this._config?.layout === "wrap",
			defaultPerRow: 1
		});
		return D`
      <div
        class="action-tabs ${r ? "wrapped" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${r ? `--action-tabs-per-row: ${n};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => D`
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

          ${e.length > 0 && t < e.length ? D`
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
		return zp.call(this);
	}
	_renderChildPicker(e, t) {
		return Bp.call(this, e, t);
	}
	_renderBadgePicker(e, t) {
		return Vp.call(this, e, t);
	}
	_renderCardPicker(e, t) {
		return Hp.call(this, e, t);
	}
	_renderDeckStyleControls(e, t) {
		return Up.call(this, e, t);
	}
	_renderAttributeSelector(e, { label: t, selector: n, value: r, changeKey: i }) {
		return D`
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
		return ca.call(this, t, r, {
			value: n ?? "",
			min: i,
			onValueChanged: (t) => this._updateDeckAttributes(e, { [r]: t === "" || t === null ? void 0 : t })
		});
	}
	_renderDeckCardSection(e, t) {
		return D`
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
          ${Np(t, this.hass, this._t("Card"))}
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
		let n = t?.attributes || {};
		return uo.call(this, {
			expanded: !1,
			config: n,
			onChange: (t) => this._updateDeckAttributes(e, t),
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior"
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior"
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior"
				}
			],
			context: { entity_id: n.entity || Mp(t)?.entity }
		});
	}
	async _ensureNativeBadgePicker() {
		return Pp.call(this);
	}
	async _ensureNativeBadgeEditor() {
		return Fp.call(this);
	}
	async _loadNativeBadgeModule(e) {
		return Ip.call(this, e);
	}
	_findElementInShadowRoots(e, t) {
		return Lp.call(this, e, t);
	}
	async _ensureNativeCardPicker() {
		return Rp.call(this);
	}
	_renderCard() {
		let e = this._getDeckItems(), t = Math.min(this._selectedDeckIndex || 0, e.length), n = e[t], r = t === e.length;
		return D`
      <div class="section">
        ${this._renderDeckTabs(e, t)}

        ${n || r ? D`
              ${n && this._config?.layout === "tabs" ? D`
                    <label class="deck-default-toggle">
                      <span>${this._t("Default")}</span>
                      <ha-switch
                        .checked=${!!n.attributes?.default}
                        @change=${(e) => this._setDefaultDeck(t, e.target.checked)}
                      ></ha-switch>
                    </label>
                  ` : ""}

              ${n ? this._renderDeckStyleControls(t, n) : ""}

              ${n ? D`
                    <div class="deck-interactions-section">
                      ${this._renderDeckInteractions(t, n)}
                    </div>
                  ` : ""}

              ${this._renderDeckCardSection(t, n)}
            ` : D`<div class="deck-empty-editor">${this._t("Add a card to start.")}</div>`}
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
		return D`
      <div class="wrapper">
        ${this._renderSubTabs()}
        ${this._selectedTab === "setup" ? this._renderSetup() : this._renderCard()}

        <div class="editor-version">
          ${this._t("Orbit Deck Card (Dev) v{version}", { version: t.deck })}
        </div>
      </div>
    `;
	}
	static styles = Wp;
};
customElements.get("orbit-deck-card-dev-editor") || customElements.define("orbit-deck-card-dev-editor", Kp);
//#endregion
//#region src/cards/deck-card.js
var qp = [
	"pointerdown",
	"click",
	"dblclick",
	"pointerup",
	"pointerleave",
	"pointercancel"
], Jp = class extends ot(A) {
	static get properties() {
		return {
			hass: {},
			preview: { type: Boolean },
			_config: { type: Object },
			_deckCards: { state: !0 },
			_selectedIndex: { state: !0 },
			_templateRevision: { state: !0 }
		};
	}
	constructor() {
		super(), this._config = {}, this.preview = !1, this._deckCards = [], this._selectedIndex = 0, this._cardHelpers = null, this._cardBuildKey = "", this._defaultSelectionKey = "", this._paddingApplyKey = "", this._overlayGeometryFrame = null, this._overlayGeometryObserver = null, this._overlayObservedTargets = /* @__PURE__ */ new Set(), this._overlayGeometryToken = 0, this._deckEntryGeneration = 0, this._deckInteractionListener = (e) => this._handleDeckInteractionEvent(e);
	}
	connectedCallback() {
		super.connectedCallback(), this._bindDeckItemActionListeners(), this._paddingApplyKey = "", this.requestUpdate();
	}
	disconnectedCallback() {
		vt.call(this), this._cancelLongPress(), this._clearDoubleTapTimer(), this._clearOverlayGeometryObserver(), this._disconnectDeckEntryObservers(), this._unbindDeckItemActionListeners(), super.disconnectedCallback();
	}
	willUpdate(e) {
		(e.has("_config") || e.has("hass")) && _t.call(this, Tt(this._config));
	}
	static getConfigElement() {
		return document.createElement("orbit-deck-card-dev-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-deck-card-dev",
			layout: "wrap",
			decks: []
		};
	}
	getLayoutOptions() {
		let e = Bf(this._config), t = Math.max(e.length, 1), n = this._getColumnCount(t);
		return {
			grid_columns: Math.max(1, n * 2),
			grid_min_columns: 1,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		let t = mn(e || {}), n = ["tabs", "overlay"].includes(t.config?.layout) ? t.config.layout : "wrap";
		this._config = {
			...t.config,
			layout: n
		};
		let r = Bf(this._config), i = Xf(r), a = Yf(r);
		Number.isInteger(e?.[Gp]) ? this._selectedIndex = Math.min(Math.max(0, e[Gp]), Math.max(0, r.length - 1)) : i === this._defaultSelectionKey ? this._selectedIndex = Math.min(this._selectedIndex || 0, Math.max(0, r.length - 1)) : (this._selectedIndex = a, this._defaultSelectionKey = i), this._scheduleCardBuild();
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
		let o = n.item?.attributes || {}, s = Gf(n.item) === "badge", c = $f(o.width), l = $f(o.height), u = ep(n.item) === "crop", d = tp(i, a, c, l, u);
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
		let e = Bf(this._config), t = JSON.stringify(e.map((e, t) => ({
			kind: Gf(e),
			config: Wf(e, lp(this._config, e, t))
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
		let n = await this._loadCardHelpers(), r = e.map((e, t) => this._createDeckEntry(e, n, t, lp(this._config, e, t)));
		t === this._cardBuildKey && (this._deckCards = r);
	}
	async _loadCardHelpers() {
		return !this._cardHelpers && window.loadCardHelpers && (this._cardHelpers = await window.loadCardHelpers()), this._cardHelpers;
	}
	_createDeckEntry(e, t, n, r = !1) {
		let i = Gf(e), a = Wf(e, r);
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
			t && new Set([t, ...hp(t)]).forEach((e) => {
				mp(e), xp(e);
			});
		});
	}
	_isDeckEntryActive(e, t) {
		return this.isConnected && t === this._deckEntryGeneration && this._deckCards.includes(e);
	}
	_selectTab(e) {
		this._selectedIndex = e;
	}
	_getDeckEntryFromEventTarget(e) {
		let t = Number(e?.dataset?.deckIndex);
		return Number.isInteger(t) && this._deckCards[t] || null;
	}
	_bindDeckItemActionListeners() {
		qp.forEach((e) => {
			this.renderRoot.addEventListener(e, this._deckInteractionListener, !0);
		});
	}
	_unbindDeckItemActionListeners() {
		qp.forEach((e) => {
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
		if (!Vf(t?.item)) return;
		e.stopPropagation();
		let n = Hf(t?.item, "hold_action");
		if (j(n)) return this._startLongPress(e, Uf(t.item), n);
	}
	_handleDeckItemClick(e, t) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		let n = Hf(t?.item, "tap_action"), r = Hf(t?.item, "double_tap_action");
		!j(n) && !j(r) || N.call(this, e, Uf(t.item), n || { action: "none" }, r);
	}
	_handleDeckItemDoubleClick(e, t) {
		let n = Hf(t?.item, "double_tap_action");
		j(n) && P.call(this, e, Uf(t.item), n);
	}
	_renderInteractiveDeckEntry(e) {
		let t = Vf(e?.item), n = lp(this._config, e?.item, e?.index), r = this._config?.[Gp], i = Bu(this) && Number.isInteger(r) && r === e?.index;
		return D`
      <div
        class="deck-item-interaction ${t ? "has-actions" : ""} ${n ? "transparent-background" : ""} ${i ? "orbit-editor-preview-selected" : ""}"
        data-deck-index=${e?.index ?? ""}
      >
        ${this._renderDeckEntry(e)}
      </div>
    `;
	}
	_renderDeckEntry(e) {
		return e?.element ? e.element : D`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">${this._t("Configuration error")}</div>
        <div>${e?.error || "No card configured"}</div>
      </ha-card>
    `;
	}
	_applyDeckPaddingToEntries() {
		let e = this._deckCards.map((e) => lp(this._config, e.item, e.index) ? "flat" : "native").join(":"), t = `${sp(this._deckCards)}|surface:${e}`;
		t !== this._paddingApplyKey && (this._paddingApplyKey = t, this._deckCards.forEach((e) => this._applyDeckCardPadding(e)));
	}
	_applyDeckCardPadding(e, t = 0) {
		let n = e?.element;
		if (!n) return;
		let r = this._deckEntryGeneration, i = Nf(e.item), a = If(e.item);
		(n.updateComplete instanceof Promise ? n.updateComplete : Promise.resolve()).then(() => new Promise((e) => requestAnimationFrame(e))).then(() => {
			if (!this._isDeckEntryActive(e, r)) return;
			let o = hp(n), s = o[0] || null, c = cp(this.renderRoot, e.index), l = lp(this._config, e.item, e.index);
			if (!(!s && !c)) {
				if ((a || l) && !s && t < 10 && window.setTimeout(() => this._applyDeckCardPadding(e, t + 1), 50), dp(n, l), o.forEach((e) => dp(e, l)), !a && !s?._orbitDeckPaddingApplied && !c?._orbitDeckPaddingApplied) {
					s && xp(s);
					return;
				}
				c && _p(c, i, !1), s && _p(s, i, a), a && s ? (bp(s, i), requestAnimationFrame(() => {
					this._isDeckEntryActive(e, r) && (c && _p(c, i, !1), _p(s, i, !0));
				})) : s && xp(s);
			}
		}).catch(() => {});
	}
	_renderWrap(e) {
		let t = this._getVisibleDeckEntries(), n = this._deckCards.filter((e) => e.visible === !1), r = this._getColumnCount(t.length || 1), i = ap(t, r);
		return D`
      <ha-card
        class="deck-card wrap ${e.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
        style="--deck-columns:${r};"
      >
        <div class="deck-wrap">
          ${i.map((e) => D`
            <div class="deck-row">
              ${e.map((e) => {
			let t = Bu(this) && this._config?.[Gp] === e.index ? Yp(e, r) : "";
			return D`
                  <div
                    class="deck-item ${t ? "orbit-editor-preview-resized" : ""}"
                    style=${t ? `--orbit-editor-preview-width:${t};` : ""}
                  >
                    ${this._renderInteractiveDeckEntry(e)}
                  </div>
                `;
		})}
              ${op(e.length, r)}
            </div>
          `)}
        </div>
        ${this._renderVisibilityObservers(n)}
      </ha-card>
    `;
	}
	_renderTabs(e) {
		let t = Math.min(this._selectedIndex || 0, Math.max(0, e.length - 1)), n = this._getVisibleDeckEntries(), r = n.find((e) => e.index === t) || n[0], i = r?.index ?? t, a = this._deckCards.filter((e) => e !== r), o = np(this._config), s = rp.call(this, this._config);
		return D`
      <ha-card
        class="deck-card tabs tab-width-${o} ${this._config?.tab_divider === !1 ? "hide-tab-dividers" : ""}"
        style=${s}
      >
        <div class="deck-tabs" role="tablist">
          ${n.map((e) => D`
            <button
              type="button"
              class="deck-tab ${e.index === i ? "active" : ""}"
              role="tab"
              aria-selected=${e.index === i ? "true" : "false"}
              style=${o === "custom" ? `--orbit-deck-tab-width:${e.item.attributes?.width || "120px"};` : ""}
              @click=${() => this._selectTab(e.index)}
            >
              ${e.item.attributes?.icon ? D`<ha-icon .icon=${e.item.attributes.icon}></ha-icon>` : ""}
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
		return e.length ? D`
      <div class="deck-visibility-observers" aria-hidden="true">
        ${e.map((e) => this._renderDeckEntry(e))}
      </div>
    ` : "";
	}
	_renderOverlay() {
		let e = this._deckCards[0], t = this._deckCards.slice(1);
		return D`
      <ha-card class="deck-card overlay">
        <div class="deck-overlay">
          <div class="deck-overlay-main deck-item">
            ${this._renderInteractiveDeckEntry(e)}
          </div>

          ${t.map((e, t) => D`
            <div
              class="deck-overlay-item deck-item ${ep(e.item)} ${e.item?.attributes?.transparent_background === !0 ? "transparent-background" : ""} overlay-${e.kind || Gf(e.item)}"
              data-deck-index=${e.index}
              style=${Zf(e.item, t)}
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
	_t(e, t) {
		return V(this.hass, e, t);
	}
	render() {
		let e = Bf(this._config);
		return e.length ? this._config?.layout === "tabs" ? this._renderTabs(e) : this._config?.layout === "overlay" ? this._renderOverlay() : this._renderWrap(e) : D`
        <ha-card class="deck-card empty">
          <div class="deck-empty-preview">
            <div class="deck-empty-illustration" aria-hidden="true">
              <span class="deck-empty-tile deck-empty-tile-main">
                <span class="deck-empty-orbit"></span>
                <span class="deck-empty-line"></span>
                <span class="deck-empty-line short"></span>
              </span>
              <span class="deck-empty-tile deck-empty-tile-top">
                <span class="deck-empty-dot"></span>
                <span class="deck-empty-line"></span>
              </span>
              <span class="deck-empty-tile deck-empty-tile-bottom">
                <span class="deck-empty-dot"></span>
                <span class="deck-empty-line short"></span>
              </span>
            </div>
            <div class="deck-empty-copy">
              <div class="deck-empty-title">${this._t("Add card")}</div>
              <div class="deck-empty-modes">
                ${this._t("Wrap")} · ${this._t("Tabs")} ·
                ${this._t("Overlay")}
              </div>
            </div>
          </div>
        </ha-card>
      `;
	}
	static styles = Sp;
};
function Yp(e, t) {
	let n = Wf(e?.item)?.grid_options?.columns, r = n === "full" ? 12 : Number(n);
	if (!Number.isFinite(r) || r <= 0) try {
		r = Number(e?.element?.getLayoutOptions?.()?.grid_columns);
	} catch {
		r = 0;
	}
	(!Number.isFinite(r) || r <= 0) && (r = 6);
	let i = Math.min(12, Math.max(1, r)) / 12 * 100;
	return i > 100 / Math.max(1, Number(t) || 1) + .01 ? `${i}%` : "";
}
un({
	tag: "orbit-deck-card-dev",
	cardClass: Jp,
	name: "Orbit Deck Card (Dev)",
	description: "Wrap or tab any Lovelace cards",
	version: t.deck
});
//#endregion
//#region src/common/helpers/badge-registration.js
function Xp({ tag: e, badgeClass: t, name: n, description: r, version: a, documentationURL: o }) {
	customElements.get(e) || customElements.define(e, t), window.customBadges = window.customBadges || [];
	for (let t = window.customBadges.length - 1; t >= 0; --t) window.customBadges[t].type === e && window.customBadges.splice(t, 1);
	window.customBadges.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		documentationURL: o || sn(e)
	}), i(n, a);
}
//#endregion
//#region src/badges/helpers/model.js
function Zp() {
	let e = Z(this._config), t = this._getEntities(), n = Hc(t, this._config), r = e === "template" ? I.call(this, this._config?.state_template, "") ?? "unavailable" : "", i = this._config?.active_template?.trim() || "", a = e === "template" && i ? I.call(this, i, "") : null, o = this._config?.inactive_template?.trim() || "", s = e === "template" && o ? I.call(this, o, "") : null, c = t[0]?.entity_id?.split(".")[0] || this._config?.domain || "", l = !!o && bt(s, c), u = e === "template" ? bt(a ?? r, c) : n.length > 0, d = this._config?.display_style === "badge" && !this._config?.card_visibility ? !0 : u, f = t[0], p = Q(this._config), m = p[0] || "", h = e === "area_count" && this._config?.domain === "unavailable" ? yc : f?.entity_id.split(".")[0] || this._config?.domain || "", g = Y(h), _ = this._config?.icon_source || (this._config?.icon ? "custom" : "domain"), v = Hn.call(this, this._config?.icon, f?.entity_id || ""), ee = _ === "template" ? v : d ? this._config?.icon_on || v : this._config?.icon_off || v, y = ["custom", "template"].includes(_) && ee || g.icon, te = this._config?.color_source === "template" ? this._config?.color : d ? this._config?.color_on ?? (this._config?.color_source ? void 0 : this._config?.color) : this._config?.color_off, b = L.call(this, te), x = !!(b && ![
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(b)), S = !b || [
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(b) ? "theme" : b, ne = e === "template" && this._config?.name_template?.trim() || "", re = ne ? I.call(this, ne, "") : null, ie = String(re ?? "").trim(), C = e === "template" && !f ? {
		entity_id: "sensor.orbit_status_badge_template",
		state: r || "unavailable",
		attributes: { friendly_name: ie || "Template" }
	} : n[0] || t[0] || {
		entity_id: `${h || "sensor"}.orbit_status_badge`,
		state: d ? "on" : "off",
		attributes: m ? { device_class: m } : {}
	}, ae = ["entity", "template"].includes(e) ? C : {
		entity_id: `${h}.orbit_status_badge`,
		state: C.state,
		attributes: m ? { device_class: m } : {}
	}, oe = ae.entity_id?.startsWith("sensor.") ? !1 : d, w = $c(this.hass, this._config), se = this._config?.name, ce = p.map((e) => Nc(e)).join(", "), T = f && this.hass?.formatEntityName ? this.hass.formatEntityName(f) : "", le = e === "area_count" && this._config?.domain === "unavailable" ? V(this.hass, g.label) : T || (e === "template" ? "Template" : w || ce || g.label), ue = se && this.hass?.formatEntityName && this.hass.formatEntityName(C, Qp(se, ie)) || le, E = _ === "custom" ? d && this._config?.icon_on ? "icon_on" : !d && this._config?.icon_off ? "icon_off" : this._config?.icon ? "icon" : "" : _ === "template" && v ? "icon" : "";
	return {
		entities: t,
		activeEntities: n,
		isOn: d,
		inactiveTemplateActive: l,
		count: n.length,
		displayValue: e === "template" ? xt(r, this.hass, c) : e === "entity" ? C.state : n.length,
		label: ue,
		icon: y,
		iconKey: E,
		iconSource: _,
		useStaticIcon: _ === "domain" && g.staticIcon,
		stateSource: e,
		representativeStateObj: C,
		iconStateObj: ae,
		displayStateObj: ["entity", "template"].includes(e) ? C : {
			entity_id: "sensor.orbit_status_badge_count",
			state: d ? "on" : "off",
			attributes: {
				count: n.length,
				friendly_name: ue
			},
			last_changed: C.last_changed,
			last_updated: C.last_updated,
			context: C.context
		},
		defaultStateContent: e === "area_count" ? "count" : "state",
		hasIconColorOverride: x,
		iconColor: S === "theme" ? tl(ae, oe) : It.call(this, S)
	};
}
function Qp(e, t) {
	let n = (e) => e?.type === "template" ? {
		type: "text",
		text: t
	} : e;
	return Array.isArray(e) ? e.map(n) : n(e);
}
//#endregion
//#region src/badges/styles/status-badge-styles.js
var $p = d`
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

`, em = "sensor.orbit_status_badge_preview", tm = class extends A {
	static svgCache = B;
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
		_templateRevision: { state: !0 },
		_deviceClassRevision: { state: !0 }
	};
	constructor() {
		super(), this._config = {}, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._contentExpanded = !1, this._stateTypeExpanded = !1, this._deviceClassRevision = 0, this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts = 0;
	}
	connectedCallback() {
		super.connectedCallback(), Yo(this), cn(this, "orbit-status-badge-dev"), queueMicrotask(() => this._syncTemplateSubscriptions());
	}
	disconnectedCallback() {
		this._namePickerEnhanceFrame !== void 0 && (cancelAnimationFrame(this._namePickerEnhanceFrame), this._namePickerEnhanceFrame = void 0), vt.call(this), Xo(this), super.disconnectedCallback();
	}
	updated(e) {
		(e.has("hass") || e.has("_config")) && (this._syncTemplateSubscriptions(), this._namePickerEnhanceAttempts = 0), e.has("hass") && this._loadDeviceClasses(), this._scheduleNamePickerEnhancement();
	}
	_loadDeviceClasses() {
		let e = this.hass?.connection;
		!e || e === this._deviceClassConnection || (this._deviceClassConnection = e, Dc(this.hass).then(() => {
			this._deviceClassConnection === e && (this._deviceClassRevision += 1);
		}));
	}
	_scheduleNamePickerEnhancement() {
		Z(this._config) !== "template" || this._namePickerEnhanceFrame !== void 0 || (this._namePickerEnhanceFrame = requestAnimationFrame(() => {
			this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts += 1, this._enhanceNamePicker();
		}));
	}
	_syncTemplateSubscriptions() {
		let e = Z(this._config), t = [
			this._config?.state_template,
			this._config?.active_template,
			this._config?.inactive_template,
			this._config?.name_template
		], n = this._config?.display_style === "badge", r = [
			...(e === "template" ? n ? [this._config?.active_template, this._config?.inactive_template] : t : []).filter(Boolean).map((e) => ({
				template: e,
				entityId: ""
			})),
			...Tt(this._config),
			...Et(this._config)
		];
		_t.call(this, r);
	}
	_enhanceNamePicker() {
		let e = this.shadowRoot?.querySelector(".status-badge-name-selector"), t = sm(e, "ha-entity-name-picker");
		if (!t) {
			this._namePickerEnhanceAttempts < 10 && this._scheduleNamePickerEnhancement();
			return;
		}
		if (this._namePickerEnhanceAttempts = 0, t.__orbitTemplateNameEnhanced) return;
		let n = t._getFilteredItems, r = t._validTypes, i = t._formatItem, a = t._pickerValueChanged;
		typeof n != "function" || typeof r != "function" || typeof i != "function" || typeof a != "function" || (t.__orbitTemplateNameEnhanced = !0, t._validTypes = (e) => new Set([...r.call(t, e), "template"]), t._formatItem = (e) => e?.type === "template" ? this._t("Template") : i.call(t, e), t._getFilteredItems = () => {
			let e = n.call(t), r = om(t.value), i = t._editIndex != null && r[t._editIndex]?.type === "template";
			if (!r.some((e) => e?.type === "template") || i) {
				let t = String(I.call(this, this._config?.name_template, "") ?? "").trim(), n = this._t("Template"), r = t || this._t("Not configured");
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
			let n = om(t.value), r = { type: "template" };
			t._editIndex == null ? n.push(r) : (n[t._editIndex] = r, t._editIndex = void 0), t._setValue(n), t._picker && (t._picker.value = void 0);
		}, t.requestUpdate());
	}
	setConfig(e) {
		let { config: t, migrated: n } = pn(e || {}), r = Mc(t);
		this._config = am(r), n && queueMicrotask(() => this._dispatchConfigChanged(this._config));
	}
	_t(e, t) {
		return V(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = am(Mc(la(this._config, e))), this._dispatchConfigChanged(this._config);
	}
	_dispatchConfigChanged(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleConfigUpdate(e, t) {
		let n = ["color_on", "color_off"].includes(e) && (!t || t === "theme");
		this._updateConfig({ [e]: n || t === "" ? void 0 : t });
	}
	_renderColor(e, t, n) {
		return _a.call(this, e, t, n);
	}
	_renderColorPair(e) {
		return ya.call(this, e);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return Ai.call(this, e, t, n);
	}
	_getColorStyle(e) {
		return Qo(e);
	}
	_getColorPickerValue(e) {
		return $o(e);
	}
	_loadLocalIconFiles(e = "") {
		return Ni.call(this, e);
	}
	_isImageIcon(e) {
		return Oi(e);
	}
	_resolveIconPath(e) {
		return ki(e);
	}
	_getInlineSvg(e) {
		return z.call(this, e, { forceColor: !0 });
	}
	_getDeviceClassOptions() {
		return qc(this.hass, this._config);
	}
	_getStateContentHass() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), t = $c(this.hass, this._config), n = this._config?.name_template?.trim() || "", r = {
			entity_id: em,
			state: "on",
			attributes: {
				count: 2,
				friendly_name: (Z(this._config) === "template" ? String(I.call(this, n, "") ?? "").trim() : "") || t || "Orbit status"
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
				[em]: {
					entity_id: em,
					platform: "orbit",
					area_id: Qc(this._config)[0] || null,
					device_id: null
				}
			},
			states: {
				...this.hass?.states || {},
				[em]: r
			}
		};
	}
	render() {
		let e = this._config?.display_style === "badge", n = this._getDeviceClassOptions(), r = bc.find((e) => e.value === this._config?.domain), i = [
			...this._config?.show_name === !0 ? ["name"] : [],
			...this._config?.show_state === !1 ? [] : ["state"],
			...this._config?.show_icon === !1 ? [] : ["icon"]
		], a = Z(this._config), o = this._config?.entity || "", s = a === "entity" && o ? this.hass : this._getStateContentHass(), c = a === "entity" && o ? o : em;
		return D`
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
              ${Wu.call(this, {
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
              ${e ? this._renderColor(["Background", "Color"], "card_color", "primary-color") : D`
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

              ${this._renderColorPair({
			label: "Color",
			onKey: "color_on",
			offKey: "color_off",
			onPreviewValue: e ? "white" : "theme",
			offPreviewValue: e ? "white" : "theme"
		})}

              ${Uu.call(this, a)}

              ${e ? "" : D`
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
                    ${a === "template" ? "" : D`
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

          ${uo.call(this, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: a === "entity" ? "more-info" : a === "area_count" ? q : "none",
					customActions: [J],
					defaultVisible: !0,
					customDefaultLabel: a === "area_count" ? q : void 0
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: "none",
					customActions: [J]
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: "none",
					customActions: [J]
				}
			],
			context: {
				entity_id: this._config?.entity,
				area_id: this._config?.area
			}
		})}
        </div>

        <div class="editor-version">
          ${this._t("Orbit Status Badge (Dev) v{version}", { version: t.statusBadge })}
        </div>
      </div>
    `;
	}
	static styles = [...ec, d`
      .content-panel,
      .state-type-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .content-panel > [slot="header"],
      .state-type-panel > [slot="header"] {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content-panel ha-icon,
      .state-type-panel ha-icon {
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
    `];
}, nm = [
	"state_source",
	"entity",
	"area",
	"domain",
	"device_class",
	"threshold",
	"thresholds",
	"hide",
	"active_template",
	"inactive_template",
	"name_template",
	"state_template"
], rm = [
	"card_color",
	"name",
	"color_source",
	"color",
	"color_on",
	"color_off",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override",
	"show_name",
	"show_state",
	"show_icon",
	"show_entity_picture",
	"state_content"
], im = [
	"tap_action",
	"hold_action",
	"double_tap_action"
];
function am(e = {}) {
	let t = e.display_style === "badge" ? [
		"type",
		"display_style",
		"entity",
		"card_visibility",
		...nm.filter((e) => e !== "entity"),
		...rm,
		...im,
		"grid_options",
		"view_layout"
	] : [
		"type",
		"display_style",
		...nm,
		...rm,
		...im,
		"grid_options",
		"view_layout"
	], n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
customElements.get("orbit-status-badge-dev-editor") || customElements.define("orbit-status-badge-dev-editor", tm);
function om(e) {
	return e ? typeof e == "string" ? [{
		type: "text",
		text: e
	}] : Array.isArray(e) ? [...e] : [e] : [];
}
function sm(e, t) {
	if (!e) return;
	if (e.matches?.(t)) return e;
	let n = e.shadowRoot?.querySelector(t);
	if (n) return n;
	for (let n of e.shadowRoot?.querySelectorAll("*") || []) {
		let e = sm(n, t);
		if (e) return e;
	}
}
Xp({
	tag: "orbit-status-badge-dev",
	badgeClass: class extends A {
		static svgCache = B;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_isHeadingBadge: { state: !0 },
			_templateRevision: { state: !0 },
			...ol,
			...Gl
		};
		constructor() {
			super(), sl.call(this), Kl.call(this);
		}
		static getConfigElement() {
			return document.createElement("orbit-status-badge-dev-editor");
		}
		static getStubConfig() {
			return {};
		}
		setConfig(e) {
			Oc(e || {}), this._config = Mc(e || {});
		}
		_t(e, t) {
			return V(this.hass, e, t);
		}
		connectedCallback() {
			super.connectedCallback(), this._isHeadingBadge = !!this.closest("hui-heading-badge"), this.toggleAttribute("heading-badge", this._isHeadingBadge), queueMicrotask(() => this._syncTemplateSubscriptions());
		}
		disconnectedCallback() {
			vt.call(this), ul.call(this), this._clearDoubleTapTimer(), this._cancelLongPress(), super.disconnectedCallback();
		}
		updated(e) {
			(e.has("hass") || e.has("_config")) && (this._syncTemplateSubscriptions(), this._syncCurrentActivityEntities());
		}
		_syncCurrentActivityEntities() {
			if (!this._currentActivityOpen) return;
			let e = this._getModel();
			Yl.call(this, e.activeEntities.map((e) => e.entity_id), e.entities.map((e) => e.entity_id));
		}
		shouldUpdate(e) {
			if (dl.call(this, e) || !e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass")) return !0;
			let t = e.get("hass"), n = this.hass;
			if (!t || !n || t.entities !== n.entities || t.devices !== n.devices || t.areas !== n.areas) return !0;
			let r = Z(this._config);
			return r === "template" ? !0 : (r === "area_count" ? el(this.hass, this._config) : [this._config?.entity].filter(Boolean)).some((e) => t.states?.[e] !== n.states?.[e]);
		}
		_syncTemplateSubscriptions() {
			let e = Z(this._config), t = this._config?.state_template?.trim() || "", n = this._config?.active_template?.trim() || "", r = this._config?.inactive_template?.trim() || "", i = this._config?.name_template?.trim() || "", a = this._config?.display_style === "badge", o = (e === "template" ? a ? [n, r] : [
				t,
				n,
				r,
				i
			] : []).filter(Boolean).map((e) => ({
				template: e,
				entityId: ""
			}));
			_t.call(this, [
				...o,
				...Tt(this._config),
				...Et(this._config)
			]);
		}
		_getEntities() {
			return Zc(this.hass, this._config);
		}
		_getModel() {
			return Zp.call(this);
		}
		_handleAction(e, t = null) {
			if (e?.action === "Current state") {
				$l.call(this), cl.call(this);
				return;
			}
			if (e?.action === "current-activity") {
				pl.call(this);
				let e = this._getModel(), t = e.activeEntities.map((e) => e.entity_id), n = Z(this._config) === "area_count", r = n ? e.entities.map((e) => e.entity_id) : t, i = Fc(this.hass, this._config);
				ql.call(this, t, r, n, i);
				return;
			}
			return Ve.call(this, e, t);
		}
		_navigate(e) {
			return Ge(e);
		}
		_clearDoubleTapTimer() {
			return He.call(this);
		}
		_cancelLongPress() {
			return it.call(this);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handlePointerDown(e, t) {
			if (j(this._config?.hold_action)) return rt.call(this, e, t, this._config?.hold_action);
		}
		_handlePointerEnd(e) {
			return at.call(this, e);
		}
		_handleTap(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = wc(this._config);
			return N.call(this, e, t, this._config?.tap_action || n, this._config?.double_tap_action);
		}
		_handleDoubleTap(e, t) {
			return P.call(this, e, t, this._config?.double_tap_action);
		}
		_renderIcon(e) {
			let t = this._config?.display_style === "badge", n = t ? "width:12px;height:12px;margin:0;" : "", r = t ? "width:16px;height:16px;margin:0;border-radius:var(--ha-border-radius-md);" : "", i = e.stateSource === "entity" && this._config?.show_entity_picture ? e.representativeStateObj.attributes?.entity_picture_local || e.representativeStateObj.attributes?.entity_picture : "";
			if (i) return D`
        <img
          class="entity-picture"
          slot="icon"
          src=${this.hass?.hassUrl ? this.hass.hassUrl(i) : i}
          alt=""
          style=${r}
        />
      `;
			if (!Gn(e.icon)) return D`
        <ha-state-icon
          slot="icon"
          .icon=${e.iconSource === "custom" || e.useStaticIcon ? e.icon : void 0}
          .stateObj=${e.iconSource === "custom" ? e.representativeStateObj : e.iconStateObj}
        ></ha-state-icon>
      `;
			if (Gn(e.icon)) {
				let t = Kn(e.icon), r = e.iconKey ? qn(this._config, e.iconKey) : !0;
				if (t.toLowerCase().split("?")[0].endsWith(".svg")) {
					let e = z.call(this, t, { forceColor: r });
					return e ? D`<span slot="icon" class="image-icon">${H(e)}</span>` : D`<img
              slot="icon"
              src=${t}
              alt=""
              style=${n}
            />`;
				}
				return D`<img
        slot="icon"
        src=${t}
        alt=""
        style=${n}
      />`;
			}
			return "";
		}
		_renderActiveEntitiesDialog(e) {
			return Hl.call(this, e.activeEntities, this._config);
		}
		render() {
			let e = this._getModel(), t = e.activeEntities[0]?.entity_id || e.entities[0]?.entity_id || null, n = j(this._config?.tap_action || wc(this._config)) || j(this._config?.hold_action) || j(this._config?.double_tap_action), r = this._config?.display_style === "badge", i = this._config?.card_visibility || "always", a = i === "always" || i === "state" && e.isOn || i === "template" && (e.isOn || e.inactiveTemplateActive), o = !r && this._config?.show_state !== !1, s = !r && this._config?.show_name === !0, c = r || this._config?.show_icon !== !1, l = this._config?.card_color ? It.call(this, this._config.card_color) : "var(--primary-color)", u = `--badge-color:${e.iconColor};`, d = [
				`--tile-badge-background-color:${l}`,
				`--tile-badge-icon-color:${e.hasIconColorOverride ? e.iconColor : "var(--white-color, #fff)"}`,
				"--mdc-icon-size:12px"
			].join(";"), f = D`
      ${c ? this._renderIcon(e) : ""}
      ${o ? e.stateSource === "template" ? D`<span class="template-state">${e.displayValue}</span>` : D`
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
			}, m = this._renderActiveEntitiesDialog(e), h = ou.call(this);
			return r && !a ? k : r ? D`
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
        ${h}
      ` : D`${this._isHeadingBadge ? D`
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
        ` : D`
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
        `}${m}${h}`;
		}
		static styles = [
			$p,
			Qd,
			$d
		];
	},
	name: "Orbit Status Badge (Dev)",
	description: "Displays an entity, area count, or template state",
	version: t.statusBadge
}), console.info("Orbit Cards development namespace active (-dev)"), i("Orbit Cards", e);
//#endregion
