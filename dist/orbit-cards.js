//#region \0rolldown/runtime.js
var e = (e, t) => () => (e && (t = e(e = 0)), t), t = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), n, r, i, a, o, s, c, l, u, d = e((() => {
	n = globalThis, r = n.ShadowRoot && (n.ShadyCSS === void 0 || n.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, i = Symbol(), a = /* @__PURE__ */ new WeakMap(), o = class {
		constructor(e, t, n) {
			if (this._$cssResult$ = !0, n !== i) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = e, this.t = t;
		}
		get styleSheet() {
			let e = this.o, t = this.t;
			if (r && e === void 0) {
				let n = t !== void 0 && t.length === 1;
				n && (e = a.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && a.set(t, e));
			}
			return e;
		}
		toString() {
			return this.cssText;
		}
	}, s = (e) => new o(typeof e == "string" ? e : e + "", void 0, i), c = (e, ...t) => new o(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
		if (!0 === e._$cssResult$) return e.cssText;
		if (typeof e == "number") return e;
		throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
	})(n) + e[r + 1], e[0]), e, i), l = (e, t) => {
		if (r) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		else for (let r of t) {
			let t = document.createElement("style"), i = n.litNonce;
			i !== void 0 && t.setAttribute("nonce", i), t.textContent = r.cssText, e.appendChild(t);
		}
	}, u = r ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
		let t = "";
		for (let n of e.cssRules) t += n.cssText;
		return s(t);
	})(e) : e;
})), f, p, m, ee, h, te, ne, re, ie, ae, oe, se, ce, le, g, ue = e((() => {
	d(), {is: f, defineProperty: p, getOwnPropertyDescriptor: m, getOwnPropertyNames: ee, getOwnPropertySymbols: h, getPrototypeOf: te} = Object, ne = globalThis, re = ne.trustedTypes, ie = re ? re.emptyScript : "", ae = ne.reactiveElementPolyfillSupport, oe = (e, t) => e, se = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? ie : null;
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
	}, ce = (e, t) => !f(e, t), le = {
		attribute: !0,
		type: String,
		converter: se,
		reflect: !1,
		useDefault: !1,
		hasChanged: ce
	}, Symbol.metadata ??= Symbol("metadata"), ne.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), g = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ??= []).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = le) {
			if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
				let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
				r !== void 0 && p(this.prototype, e, r);
			}
		}
		static getPropertyDescriptor(e, t, n) {
			let { get: r, set: i } = m(this.prototype, e) ?? {
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
			return this.elementProperties.get(e) ?? le;
		}
		static _$Ei() {
			if (this.hasOwnProperty(oe("elementProperties"))) return;
			let e = te(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(oe("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(oe("properties"))) {
				let e = this.properties, t = [...ee(e), ...h(e)];
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
				for (let e of n) t.unshift(u(e));
			} else e !== void 0 && t.push(u(e));
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
			return l(e, this.constructor.elementStyles), e;
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
				let i = (n.converter?.toAttribute === void 0 ? se : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? se : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n, r = !1, i) {
			if (e !== void 0) {
				let a = this.constructor;
				if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ce)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
	}, g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[oe("elementProperties")] = /* @__PURE__ */ new Map(), g[oe("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: g }), (ne.reactiveElementVersions ??= []).push("2.1.2");
}));
//#endregion
//#region node_modules/lit-html/lit-html.js
function de(e, t) {
	if (!ye(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return he === void 0 ? t : he.createHTML(t);
}
function _(e, t, n = e, r) {
	if (t === T) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = x(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = _(e, i._$AS(e, t.values), i, r)), t;
}
var fe, pe, me, he, ge, v, _e, ve, y, b, x, ye, be, xe, S, Se, Ce, C, we, Te, Ee, De, w, T, E, Oe, D, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve = e((() => {
	fe = globalThis, pe = (e) => e, me = fe.trustedTypes, he = me ? me.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ge = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + v, ve = `<${_e}>`, y = document, b = () => y.createComment(""), x = (e) => e === null || typeof e != "object" && typeof e != "function", ye = Array.isArray, be = (e) => ye(e) || typeof e?.[Symbol.iterator] == "function", xe = "[ 	\n\f\r]", S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Se = /-->/g, Ce = />/g, C = RegExp(`>|${xe}(?:([^\\s"'>=/]+)(${xe}*=${xe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, Te = /"/g, Ee = /^(?:script|style|textarea|title)$/i, De = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), w = De(1), De(2), De(3), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Oe = /* @__PURE__ */ new WeakMap(), D = y.createTreeWalker(y, 129), ke = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === S ? c[1] === "!--" ? o = Se : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = C) : (Ee.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = C) : o = Ce : o === C ? c[0] === ">" ? (o = i ?? S, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? C : c[3] === "\"" ? Te : we) : o === Te || o === we ? o = C : o === Se || o === Ce ? o = S : (o = C, i = void 0);
			let d = o === C && e[t + 1].startsWith("/>") ? " " : "";
			a += o === S ? n + ve : l >= 0 ? (r.push(s), n.slice(0, l) + ge + n.slice(l) + v + d) : n + v + (l === -2 ? t : d);
		}
		return [de(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, Ae = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ke(t, n);
			if (this.el = e.createElement(l, r), D.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = D.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ge)) {
						let t = u[o++], n = i.getAttribute(e).split(v), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? Pe : r[1] === "?" ? Fe : r[1] === "@" ? Ie : Ne
						}), i.removeAttribute(e);
					} else e.startsWith(v) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (Ee.test(i.tagName)) {
						let e = i.textContent.split(v), t = e.length - 1;
						if (t > 0) {
							i.textContent = me ? me.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], b()), D.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], b());
						}
					}
				} else if (i.nodeType === 8) if (i.data === _e) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(v, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += v.length - 1;
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = y.createElement("template");
			return n.innerHTML = e, n;
		}
	}, je = class {
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
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? y).importNode(t, !0);
			D.currentNode = r;
			let i = D.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new Me(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Le(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = D.nextNode(), a++);
			}
			return D.currentNode = y, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, Me = class e {
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
			e = _(this, e, t), x(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== T && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? be(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== E && x(this._$AH) ? this._$AA.nextSibling.data = e : this.T(y.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ae.createElement(de(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new je(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = Oe.get(e.strings);
			return t === void 0 && Oe.set(e.strings, t = new Ae(e)), t;
		}
		k(t) {
			ye(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(b()), this.O(b()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = pe(e).nextSibling;
				pe(e).remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, Ne = class {
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
			if (i === void 0) e = _(this, e, t, 0), a = !x(e) || e !== this._$AH && e !== T, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = _(this, r[n + o], t, o), s === T && (s = this._$AH[o]), a ||= !x(s) || s !== this._$AH[o], s === E ? e = E : e !== E && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, Pe = class extends Ne {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === E ? void 0 : e;
		}
	}, Fe = class extends Ne {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== E);
		}
	}, Ie = class extends Ne {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = _(this, e, t, 0) ?? E) === T) return;
			let n = this._$AH, r = e === E && n !== E || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== E && (n === E || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, Le = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			_(this, e);
		}
	}, Re = {
		M: ge,
		P: v,
		A: _e,
		C: 1,
		L: ke,
		R: je,
		D: be,
		V: _,
		I: Me,
		H: Ne,
		N: Fe,
		U: Ie,
		B: Pe,
		F: Le
	}, ze = fe.litHtmlPolyfillSupport, ze?.(Ae, Me), (fe.litHtmlVersions ??= []).push("3.3.3"), Be = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new Me(t.insertBefore(b(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), He, O, Ue, We = e((() => {
	ue(), ue(), Ve(), Ve(), He = globalThis, O = class extends g {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let e = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= e.firstChild, e;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Be(t, this.renderRoot, this.renderOptions);
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
	}, O._$litElement$ = !0, O.finalized = !0, He.litElementHydrateSupport?.({ LitElement: O }), Ue = He.litElementPolyfillSupport, Ue?.({ LitElement: O }), (He.litElementVersions ??= []).push("4.2.2");
})), Ge = e((() => {})), k = e((() => {
	ue(), Ve(), We(), Ge();
}));
//#endregion
//#region src/common/helpers/actions.js
function Ke(e, t = null) {
	if (!(!e || !this.hass)) switch (e.action || "toggle") {
		case "toggle": {
			if (!t) return;
			let e = t.split(".")[0];
			this.hass.callService(e, "toggle", { entity_id: t });
			break;
		}
		case "more-info":
			this.dispatchEvent(new CustomEvent("hass-more-info", {
				detail: { entityId: t },
				bubbles: !0,
				composed: !0
			}));
			break;
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
			let r = Ye(e, t, n);
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
		if (Je(e), this._clearDoubleTapTimer?.(), A(r)) {
			this._doubleTapTimer = setTimeout(() => {
				this._doubleTapTimer = null, this._handleAction(n, t);
			}, 250);
			return;
		}
		this._handleAction(n, t);
	}
}
function N(e, t, n) {
	j(this) || (Je(e), this._clearDoubleTapTimer?.(), A(n) && this._handleAction(n, t));
}
function qe() {
	this._doubleTapTimer &&= (clearTimeout(this._doubleTapTimer), null);
}
function Je(e) {
	e?.preventDefault?.(), e?.stopPropagation?.(), e?.stopImmediatePropagation && e.stopImmediatePropagation();
}
function Ye(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function Xe(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function Ze(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function Qe(e) {
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	M.call(this, e, t, n, r);
}
function $e(e) {
	N.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function et(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	M.call(this, e, t, n, r);
}
function tt(e) {
	N.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function nt(e) {
	if (!j(this)) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return it.call(this, e);
		M.call(this, e, this._config.main_entity || this._config.entity, ot(this._config), this._config.double_tap_action);
	}
}
function rt(e) {
	if (!j(this)) {
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return at.call(this, e);
		N.call(this, e, this._config.main_entity || this._config.entity, this._config.double_tap_action);
	}
}
function it(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		M.call(this, e, null, ot(this._config), this._config.double_tap_action);
		return;
	}
	M.call(this, e, t, st(this._config), this._config.main_entity_double_tap_action);
}
function at(e) {
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		N.call(this, e, null, this._config.double_tap_action);
		return;
	}
	N.call(this, e, t, this._config.main_entity_double_tap_action);
}
function ot(e = {}) {
	return e.tap_action?.action ? e.tap_action : {
		action: "navigate",
		navigation_path: e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function st(e = {}) {
	return e.main_entity_tap_action?.action === "none" ? ot(e) : e.main_entity_tap_action || { action: "more-info" };
}
var ct = e((() => {}));
//#endregion
//#region src/common/helpers/colors.js
function lt(e) {
	if (!e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return F(t) ? t : pt(t);
}
function ut(e) {
	if (!e) return "rgba(var(--color-theme), 0.4)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.4)" : F(t) ? `color-mix(in srgb, transparent, ${t} 70%)` : P(t, 70);
}
function dt(e) {
	if (!e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return F(t) ? `color-mix(in srgb, transparent, ${t} 20%)` : t === "theme" ? "rgba(var(--color-theme), 0.05)" : P(t, 20);
}
function ft(e) {
	if (!e) return "rgba(var(--color-theme), 0.25)";
	let t = e.toString().trim();
	return F(t) ? `color-mix(in srgb, ${t} 25%, transparent)` : P(t, 25);
}
function pt(e) {
	let t = yt(e);
	if (!t) return "rgb(var(--color-theme))";
	if (t === "light") return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
	let n = gt(t);
	return mt(t) ? n ? `rgb(var(--${n}))` : `var(--${t}-color, var(--${t}, rgb(var(--color-theme))))` : t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))`;
}
function mt(e) {
	return bt.has(yt(e));
}
function ht(e) {
	return !!gt(e);
}
function gt(e) {
	let t = yt(e);
	return t && _t(t).find(vt) || "";
}
function _t(e) {
	let t = e.startsWith("color-") ? e.slice(6) : e, n = xt[t] || [];
	return [`color-${t}`, ...n.map((e) => `color-${e}`)];
}
function vt(e) {
	return typeof document > "u" ? !1 : [document.documentElement, document.body].filter(Boolean).some((t) => getComputedStyle(t).getPropertyValue(`--${e}`).trim());
}
function P(e, t) {
	return `color-mix(in srgb, transparent, ${pt(e)} ${t}%)`;
}
function F(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function yt(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
var bt, xt, I = e((() => {
	bt = new Set([
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
	]), xt = {
		"blue-grey": ["bluegrey"],
		"dark-grey": ["darkgrey"],
		"deep-orange": ["deeporange"],
		"deep-purple": ["deeppurple"],
		"light-blue": ["lightblue"],
		"light-green": ["lightgreen"],
		"light-grey": ["lightgrey"]
	};
}));
//#endregion
//#region src/common/helpers/card-name.js
function St(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.area_name) return Ct(e.area_name, e, t, n);
	if (e.room_name) return Ct(e.room_name, e, t, n);
	if (e.status_name) return Ct(e.status_name, e, t, n);
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
function Ct(e, t, n, r = "") {
	return typeof e == "string" ? e : (Array.isArray(e) ? e : [e]).map((e) => wt(e, t, n, r)).filter(Boolean).join(" ");
}
function wt(e, t, n, r) {
	if (!e) return "";
	if (typeof e == "string") return e;
	if (e.type === "text") return e.text || "";
	if (e.type === "area") return Tt(t, n) || "";
	if (e.type === "floor") return Et(t, n) || "";
	let i = Dt(t, n);
	return i && typeof n?.formatEntityName == "function" ? n.formatEntityName(i, { type: e.type }) || "" : e.type === "entity" && (i?.attributes?.friendly_name || i?.entity_id) || "";
}
function Tt(e, t) {
	let n = e.area;
	if (n && t?.areas?.[n]) return t.areas[n].name || "";
	let r = Dt(e, t);
	return r && typeof t?.formatEntityName == "function" ? t.formatEntityName(r, { type: "area" }) : "";
}
function Et(e, t) {
	let n = e.area, r = n && t?.areas?.[n] ? t.areas[n].floor_id : "";
	if (r && t?.floors?.[r]) return t.floors[r].name || "";
	let i = Dt(e, t);
	return i && typeof t?.formatEntityName == "function" ? t.formatEntityName(i, { type: "floor" }) : "";
}
function Dt(e, t) {
	let n = e.main_entity || e.entity || "";
	return n && t?.states ? t.states[n] : null;
}
var Ot = e((() => {}));
//#endregion
//#region src/common/helpers/card-registration.js
function kt({ tag: e, cardClass: t, name: n, description: r, version: i, getEntitySuggestion: a, documentationURL: o = "https://github.com/andyblac/Orbit-Cards", aliases: s = [] }) {
	customElements.get(e) || customElements.define(e, t), s.forEach((e) => {
		customElements.get(e.tag) || customElements.define(e.tag, e.cardClass || t);
	});
	let c = new Set([e, ...s.map((e) => e.tag)]);
	window.customCards = window.customCards || [];
	for (let e = window.customCards.length - 1; e >= 0; --e) c.has(window.customCards[e].type) && window.customCards.splice(e, 1);
	window.customCards.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		version: i,
		documentationURL: o,
		getEntitySuggestion: a
	}), console.info(`%c ${n} %c v${i} `, "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;");
}
var At = e((() => {}));
//#endregion
//#region src/common/helpers/config-migration.js
function jt(e = {}) {
	let t = { ...e || {} }, n = !1;
	return t.type === "custom:orbit-room-card" && (t.type = "custom:orbit-area-card", n = !0), Object.prototype.hasOwnProperty.call(t, "room_name") && (t.area_name === void 0 && t.room_name !== void 0 && t.room_name !== "" && (t.area_name = t.room_name), delete t.room_name, n = !0), {
		config: n ? t : e,
		migrated: n
	};
}
var Mt = e((() => {}));
//#endregion
//#region src/common/helpers/entities.js
function Nt(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function Pt(e) {
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
var Ft = e((() => {}));
//#endregion
//#region src/common/helpers/icons.js
function It(e, t) {
	let n = this._config.accent_color || "theme";
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function Lt(e) {
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
function Rt(e) {
	if (!e) return null;
	let t = e.attributes.device_class, n = e.state === "on";
	switch (t) {
		case "door": return n ? "mdi:door-open" : "mdi:door-closed";
		case "window": return n ? "mdi:window-open" : "mdi:window-closed";
		case "garage_door": return n ? "mdi:garage-open" : "mdi:garage";
		case "opening": return n ? "mdi:square-outline" : "mdi:square";
		case "motion":
		case "occupancy": return n ? "mdi:motion-sensor" : "mdi:motion-sensor-off";
		case "presence": return n ? "mdi:account" : "mdi:account-off";
		case "smoke": return n ? "mdi:smoke-detector-alert" : "mdi:smoke-detector";
		case "moisture": return n ? "mdi:water-alert" : "mdi:water-off";
		case "gas": return n ? "mdi:gas-cylinder" : "mdi:gas-cylinder-off";
		case "problem": return n ? "mdi:alert-circle" : "mdi:check-circle";
		case "power": return n ? "mdi:flash" : "mdi:flash-off";
		case "plug": return n ? "mdi:power-plug" : "mdi:power-plug-off";
		case "battery": return n ? "mdi:battery-alert" : "mdi:battery";
		case "connectivity": return n ? "mdi:wifi" : "mdi:wifi-off";
		case "lock": return n ? "mdi:lock-open" : "mdi:lock";
		case "light": return n ? "mdi:lightbulb-on" : "mdi:lightbulb-off";
		default: return n ? "mdi:check-circle" : "mdi:circle-outline";
	}
}
function zt(e, t = null) {
	let n = t ? this._getEntityActiveState(t) : !1;
	switch (e) {
		case "light": return n ? "mdi:lightbulb-on" : "mdi:lightbulb-off";
		case "switch": return t?.attributes?.device_class === "outlet" ? n ? "mdi:power-plug" : "mdi:power-plug-off" : n ? "mdi:toggle-switch-variant" : "mdi:toggle-switch-variant-off";
		case "fan": return n ? "mdi:fan" : "mdi:fan-off";
		case "cover": return n ? "mdi:blinds-open" : "mdi:blinds";
		case "binary_sensor": return this._getBinarySensorIcon(t);
		case "climate": return "mdi:thermostat";
		case "media_player": return "mdi:play-box-multiple";
		case "sensor": return "mdi:gauge";
		case "scene": return "mdi:palette";
		case "script": return "mdi:script-text";
		case "automation": return "mdi:robot";
		case "person": return "mdi:account";
		case "camera": return "mdi:cctv";
		case "vacuum": return "mdi:robot-vacuum";
		default: return "mdi:help-circle";
	}
}
function Bt(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function Vt(e) {
	return e ? e.startsWith("orbit:") ? Ht(e.slice(6)) : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Ht(e) {
	let t = import.meta.url.split("?")[0];
	return `${t.slice(0, t.lastIndexOf("/") + 1)}icons/${e}`;
}
function L(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = `${e}::${n ? "forced" : "auto"}`, i = this.constructor.svgCache, a = i[r];
	return typeof a == "string" && a !== "loading" ? a : a === "loading" ? (Gt(r, this), "") : (i[r] = "loading", Gt(r, this), qt(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = Wt(e, n), i[r] = e, Kt(r);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete i[r], Kt(r);
	}), "");
}
function Ut(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function Wt(e, t) {
	let n = e.replace(/width="[^"]*"/gi, "width=\"100%\"").replace(/height="[^"]*"/gi, "height=\"100%\"");
	return t ? n.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : n;
}
function Gt(e, t) {
	t && (R[e] = R[e] || /* @__PURE__ */ new Set(), R[e].add(t));
}
function Kt(e) {
	let t = R[e];
	t && (delete R[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function qt(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
var R, Jt = e((() => {
	R = {};
}));
//#endregion
//#region src/common/helpers/long-press.js
function Yt(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function Xt() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function Zt(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
var Qt = e((() => {}));
//#endregion
//#region src/common/helpers/templates.js
function $t(e, t) {
	if (!e || !this.hass) return null;
	let n = e;
	try {
		return n = e.replace(/\|\s*float\b/g, "").replace(/\|\s*int\b/g, "").replace(/\|\s*lower\b/g, ".toLowerCase()").replace(/\|\s*upper\b/g, ".toUpperCase()"), Function("states", "state_attr", "is_state", "is_state_attr", "stateObj", "entity", "float", "int", "bool", `
      return (${n});
      `)((e) => this.hass.states[e]?.state ?? "", (e, t) => this.hass.states[e]?.attributes?.[t], (e, t) => this.hass.states[e]?.state === t, (e, t, n) => this.hass.states[e]?.attributes?.[t] === n, (e) => this.hass.states[e] ?? null, this.hass.states[t], (e) => parseFloat(e) || 0, (e) => parseInt(e, 10) || 0, (e) => typeof e == "boolean" ? e : [
			"on",
			"true",
			"yes",
			"home",
			"open",
			"locked"
		].includes(String(e).toLowerCase()));
	} catch (r) {
		return console.error("State template error:", r, {
			template: e,
			processedTemplate: n,
			entityId: t
		}), null;
	}
}
var en = e((() => {}));
//#endregion
//#region src/common/helpers/updates.js
function tn(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? rn(r, i) : !1;
}
function nn(e) {
	return Object.keys(e || {}).some((e) => e.endsWith("_template"));
}
function rn(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
var an = e((() => {}));
//#endregion
//#region src/common/helpers/suggestions.js
function on(e = "") {
	return e.split(".")[0] || "";
}
function sn(e, t) {
	let n = e?.entities?.[t];
	if (n?.area_id) return n.area_id;
	let r = n?.device_id;
	return r && e?.devices?.[r]?.area_id || "";
}
function cn(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
var ln = e((() => {})), z, B = e((() => {
	z = {};
}));
//#endregion
//#region src/common/helpers/default-actions.js
function un(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = dn[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : fn.has(n) ? { action: "toggle" } : { action: t };
}
var dn, fn, pn = e((() => {
	dn = {
		automation: "automation.trigger",
		button: "button.press",
		input_button: "input_button.press",
		scene: "scene.turn_on",
		script: "script.turn_on"
	}, fn = new Set([
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
}));
//#endregion
//#region src/cards/area/helpers/lifecycle.js
function mn(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	this._cardName = this._getCardName("");
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, i);
	let a = this._config.main_entity_icon, o = this._config.main_entity_icon_on, s = this._config.main_entity_icon_off, c = Mn(this._config, n, t), l = c === "custom", u = n && this.hass?.areas?.[n] && this.hass.areas[n].icon || "mdi:sofa", d = r && (r.attributes?.icon || this.hass?.entities?.[t]?.icon || this._getDefaultDomainIcon(r.entity_id.split(".")[0], r)) || "mdi:sofa", f = c === "area" ? u : c === "entity" || r ? d : u, p = l && i && o ? "main_entity_icon_on" : l && !i && s ? "main_entity_icon_off" : l && a ? "main_entity_icon" : "";
	this._icon = l && ((i ? o : s) || a) || f, this._iconSvgForceColor = p ? this._getSvgColorOverride(p) : !0, this._statusItems = hn.call(this), this._buttonModels = yn.call(this), this._curveButtonModels = bn.call(this), this._actionButtonModel = xn.call(this);
}
function hn() {
	return [
		1,
		2,
		3
	].map((e) => {
		let t = this._config[`status${e}`];
		if (!t) return null;
		let n = this.hass?.states[t], r = `status${e}`, i = this._config[`${r}_icon`] || "", a = _n.call(this, r, t), o = a === "custom" ? i : a === "entity" && (n?.attributes?.icon || this.hass?.entities?.[t]?.icon || this._getDefaultDomainIcon(t.split(".")[0], n)) || "";
		return {
			entityId: t,
			text: vn.call(this, n, this._config[`status${e}_decimal_places`]),
			icon: o,
			iconPath: this._isImageIcon(o) ? this._resolveIconPath(o) : "",
			isImage: this._isImageIcon(o),
			isHaIcon: gn(o)
		};
	}).filter(Boolean);
}
function gn(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function _n(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "none" ? "none" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] ? "custom" : "none";
}
function vn(e, t) {
	if (!e) return "—";
	if (t === void 0 || t === "") return this.formatState(e);
	let n = Number(t), r = Number(e.state);
	if (!Number.isFinite(n) || !Number.isFinite(r)) return this.formatState(e);
	let i = e.attributes.unit_of_measurement || "";
	return `${r.toFixed(Math.max(0, n))}${i}`;
}
function yn() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => Sn.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: Dn,
		getBackgroundColor: En
	})).filter(Boolean);
}
function bn() {
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
		let i = Sn.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: An,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function xn() {
	let e = this._config.action_button;
	return e ? Sn.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: un(e),
		defaultHoldAction: null,
		getIconColor: jn,
		getBackgroundColor: null
	}) : null;
}
function Sn(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = r.key || `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = s == null ? this._getEntityActiveState(i) : s === !0 || s === "on", l = wn.call(this, a, t, i, c), u = this._isImageIcon(l);
	return {
		entityId: t,
		holdAction: this._config?.[`${a}_hold_action`] || r.defaultHoldAction,
		doubleTapAction: this._config?.[`${a}_double_tap_action`] || null,
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, c) : "",
		icon: l,
		iconColor: r.getIconColor.call(this, a, i, c),
		iconPath: u ? this._resolveIconPath(l) : "",
		svgForceColor: Cn.call(this, a, c),
		isImage: u
	};
}
function Cn(e, t) {
	if (Tn.call(this, e) !== "custom") return !0;
	let n = this._config?.[`${e}_icon`], r = t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : n ? `${e}_icon` : "";
	return r ? this._getSvgColorOverride(r) : !0;
}
function wn(e, t, n, r) {
	let i = this._config?.[`${e}_icon`], a = this._config?.[`${e}_icon_on`], o = this._config?.[`${e}_icon_off`], s = t.split(".")[0], c = Tn.call(this, e, t), l = this._getDefaultDomainIcon(s, n), u = n?.attributes?.icon || this.hass?.entities?.[t]?.icon || l || "mdi:help-circle";
	return c === "entity" ? u : (r ? a : o) || i || u;
}
function Tn(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] || this._config?.[`${e}_icon_on`] || this._config?.[`${e}_icon_off`] ? "custom" : "entity";
}
function En(e, t, n) {
	if (n) return this._computeButtonBackground(On.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return F(r) ? `color-mix(in srgb, transparent, ${r} 90%)` : !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : P(r, 10);
}
function Dn(e, t, n) {
	if (n) return this._computeFullColor(On.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return r.startsWith("rgba(") ? r : F(r) ? `color-mix(in srgb, transparent, ${r} 80%)` : P(r, 20);
}
function On(e, t) {
	let n = this._config[`${e}_on_color`] || "theme";
	return n === "light" ? this._getEntityColor(t) || this._config.accent_color || "theme" : n;
}
function kn(e, t, n) {
	let r = this._config.accent_color || "theme";
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : F(r) ? n ? r : `color-mix(in srgb, ${r} 40%, transparent)` : n ? this._computeFullColor(r) : P(r, 40);
}
function An(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? Dn.call(this, e, t, n) : kn.call(this, e, t, n);
}
function jn(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? Dn.call(this, e, t, n) : kn.call(this, e, t, n);
}
function Mn(e = {}, t, n) {
	let r = e.main_entity_icon_source, i = !!t, a = !!n;
	return r === "custom" ? r : r === "area" && i ? "area" : r === "entity" && a ? "entity" : i ? "area" : a ? "entity" : "area";
}
var Nn = e((() => {
	I(), pn();
})), Pn, Fn, In, Ln = e((() => {
	Pn = {
		ATTRIBUTE: 1,
		CHILD: 2,
		PROPERTY: 3,
		BOOLEAN_ATTRIBUTE: 4,
		EVENT: 5,
		ELEMENT: 6
	}, Fn = (e) => (...t) => ({
		_$litDirective$: e,
		values: t
	}), In = class {
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
	};
})), Rn, V, zn = e((() => {
	Ve(), Ln(), Rn = class extends In {
		constructor(e) {
			if (super(e), this.it = E, e.type !== Pn.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
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
	}, Rn.directiveName = "unsafeHTML", Rn.resultType = 1, V = Fn(Rn);
})), H = e((() => {
	zn();
}));
//#endregion
//#region src/cards/area/renders/buttons.js
function Bn(e) {
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
                ${e.iconPath ? V(this._getInlineSvg(e.iconPath, e.svgForceColor)) : ""}
              </div>
            ` : w`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
      </button>
    ` : null;
}
var Vn = e((() => {
	k(), H();
}));
//#endregion
//#region src/cards/area/renders/area-card.js
function Hn() {
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
              ${Un.call(this)}
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

          ${this._isImageIcon(this._icon) ? w`
                <div
                  class="main-image-icon"
                  style="color:${this._iconColor};"
                >
                  ${n ? V(n) : w`<img src=${t} alt="" />`}
                </div>
              ` : w`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                  style="color:${this._iconColor}"
                ></ha-icon>
              `}

        </div>

      </div>
    </ha-card>
  `;
}
function Un() {
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
      ${Wn.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function Wn(e) {
	return e.icon ? e.isImage ? w`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? V(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.isHaIcon ? w`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : w`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  ` : "";
}
var Gn = e((() => {
	k(), H();
})), Kn, qn, Jn, Yn, U, Xn, Zn, Qn, $n, er = e((() => {
	Ve(), {I: Kn} = Re, qn = (e) => e, Jn = () => document.createComment(""), Yn = (e, t, n) => {
		let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
		if (n === void 0) n = new Kn(r.insertBefore(Jn(), i), r.insertBefore(Jn(), i), e, e.options);
		else {
			let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
			if (o) {
				let t;
				n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
			}
			if (t !== i || o) {
				let e = n._$AA;
				for (; e !== t;) {
					let t = qn(e).nextSibling;
					qn(r).insertBefore(e, i), e = t;
				}
			}
		}
		return n;
	}, U = (e, t, n = e) => (e._$AI(t, n), e), Xn = {}, Zn = (e, t = Xn) => e._$AH = t, Qn = (e) => e._$AH, $n = (e) => {
		e._$AR(), e._$AA.remove();
	};
})), tr, nr, rr = e((() => {
	Ve(), Ln(), er(), tr = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		for (let i = t; i <= n; i++) r.set(e[i], i);
		return r;
	}, nr = Fn(class extends In {
		constructor(e) {
			if (super(e), e.type !== Pn.CHILD) throw Error("repeat() can only be used in text expressions");
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
			let i = Qn(e), { values: a, keys: o } = this.dt(t, n, r);
			if (!Array.isArray(i)) return this.ut = o, a;
			let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
			for (; d <= f && p <= m;) if (i[d] === null) d++;
			else if (i[f] === null) f--;
			else if (s[d] === o[p]) c[p] = U(i[d], a[p]), d++, p++;
			else if (s[f] === o[m]) c[m] = U(i[f], a[m]), f--, m--;
			else if (s[d] === o[m]) c[m] = U(i[d], a[m]), Yn(e, c[m + 1], i[d]), d++, m--;
			else if (s[f] === o[p]) c[p] = U(i[f], a[p]), Yn(e, i[d], i[f]), f--, p++;
			else if (l === void 0 && (l = tr(o, p, m), u = tr(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = Yn(e, i[d]);
					U(t, a[p]), c[p] = t;
				} else c[p] = U(n, a[p]), Yn(e, i[d], n), i[t] = null;
				p++;
			} else $n(i[f]), f--;
			else $n(i[d]), d++;
			for (; p <= m;) {
				let t = Yn(e, c[m + 1]);
				U(t, a[p]), c[p++] = t;
			}
			for (; d <= f;) {
				let e = i[d++];
				e !== null && $n(e);
			}
			return this.ut = o, Zn(e, c), T;
		}
	});
})), ir = e((() => {
	rr();
}));
//#endregion
//#region src/cards/area/renders/curve-buttons.js
function ar() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return w`
      <div class="curve-buttons">

        ${nr(e, (e, t) => t, (e) => e.empty ? w`
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
                      ${V(this._getInlineSvg(e.iconPath, e.svgForceColor))}
                    </div>
                  ` : w`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `)}

      ${t ? or.call(this, t) : ""}

      </div>
    `;
}
function or(e) {
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
              ${V(this._getInlineSvg(e.iconPath, e.svgForceColor))}
            </div>
          ` : w`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
    </button>
  `;
}
var sr = e((() => {
	k(), ir(), H();
})), cr, lr = e((() => {
	k(), cr = c`
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
`;
})), ur, dr = e((() => {
	k(), ur = c`
  :host {
    display: block;
  }

  ha-card {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background: var(--card-background-color, #1a1a1a);
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
`;
})), fr, pr = e((() => {
	k(), fr = c`
  .main-icon {
    --mdc-icon-size: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
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
`;
})), mr, hr = e((() => {
	k(), mr = c`
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
`;
})), gr, _r = e((() => {
	k(), gr = c`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`;
})), vr, yr = e((() => {
	k(), vr = c`
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
`;
})), br, xr = e((() => {
	k(), br = c`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`;
})), Sr, Cr = e((() => {
	k(), Sr = c`
  .curve-button ha-icon {
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
  .curve-button.action-button .curve-image-icon {
    width: clamp(30px, 16cqw, 96px);
    height: clamp(30px, 16cqw, 96px);
  }
`;
})), wr, Tr = e((() => {
	k(), wr = c`
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
`;
})), Er, Dr = e((() => {
	k(), Er = c`
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
`;
})), Or, kr = e((() => {
	k(), Or = c`
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
`;
})), Ar, jr = e((() => {
	k(), Ar = c`
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
`;
})), Mr, Nr = e((() => {
	lr(), dr(), pr(), hr(), _r(), yr(), xr(), Cr(), Tr(), Dr(), kr(), jr(), Mr = [
		ur,
		cr,
		fr,
		gr,
		mr,
		Ar,
		Er,
		Or,
		vr,
		br,
		Sr,
		wr
	];
}));
//#endregion
//#region src/common/editor/helpers/icon.js
function W(e, t) {
	return Array.isArray(t) ? Pr(e, t.map((t) => W(e, t))) : e._t ? e._t(t) : t;
}
function Pr(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Fr(e)).join(" ") : t.join(" ");
}
function Fr(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function Ir(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function Lr(e) {
	return e ? e.startsWith("orbit:") ? Rr(e.slice(6)) : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Rr(e) {
	let t = import.meta.url.split("?")[0];
	return `${t.slice(0, t.lastIndexOf("/") + 1)}icons/${e}`;
}
function zr(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = r && this._isImageIcon(r) ? "files" : "ha", o = this._iconPickerKey === i && this._iconPickerTab || a;
	return o === "files" && !this._orbitIconFilesLoading && !this._localIconFilesLoading && !(this._orbitIconFiles || []).length && !(this._localIconFiles || []).length && queueMicrotask(() => this._loadLocalIconFiles?.(r)), w`
    <div class="field">
      ${e ? w`<label>${W(this, e)}</label>` : ""}

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
            ${W(this, "Icons")}
          </button>
          <button
            type="button"
            class=${o === "files" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
          >
            ${W(this, "Files")}
          </button>
        </div>

        ${o === "files" ? Ur.call(this, t, r) : Hr.call(this, t, r)}
      </div>
    </div>
  `;
}
function G({ label: e = "Icon", sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [], renderCustom: s } = {}) {
	let c = Br(this._config, {
		sourceKey: t,
		entityKey: n,
		areaKey: r,
		allowArea: i,
		allowNone: a,
		customIconKeys: o
	}), l = c === "custom", u = [
		a ? {
			label: W(this, "None"),
			value: "none"
		} : null,
		i ? {
			label: W(this, "Area"),
			value: "area"
		} : null,
		{
			label: W(this, "Entity"),
			value: "entity"
		},
		{
			label: W(this, "Custom"),
			value: "custom"
		}
	].filter(Boolean);
	return w`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${W(this, e)}</label>

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
function Br(e = {}, { sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [] } = {}) {
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
async function Vr(e = "") {
	let t = ci(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([ti(), ni()]);
	this._orbitIconFiles = ui(n), this._localIconFiles = ui([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function Hr(e, t) {
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
function Ur(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [], i = Wr([...n, ...r]);
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? w`
      <div class="icon-picker-note">${W(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? w`
      <div class="icon-picker-note">
        ${W(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : w`
    <ha-generic-picker
      .value=${t && this._isImageIcon(t) ? t : ""}
      .getItems=${(e) => Kr(i, e)}
      .rowRenderer=${(e) => qr.call(this, e)}
      .valueRenderer=${(e) => Jr.call(this, i.find((t) => t.id === e))}
      .notFoundLabel=${W(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${!0}
      @value-changed=${(t) => {
		t.stopPropagation(), this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-generic-picker>
  `;
}
function Wr(e) {
	return ui(e).map((e) => {
		let t = li(e), n = Gr(e);
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
function Gr(e) {
	return `${e.source ? `${e.source}:` : ""}${(e.name || e.file || "").trim().replace(/\s+/g, "-")}`;
}
function Kr(e, t = "") {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => Object.values(e.search_labels || {}).some((e) => String(e).toLowerCase().includes(n))) : e;
}
function qr(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${Yr.call(this, e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function Jr(e) {
	return e ? w`
    ${Yr.call(this, e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function Yr(e) {
	return e?.iconFile ? w`
    <span
      slot="start"
      class="file-picker-preview"
      style=${Zr()}
    >
      ${Xr.call(this, e.iconFile)}
    </span>
  ` : "";
}
function Xr(e) {
	let t = li(e), n = this._resolveIconPath(t);
	if (!n) return w``;
	let r = this._getInlineSvg ? this._getInlineSvg(n) : "", i = this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? !1, a = Zr(), o = Qr(i);
	return w`
    <span
      class="file-picker-preview-inner"
      style=${a}
    >
      ${r ? w`${V($r(r))}` : w`
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
function Zr() {
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
function Qr(e) {
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
function $r(e) {
	if (!e) return "";
	let t = ei(e.replace(/<\?xml[^>]*>/gi, "").trim()), n = t.match(/<svg\b[^>]*>/i)?.[0];
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
function ei(e) {
	let t = "(?!none\\b|currentColor\\b|transparent\\b|inherit\\b|url\\()(?:rgb\\([^)]*\\)|rgba\\([^)]*\\)|hsl\\([^)]*\\)|hsla\\([^)]*\\)|[^\"';)]+)";
	return e.replace(RegExp(`\\s(fill|stroke)=(["'])${t}\\2`, "gi"), (e, t) => ` ${t}="currentColor"`).replace(RegExp(`(fill|stroke)\\s*:\\s*${t}`, "gi"), (e, t) => `${t}:currentColor`);
}
async function ti() {
	return (await ri([Rr("manifest.json"), Rr("orbit-icons.json")])).map((e) => ({
		...e,
		source: "orbit"
	}));
}
async function ni() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await ri([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await ii();
	return [
		...e,
		...t,
		...n
	].filter(oi).map((e) => si(e, "local"));
}
async function ri(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(oi).map((e) => si(e));
	} catch {}
	return [];
}
async function ii() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function ai(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function oi(e) {
	return Ir(ai(e));
}
function si(e, t = "") {
	let n = ai(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function ci(e) {
	if (!e || !oi(e)) return null;
	let t = ai(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function li(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function ui(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
var K = e((() => {
	k(), H();
}));
//#endregion
//#region src/common/editor/helpers/inputs.js
function di(e, t) {
	return Array.isArray(t) ? fi(e, t.map((t) => di(e, t))) : e._t ? e._t(t) : t;
}
function fi(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : pi(e)).join(" ") : t.join(" ");
}
function pi(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function mi(e, t, n, r = {}) {
	let i = r.externalLabel === !0, a = r.value ?? this._config?.[t] ?? "", o = r.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return w`
      <div class="field">
        ${i ? w`<label>${di(this, e)}</label>` : ""}

        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : di(this, e)}
          .selector=${{ text: {} }}
          .value=${a}
          .placeholder=${n}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function hi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.helper ?? "states[entity.entity_id].attributes.percentage > 50", a = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return w`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .label=${di(this, e)}
          .selector=${{ text: {} }}
          .value=${r}
          .placeholder=${i}
          @value-changed=${(e) => a(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function gi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.min ?? 0, a = n.step ?? 1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return w`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${di(this, e)}
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
var _i = e((() => {
	k();
}));
//#endregion
//#region src/common/editor/helpers/config.js
function vi(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function q(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function J(e, t = []) {
	return q([e, ...t]);
}
function yi(e, t = []) {
	return q([e, ...t.map((t) => `${e}${t}`)]);
}
var bi = e((() => {}));
//#endregion
//#region src/common/editor/helpers/renders.js
function Y(e, t, n) {
	return Array.isArray(t) ? xi(e, t.map((t) => Y(e, t, n))) : e._t ? e._t(t, n) : t;
}
function xi(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Si(e)).join(" ") : t.join(" ");
}
function Si(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function Ci(e, t) {
	let n = this._config?.[t] || "";
	return wi.call(this, e, t, n, (e) => this._handleConfigUpdate(t, e));
}
function wi(e, t, n, r, i = n) {
	Ni.call(this);
	let a = Qi(n), o = this._colorPickerKey === t && this._colorPickerTab || a;
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
              class=${o === "picker" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "picker", this._themeColorPickerOpen = !1;
	}}
            >
              ${Y(this, "Color")}
            </button>
            <button
              type="button"
              class=${o === "theme" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "theme", this._themeColorPickerOpen = !1, this._themeColorSearch = "";
	}}
            >
              ${Y(this, "Theme")}
            </button>
          </div>

          ${o === "theme" ? w`
                ${Ei.call(this, e, n, r, i)}
              ` : w`
                ${Ti.call(this, e, n, r, i)}
              `}
        </div>
      </div>
    </div>
  `;
}
function Ti(e, t, n, r = t) {
	let i = t ? this._getColorPickerValue(t) : "", a = i || this._getColorPickerValue(r);
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
                      ${Y(this, e)}
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
                      ${Y(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value empty"></span>
            </span>
          `}

      ${i ? w`
            <button
              type="button"
              class="native-color-picker-clear"
              aria-label=${Y(this, "Clear")}
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
function Ei(e, t, n, r = t) {
	let i = t || r, a = Qi(i) === "theme" ? Li(i) || "theme" : "", o = Mi.call(this);
	return w`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .label=${e ? Y(this, e) : ""}
        .value=${a}
        .getItems=${() => o}
        .rowRenderer=${(e) => Di.call(this, e)}
        .valueRenderer=${(e) => Oi.call(this, o.find((t) => t.id === e))}
        .notFoundLabel=${Y(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${!0}
        @value-changed=${(e) => {
		e.stopPropagation(), n(e.detail.value || "");
	}}
      ></ha-generic-picker>
    </div>
  `;
}
function Di(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${ki.call(this, e)}
      <span slot="headline">${e.primary}</span>
      ${Ai(e)}
    </ha-combo-box-item>
  `;
}
function Oi(e) {
	return e ? w`
    ${ki.call(this, e)}
    <span slot="headline">${e.primary}</span>
    ${Ai(e)}
  ` : "";
}
function ki(e) {
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
function Ai(e) {
	return e.isThemeColor ? w`
      <span
        slot="end"
        class="theme-source-badge theme-source-badge-theme"
        aria-label="Theme"
      >T</span>
    ` : e.isStandardFallback ? w`
        <span
          slot="end"
          class="theme-source-badge theme-source-badge-standard"
          aria-label="Standard"
        >S</span>
      ` : "";
}
function ji() {
	let e = [], t = /* @__PURE__ */ new Set();
	for (let n of Ba) {
		let r = Fi.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	for (let n of Ri.call(this)) {
		let r = Fi.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	return e;
}
function Mi() {
	let e = Pi.call(this);
	if (this._themeColorItemsCache && this._themeColorItemsCacheKey === e) return this._themeColorItemsCache;
	let t = ji.call(this);
	return this._themeColorItemsCache = t, this._themeColorItemsCacheKey = e, t;
}
function Ni() {
	let e = Pi.call(this);
	if (this._themeColorItemsCacheKey === e || this._themeColorWarmupScheduled === e) return;
	this._themeColorWarmupScheduled = e;
	let t = () => {
		this._themeColorWarmupScheduled === e && (Mi.call(this), this._themeColorWarmupScheduled = "");
	};
	if (window.requestIdleCallback) {
		window.requestIdleCallback(t, { timeout: 500 });
		return;
	}
	window.setTimeout(t, 0);
}
function Pi() {
	return `${this?.hass?.locale?.language || this?.hass?.language || ""}|${this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || ""}|${this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? ""}|${zi.call(this)}`;
}
function Fi(e) {
	let t = Ii(typeof e == "string" ? { id: e } : e), n = Yi(t.id), r = n && Xi(t.id), i = !r && (t.source === "theme" || qi.call(this, t.id)), a = t.label ? Y(this, t.label) : Zi.call(this, t.id);
	return {
		id: t.id,
		primary: a,
		secondary: n ? Y(this, "Color") : Y(this, "Theme"),
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
function Ii(e) {
	return {
		...e,
		id: Li(e.id),
		label: e.label || null
	};
}
function Li(e) {
	if (!e) return "";
	let t = e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""), n = t.startsWith("color-") ? t.slice(6) : t;
	return za[n] || n;
}
function Ri() {
	return Bi.call(this).map((e) => Ui(e)).filter(Wi).map((e) => ({
		id: e,
		source: "theme"
	})).sort((e, t) => Zi.call(this, e.id).localeCompare(Zi.call(this, t.id), this?.hass?.locale?.language || this?.hass?.language || void 0, { sensitivity: "base" }));
}
function zi() {
	return Vi.call(this).map(([e, t]) => `${e}:${t}`).join(",");
}
function Bi() {
	return Vi.call(this).map(([e]) => e).sort();
}
function Vi() {
	let e = /* @__PURE__ */ new Set(), t = [], n = Hi.call(this);
	for (let [r, i] of Object.entries(n)) {
		let n = r.toLowerCase();
		Gi(n, i) && (e.has(n) || (e.add(n), t.push([n, i])));
	}
	return t.sort(([e], [t]) => e.localeCompare(t));
}
function Hi() {
	let e = this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || "", t = e ? this?.hass?.themes?.themes?.[e] : null;
	if (!t) return {};
	let { modes: n, ...r } = t, i = this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? !1 ? n?.dark : n?.light;
	return {
		...r,
		...i || {}
	};
}
function Ui(e) {
	return e.startsWith("color-") ? e.slice(6) : e;
}
function Wi(e) {
	return !!e && !/^\d+$/.test(e);
}
function Gi(e, t) {
	return !e || !(e.startsWith("color-") || e.startsWith("google-") || e.endsWith("-color") || e.includes("-color-")) ? !1 : Ki(t);
}
function Ki(e) {
	let t = e == null ? "" : e.toString().trim();
	return t ? /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(/i.test(t) || /^var\(\s*--[a-z0-9-_]*color[a-z0-9-_]*/i.test(t) || /^\d+\s*,\s*\d+\s*,\s*\d+/.test(t) : !1;
}
function qi(e) {
	let t = new Set(Bi.call(this));
	return Ji(e).some((e) => t.has(e));
}
function Ji(e) {
	let t = Li(e);
	if (!t) return [];
	let n = t.startsWith("color-") ? t : `color-${t}`;
	return t.endsWith("-color") ? [t, n] : [n, t];
}
function Yi(e) {
	return e === "theme" || e === "primary-color" || e === "accent-color" || mt(e);
}
function Xi(e) {
	return mt(e) && !ht(e);
}
function Zi(e) {
	return e === "theme" ? Y(this, "State color (default)") : e === "light" ? Y(this, "State Light color") : e === "primary-color" ? Y(this, "Primary") : e === "accent-color" ? Y(this, "Accent") : e.replaceAll("-", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Qi(e) {
	let t = e?.toString().trim();
	return t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")) ? "picker" : "theme";
}
function $i({ interactions: e = [], title: t = "Interactions", expanded: n = !1, context: r = {} } = {}) {
	let i = e.filter(Boolean);
	if (!i.length) return "";
	let a = i.filter((e) => ea(this._config, e)), o = i.filter((e) => !a.includes(e)), s = [{
		name: "interactions",
		type: "expandable",
		flatten: !0,
		expanded: n,
		icon: "mdi:gesture-tap-button",
		schema: [...a.map((e) => ta(e, r)), {
			name: "",
			type: "optional_actions",
			flatten: !0,
			schema: o.map((e) => ta(e, r))
		}]
	}], c = na(this._config, i);
	return w`
    <ha-form
      class="interactions-form"
      .hass=${this.hass}
      .data=${c}
      .schema=${s}
      .computeLabel=${(e) => ia(this, e, i, t)}
      @value-changed=${(e) => {
		e.stopPropagation();
		let t = ra(e.detail.value || {}, i, this._config);
		this._updateConfig(t), this.requestUpdate?.();
	}}
    ></ha-form>
  `;
}
function ea(e = {}, t) {
	return t.defaultVisible && !oa(e?.[t.key]);
}
function ta(e, t) {
	let n = aa(e.defaultAction);
	return {
		name: e.formKey || e.key,
		selector: { ui_action: {
			actions: sa(n),
			default_action: n
		} },
		...t ? { context: t } : {}
	};
}
function na(e = {}, t) {
	return t.reduce((t, n) => {
		let r = n.formKey || n.key, i = e?.[n.key] || (n.displayDefaultValue ? ca(n.defaultAction) : void 0);
		return i && typeof i == "object" && i.action !== "popup" && (!oa(i) || aa(n.defaultAction) !== "none") && (t[r] = la(i)), t;
	}, {});
}
function ra(e, t, n = {}) {
	return t.reduce((t, r) => {
		let i = r.formKey || r.key, a = ua(e[i], r.defaultAction);
		return t[r.key] = n?.[r.key]?.action === "popup" && !(i in e) ? n[r.key] : a, t;
	}, {});
}
function ia(e, t, n, r) {
	return t.name === "interactions" ? Y(e, r) : Y(e, n.find((e) => (e.formKey || e.key) === t.name)?.label || t.name);
}
function aa(e) {
	let t = typeof e == "string" ? e : e?.action || "none";
	return t === "call-service" ? "perform-action" : t;
}
function oa(e) {
	return e?.action === "none";
}
function sa(e) {
	let t = [
		"more-info",
		"toggle",
		"navigate",
		"url",
		"perform-action",
		"assist"
	];
	return e === "none" ? t : [...t, "none"];
}
function ca(e) {
	return typeof e == "string" ? { action: e } : e || { action: "none" };
}
function la(e) {
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
function ua(e, t) {
	if (!(!e || typeof e != "object") && !(e.action === "none" && aa(t) === "none")) {
		if (e.action === "perform-action") {
			let t = {
				...e,
				action: "call-service",
				service: e.perform_action || e.service || ""
			};
			return e.data && !e.service_data && (t.service_data = e.data), delete t.perform_action, delete t.data, da(t);
		}
		return da(e);
	}
}
function da(e) {
	let t = e?.action === "perform-action" ? "call-service" : e?.action || "none", n = { action: t };
	return t === "navigate" ? (n.navigation_path = e.navigation_path || "", n) : t === "call-service" ? (n.service = e.service || e.perform_action || "", (e.service_data || e.data) && (n.service_data = { ...e.service_data || e.data }), e.target && (n.target = { ...e.target }), n) : t === "url" ? (n.url_path = e.url_path || "", n) : t === "popup" ? (n.popup_title = e.popup_title || "", n.popup_content = e.popup_content || "", e.style && (n.style = e.style), e.card_mod && (n.card_mod = e.card_mod), n) : n;
}
function fa({ value: e = "", includeDomains: t, excludeDomains: n, multiple: r = !1, onValueChanged: i, filterOptions: a, activeFilter: o = "all", className: s = "entity-picker" } = {}) {
	let c = a?.length ? a.map((e) => ({
		...e,
		label: pa.call(this, e)
	})) : null, l = c ? ha(c) : t;
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
    ` : c?.length ? ga.call(this, {
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
function pa(e) {
	if (e.haDomains?.length) {
		let t = e.haDomains.map((e) => ma(this?.hass, e)).filter(Boolean);
		if (t.length) return t.join(" / ");
	}
	return Y(this, e.label);
}
function ma(e, t) {
	if (!e?.localize || !t) return null;
	let n = [`component.${t}.entity_component._.name_plural`, `component.${t}.entity_component._.name`];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function ha(e = []) {
	if (e.some((e) => e.value === "all" && (!e.domains || e.domains.length === 0))) return;
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => e.domains?.forEach((e) => t.add(e))), [...t];
}
function ga({ value: e, includeDomains: t, excludeDomains: n, filters: r, activeFilter: i, className: a, onValueChanged: o }) {
	Da();
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
      .getItems=${(e, i) => _a.call(this, {
		search: e,
		section: i,
		filters: r,
		includeDomains: t,
		excludeDomains: n
	})}
      .valueRenderer=${(e) => ya.call(this, e)}
      .rowRenderer=${ba}
      .sections=${s}
      .selectedSection=${i || r[0]?.value || "all"}
      @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
      @value-changed=${(e) => o?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function _a({ search: e, section: t, filters: n, includeDomains: r, excludeDomains: i }) {
	let a = n.find((e) => e.value === (t || "all"))?.domains, o = a?.length ? a : r, s = new Set(i || []), c = (e || "").trim().toLowerCase();
	return Object.values(this.hass?.states || {}).filter((e) => {
		let t = Ta(e.entity_id);
		return o?.length && !o.includes(t) ? !1 : !s.has(t);
	}).map((e) => va.call(this, e)).filter((e) => xa(e, c)).sort(Sa);
}
function va(e) {
	let t = Ca(e), n = Ta(e.entity_id), r = wa(this.hass, e);
	return {
		id: e.entity_id,
		primary: t,
		secondary: r,
		sorting_label: `${t}_${e.entity_id}`,
		stateObj: e,
		domain: n,
		domainLabel: Ea(n),
		searchText: [
			t,
			e.entity_id,
			n,
			Ea(n),
			r,
			e.attributes?.device_class
		].filter(Boolean).join(" ").toLowerCase()
	};
}
function ya(e) {
	let t = this.hass?.states?.[e], n = t ? Ca(t) : e, r = t ? wa(this.hass, t) : void 0;
	return w`
    ${t ? w`<state-badge slot="start" .stateObj=${t}></state-badge>` : ""}
    <span slot="headline">${n}</span>
    ${r ? w`<span slot="supporting-text">${r}</span>` : ""}
  `;
}
function ba(e, t) {
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
function xa(e, t) {
	return t ? t.split(/\s+/).every((t) => e.searchText.includes(t)) : !0;
}
function Sa(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function Ca(e) {
	return e.attributes?.friendly_name || e.entity_id;
}
function wa(e, t) {
	let n = e?.entities?.[t.entity_id], r = n?.device_id ? e?.devices?.[n.device_id] : void 0, i = n?.area_id || r?.area_id || t.attributes?.area_id;
	return i ? e?.areas?.[i]?.name : void 0;
}
function Ta(e = "") {
	return e.split(".")[0] || "";
}
function Ea(e = "") {
	return e.split("_").filter(Boolean).map((e) => e[0]?.toUpperCase() + e.slice(1)).join(" ");
}
function Da() {
	if (Va) return;
	let e = Element.prototype.scrollIntoView;
	Element.prototype.scrollIntoView = function(...t) {
		if (ka(this)) {
			Oa(this);
			return;
		}
		return e.apply(this, t);
	}, Va = !0;
}
function Oa(e) {
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
function ka(e) {
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
function Aa({ value: e = "", onValueChanged: t, className: n = "entity-picker" } = {}) {
	return w`
    <ha-generic-picker
      class=${n}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Area"}
      .getItems=${() => ja.call(this)}
      .valueRenderer=${(e) => Na.call(this, e)}
      .rowRenderer=${Pa}
      @value-changed=${(e) => t?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function ja() {
	return Object.values(this.hass?.areas || {}).map((e) => Ma.call(this, e)).sort(Ia);
}
function Ma(e) {
	let t = e.name || e.area_id, n = Fa(this.hass, e);
	return {
		id: e.area_id,
		primary: t,
		secondary: n,
		sorting_label: t,
		icon: e.icon || "mdi:texture-box"
	};
}
function Na(e) {
	let t = this.hass?.areas?.[e], n = t ? Ma.call(this, t) : {
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
function Pa(e, t) {
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
function Fa(e, t) {
	let n = t.floor_id;
	return n ? e?.floors?.[n]?.name : void 0;
}
function Ia(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function La(e, t, n) {
	return w`
    <div class="field">
      <label>${Y(this, e, n)}</label>

      ${fa.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function Ra(e, t) {
	return w`
    <div class="field">
      ${Aa.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleConfigUpdate ? this._handleConfigUpdate(t, e) : this._updateConfig({ [t]: e })
	})}
    </div>
  `;
}
var za, Ba, Va, Ha = e((() => {
	k(), I(), za = {
		bluegrey: "blue-grey",
		darkgrey: "dark-grey",
		deeporange: "deep-orange",
		deeppurple: "deep-purple",
		lightblue: "light-blue",
		lightgreen: "light-green",
		lightgrey: "light-grey"
	}, Ba = [
		{
			id: "theme",
			label: "State color (default)"
		},
		{
			id: "light",
			label: "State Light color"
		},
		"primary-color",
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
	], Va = !1;
}));
//#endregion
//#region src/common/editor/helpers/helpers.js
function Ua(e) {
	e._editorPopoverCloseHandler || (e._editorPopoverCloseHandler = (t) => {
		!e._iconPickerKey && !e._colorPickerKey || Ga(t.composedPath?.() || []) || (e._iconPickerKey = "", e._colorPickerKey = "", e._iconFilePickerOpen = !1, e._iconFileSearch = "", e._themeColorPickerOpen = !1, e._themeColorSearch = "", e.requestUpdate?.());
	}, document.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0));
}
function Wa(e) {
	e._editorPopoverCloseHandler &&= (document.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), null);
}
function Ga(e) {
	return e.some((e) => {
		let t = e?.classList, n = e?.tagName?.toLowerCase?.();
		return t?.contains("icon-popover") || t?.contains("color-popover") || t?.contains("icon-preview") || t?.contains("color-preview") || t?.contains("color-control-button") || t?.contains("mdc-menu-surface") || n === "ha-generic-picker" || n === "ha-icon-picker" || n === "ha-combo-box" || n === "ha-combo-box-item" || n === "mwc-list" || n === "mwc-list-item";
	});
}
function Ka(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${pt(n)};` : "background-color: rgb(var(--color-theme));";
}
function qa(e) {
	let t = e?.toString().trim();
	return t && (Za(t) || Qa(t) || Ja(t)) || "#ffffff";
}
function Ja(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = gt(n), i = ht(n) ? Xa(r) : "", a = mt(n) ? Xa(`${n}-color`) : "", o = Xa(n), s = n.startsWith("color-") ? "" : Xa(`color-${n}`);
	return Ya(i, t) || Ya(a, t) || Ya(o, t) || Ya(s, t) || "";
}
function Ya(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = Za(n);
	if (r) return r;
	let i = Qa(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? Ja(a[1], t) : "";
}
function Xa(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function Za(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function Qa(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return $a(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? $a(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function $a(e, t, n) {
	return `#${eo(e)}${eo(t)}${eo(n)}`;
}
function eo(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
var to = e((() => {
	k(), K(), Jt(), I(), _i(), bi(), Ha();
}));
//#endregion
//#region src/common/editor/helpers/name-picker.js
function no({ label: e = "Name", valueKey: t, legacyValueKey: n = "", entityKey: r = "main_entity", areaKey: i = "area", defaultType: a = "", modeKey: o = t } = {}) {
	return ro.call(this), customElements.get("ha-entity-name-picker") ? w`
    <div class="field name-picker-field">
      <ha-entity-name-picker
        .hass=${this.hass}
        .label=${this._t(e)}
        .entityId=${wo.call(this, {
		entityKey: r,
		areaKey: i
	})}
        .value=${_o(this._config, {
		valueKey: t,
		legacyValueKey: n,
		entityKey: r,
		areaKey: i,
		defaultType: a
	})}
        @value-changed=${(e) => {
		e.stopPropagation(), bo.call(this, {
			valueKey: t,
			legacyValueKey: n,
			value: xo(e.detail.value, this._config, {
				entityKey: r,
				areaKey: i,
				defaultType: a
			})
		});
	}}
      ></ha-entity-name-picker>
    </div>
  ` : io.call(this, {
		label: e,
		valueKey: t,
		entityKey: r,
		areaKey: i,
		defaultType: a,
		modeKey: o
	});
}
function ro() {
	customElements.get("ha-entity-name-picker") || this._namePickerRenderQueued || (this._namePickerRenderQueued = !0, customElements.whenDefined("ha-entity-name-picker").then(() => {
		this._namePickerRenderQueued = !1, this.requestUpdate?.();
	}));
}
function io(e) {
	let t = lo(this._config, uo(this, e.modeKey), e);
	return w`
    <div class="field name-picker-field name-picker-fallback">
      <div class="field-header">
        <label>${this._t(e.label)}</label>

        <ha-selector
          class="editor-header-button-toggle name-picker-mode-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
		label: Oo(this, "composed"),
		value: "composed"
	}, {
		label: Oo(this, "custom"),
		value: "custom"
	}] } }}
          .value=${t}
          @value-changed=${(t) => {
		t.stopPropagation();
		let n = t.detail.value || "composed";
		if (fo(this, e.modeKey, n), n === "composed") {
			bo.call(this, {
				valueKey: e.valueKey,
				legacyValueKey: e.legacyValueKey,
				value: void 0
			});
			return;
		}
		if (typeof yo(this._config, e) != "string") {
			bo.call(this, {
				valueKey: e.valueKey,
				legacyValueKey: e.legacyValueKey,
				value: void 0
			});
			return;
		}
		this.requestUpdate?.();
	}}
        ></ha-selector>
      </div>

      ${t === "custom" ? ao.call(this, e) : oo.call(this, e)}
    </div>
  `;
}
function ao(e) {
	return w`
    <ha-selector
      class="name-picker-custom-input"
      .hass=${this.hass}
      .selector=${{ text: {} }}
      .value=${typeof yo(this._config, e) == "string" ? yo(this._config, e) : ""}
      @value-changed=${(t) => {
		t.stopPropagation(), bo.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: t.detail.value || void 0
		});
	}}
    ></ha-selector>
  `;
}
function oo(e) {
	let t = po(this._config, e), n = ho.call(this, t, e);
	return w`
    <ha-generic-picker
      class="name-picker-composed-picker"
      .hass=${this.hass}
      .value=${""}
      .placeholder=${this._t(e.label)}
      .getItems=${() => n}
      allow-custom-value
      .customValueLabel=${jo(this)}
      .rowRenderer=${(e) => w`
        <ha-combo-box-item type="button" compact>
          <span slot="headline">${e.primary}</span>
          ${e.secondary ? w`<span slot="supporting-text">${e.secondary}</span>` : ""}
        </ha-combo-box-item>
      `}
      .noSort=${!0}
      .searchLabel=${Ao(this)}
      @value-changed=${(n) => {
		n.stopPropagation();
		let r = go(n.detail.value);
		r && (fo(this, e.modeKey, "composed"), bo.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: xo([...t, r], this._config, e)
		}));
	}}
    >
      <div slot="field" class="name-picker-composed-field">
        ${t.map((n, r) => so.call(this, n, r, t, e))}

        <button
          type="button"
          class="name-picker-add-chip"
          @click=${(e) => co(e)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          <span>${ko(this)}</span>
        </button>
      </div>
    </ha-generic-picker>
  `;
}
function so(e, t, n, r) {
	return w`
    <button
      type="button"
      class="name-picker-chip"
      @click=${(e) => co(e)}
    >
      <ha-icon icon="mdi:drag-horizontal-variant"></ha-icon>
      <span>${mo.call(this, e)}</span>
      <ha-icon
        class="name-picker-chip-remove"
        icon="mdi:close"
        @click=${(e) => {
		e.preventDefault(), e.stopPropagation();
		let i = n.filter((e, n) => n !== t);
		bo.call(this, {
			valueKey: r.valueKey,
			legacyValueKey: r.legacyValueKey,
			value: xo(i, this._config, r)
		});
	}}
      ></ha-icon>
    </button>
  `;
}
function co(e) {
	e.preventDefault(), e.stopPropagation(), e.currentTarget?.closest("ha-generic-picker")?.open?.();
}
function lo(e = {}, t, n) {
	let r = yo(e, n);
	return typeof r == "string" ? "custom" : r ? "composed" : t || "composed";
}
function uo(e, t) {
	return e._namePickerModes?.[t];
}
function fo(e, t, n) {
	e._namePickerModes = {
		...e._namePickerModes,
		[t]: n
	};
}
function po(e = {}, t) {
	let n = _o(e, t);
	return !n || typeof n == "string" ? [] : Array.isArray(n) ? n : [n];
}
function mo(e) {
	return e ? e.type === "text" ? `"${e.text || ""}"` : e.type === "area" ? this._t("Area") : e.type === "entity" ? this._t("Entity") : Mo(this, e.type) : "";
}
function ho(e = [], t) {
	let n = [], r = new Set(e.filter((e) => e?.type && e.type !== "text").map((e) => e.type)), i = t.areaKey && this._config?.[t.areaKey] ? this.hass?.areas?.[this._config[t.areaKey]] : null, a = wo.call(this, t), o = a ? this.hass?.states?.[a] : null;
	if (i && !r.has("area")) n.push({
		id: "area",
		primary: this._t("Area"),
		secondary: i.name || ""
	});
	else if (o && !r.has("area")) {
		let e = Eo(this.hass, o, "area");
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
			secondary: Eo(this.hass, o, "entity")
		});
		let e = Eo(this.hass, o, "device");
		e && !r.has("device") && n.push({
			id: "device",
			primary: Mo(this, "device"),
			secondary: e
		});
		let i = Do(this.hass, this._config?.[t.areaKey]) || Eo(this.hass, o, "floor");
		i && !r.has("floor") && n.push({
			id: "floor",
			primary: Mo(this, "floor"),
			secondary: i
		});
	}
	return n;
}
function go(e) {
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
function _o(e = {}, t) {
	let n = yo(e, t);
	if (n !== void 0) return n;
	if (t.defaultType === "area" && e[t.areaKey]) return { type: "area" };
	if (t.defaultType === "entity" && (e[t.entityKey] || e.entity)) return { type: "entity" };
}
function vo(e = {}, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0 && e[t] !== "";
}
function yo(e = {}, t) {
	if (vo(e, t.valueKey)) return e[t.valueKey];
	if (t.legacyValueKey && vo(e, t.legacyValueKey)) return e[t.legacyValueKey];
}
function bo({ valueKey: e, legacyValueKey: t, value: n }) {
	if (t && typeof this._updateConfig == "function") {
		this._updateConfig({
			[e]: n,
			[t]: void 0
		});
		return;
	}
	this._handleConfigUpdate(e, n);
}
function xo(e, t = {}, n) {
	if (!(!e || Array.isArray(e) && e.length === 0) && !(n.defaultType && So(t, n) && Co(e, n.defaultType))) return e;
}
function So(e = {}, t) {
	return t.defaultType === "area" ? !!e[t.areaKey] : t.defaultType === "entity" ? !!(e[t.entityKey] || e.entity) : !1;
}
function Co(e, t) {
	let n = Array.isArray(e) ? e : [e];
	return n.length === 1 && n[0] && typeof n[0] == "object" && n[0].type === t;
}
function wo(e) {
	return this._config?.[e.entityKey] || this._config?.entity || To(this.hass, this._config?.[e.areaKey]);
}
function To(e, t) {
	if (!e || !t) return "";
	let n = e.entities || {}, r = e.devices || {};
	for (let i of Object.keys(e.states || {})) {
		let e = n[i];
		if (e?.area_id === t || e?.device_id && r[e.device_id]?.area_id === t) return i;
	}
	return "";
}
function Eo(e, t, n) {
	return !t || typeof e?.formatEntityName != "function" ? n === "entity" && (t?.attributes?.friendly_name || t?.entity_id) || "" : e.formatEntityName(t, { type: n }) || "";
}
function Do(e, t) {
	let n = t && e?.areas?.[t] ? e.areas[t].floor_id : "";
	return n && e?.floors?.[n] && e.floors[n].name || "";
}
function Oo(e, t) {
	let n = `ui.components.entity.entity-name-picker.mode_${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t === "custom" ? e._t("Custom") : "Composed";
}
function ko(e) {
	let t = "ui.components.entity.entity-name-picker.add", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Add");
}
function Ao(e) {
	let t = "ui.components.entity.entity-name-picker.search", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Search");
}
function jo(e) {
	let t = "ui.components.entity.entity-name-picker.custom_name", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Name");
}
function Mo(e, t) {
	let n = `ui.components.entity.entity-name-picker.types.${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t;
}
var No = e((() => {
	k();
}));
//#endregion
//#region src/editors/area/sections/area.js
function Po() {
	return w`
    <div class="section">
      ${Io.call(this)}

      ${this._renderArea("Area", "area")}

      ${this._renderColor(["Accent", "Color"], "accent_color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${Lo.call(this)}

      ${$i.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: Fo(this._config),
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
function Fo(e = {}) {
	return {
		action: "navigate",
		navigation_path: e.tap_action?.navigation_path || e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function Io() {
	return no.call(this, {
		label: "Name",
		valueKey: "area_name",
		legacyValueKey: "room_name",
		entityKey: "main_entity",
		areaKey: "area",
		defaultType: "area"
	});
}
function Lo() {
	return G.call(this, {
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
var Ro = e((() => {
	k(), No(), Ha(), K();
}));
//#endregion
//#region src/editors/area/sections/buttons.js
function zo() {
	let e = this._selectedButtonIndex || 1;
	return w`
    <div class="section">
      ${Bo.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${Vo.call(this, e)}
    </div>
  `;
}
function Bo(e, t, n) {
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
function Vo(e) {
	let t = `button${e}`, n = this._areaButtonDomainFilter || "all";
	return w`
    <div class="sub-section selected-button-section">
      <div class="field">
        <label>${this._t("Entity")}</label>

        ${fa.call(this, {
		value: this._config?.[t] || "",
		filterOptions: Ho,
		activeFilter: n,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
      </div>

      <div class="color-pair">
        ${this._renderColor(["Active", "Color"], `${t}_on_color`)}
        ${this._renderColor(["Inactive", "Color"], `${t}_off_color`)}
      </div>

      ${G.call(this, {
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

      ${$i.call(this, {
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
var Ho, Uo = e((() => {
	k(), Ha(), K(), Ho = [
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
}));
//#endregion
//#region src/editors/area/sections/curve-buttons.js
function Wo() {
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

      ${Ko.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${qo.call(this, `curve_button${e}`, "", "more-info", { index: e }, {
		showColors: !0,
		filteredEntity: !0,
		filterKey: "_areaCurveButtonDomainFilter",
		filters: Zo
	})}
    </div>
  `;
}
function Go() {
	let e = un(this._config?.action_button);
	return w`
    <div class="section">
      ${qo.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function Ko(e, t, n) {
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
function qo(e, t, n, r = {}, i = {}) {
	let a = this._config?.[e];
	return w`
    <div class="sub-section selected-button-section">
      ${t ? w`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? Jo.call(this, "Entity", e, i) : this._renderEntity("Entity", e)}

      ${i.showColors ? w`
            <div class="color-pair">
              ${Yo.call(this, ["Active", "Color"], `${e}_on_color`)}
              ${Yo.call(this, ["Inactive", "Color"], `${e}_off_color`)}
            </div>
          ` : ""}

      ${G.call(this, {
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

      ${$i.call(this, {
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
function Jo(e, t, n = {}) {
	let r = this[n.filterKey || "_areaActionButtonDomainFilter"] || "all", i = n.filters || Xo;
	return w`
    <div class="field">
      <label>${this._t(e)}</label>

      ${fa.call(this, {
		value: this._config?.[t] || "",
		filterOptions: i,
		activeFilter: r,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function Yo(e, t) {
	let n = this._config?.[t] || "", r = n === "theme" ? "" : n, i = r || this._config?.accent_color || "theme";
	return this._renderColorControl(e, t, r, (e) => this._handleConfigUpdate(t, e), i);
}
var Xo, Zo, Qo = e((() => {
	k(), Ha(), K(), pn(), Xo = [
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
	], Zo = [
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
})), $o, es = e((() => {
	k(), $o = c`
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
`;
})), ts, ns = e((() => {
	k(), ts = c`
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
`;
})), rs, is = e((() => {
	k(), rs = c`
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
`;
})), as, os = e((() => {
	k(), as = c`
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

`;
})), ss, cs = e((() => {
	k(), ss = c`
.entity-picker {
  width: 100%;
  display: block;
}

.entity-picker::part(root),
.entity-picker * {
  box-sizing: border-box;
}

`;
})), ls, us = e((() => {
	k(), ls = c`
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
`;
})), ds, fs = e((() => {
	k(), ds = c`
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
`;
})), ps, ms = e((() => {
	k(), ps = c`
.editor-version {
  padding: 0 14px;
  font-size: var(--ha-font-size-xs, 11px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.5;
  text-align: right;
}
`;
})), hs, gs = e((() => {
	k(), hs = c`
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
`;
})), _s, vs = e((() => {
	es(), ns(), is(), os(), cs(), us(), fs(), ms(), gs(), _s = [
		$o,
		ts,
		rs,
		as,
		ss,
		ls,
		ds,
		ps,
		hs
	];
})), ys, bs, xs, Ss = e((() => {
	ys = "Files", bs = "Separator", xs = {
		"Accent color": "Accent color",
		"Action button": "Action button",
		"Actions per row": "Actions per row",
		"Battery entity {index}": "Battery entity {index}",
		"Button {index}": "Button {index}",
		"Choose color": "Choose color",
		"Choose icon": "Choose icon",
		"Curve buttons": "Curve buttons",
		"ETA entity": "ETA entity",
		Files: ys,
		"Icon only": "Icon only",
		"Items per row": "Items per row",
		"Label template": "Label template",
		"Loading files...": "Loading files...",
		"Local Icons": "Local Icons",
		"Lock curve button positions": "Lock curve button positions",
		"Main entity": "Main entity",
		"Move left": "Move left",
		"Move right": "Move right",
		"Navigation path": "Navigation path",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"No matching actions": "No matching actions",
		"No matching colors": "No matching colors",
		"No matching files": "No matching files",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		"Person entity": "Person entity",
		"Separate cards": "Separate cards",
		Separator: bs,
		"State light color": "State light color",
		"State color (default)": "State color (default)",
		"State template": "State template",
		"Status {index}": "Status {index}",
		"Status color": "Status color",
		"Status name": "Status name",
		"Status sensors": "Status sensors",
		"Tracker entity": "Tracker entity"
	};
})), Cs, ws, Ts, Es = e((() => {
	Cs = "Files", ws = "Separator", Ts = {
		"Accent color": "Accent colour",
		"Action button": "Action button",
		"Actions per row": "Actions per row",
		"Battery entity {index}": "Battery entity {index}",
		"Button {index}": "Button {index}",
		"Choose color": "Choose colour",
		"Choose icon": "Choose icon",
		"Curve buttons": "Curve buttons",
		"ETA entity": "ETA entity",
		Files: Cs,
		"Icon only": "Icon only",
		"Items per row": "Items per row",
		"Label template": "Label template",
		"Loading files...": "Loading files...",
		"Local Icons": "Local Icons",
		"Lock curve button positions": "Lock curve button positions",
		"Main entity": "Main entity",
		"Move left": "Move left",
		"Move right": "Move right",
		"Navigation path": "Navigation path",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"No matching actions": "No matching actions",
		"No matching colors": "No matching colours",
		"No matching files": "No matching files",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		"Person entity": "Person entity",
		"Separate cards": "Separate cards",
		Separator: ws,
		"State light color": "State light colour",
		"State color (default)": "State colour (default)",
		"State template": "State template",
		"Status {index}": "Status {index}",
		"Status color": "Status colour",
		"Status name": "Status name",
		"Status sensors": "Status sensors",
		"Tracker entity": "Tracker entity"
	};
})), Ds, Os, ks, As = e((() => {
	Ds = "Dateien", Os = "Trennzeichen", ks = {
		"Accent color": "Akzentfarbe",
		"Action button": "Aktionstaste",
		"Actions per row": "Aktionen pro Zeile",
		"Battery entity {index}": "Batterie-Entität {index}",
		"Button {index}": "Taste {index}",
		"Choose color": "Farbe auswählen",
		"Choose icon": "Symbol auswählen",
		"Curve buttons": "Bogen-Tasten",
		"ETA entity": "ETA-Entität",
		Files: Ds,
		"Icon only": "Nur Symbol",
		"Items per row": "Elemente pro Zeile",
		"Label template": "Beschriftungsvorlage",
		"Loading files...": "Dateien werden geladen...",
		"Local Icons": "Lokale Symbole",
		"Lock curve button positions": "Bogen-Tastenpositionen sperren",
		"Main entity": "Hauptentität",
		"Move left": "Nach links verschieben",
		"Move right": "Nach rechts verschieben",
		"Navigation path": "Navigationspfad",
		"No matching colors": "Keine passenden Farben",
		"No matching actions": "Keine passenden Aktionen",
		"No matching files": "Keine passenden Dateien",
		"Person entity": "Personen-Entität",
		"Separate cards": "Separate Karten",
		Separator: Os,
		"State light color": "Lichtstatusfarbe",
		"State color (default)": "Statusfarbe (Standard)",
		"State template": "Zustandsvorlage",
		"Status {index}": "Status {index}",
		"Status color": "Statusfarbe",
		"Status name": "Statusname",
		"Status sensors": "Statussensoren",
		"Tracker entity": "Tracker-Entität",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Keine Dateien gefunden. Füge ein lokales Symbolmanifest unter /local/icons/manifest.json hinzu oder gib den Dateinamen manuell ein.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit-Symbole",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}"
	};
})), js, Ms, Ns, Ps = e((() => {
	js = "Archivos", Ms = "Separador", Ns = {
		"Accent color": "Color de acento",
		"Action button": "Botón de acción",
		"Actions per row": "Acciones por fila",
		"Battery entity {index}": "Entidad de batería {index}",
		"Button {index}": "Botón {index}",
		"Choose color": "Elegir color",
		"Choose icon": "Elegir icono",
		"Curve buttons": "Botones curvos",
		"ETA entity": "Entidad ETA",
		Files: js,
		"Icon only": "Solo icono",
		"Items per row": "Elementos por fila",
		"Label template": "Plantilla de etiqueta",
		"Loading files...": "Cargando archivos...",
		"Local Icons": "Iconos locales",
		"Lock curve button positions": "Bloquear posiciones de botones curvos",
		"Main entity": "Entidad principal",
		"Move left": "Mover a la izquierda",
		"Move right": "Mover a la derecha",
		"Navigation path": "Ruta de navegación",
		"No matching colors": "No hay colores coincidentes",
		"No matching actions": "No hay acciones coincidentes",
		"No matching files": "No hay archivos coincidentes",
		"Person entity": "Entidad de persona",
		"Separate cards": "Tarjetas separadas",
		Separator: Ms,
		"State light color": "Color de luz de estado",
		"State color (default)": "Color de estado (predeterminado)",
		"State template": "Plantilla de estado",
		"Status {index}": "Estado {index}",
		"Status color": "Color de estado",
		"Status name": "Nombre de estado",
		"Status sensors": "Sensores de estado",
		"Tracker entity": "Entidad de seguimiento",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No se encontraron archivos. Añade un manifiesto de iconos local en /local/icons/manifest.json o escribe el nombre del archivo manualmente.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Iconos de Orbit",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}"
	};
})), Fs, Is, Ls, Rs = e((() => {
	Fs = "Fichiers", Is = "Séparateur", Ls = {
		"Accent color": "Couleur d'accent",
		"Action button": "Bouton d'action",
		"Actions per row": "Actions par ligne",
		"Battery entity {index}": "Entité batterie {index}",
		"Button {index}": "Bouton {index}",
		"Choose color": "Choisir une couleur",
		"Choose icon": "Choisir une icône",
		"Curve buttons": "Boutons courbes",
		"ETA entity": "Entité ETA",
		Files: Fs,
		"Icon only": "Icône seule",
		"Items per row": "Éléments par ligne",
		"Label template": "Modèle de libellé",
		"Loading files...": "Chargement des fichiers...",
		"Local Icons": "Icônes locales",
		"Lock curve button positions": "Verrouiller les positions des boutons courbes",
		"Main entity": "Entité principale",
		"Move left": "Déplacer à gauche",
		"Move right": "Déplacer à droite",
		"Navigation path": "Chemin de navigation",
		"No matching colors": "Aucune couleur correspondante",
		"No matching actions": "Aucune action correspondante",
		"No matching files": "Aucun fichier correspondant",
		"Person entity": "Entité personne",
		"Separate cards": "Cartes séparées",
		Separator: Is,
		"State light color": "Couleur d’état de lumière",
		"State color (default)": "Couleur d’état (par défaut)",
		"State template": "Modèle d'état",
		"Status {index}": "Statut {index}",
		"Status color": "Couleur du statut",
		"Status name": "Nom du statut",
		"Status sensors": "Capteurs de statut",
		"Tracker entity": "Entité de suivi",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Aucun fichier trouvé. Ajoutez un manifeste d’icônes local dans /local/icons/manifest.json ou saisissez le nom du fichier manuellement.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Icônes Orbit",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}"
	};
})), zs, Bs, Vs, Hs = e((() => {
	zs = "File", Bs = "Separatore", Vs = {
		"Accent color": "Colore accento",
		"Action button": "Pulsante azione",
		"Actions per row": "Azioni per riga",
		"Battery entity {index}": "Entità batteria {index}",
		"Button {index}": "Pulsante {index}",
		"Choose color": "Scegli colore",
		"Choose icon": "Scegli icona",
		"Curve buttons": "Pulsanti curvi",
		"ETA entity": "Entità ETA",
		Files: zs,
		"Icon only": "Solo icona",
		"Items per row": "Elementi per riga",
		"Label template": "Template etichetta",
		"Loading files...": "Caricamento file...",
		"Local Icons": "Icone locali",
		"Lock curve button positions": "Blocca posizioni dei pulsanti curvi",
		"Main entity": "Entità principale",
		"Move left": "Sposta a sinistra",
		"Move right": "Sposta a destra",
		"Navigation path": "Percorso navigazione",
		"No matching colors": "Nessun colore corrispondente",
		"No matching actions": "Nessuna azione corrispondente",
		"No matching files": "Nessun file corrispondente",
		"Person entity": "Entità persona",
		"Separate cards": "Schede separate",
		Separator: Bs,
		"State light color": "Colore stato luce",
		"State color (default)": "Colore stato (predefinito)",
		"State template": "Template stato",
		"Status {index}": "Stato {index}",
		"Status color": "Colore stato",
		"Status name": "Nome stato",
		"Status sensors": "Sensori stato",
		"Tracker entity": "Entità tracker",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nessun file trovato. Aggiungi un manifesto icone locale in /local/icons/manifest.json oppure digita manualmente il nome del file.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Icone Orbit",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}"
	};
})), Us, Ws, Gs, Ks = e((() => {
	Us = "Bestanden", Ws = "Scheidingsteken", Gs = {
		"Accent color": "Accentkleur",
		"Action button": "Actieknop",
		"Actions per row": "Acties per rij",
		"Battery entity {index}": "Batterij-entiteit {index}",
		"Button {index}": "Knop {index}",
		"Choose color": "Kleur kiezen",
		"Choose icon": "Icoon kiezen",
		"Curve buttons": "Gebogen knoppen",
		"ETA entity": "ETA-entiteit",
		Files: Us,
		"Icon only": "Alleen icoon",
		"Items per row": "Items per rij",
		"Label template": "Labelsjabloon",
		"Loading files...": "Bestanden laden...",
		"Local Icons": "Lokale iconen",
		"Lock curve button positions": "Posities van gebogen knoppen vergrendelen",
		"Main entity": "Hoofdentiteit",
		"Move left": "Naar links verplaatsen",
		"Move right": "Naar rechts verplaatsen",
		"Navigation path": "Navigatiepad",
		"No matching colors": "Geen overeenkomende kleuren",
		"No matching actions": "Geen overeenkomende acties",
		"No matching files": "Geen overeenkomende bestanden",
		"Person entity": "Persoon-entiteit",
		"Separate cards": "Aparte kaarten",
		Separator: Ws,
		"State light color": "Statuskleur licht",
		"State color (default)": "Statuskleur (standaard)",
		"State template": "Statussjabloon",
		"Status {index}": "Status {index}",
		"Status color": "Statuskleur",
		"Status name": "Statusnaam",
		"Status sensors": "Statussensoren",
		"Tracker entity": "Tracker-entiteit",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Geen bestanden gevonden. Voeg een lokaal iconenmanifest toe op /local/icons/manifest.json of typ de bestandsnaam handmatig.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit-iconen",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}"
	};
})), qs, Js, Ys, Xs = e((() => {
	qs = "Arquivos", Js = "Separador", Ys = {
		"Accent color": "Cor de destaque",
		"Action button": "Botão de ação",
		"Actions per row": "Ações por linha",
		"Battery entity {index}": "Entidade de bateria {index}",
		"Button {index}": "Botão {index}",
		"Choose color": "Escolher cor",
		"Choose icon": "Escolher ícone",
		"Curve buttons": "Botões curvos",
		"ETA entity": "Entidade ETA",
		Files: qs,
		"Icon only": "Somente ícone",
		"Items per row": "Itens por linha",
		"Label template": "Modelo de rótulo",
		"Loading files...": "Carregando arquivos...",
		"Local Icons": "Ícones locais",
		"Lock curve button positions": "Bloquear posições dos botões curvos",
		"Main entity": "Entidade principal",
		"Move left": "Mover para a esquerda",
		"Move right": "Mover para a direita",
		"Navigation path": "Caminho de navegação",
		"No matching colors": "Nenhuma cor correspondente",
		"No matching actions": "Nenhuma ação correspondente",
		"No matching files": "Nenhum arquivo correspondente",
		"Person entity": "Entidade de pessoa",
		"Separate cards": "Cartões separados",
		Separator: Js,
		"State light color": "Cor de estado da luz",
		"State color (default)": "Cor de estado (padrão)",
		"State template": "Modelo de estado",
		"Status {index}": "Status {index}",
		"Status color": "Cor do status",
		"Status name": "Nome do status",
		"Status sensors": "Sensores de status",
		"Tracker entity": "Entidade de rastreamento",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nenhum arquivo encontrado. Adicione um manifesto de ícones local em /local/icons/manifest.json ou digite o nome do arquivo manualmente.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Ícones Orbit",
		"Orbit Area Card v{version}": "Orbit Area Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}"
	};
}));
//#endregion
//#region src/common/localize.js
function X(e, t, n = {}) {
	let r = $s(e), i = r.replace("_", "-"), a = r.split("-")[0], o = Zs(e, t) || Qs(r, t) || Qs(i, t) || Qs(a, t) || ec.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function Zs(e, t) {
	if (!e?.localize || !t) return null;
	let n = tc[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Qs(e, t) {
	let n = ec[e]?.[t];
	return n === "" ? null : n;
}
function $s(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
var ec, tc, nc = e((() => {
	Ss(), Es(), As(), Ps(), Rs(), Hs(), Ks(), Xs(), ec = {
		de: ks,
		en: xs,
		"en-gb": Ts,
		en_gb: Ts,
		es: Ns,
		fr: Ls,
		it: Vs,
		nl: Gs,
		"pt-br": Ys,
		pt_br: Ys
	}, tc = {
		Add: ["ui.common.add"],
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
		Color: ["ui.panel.lovelace.editor.card.tile.color", "ui.dialogs.label-detail.color"],
		Clear: ["ui.common.clear"],
		Custom: [
			"ui.components.entity.entity-name-picker.mode_custom",
			"ui.panel.lovelace.editor.edit_card.pick_card.custom",
			"ui.panel.config.backup.setup.custom_heading",
			"ui.panel.config.backup.schedule.time_options.custom",
			"ui.panel.config.backup.data.apps_custom"
		],
		Entity: [
			"ui.components.selectors.selector.types.entity",
			"ui.components.entity.entity-picker.entity",
			"ui.panel.lovelace.editor.card.generic.entity"
		],
		Disabled: ["ui.dialogs.entity_registry.editor.disabled_label", "ui.panel.config.entities.picker.status.disabled"],
		Enabled: ["ui.dialogs.entity_registry.editor.enabled_label", "ui.panel.config.entities.picker.status.enabled"],
		Icon: ["ui.components.selectors.selector.types.icon", "ui.panel.lovelace.editor.card.generic.icon"],
		Inactive: ["ui.components.color-picker.colors.inactive"],
		Interactions: ["ui.panel.lovelace.editor.card.tile.interactions", "ui.panel.lovelace.editor.card.generic.interactions"],
		None: ["ui.common.none"],
		Accent: ["ui.components.color-picker.colors.accent"],
		Automations: ["ui.panel.config.automation.caption", "ui.dialogs.more_info_control.add_to.automations_heading"],
		Away: ["state_badge.person.not_home"],
		Buttons: ["ui.panel.lovelace.editor.card.entities.entity_row.buttons"],
		Card: ["ui.panel.lovelace.editor.card.conditional.card"],
		"Display precision": ["ui.dialogs.entity_registry.editor.precision"],
		"Double tap behavior": ["ui.panel.lovelace.editor.card.generic.double_tap_action"],
		Home: ["state_badge.person.home"],
		Icons: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style_list.icons"],
		"Icon tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_tap_action"],
		"Hold behavior": ["ui.panel.lovelace.editor.card.generic.hold_action"],
		"Icon hold behavior": ["ui.panel.lovelace.editor.card.tile.icon_hold_action"],
		"Icon double tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_double_tap_action"],
		Mode: ["ui.card.climate.mode"],
		Person: ["component.person.entity_component._.name"],
		Prefix: ["ui.panel.lovelace.editor.elements.prefix"],
		Primary: ["ui.components.color-picker.colors.primary"],
		Name: ["ui.common.name"],
		Remove: ["ui.common.remove"],
		Search: ["ui.components.data-table.search", "ui.panel.lovelace.editor.card.generic.search"],
		Scenes: ["ui.panel.config.scene.caption"],
		Scripts: ["ui.panel.config.script.caption"],
		Security: ["panel.security"],
		Standard: ["ui.panel.config.energy.battery.dialog.type_standard"],
		Status: ["ui.panel.config.entities.picker.headers.status"],
		"Tap behavior": ["ui.panel.lovelace.editor.card.generic.tap_action"],
		Theme: ["ui.components.selectors.selector.types.theme", "ui.components.theme-picker.theme"],
		Wrap: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"]
	};
})), Z, Q = e((() => {
	Z = {
		area: "0.8.2",
		status: "0.13.2",
		action: "0.6.2",
		deck: "0.1.0"
	};
})), rc = /* @__PURE__ */ t((() => {
	k(), to(), Ro(), Uo(), Qo(), K(), vs(), B(), Mt(), nc(), Q();
	var e = class extends O {
		static svgCache = z;
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
			super.connectedCallback(), Ua(this);
		}
		disconnectedCallback() {
			Wa(this), super.disconnectedCallback();
		}
		_getColorStyle(e) {
			return Ka(e);
		}
		_getColorPickerValue(e) {
			return qa(e);
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		setConfig(e) {
			let { config: t, migrated: n } = jt(e || {});
			this._config = t || {}, n && this._queueConfigMigration();
		}
		_queueConfigMigration() {
			this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
				this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
					detail: { config: l(this._config) },
					bubbles: !0,
					composed: !0
				}));
			}));
		}
		_updateConfig(e) {
			let t = { ...e };
			Object.prototype.hasOwnProperty.call(t, "tap_action") && t.tap_action !== void 0 && (t.navigate = void 0);
			let n = vi(this._config, t), r = Br(n, {
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
			(i || a) && (n.main_entity_icon = void 0), this._config = l(vi(n, {})), this.dispatchEvent(new CustomEvent("config-changed", {
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
			this._updateConfig(J("main_entity", r));
		}
		_clearStatusEntity(e) {
			this._updateConfig(yi(e, i));
		}
		_clearButtonEntity(e) {
			this._updateConfig(yi(e, a));
		}
		_clearCurveButtonEntity(e) {
			this._updateConfig(yi(e, o));
		}
		_clearActionButtonEntity(e) {
			this._updateConfig(yi(e, s));
		}
		_renderInput(e, t, n = "", r = {}) {
			return mi.call(this, e, t, n, r);
		}
		_renderTemplateInput(e, t) {
			return hi.call(this, e, t);
		}
		_handleConfigUpdate(e, t) {
			this._updateConfig({ [e]: t });
		}
		_renderColor(e, t) {
			return Ci.call(this, e, t);
		}
		_renderColorControl(e, t, n, r, i = n) {
			return wi.call(this, e, t, n, r, i);
		}
		_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
			return zr.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Vr.call(this, e);
		}
		_isImageIcon(e) {
			return Ir(e);
		}
		_resolveIconPath(e) {
			return Lr(e);
		}
		_getInlineSvg(e) {
			return L.call(this, e, { forceColor: !0 });
		}
		_renderEntity(e, t, n) {
			return La.call(this, e, t, n);
		}
		_renderArea(e, t) {
			return Ra.call(this, e, t);
		}
		_renderAreaSection() {
			return Po.call(this);
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

          ${G.call(this, {
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
			return zo.call(this);
		}
		_renderCurvedButtonsSection() {
			return Wo.call(this);
		}
		_renderActionButtonSection() {
			return Go.call(this);
		}
		_renderEditorTabs() {
			return w`
      <div class="editor-tabs">
        ${t.map((e) => w`
          <button
            type="button"
            class="editor-tab ${this._activeSection === e.key ? "active" : ""}"
            @click=${() => {
				this._activeSection = e.key;
			}}
          >
            ${this._t(e.label)}
          </button>
        `)}
      </div>
    `;
		}
		_renderActiveSection() {
			let e = t.find((e) => e.key === this._activeSection) || t[0];
			return this[e.render]();
		}
		render() {
			return w`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Area Card v{version}", { version: Z.area })}
        </div>
      </div>
    `;
		}
		static styles = [_s];
	}, t = [
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
	], n = class extends e {};
	customElements.define("orbit-area-card-editor", e), customElements.define("orbit-room-card-editor", n);
	var r = [
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
	], i = [
		"_icon_source",
		"_icon",
		"_decimal_places"
	], a = [
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
	], o = [
		"_icon_source",
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action",
		"_double_tap_action"
	], s = [
		"_icon_source",
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action",
		"_double_tap_action"
	], c = [
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
	function l(e) {
		let t = {}, n = /* @__PURE__ */ new Set();
		return c.forEach((r) => {
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
		}), Object.keys(e).forEach((r) => {
			n.has(r) || (t[r] = e[r]);
		}), t;
	}
})), ic = /* @__PURE__ */ t((() => {
	k(), ct(), I(), Ot(), At(), Mt(), Ft(), Jt(), Qt(), en(), an(), ln(), B(), Nn(), Vn(), Gn(), sr(), Nr(), rc(), Q();
	var e = class extends O {
		static svgCache = z;
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
				_circleColor: { type: String }
			};
		}
		static getConfigElement() {
			return document.createElement("orbit-area-card-editor");
		}
		static getStubConfig(e) {
			let t = i(e), n = {
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
			this._config = jt(e).config, this._areaColor = this._computeFullColor(this._config.accent_color), this._statusColor = this._computeFullColor(this._config.status_color || this._config.accent_color), this._iconColor = this._computeIconColor(this._config.accent_color), this._circleColor = this._computeCircleColor(this._config.accent_color);
		}
		willUpdate(e) {
			return mn.call(this, e);
		}
		shouldUpdate(e) {
			return tn.call(this, e, this._getRelevantEntities(), { hasTemplates: nn(this._config) });
		}
		_handleAction(e, t = null) {
			return Ke.call(this, e, t);
		}
		_navigate(e) {
			return Xe.call(this, e);
		}
		_toggleEntity(e, t, n = null) {
			return Ze.call(this, e, t, n);
		}
		_handleButtonClick(e) {
			return Qe.call(this, e);
		}
		_handleButtonDoubleClick(e) {
			return $e.call(this, e);
		}
		_handleCurveButtonClick(e) {
			return et.call(this, e);
		}
		_handleCurveButtonDoubleClick(e) {
			return tt.call(this, e);
		}
		_handleTap(e) {
			return nt.call(this, e);
		}
		_handleCardPointerDown(e) {
			if (j(this) || t(e)) return;
			let n = this._config?.hold_action;
			if (!(!n?.action || n.action === "none")) return this._startLongPress(e, this._config.main_entity || this._config.entity, n);
		}
		_handleCardDoubleTap(e) {
			return rt.call(this, e);
		}
		_handleMainEntityTap(e) {
			return it.call(this, e);
		}
		_handleMainEntityDoubleTap(e) {
			return at.call(this, e);
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
			return lt.call(this, e);
		}
		_computeIconColor(e) {
			return ut.call(this, e);
		}
		_computeCircleColor(e) {
			return dt.call(this, e);
		}
		_computeButtonBackground(e) {
			return ft.call(this, e);
		}
		_getCardName(e = "Card") {
			return St(this._config, this.hass, e);
		}
		formatState(e) {
			return Nt(e);
		}
		_getEntityActiveState(e) {
			return Pt(e);
		}
		_getMainIconColor(e, t) {
			return It.call(this, e, t);
		}
		_getEntityColor(e) {
			return Lt(e);
		}
		_getBinarySensorIcon(e) {
			return Rt(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return zt.call(this, e, t);
		}
		_isImageIcon(e) {
			return Bt(e);
		}
		_resolveIconPath(e) {
			return Vt(e);
		}
		_getInlineSvg(e, t = !0) {
			return L.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e) {
			return Ut(this._config, e);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_startLongPress(e, t, n) {
			return Yt.call(this, e, t, n);
		}
		_cancelLongPress() {
			return Xt.call(this);
		}
		_clearDoubleTapTimer() {
			return qe.call(this);
		}
		_finishLongPress(e) {
			return Zt.call(this, e);
		}
		_evaluateStateTemplate(e, t) {
			return $t.call(this, e, t);
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
			return Bn.call(this, e);
		}
		_renderCurveButtons() {
			return ar.call(this);
		}
		render() {
			return Hn.call(this);
		}
		static styles = Mr;
	};
	function t(e) {
		return e.composedPath().some((e) => e?.classList ? e.classList.contains("entity-button") || e.classList.contains("curve-button") || e.classList.contains("action-button") : !1);
	}
	var n = class extends e {};
	kt({
		tag: "orbit-area-card",
		cardClass: e,
		name: "Orbit Area Card",
		description: "Responsive area card",
		version: Z.area,
		getEntitySuggestion: a,
		aliases: [{
			tag: "orbit-room-card",
			cardClass: n
		}]
	});
	var r = new Set([
		"light",
		"fan",
		"climate",
		"media_player",
		"switch",
		"cover",
		"lock"
	]);
	function i(e) {
		return Object.keys(e?.areas || {}).sort((t, n) => {
			let r = e.areas[t]?.name || t, i = e.areas[n]?.name || n;
			return r.localeCompare(i, void 0, { sensitivity: "base" });
		})[0] || "";
	}
	function a(e, t) {
		let n = on(t);
		if (!r.has(n)) return null;
		let i = sn(e, t), a = {
			type: "custom:orbit-area-card",
			main_entity: t,
			accent_color: n === "light" ? "light" : "theme"
		};
		return i && (a.area = i), { config: a };
	}
}));
//#endregion
//#region src/common/helpers/card-layout.js
function ac({ config: e = {}, count: t = 1, wrapKey: n = "wrap", perRowKey: r, defaultColumns: i = 3 }) {
	if (!e[n]) return Math.max(1, t);
	let a = Number(e[r]);
	return Math.max(1, Math.min(t, (Number.isFinite(a) ? Math.floor(a) : i) || 1));
}
function oc(e) {
	let t = ac(e);
	return Math.max(1, Math.ceil((e?.count || 1) / t));
}
var sc = e((() => {}));
//#endregion
//#region src/cards/status/helpers/attributes.js
function $(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function cc(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function lc(e, t, n) {
	let r = $(t, "color");
	return n ? e.accent_on_color || r || "theme" : e.accent_off_color || r || "theme";
}
function uc(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (fc.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
function dc(e, t) {
	let n = $(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return cc(e) || r || "/lovelace/home";
}
var fc, pc = e((() => {
	fc = [
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
}));
//#endregion
//#region src/common/helpers/zones.js
function mc(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = gc.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [hc(e), e]))
	};
	return gc.set(t, i), i;
}
function hc(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
var gc, _c = e((() => {
	gc = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function vc(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	if (this._config.mode === "person") {
		Cc.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = yc(this._config);
		this._statusItems = e.map((e) => bc.call(this, e, this._config)), Sc.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.main_entity, n = bc.call(this, { entity: t }, this._config);
	this._statusItems = [n], Sc.call(this, n);
}
function yc(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_on_color: e.accent_on_color,
		accent_off_color: e.accent_off_color,
		main_entity_icon_source: e.main_entity_icon_source,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_on: e.main_entity_icon_on,
		main_entity_icon_off: e.main_entity_icon_off,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		main_entity_icon_on_svg_color_override: e.main_entity_icon_on_svg_color_override,
		main_entity_icon_off_svg_color_override: e.main_entity_icon_off_svg_color_override,
		state_template: e.state_template,
		label_template: e.label_template,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action,
		main_entity_tap_action: e.main_entity_tap_action,
		main_entity_hold_action: e.main_entity_hold_action,
		main_entity_double_tap_action: e.main_entity_double_tap_action
	}];
}
function bc(e, t = {}) {
	let n = e.entity || t.main_entity, r = n && this.hass ? this.hass.states[n] : null, i = {
		...t,
		...e,
		main_entity: n
	}, a = i.mode !== "icon_only" && Object.prototype.hasOwnProperty.call(i, "status_name") && i.status_name !== void 0 && i.status_name !== "" ? Ct(i.status_name, i, this.hass) : $(r, "friendly_name") || n || X(this.hass, "Status"), o = i.state_template ? this._evaluateStateTemplate(i.state_template, n) : null, s = (i.label_template ? this._evaluateStateTemplate(i.label_template, n) : null) ?? ($(r, "label") || (r ? this.formatState(r) : "")), c = i.main_entity_icon, l = i.main_entity_icon_on, u = i.main_entity_icon_off, d = uc(r, (e) => this._getEntityActiveState(e), o), f = xc(i, n), p = $(r, "icon") || this.hass?.entities?.[n]?.icon || (r ? this._getDefaultDomainIcon(r.entity_id.split(".")[0], r) : "mdi:information-outline"), m = f === "custom" && ((d ? l : u) || c) || p, ee = f === "custom" && d && l ? "main_entity_icon_on" : f === "custom" && !d && u ? "main_entity_icon_off" : f === "custom" && c ? "main_entity_icon" : "", h = lc(i, r, d), te = dc(i, r), ne = this._computeFullColor(h), re = this._computeFullColor(h), ie = this._computeCircleColor(h), ae = d ? this._computeFullColor(h) : this._computeIconColor(h);
	return {
		...e,
		entityId: n,
		cardName: a,
		statusText: s,
		icon: m,
		navigationPath: te,
		nameColor: ne,
		statusColor: re,
		circleColor: ie,
		iconColor: ae,
		svgForceColor: ee ? this._getSvgColorOverride(i, ee) : !0
	};
}
function xc(e, t) {
	let n = e.main_entity_icon_source, r = !!t, i = !!(e.main_entity_icon || e.main_entity_icon_on || e.main_entity_icon_off);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function Sc(e) {
	this._cardName = e.cardName ?? X(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function Cc() {
	let e = this._config.main_entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null, o = Object.prototype.hasOwnProperty.call(this._config, "status_name") && this._config.status_name !== void 0 && this._config.status_name !== "";
	this._cardName = o ? Ct(this._config.status_name, this._config, this.hass) : $(i, "friendly_name") || $(r, "friendly_name") || e || t || X(this.hass, "Person");
	let s = (this._config.label_template ? this._evaluateStateTemplate(this._config.label_template, t) : null) ?? (r ? Tc.call(this, r) : ""), c = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = c ? `${s} | ${c}` : s;
	let l = uc(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), u = lc(this._config, r, l);
	this._personPicture = $(i, "entity_picture") || $(r, "entity_picture") || "", this._personZoneIcon = wc.call(this, r, i), this._personBattery1 = Ec.call(this, this._config.battery_entity_1), this._personBattery2 = Ec.call(this, this._config.battery_entity_2), this._icon = $(i, "icon") || $(r, "icon") || "mdi:account", this._navigationPath = dc(this._config, r), this._nameColor = this._computeFullColor(u), this._statusColor = this._computeFullColor(u), this._circleColor = this._computeCircleColor(u), this._iconColor = l ? this._computeFullColor(u) : this._computeIconColor(u), this._iconSvgForceColor = !0;
}
function wc(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = mc(this.hass), r = t?.entity_id;
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
function Tc(e) {
	let t = e?.state;
	return t ? t === "home" ? X(this.hass, "Home") : t === "not_home" ? X(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function Ec(e) {
	let t = e && this.hass ? this.hass.states[e] : null;
	if (!t) return null;
	let n = Number(t.state), r = "green";
	return Number.isFinite(n) && (n <= 15 ? r = "red" : n <= 30 && (r = "amber")), {
		entityId: e,
		icon: t.attributes?.icon || "mdi:battery",
		color: this._computeFullColor(r)
	};
}
var Dc = e((() => {
	pc(), _c(), Ot(), nc();
}));
//#endregion
//#region src/cards/status/renders/status-card.js
function Oc() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = Nc(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
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
        ${n ? kc.call(this, t, i) : w`
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
          ${e === "person" ? jc.call(this) : this._isImageIcon(this._icon) ? w`
                <div
                  class="main-image-icon"
                >
                  ${c ? V(c) : w`<img src=${s} alt="" />`}
                </div>
              ` : w`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
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
  `;
}
function kc(e, t) {
	return w`
    <div class="status-icon-grid">
      ${Pc(e, t).map((e, n) => w`
        <div class="status-icon-row">
          ${e.map((e, r) => Ac.call(this, e, n * t + r))}
          ${Fc(e.length, t, "status-icon-spacer")}
        </div>
      `)}
    </div>
  `;
}
function Ac(e, t) {
	let n = Nc(e.statusText), r = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", i = r ? this._getInlineSvg(r, e.svgForceColor) : "";
	return w`
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
      <div class="circle status-circle">
        ${this._isImageIcon(e.icon) ? w`
              <div class="main-image-icon">
                ${i ? V(i) : w`<img src=${r} alt="" />`}
              </div>
            ` : w`
              <ha-icon
                class="main-icon"
                .icon=${e.icon}
              ></ha-icon>
            `}
      </div>

      <div
        class="status-badge"
        ?hidden=${!n}
      >
        ${n}
      </div>
    </ha-card>
  `;
}
function jc() {
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

      ${Mc.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? Mc.call(this, "battery-1", this._personBattery1.icon, this._personBattery1.color, this._personBattery1.entityId) : ""}

      ${this._personBattery2 ? Mc.call(this, "battery-2", this._personBattery2.icon, this._personBattery2.color, this._personBattery2.entityId) : ""}
    </div>
  `;
}
function Mc(e, t, n, r = null) {
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
        <ha-icon .icon=${t}></ha-icon>
      </span>
    </span>
  `;
}
function Nc(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
function Pc(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Fc(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => w`
    <div class=${n}></div>
  `);
}
var Ic = e((() => {
	k(), H();
})), Lc, Rc = e((() => {
	k(), lr(), dr(), pr(), Lc = [
		cr,
		ur,
		fr,
		c`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped {
    aspect-ratio: auto;
    container-type: inline-size;
  }

  ha-card.mode-icon_only.grouped.separate-cards {
    background: transparent;
    border: none;
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
    overflow: hidden;
    touch-action: manipulation;
    z-index: 3;
  }

  .status-circle .main-icon {
    --mdc-icon-size: 45%;
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
    gap: clamp(4px, 2cqw, 10px);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .status-container.mode-icon_only.grouped .status-icon-grid {
    height: auto;
  }

  .status-icon-row {
    display: flex;
    gap: clamp(4px, 2cqw, 10px);
    width: 100%;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-grid {
    gap: clamp(5px, 1.4cqw, 8px);
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-row {
    gap: clamp(5px, 1.4cqw, 8px);
  }

  .status-icon-item {
    container-type: size;
    cursor: pointer;
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
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
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
    --mdc-icon-size: 54%;
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

  .person-badge ha-icon {
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

  .person-badge-battery-1 {
    left: 69%;
    top: 4%;
  }

  .person-badge-battery-2 {
    left: 91%;
    top: 22%;
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
	];
}));
//#endregion
//#region src/editors/status/sections/status.js
function zc() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = t || n ? "more-info" : "navigate", i = this._config?.tap_action?.action || r, a = t || n ? i : "more-info";
	return w`
    <div class="section">
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Mode")}</label>

          <ha-selector
            class="editor-header-button-toggle status-mode-selector"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: Kc.call(this) } }}
            .value=${e}
            @value-changed=${(e) => this._updateConfig({ mode: e.detail.value || "standard" })}
          ></ha-selector>
        </div>
      </div>
    </div>

    ${t ? Vc.call(this, {
		cardActionDefault: r,
		mainEntityActionDefault: a
	}) : w`
          <div class="section">
            ${Bc.call(this)}

            ${n ? w`
                  ${this._renderEntity("Person entity", "main_entity")}
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
                ` : w`
                  <div class="field">
                    <label>${this._t("Main entity")}</label>

                    ${fa.call(this, {
		value: this._config?.main_entity || "",
		filterOptions: qc,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate("main_entity", e) : this._handleConfigUpdate("main_entity", e)
	})}
                  </div>
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
                  ${Wc.call(this)}
                  ${this._renderTemplateInput("State template", "state_template")}
                  ${this._renderTemplateInput("Label template", "label_template")}
                `}

            ${this._config?.main_entity ? $i.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: r,
				defaultVisible: !0
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
				key: "main_entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: a,
				defaultVisible: !0
			},
			{
				key: "main_entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			},
			{
				key: "main_entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: this._config.main_entity,
			area_id: this._config.area
		}
	}) : ""}
          </div>
        `}
  `;
}
function Bc() {
	return no.call(this, {
		label: "Status name",
		valueKey: "status_name",
		entityKey: "main_entity",
		defaultType: "entity"
	});
}
function Vc({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {}, a = Math.max(1, Number(this._config?.items_per_row) || 3), o = !!this._config?.wrap && n.length > a, s = !o && n.length > 6 || o && a > 6;
	return w`
    <div class="section">
      <div class="status-group-options">
        <label class="status-wrap-toggle">
          <span>${this._t("Wrap")}</span>
          <ha-switch
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		items_per_row: e.target.checked ? this._config?.items_per_row || 3 : this._config?.items_per_row
	})}
          ></ha-switch>
        </label>

        ${n.length > 1 ? w`
              <label class="status-wrap-toggle">
                <span>${this._t("Separate cards")}</span>
                <ha-switch
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                ></ha-switch>
              </label>
            ` : ""}

      ${this._config?.wrap ? w`
            <div class="status-per-row-field">
              ${this._renderNumberInput("Items per row", "items_per_row", {
		value: this._config?.items_per_row || 3,
		min: 1,
		step: 1,
		onValueChanged: (e) => this._updateConfig({ items_per_row: Math.max(1, Number(e) || 1) })
	})}
            </div>
          ` : ""}
      </div>

      <div
        class="status-tabs ${o ? "wrapped" : ""} ${s ? "scroll-hint" : ""} ${n.length > 1 ? "has-tools" : ""}"
        style=${o ? `--status-tabs-per-row: ${a};` : ""}
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

        ${s ? w`
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

      <div class="field">
        <label>${this._t("Main entity")}</label>

        ${fa.call(this, {
		value: i.entity || "",
		filterOptions: qc,
		onValueChanged: (e) => this._updateStatusItem(r, { entity: e })
	})}
      </div>

      <div class="color-pair">
        ${Uc.call(this, [
		"Accent",
		"Active",
		"Color"
	], "accent_on_color", r, i)}
        ${Uc.call(this, [
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color", r, i)}
      </div>

      ${Gc.call(this, r, i)}

      ${Hc.call(this, "State template", "state_template", r, i)}
      ${Hc.call(this, "Label template", "label_template", r, i)}

      ${i.entity ? this._renderStatusItemInteractions(r, i, e, t) : ""}
    </div>
  `;
}
function Hc(e, t, n, r) {
	return this._renderTemplateInput(e, t, {
		value: r[t] || "",
		onValueChanged: (e) => this._updateStatusItem(n, { [t]: e })
	});
}
function Uc(e, t, n, r) {
	return this._renderColorControl(e, `status-${n}-${t}`, r[t] || "", (e) => this._updateStatusItem(n, { [t]: e }));
}
function Wc() {
	return G.call(this, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "main_entity",
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
function Gc(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateStatusItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderStatusItemIconInput(t, r, e)
	};
	return G.call(r, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
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
function Kc() {
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
var qc, Jc = e((() => {
	k(), No(), Ha(), K(), qc = [
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
	];
})), Yc, Xc = e((() => {
	k(), Yc = c`
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
`;
})), Zc = /* @__PURE__ */ t((() => {
	k(), to(), Jc(), vs(), Xc(), B(), nc(), Q();
	var e = class extends O {
		static svgCache = z;
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
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._selectedStatusIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		connectedCallback() {
			super.connectedCallback(), Ua(this);
		}
		disconnectedCallback() {
			Wa(this), super.disconnectedCallback();
		}
		_getColorStyle(e) {
			return Ka(e);
		}
		_getColorPickerValue(e) {
			return qa(e);
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		setConfig(e) {
			this._config = e || {}, this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(e).length - 1);
		}
		_updateConfig(e) {
			this._config = c(vi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
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
			if (e === "main_entity") {
				this._clearMainEntity();
				return;
			}
			if (e === "tracker_entity") {
				this._updateConfig(J("tracker_entity", a));
				return;
			}
			this._handleConfigUpdate(e, t);
		}
		_clearMainEntity() {
			if (this._config?.mode === "person") {
				this._updateConfig(J("main_entity", i));
				return;
			}
			this._updateConfig(J("main_entity", n));
		}
		_getStatusItems(e = this._config) {
			return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
				entity: e?.main_entity || "",
				accent_on_color: e?.accent_on_color || "",
				accent_off_color: e?.accent_off_color || "",
				main_entity_icon_source: e?.main_entity_icon_source || "",
				main_entity_icon: e?.main_entity_icon || "",
				main_entity_icon_on: e?.main_entity_icon_on || "",
				main_entity_icon_off: e?.main_entity_icon_off || "",
				state_template: e?.state_template || "",
				label_template: e?.label_template || "",
				tap_action: e?.tap_action,
				hold_action: e?.hold_action,
				double_tap_action: e?.double_tap_action,
				main_entity_tap_action: e?.main_entity_tap_action,
				main_entity_hold_action: e?.main_entity_hold_action,
				main_entity_double_tap_action: e?.main_entity_double_tap_action
			}];
		}
		_selectStatusItem(e) {
			this._selectedStatusIndex = e;
		}
		_addStatusItem() {
			let e = this._getStatusItems();
			this._selectedStatusIndex = e.length, this._updateConfig(q(r, { entities: [...e, { entity: "" }] }));
		}
		_removeStatusItem(e) {
			let t = this._getStatusItems();
			if (t.length <= 1) {
				this._updateConfig(J("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedStatusIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveStatusItem(e, t) {
			let n = this._getStatusItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedStatusIndex = i, this._updateConfig(q(r, { entities: a }));
		}
		_updateStatusItem(e, i) {
			let a = this._getStatusItems(), o = {
				...a[e] || {},
				...i
			};
			if (i.entity === "" && t(o), Array.isArray(this._config?.entities)) {
				let t = [...a];
				t[e] = o;
				let n = { entities: t };
				t.length > 1 && Object.assign(n, q(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(J("main_entity", n));
				return;
			}
			this._updateConfig({
				main_entity: o.entity || "",
				accent_on_color: o.accent_on_color || "",
				accent_off_color: o.accent_off_color || "",
				main_entity_icon_source: o.main_entity_icon_source || "",
				main_entity_icon: o.main_entity_icon || "",
				main_entity_icon_on: o.main_entity_icon_on || "",
				main_entity_icon_off: o.main_entity_icon_off || "",
				state_template: o.state_template || "",
				label_template: o.label_template || "",
				tap_action: o.tap_action,
				hold_action: o.hold_action,
				double_tap_action: o.double_tap_action,
				main_entity_tap_action: o.main_entity_tap_action,
				main_entity_hold_action: o.main_entity_hold_action,
				main_entity_double_tap_action: o.main_entity_double_tap_action
			});
		}
		_renderInput(e, t, n = "", r = {}) {
			return mi.call(this, e, t, n, r);
		}
		_renderTemplateInput(e, t, n = {}) {
			return hi.call(this, e, t, n);
		}
		_renderNumberInput(e, t, n = {}) {
			return gi.call(this, e, t, n);
		}
		_renderColor(e, t) {
			return Ci.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return wi.call(this, e, t, n, r);
		}
		_renderEntity(e, t, n) {
			return La.call(this, e, t, n);
		}
		_renderStatusItemInteractions(e, t, n, r) {
			let i = {
				hass: this.hass,
				_config: t,
				_t: (e, t) => this._t(e, t),
				requestUpdate: () => this.requestUpdate(),
				_updateConfig: (t) => this._updateStatusItem(e, t)
			};
			return $i.call(i, {
				interactions: [
					{
						key: "tap_action",
						formKey: "tap_action",
						label: "Tap behavior",
						defaultAction: n,
						defaultVisible: !0
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
						key: "main_entity_tap_action",
						formKey: "icon_tap_action",
						label: "Icon tap behavior",
						defaultAction: r,
						defaultVisible: !0
					},
					{
						key: "main_entity_hold_action",
						formKey: "icon_hold_action",
						label: "Icon hold behavior",
						defaultAction: "none"
					},
					{
						key: "main_entity_double_tap_action",
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
			return Ra.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
			return zr.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Vr.call(this, e);
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
			}), zr.call(a, e, t, r);
		}
		_isImageIcon(e) {
			return Ir(e);
		}
		_resolveIconPath(e) {
			return Lr(e);
		}
		_getInlineSvg(e) {
			return L.call(this, e, { forceColor: !0 });
		}
		_renderStatusSection() {
			return zc.call(this);
		}
		render() {
			return w`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card v{version}", { version: Z.status })}
        </div>
      </div>
    `;
		}
		static styles = [_s, Yc];
	};
	customElements.define("orbit-status-card-editor", e);
	function t(e) {
		Object.assign(e, q(n));
	}
	var n = [
		"accent_on_color",
		"accent_off_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"state_template",
		"label_template",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action"
	], r = ["main_entity", ...n], i = [
		"tracker_entity",
		"eta_entity",
		"battery_entity_1",
		"battery_entity_2",
		"accent_on_color",
		"accent_off_color",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action"
	], a = ["eta_entity"], o = [
		"entity",
		"accent_on_color",
		"accent_off_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"main_entity_icon_svg_color_override",
		"main_entity_icon_on_svg_color_override",
		"main_entity_icon_off_svg_color_override",
		"state_template",
		"label_template",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action"
	], s = /* @__PURE__ */ "type.mode.status_name.main_entity.tracker_entity.eta_entity.battery_entity_1.battery_entity_2.accent_on_color.accent_off_color.main_entity_icon_source.main_entity_icon.main_entity_icon_on.main_entity_icon_off.main_entity_icon_svg_color_override.main_entity_icon_on_svg_color_override.main_entity_icon_off_svg_color_override.state_template.label_template.tap_action.hold_action.double_tap_action.main_entity_tap_action.main_entity_hold_action.main_entity_double_tap_action.wrap.items_per_row.separate_cards.entities.grid_options.view_layout".split(".");
	function c(e) {
		let t = {}, n = /* @__PURE__ */ new Set();
		return s.forEach((r) => {
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(l) : e[r], n.add(r));
		}), Object.keys(e).forEach((r) => {
			n.has(r) || (t[r] = e[r]);
		}), t;
	}
	function l(e) {
		return !e || typeof e != "object" || Array.isArray(e) ? e : u(e, o);
	}
	function u(e, t) {
		let n = {}, r = /* @__PURE__ */ new Set();
		return t.forEach((t) => {
			Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
		}), Object.keys(e).forEach((t) => {
			r.has(t) || (n[t] = e[t]);
		}), n;
	}
})), Qc = /* @__PURE__ */ t((() => {
	k(), ct(), I(), sc(), At(), Ft(), Jt(), Qt(), en(), an(), ln(), B(), nc(), Dc(), Ic(), Rc(), Zc(), Q();
	var e = class extends O {
		static svgCache = z;
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
				_statusItems: { type: Array }
			};
		}
		static getConfigElement() {
			return document.createElement("orbit-status-card-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-status-card",
				mode: "standard",
				main_entity: ""
			};
		}
		getLayoutOptions() {
			if (this._config?.mode === "icon_only") {
				let e = yc(this._config).length, n = t(this._config, e);
				return {
					grid_columns: Math.max(1, n),
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
			this._config = e;
			let t = e.accent_off_color || "theme";
			this._nameColor = this._computeFullColor(t), this._statusColor = this._computeFullColor(t), this._iconColor = this._computeIconColor(t), this._circleColor = this._computeCircleColor(t), this._statusItems = [];
		}
		willUpdate(e) {
			return vc.call(this, e);
		}
		shouldUpdate(e) {
			return tn.call(this, e, this._getRelevantEntities(), {
				hasTemplates: nn(this._config),
				includeZones: this._config?.mode === "person"
			});
		}
		_handleAction(e, t = null) {
			return Ke.call(this, e, t);
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
				M.call(this, e, this._config.main_entity, this._getCardTapAction(), this._getCardDoubleTapAction());
			}
		}
		_handleDoubleTap(e) {
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityDoubleTap(e);
				return;
			}
			N.call(this, e, this._config.main_entity, this._getCardDoubleTapAction());
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
			let t = this._config.main_entity;
			t && M.call(this, e, t, this._getMainEntityTapAction() || this._getCardTapAction(), this._getMainEntityDoubleTapAction());
		}
		_handleMainEntityDoubleTap(e) {
			N.call(this, e, this._config.main_entity, this._getMainEntityDoubleTapAction());
		}
		_handleCardTapAction() {
			let e = this._getCardTapAction(), t = this._config.main_entity;
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
				this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.main_entity);
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
			t && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.main_entity));
		}
		_handleStatusItemClick(e, t = 0) {
			if (this._statusItemLongPressTriggered) {
				this._statusItemLongPressTriggered = !1, this._stopEvent(e);
				return;
			}
			let n = this._getStatusItemEntityId(t);
			if (!n) return;
			let r = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t), i = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t);
			M.call(this, e, n, r?.action ? r : { action: "more-info" }, i);
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
			return Xe.call(this, e);
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
			return lt.call(this, e);
		}
		_computeIconColor(e) {
			return ut.call(this, e);
		}
		_computeCircleColor(e) {
			return dt.call(this, e);
		}
		_getMainStateObj() {
			let e = this._config.main_entity;
			return e && this.hass ? this.hass.states[e] : null;
		}
		formatState(e) {
			return Nt(e);
		}
		_getEntityActiveState(e) {
			return Pt(e);
		}
		_getBinarySensorIcon(e) {
			return Rt(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return zt.call(this, e, t);
		}
		_isImageIcon(e) {
			return Bt(e);
		}
		_resolveIconPath(e) {
			return Vt(e);
		}
		_getInlineSvg(e, t = !0) {
			return L.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return Ut(e, t);
		}
		_evaluateStateTemplate(e, t) {
			return $t.call(this, e, t);
		}
		_getRelevantEntities() {
			return this._config?.mode === "icon_only" ? yc(this._config).map((e) => e.entity || e.main_entity) : [
				this._config?.main_entity,
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
				this._mainIconHoldFired = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.main_entity);
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
			t && this._mainIconPointerDown && !this._mainIconHoldFired && (this._clearMainIconHoldTimer(), this._mainIconHoldFired = !0, this._mainIconSuppressClick = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.main_entity));
		}
		_clearMainIconHoldTimer() {
			this._mainIconHoldTimer &&= (clearTimeout(this._mainIconHoldTimer), null);
		}
		_clearStatusItemHoldTimer() {
			this._statusItemHoldTimer &&= (clearTimeout(this._statusItemHoldTimer), null);
		}
		_clearDoubleTapTimer() {
			return qe.call(this);
		}
		_getCardHoldAction() {
			return A(this._config.hold_action) ? this._config.hold_action : null;
		}
		_getCardDoubleTapAction() {
			return A(this._config.double_tap_action) ? this._config.double_tap_action : null;
		}
		_getMainEntityHoldAction() {
			return A(this._config.main_entity_hold_action) ? this._config.main_entity_hold_action : null;
		}
		_getMainEntityTapAction() {
			let e = this._config.main_entity_tap_action;
			return e?.action === "none" ? null : e?.action ? e : this._isIconOnlyMode() || this._isPersonMode() ? null : { action: "more-info" };
		}
		_getMainEntityDoubleTapAction() {
			return A(this._config.main_entity_double_tap_action) ? this._config.main_entity_double_tap_action : null;
		}
		_getCardTapAction() {
			let e = {
				action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate",
				navigation_path: this._navigationPath || "/lovelace/home"
			}, t = this._config.tap_action;
			return t?.action ? t : e;
		}
		_getStatusItemCardTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : { action: "more-info" };
		}
		_getStatusItemCardHoldAction(e = 0) {
			let t = this._statusItems?.[e];
			return A(t?.hold_action) ? t.hold_action : A(this._config.hold_action) ? this._config.hold_action : null;
		}
		_getStatusItemCardDoubleTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return A(t?.double_tap_action) ? t.double_tap_action : A(this._config.double_tap_action) ? this._config.double_tap_action : null;
		}
		_getStatusItemMainEntityTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.main_entity_tap_action?.action && t.main_entity_tap_action.action !== "none" ? t.main_entity_tap_action : this._config.main_entity_tap_action?.action && this._config.main_entity_tap_action.action !== "none" ? this._config.main_entity_tap_action : this._getStatusItemCardTapAction(e);
		}
		_getStatusItemMainEntityDoubleTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return A(t?.main_entity_double_tap_action) ? t.main_entity_double_tap_action : A(this._config.main_entity_double_tap_action) ? this._config.main_entity_double_tap_action : null;
		}
		_getStatusItemMainEntityHoldAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.main_entity_hold_action?.action ? t.main_entity_hold_action.action === "none" ? null : t.main_entity_hold_action : this._config.main_entity_hold_action?.action ? this._config.main_entity_hold_action.action === "none" ? null : this._config.main_entity_hold_action : null;
		}
		_isIconOnlyMode() {
			return this._config?.mode === "icon_only";
		}
		_isPersonMode() {
			return this._config?.mode === "person";
		}
		_getStatusItemEntityId(e = 0) {
			let t = this._statusItems?.[e];
			return t?.entityId || t?.entity || this._config.main_entity;
		}
		_getStatusColumnCount(e = this._statusItems?.length || 1) {
			return t(this._config, e);
		}
		_getStatusRowCount(e = this._statusItems?.length || 1) {
			return n(this._config, e);
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
			return Oc.call(this);
		}
		static styles = Lc;
	};
	function t(e = {}, t = 1) {
		return ac({
			config: e,
			count: t,
			perRowKey: "items_per_row"
		});
	}
	function n(e = {}, t = 1) {
		return oc({
			config: e,
			count: t,
			perRowKey: "items_per_row"
		});
	}
	kt({
		tag: "orbit-status-card",
		cardClass: e,
		name: "Orbit Status Card",
		description: "Responsive status card",
		version: Z.status,
		getEntitySuggestion: i
	});
	var r = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function i(e, t) {
		let n = on(t);
		if (n === "person") return { config: {
			type: "custom:orbit-status-card",
			mode: "person",
			main_entity: t
		} };
		if (r.has(n)) return null;
		let i = {
			label: X(e, "Standard"),
			config: {
				type: "custom:orbit-status-card",
				mode: "standard",
				main_entity: t
			}
		};
		return cn(e, t) ? [i, {
			label: X(e, "Icon only"),
			config: {
				type: "custom:orbit-status-card",
				mode: "icon_only",
				main_entity: t
			}
		}] : { config: i.config };
	}
}));
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function $c(e) {
	!e.has("_config") && !e.has("hass") || (this._actions = el(this._config).map((e) => tl.call(this, e)));
}
function el(e = {}) {
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
function tl(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.accent_color || this._config.accent_color || "theme", i = rl(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r), s = nl(e, t), c = n?.attributes?.icon || this.hass?.entities?.[t]?.icon || (n ? this._getDefaultDomainIcon(n.entity_id.split(".")[0], n) : "mdi:play-circle"), l = s === "custom" && e.main_entity_icon ? "main_entity_icon" : s === "custom" && e.icon ? "icon" : "", u = s === "custom" && (e.main_entity_icon || e.icon) || c;
	return {
		...e,
		entityId: t,
		icon: u,
		iconColor: o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: l ? this._getSvgColorOverride(e, l) : !0
	};
}
function nl(e, t) {
	let n = e.main_entity_icon_source, r = !!t, i = !!(e.main_entity_icon || e.icon);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function rl(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
var il = e((() => {}));
//#endregion
//#region src/cards/action/renders/action-card.js
function al() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t), i = sl(e, n);
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
            ${e.map((e, r) => ol.call(this, e, t * n + r))}
            ${cl(e.length, n, "action-spacer")}
          </div>
        `)}
      </div>
    </ha-card>
  `;
}
function ol(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "";
	return w`
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
      <div class="circle action-circle">
        ${this._isImageIcon(e.icon) ? w`
              <div class="main-image-icon">
                ${r ? V(r) : w`<img src=${n} alt="" />`}
              </div>
            ` : w`
              <ha-icon
                class="main-icon"
                .icon=${e.icon}
              ></ha-icon>
            `}
      </div>
    </ha-card>
  `;
}
function sl(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function cl(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => w`
    <div class=${n}></div>
  `);
}
var ll = e((() => {
	k(), H();
})), ul, dl = e((() => {
	k(), dr(), pr(), ul = [
		ur,
		fr,
		c`
    ha-card {
      aspect-ratio: 0.94 / 1;
      border-radius: 15px;
    }

    ha-card.grouped {
      aspect-ratio: auto;
      container-type: inline-size;
    }

    ha-card.grouped.separate-cards {
      background: transparent;
      border: none;
      box-shadow: none;
      overflow: visible;
    }

    .action-container {
      display: flex;
      flex-direction: column;
      gap: clamp(4px, 2cqw, 10px);
      height: auto;
      padding: 0;
      box-sizing: border-box;
    }

    .action-row {
      display: flex;
      flex: 1 1 auto;
      gap: clamp(4px, 2cqw, 10px);
      min-height: 0;
      width: 100%;
    }

    ha-card.grouped .action-row {
      flex: 0 0 auto;
    }

    ha-card.grouped.separate-cards .action-container {
      gap: clamp(5px, 1.4cqw, 8px);
    }

    ha-card.grouped.separate-cards .action-row {
      gap: clamp(5px, 1.4cqw, 8px);
    }

    .action-button {
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
      background: transparent;
      border: none;
      box-shadow: none;
      border-radius: 0;
      overflow: visible;
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
      overflow: hidden;
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
      --mdc-icon-size: 58%;
    }

    .action-circle .main-image-icon {
      width: 58%;
      height: 58%;
    }
  `
	];
}));
//#endregion
//#region src/editors/action/sections/action.js
function fl() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", i = Math.max(1, Number(this._config?.actions_per_row) || 3), a = !!this._config?.wrap && e.length > i, o = !a && e.length > 6 || a && i > 6;
	return w`
    <div class="section">
      <div class="action-group-options">
        <label class="action-wrap-toggle">
          <span>${this._t("Wrap")}</span>
          <ha-switch
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		actions_per_row: e.target.checked ? this._config?.actions_per_row || 3 : this._config?.actions_per_row
	})}
          ></ha-switch>
        </label>

        ${e.length > 1 ? w`
              <label class="action-wrap-toggle">
                <span>${this._t("Separate cards")}</span>
                <ha-switch
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                ></ha-switch>
              </label>
            ` : ""}

      ${this._config?.wrap ? w`
            <div class="action-per-row-field">
              ${this._renderNumberInput("Actions per row", "actions_per_row", {
		value: this._config?.actions_per_row || 3,
		min: 1,
		step: 1,
		onValueChanged: (e) => this._updateConfig({ actions_per_row: Math.max(1, Number(e) || 1) })
	})}
            </div>
          ` : ""}
      </div>

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

        ${fa.call(this, {
		value: n.entity || "",
		filterOptions: ml,
		activeFilter: r,
		onValueChanged: (e) => this._updateActionItem(t, { entity: e })
	})}
      </div>

      ${this._renderColorControl(["Accent", "Color"], `action-${t}-accent_color`, n.accent_color || "", (e) => this._updateActionItem(t, { accent_color: e }))}

      ${pl.call(this, t, n)}

      ${n.entity ? this._renderActionItemInteractions(t, n) : ""}
    </div>
  `;
}
function pl(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateActionItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderActionItemIconInput(t, r, e)
	};
	return G.call(r, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
		customIconKeys: ["main_entity_icon"],
		renderCustom() {
			return this._renderIconInput("", "main_entity_icon");
		}
	});
}
var ml, hl = e((() => {
	k(), Ha(), K(), ml = [
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
})), gl, _l = e((() => {
	k(), gl = c`
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
`;
})), vl = /* @__PURE__ */ t((() => {
	k(), to(), hl(), vs(), _l(), B(), pn(), nc(), Q();
	var e = class extends O {
		static svgCache = z;
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
			super.connectedCallback(), Ua(this);
		}
		disconnectedCallback() {
			Wa(this), super.disconnectedCallback();
		}
		setConfig(e) {
			this._config = e || {}, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(e).length - 1);
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		_updateConfig(e) {
			this._config = o(vi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
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
			this._selectedActionIndex = e.length, this._updateConfig(q(r, { entities: [...e, { entity: "" }] }));
		}
		_removeActionItem(e) {
			let t = this._getActionItems();
			if (t.length <= 1) {
				this._updateConfig(J("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedActionIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveActionItem(e, t) {
			let n = this._getActionItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedActionIndex = i, this._updateConfig(q(r, { entities: a }));
		}
		_updateActionItem(e, i) {
			let a = this._getActionItems(), o = {
				...a[e] || {},
				...i
			};
			if (i.entity === "" && t(o), Array.isArray(this._config?.entities)) {
				let t = [...a];
				t[e] = o;
				let n = { entities: t };
				t.length > 1 && Object.assign(n, q(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(J("main_entity", n));
				return;
			}
			this._updateConfig({
				main_entity: o.entity || "",
				accent_color: o.accent_color || "",
				main_entity_icon_source: o.main_entity_icon_source || "",
				main_entity_icon: o.main_entity_icon || "",
				tap_action: o.tap_action,
				hold_action: o.hold_action,
				double_tap_action: o.double_tap_action
			});
		}
		_getColorStyle(e) {
			return Ka(e);
		}
		_getColorPickerValue(e) {
			return qa(e);
		}
		_renderActionItemInteractions(e, t) {
			let n = {
				hass: this.hass,
				_config: t,
				_t: (e, t) => this._t(e, t),
				requestUpdate: () => this.requestUpdate(),
				_updateConfig: (t) => this._updateActionItem(e, t)
			};
			return $i.call(n, {
				interactions: [
					{
						key: "tap_action",
						formKey: "tap_action",
						label: "Tap behavior",
						defaultAction: un(t.entity, "toggle"),
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
		_renderColor(e, t) {
			return Ci.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return wi.call(this, e, t, n, r);
		}
		_renderEntity(e, t, n) {
			return La.call(this, e, t, n);
		}
		_renderNumberInput(e, t, n = {}) {
			return gi.call(this, e, t, n);
		}
		_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
			return zr.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Vr.call(this, e);
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
			}), zr.call(a, e, t, r);
		}
		_isImageIcon(e) {
			return Ir(e);
		}
		_resolveIconPath(e) {
			return Lr(e);
		}
		_getInlineSvg(e) {
			return L.call(this, e, { forceColor: !0 });
		}
		_renderActionSection() {
			return fl.call(this);
		}
		render() {
			return w`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card v{version}", { version: Z.action })}
        </div>
      </div>
    `;
		}
		static styles = [_s, gl];
	};
	customElements.define("orbit-action-card-editor", e);
	function t(e) {
		Object.assign(e, q(n));
	}
	var n = [
		"accent_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"tap_action",
		"hold_action",
		"double_tap_action"
	], r = ["main_entity", ...n], i = [
		"entity",
		"accent_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_svg_color_override",
		"tap_action",
		"hold_action",
		"double_tap_action"
	], a = [
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
	function o(e) {
		let t = {}, n = /* @__PURE__ */ new Set();
		return a.forEach((r) => {
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(s) : e[r], n.add(r));
		}), Object.keys(e).forEach((r) => {
			n.has(r) || (t[r] = e[r]);
		}), t;
	}
	function s(e) {
		return !e || typeof e != "object" || Array.isArray(e) ? e : c(e, i);
	}
	function c(e, t) {
		let n = {}, r = /* @__PURE__ */ new Set();
		return t.forEach((t) => {
			Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
		}), Object.keys(e).forEach((t) => {
			r.has(t) || (n[t] = e[t]);
		}), n;
	}
})), yl = /* @__PURE__ */ t((() => {
	k(), ct(), pn(), I(), sc(), At(), Jt(), an(), ln(), B(), il(), ll(), dl(), vl(), Q();
	var e = class extends O {
		static svgCache = z;
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
			let e = el(this._config).length, n = t(this._config, e);
			return {
				grid_columns: Math.max(1, n * 1),
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
			return $c.call(this, e);
		}
		shouldUpdate(e) {
			return tn.call(this, e, el(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: nn(this._config) });
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
			return qe.call(this);
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
			return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : un(this._getActionEntityId(e), "toggle");
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
			return t(this._config, e);
		}
		_getActionRowCount(e = this._actions?.length || 1) {
			return oc({
				config: this._config,
				count: e,
				perRowKey: "actions_per_row"
			});
		}
		_handleAction(e, t = null) {
			return Ke.call(this, e, t);
		}
		_computeFullColor(e) {
			return lt.call(this, e);
		}
		_computeIconColor(e) {
			return ut.call(this, e);
		}
		_computeCircleColor(e) {
			return dt.call(this, e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return zt.call(this, e, t);
		}
		_isImageIcon(e) {
			return Bt(e);
		}
		_resolveIconPath(e) {
			return Vt(e);
		}
		_getInlineSvg(e, t = !0) {
			return L.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return Ut(e, t);
		}
		_clearHoldTimer() {
			this._holdTimer &&= (clearTimeout(this._holdTimer), null);
		}
		_stopEvent(e) {
			e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
		}
		render() {
			return al.call(this);
		}
		static styles = ul;
	};
	function t(e = {}, t = 1) {
		return ac({
			config: e,
			count: t,
			perRowKey: "actions_per_row"
		});
	}
	kt({
		tag: "orbit-action-card",
		cardClass: e,
		name: "Orbit Action Card",
		description: "Compact scene, script, and automation launcher",
		version: Z.action,
		getEntitySuggestion: r
	});
	var n = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function r(e, t) {
		return n.has(on(t)) ? { config: {
			type: "custom:orbit-action-card",
			main_entity: t
		} } : null;
	}
})), bl, xl = e((() => {
	k(), bl = c`
  ha-card.deck-card {
    border-radius: var(--ha-card-border-radius, 15px);
    overflow: visible;
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

  .deck-spacer {
    visibility: hidden;
    pointer-events: none;
  }

  .deck-tabs {
    display: flex;
    align-items: end;
    gap: 4px;
    border-bottom: 1px solid var(--divider-color);
    overflow-x: auto;
  }

  .deck-tab {
    min-width: 72px;
    min-height: 44px;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    color: inherit;
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

  .deck-card.tabs.tab-width-equal .deck-tab {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-card.tabs.tab-width-dynamic .deck-tab {
    flex: 0 0 auto;
  }

  .deck-card.tabs.tab-width-user .deck-tab {
    flex: 0 0 var(--orbit-deck-tab-width, 120px);
    min-width: var(--orbit-deck-tab-width, 120px);
  }

  .deck-tab.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
    opacity: 1;
  }

  .deck-tab ha-icon {
    --mdc-icon-size: 20px;
  }

  .deck-tab-content {
    padding-top: var(--orbit-deck-gap, 8px);
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
`;
}));
//#endregion
//#region src/editors/deck-card-editor.js
function Sl(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return El.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "decks" && Array.isArray(e[r]) ? e[r].map(Cl) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Cl(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = {}, n = /* @__PURE__ */ new Set();
	return Dl.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
var wl, Tl, El, Dl, Ol = e((() => {
	k(), to(), vs(), _l(), nc(), Q(), wl = Symbol.for("orbit-deck-card-preview-selected-index"), Tl = class extends O {
		static properties = {
			hass: { attribute: !1 },
			lovelace: { attribute: !1 },
			_config: { state: !0 },
			_selectedTab: { state: !0 },
			_selectedDeckIndex: { state: !0 }
		};
		constructor() {
			super(), this._config = {}, this._selectedTab = "setup", this._selectedDeckIndex = 0;
		}
		setConfig(e) {
			this._config = {
				...e || {},
				layout: e?.layout === "tabs" ? "tabs" : "wrap"
			}, this._selectedDeckIndex = Math.min(this._selectedDeckIndex || 0, Math.max(0, this._getDeckItems().length - 1));
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		_updateConfig(e) {
			this._config = Sl(vi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._config },
				bubbles: !0,
				composed: !0
			}));
		}
		_getDeckItems(e = this._config) {
			return Array.isArray(e?.decks) ? e.decks.map((e) => ({
				attributes: e?.attributes || {},
				card: e?.card || {}
			})) : [];
		}
		_selectDeckItem(e) {
			this._selectedDeckIndex = e, this._dispatchPreviewSelection(e);
		}
		_dispatchPreviewSelection(e) {
			this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: {
					...this._config,
					[wl]: e
				} },
				bubbles: !0,
				composed: !0
			}));
		}
		_addDeckItem() {
			let e = this._getDeckItems();
			this._selectedDeckIndex = e.length, this._selectedTab = "card", this._updateConfig({ decks: [...e, {
				attributes: {},
				card: {}
			}] });
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
			this._updateDeckItem(e, { card: t });
		}
		_renderInput(e, t, n = "", r = {}) {
			return mi.call(this, e, t, n, r);
		}
		_renderNumberInput(e, t, n = {}) {
			return gi.call(this, e, t, n);
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
				this._selectedTab = e;
			}}
            >
              ${e === "setup" ? "Setup" : "Card"}
            </button>
          `)}
        </div>

        <ha-selector
          class="editor-header-button-toggle deck-layout-toggle"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
				label: "Wrap",
				value: "wrap"
			}, {
				label: "Tabs",
				value: "tabs"
			}] } }}
          .value=${this._config?.layout || "wrap"}
          @value-changed=${(e) => this._updateConfig({ layout: e.detail.value || "wrap" })}
        ></ha-selector>
      </div>
    `;
		}
		_renderSetup() {
			return w`
      <div class="section">
        ${this._config?.layout === "wrap" ? this._renderNumberInput("Items per row", "items_per_row", {
				value: this._config?.items_per_row || 1,
				min: 1,
				step: 1,
				onValueChanged: (e) => this._updateConfig({ items_per_row: Math.max(1, Number(e) || 1) })
			}) : w`
              ${this._renderTabWidthModeControl()}
              ${this._renderInput("Tab font size", "tab_font_size", "18px", {
				value: this._config?.tab_font_size || "",
				onValueChanged: (e) => this._updateConfig({ tab_font_size: e || void 0 })
			})}
            `}
      </div>
    `;
		}
		_renderTabWidthModeControl() {
			return w`
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>Tab width</label>

          <ha-selector
            class="editor-header-button-toggle deck-tab-width-toggle"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: [
				{
					label: "Equal",
					value: "equal"
				},
				{
					label: "Dynamic",
					value: "dynamic"
				},
				{
					label: "User",
					value: "user"
				}
			] } }}
            .value=${this._config?.tab_width_mode || "dynamic"}
            @value-changed=${(e) => this._updateConfig({ tab_width_mode: e.detail.value || "dynamic" })}
          ></ha-selector>
        </div>
      </div>
    `;
		}
		_renderDeckTabs(e, t) {
			let n = Math.max(1, Number(this._config?.items_per_row) || 1), r = this._config?.layout === "wrap" && e.length > n;
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
              ${n + 1}
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

          ${e.length > 0 ? w`
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
		_renderCardPicker(e, t) {
			return t?.card?.type ? w`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${t.card}
          @config-changed=${(t) => {
				t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
			}}
        ></hui-card-element-editor>
      ` : w`
      <hui-card-picker
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .cardPicked=${(t) => this._updateDeckCard(e, t)}
        @config-changed=${(t) => {
				t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
			}}
      ></hui-card-picker>
    `;
		}
		_renderCard() {
			let e = this._getDeckItems(), t = Math.min(this._selectedDeckIndex || 0, Math.max(0, e.length - 1)), n = e[t];
			return w`
      <div class="section">
        ${this._renderDeckTabs(e, t)}

        ${n ? w`
              ${this._config?.layout === "tabs" ? w`
                    <div class="field-grid two-columns">
                      ${this._renderInput("Tab icon", "tab_icon", "mdi:home", {
				value: n.attributes?.icon || "",
				onValueChanged: (e) => this._updateDeckAttributes(t, { icon: e || void 0 })
			})}

                      ${this._renderInput("Tab name", "tab_name", "", {
				value: n.attributes?.name || "",
				onValueChanged: (e) => this._updateDeckAttributes(t, { name: e || void 0 })
			})}
                    </div>

                    <label class="deck-default-toggle">
                      <span>Default</span>
                      <ha-switch
                        .checked=${!!n.attributes?.default}
                        @change=${(e) => this._setDefaultDeck(t, e.target.checked)}
                      ></ha-switch>
                    </label>

                    ${this._config?.tab_width_mode === "user" ? this._renderInput("Tab width", "tab_width", "120px", {
				value: n.attributes?.width || "",
				onValueChanged: (e) => this._updateDeckAttributes(t, { width: e || void 0 })
			}) : ""}
                  ` : ""}

              <div class="sub-section-title">Card:</div>
              <div class="deck-card-editor-frame">
                ${this._renderCardPicker(t, n)}
              </div>
            ` : w`<div class="deck-empty-editor">Add a card to start.</div>`}
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
          ${this._t("Orbit Deck Card v{version}", { version: Z.deck })}
        </div>
      </div>
    `;
		}
		static styles = [
			_s,
			gl,
			c`
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
        width: auto;
        min-width: 180px;
        margin-bottom: 6px;
      }

      .deck-tab-width-toggle {
        width: auto;
        min-width: 260px;
      }

      .field-grid.two-columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 12px;
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

      .deck-empty-editor {
        color: var(--secondary-text-color);
        padding: 24px 0;
      }
    `
		];
	}, customElements.define("orbit-deck-card-editor", Tl), El = [
		"type",
		"layout",
		"items_per_row",
		"tab_font_size",
		"tab_width_mode",
		"decks",
		"grid_options",
		"view_layout"
	], Dl = ["attributes", "card"];
})), kl = /* @__PURE__ */ t((() => {
	k(), At(), Q(), xl(), Ol();
	var e = class extends O {
		static get properties() {
			return {
				hass: {},
				_config: { type: Object },
				_deckCards: { state: !0 },
				_selectedIndex: { state: !0 }
			};
		}
		constructor() {
			super(), this._config = {}, this._deckCards = [], this._selectedIndex = 0, this._cardHelpers = null, this._cardBuildKey = "", this._defaultSelectionKey = "";
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
			let e = t(this._config), n = Math.max(e.length, 1), r = this._getColumnCount(n);
			return {
				grid_columns: Math.max(1, r * 2),
				grid_min_columns: 1,
				grid_rows: "auto"
			};
		}
		setConfig(e) {
			this._config = {
				...e,
				layout: e?.layout === "tabs" ? "tabs" : "wrap"
			};
			let i = t(this._config), a = r(i), o = n(i);
			Number.isInteger(e?.[wl]) ? this._selectedIndex = Math.min(Math.max(0, e[wl]), Math.max(0, i.length - 1)) : a === this._defaultSelectionKey ? this._selectedIndex = Math.min(this._selectedIndex || 0, Math.max(0, i.length - 1)) : (this._selectedIndex = o, this._defaultSelectionKey = a), this._scheduleCardBuild();
		}
		updated(e) {
			e.has("hass") && this._deckCards.forEach((e) => {
				e.element && (e.element.hass = this.hass);
			});
		}
		_getColumnCount(e) {
			return this._config?.layout === "tabs" ? 1 : Math.max(1, Math.min(e, Number(this._config?.items_per_row) || 1));
		}
		async _scheduleCardBuild() {
			let e = t(this._config), n = JSON.stringify(e.map((e) => e.card || {}));
			if (n === this._cardBuildKey) return;
			this._cardBuildKey = n, this._deckCards = e.map((e) => ({ item: e }));
			let r = await this._loadCardHelpers(), i = e.map((e) => this._createDeckEntry(e, r));
			n === this._cardBuildKey && (this._deckCards = i);
		}
		async _loadCardHelpers() {
			return !this._cardHelpers && window.loadCardHelpers && (this._cardHelpers = await window.loadCardHelpers()), this._cardHelpers;
		}
		_createDeckEntry(e, t) {
			let n = e?.card || {};
			if (!n.type) return {
				item: e,
				error: "No card type configured"
			};
			try {
				let r = t.createCardElement(n);
				return r.hass = this.hass, r.addEventListener("ll-rebuild", () => this._scheduleCardBuild(), { once: !0 }), {
					item: e,
					element: r
				};
			} catch (t) {
				return {
					item: e,
					error: t?.message || "Unable to create card"
				};
			}
		}
		_selectTab(e) {
			this._selectedIndex = e;
		}
		_renderDeckEntry(e) {
			return e?.element ? e.element : w`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">Configuration error</div>
        <div>${e?.error || "No card configured"}</div>
      </ha-card>
    `;
		}
		_renderWrap(e) {
			let t = this._getColumnCount(e.length || 1);
			return w`
      <ha-card
        class="deck-card wrap"
        style="--deck-columns:${t};"
      >
        <div class="deck-wrap">
          ${a(this._deckCards, t).map((e) => w`
            <div class="deck-row">
              ${e.map((e) => w`
                <div class="deck-item">
                  ${this._renderDeckEntry(e)}
                </div>
              `)}
              ${o(e.length, t)}
            </div>
          `)}
        </div>
      </ha-card>
    `;
		}
		_renderTabs(e) {
			let t = Math.min(this._selectedIndex || 0, Math.max(0, e.length - 1)), n = this._deckCards[t], r = i(this._config), a = this._config?.tab_font_size || "";
			return w`
      <ha-card
        class="deck-card tabs tab-width-${r}"
        style=${a ? `--orbit-deck-tab-font-size:${a};` : ""}
      >
        <div class="deck-tabs" role="tablist">
          ${e.map((e, n) => w`
            <button
              type="button"
              class="deck-tab ${n === t ? "active" : ""}"
              role="tab"
              aria-selected=${n === t ? "true" : "false"}
              style=${r === "user" ? `--orbit-deck-tab-width:${e.attributes?.width || "120px"};` : ""}
              @click=${() => this._selectTab(n)}
            >
              ${e.attributes?.icon ? w`<ha-icon .icon=${e.attributes.icon}></ha-icon>` : ""}
              <span>${e.attributes?.name || `Card ${n + 1}`}</span>
            </button>
          `)}
        </div>
        <div class="deck-tab-content">
          ${this._renderDeckEntry(n)}
        </div>
      </ha-card>
    `;
		}
		render() {
			let e = t(this._config);
			return e.length ? this._config?.layout === "tabs" ? this._renderTabs(e) : this._renderWrap(e) : w`
        <ha-card class="deck-card empty">
          <div>Add card</div>
        </ha-card>
      `;
		}
		static styles = bl;
	};
	function t(e = {}) {
		return Array.isArray(e?.decks) ? e.decks.map((e) => ({
			attributes: e?.attributes || {},
			card: e?.card || {}
		})) : [];
	}
	function n(e = []) {
		return Math.max(0, e.findIndex((e) => e.attributes?.default));
	}
	function r(e = []) {
		return e.map((e, t) => e.attributes?.default ? t : "").join(":");
	}
	function i(e = {}) {
		return [
			"equal",
			"dynamic",
			"user"
		].includes(e?.tab_width_mode) ? e.tab_width_mode : "dynamic";
	}
	function a(e, t = 1) {
		let n = Math.max(1, t), r = [];
		for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
		return r;
	}
	function o(e, t) {
		return Array.from({ length: Math.max(0, t - e) }, () => w`
    <div class="deck-spacer"></div>
  `);
	}
	kt({
		tag: "orbit-deck-card",
		cardClass: e,
		name: "Orbit Deck Card",
		description: "Wrap or tab any Lovelace cards",
		version: Z.deck
	});
})), Al = /* @__PURE__ */ t((() => {
	ic(), Qc(), yl(), kl();
}));
//#endregion
export default Al();
