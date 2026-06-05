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
})), f, p, m, ee, te, ne, h, re, ie, ae, g, oe, se, ce, _, le = e((() => {
	d(), {is: f, defineProperty: p, getOwnPropertyDescriptor: m, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne} = Object, h = globalThis, re = h.trustedTypes, ie = re ? re.emptyScript : "", ae = h.reactiveElementPolyfillSupport, g = (e, t) => e, oe = {
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
	}, se = (e, t) => !f(e, t), ce = {
		attribute: !0,
		type: String,
		converter: oe,
		reflect: !1,
		useDefault: !1,
		hasChanged: se
	}, Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), _ = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ??= []).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = ce) {
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
			return this.elementProperties.get(e) ?? ce;
		}
		static _$Ei() {
			if (this.hasOwnProperty(g("elementProperties"))) return;
			let e = ne(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(g("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(g("properties"))) {
				let e = this.properties, t = [...ee(e), ...te(e)];
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
				let i = (n.converter?.toAttribute === void 0 ? oe : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? oe : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n, r = !1, i) {
			if (e !== void 0) {
				let a = this.constructor;
				if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? se)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
	}, _.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[g("elementProperties")] = /* @__PURE__ */ new Map(), _[g("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: _ }), (h.reactiveElementVersions ??= []).push("2.1.2");
}));
//#endregion
//#region node_modules/lit-html/lit-html.js
function ue(e, t) {
	if (!w(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return pe === void 0 ? t : pe.createHTML(t);
}
function v(e, t, n = e, r) {
	if (t === O) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = C(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = v(e, i._$AS(e, t.values), i, r)), t;
}
var de, fe, y, pe, me, b, he, ge, x, S, C, w, _e, ve, T, ye, be, E, xe, Se, Ce, we, D, O, k, Te, A, Ee, De, Oe, j, M, ke, Ae, je, Me, Ne, Pe, Fe, N = e((() => {
	de = globalThis, fe = (e) => e, y = de.trustedTypes, pe = y ? y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, me = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, he = "?" + b, ge = `<${he}>`, x = document, S = () => x.createComment(""), C = (e) => e === null || typeof e != "object" && typeof e != "function", w = Array.isArray, _e = (e) => w(e) || typeof e?.[Symbol.iterator] == "function", ve = "[ 	\n\f\r]", T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, be = />/g, E = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, Se = /"/g, Ce = /^(?:script|style|textarea|title)$/i, we = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), D = we(1), we(2), we(3), O = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), A = x.createTreeWalker(x, 129), Ee = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === T ? c[1] === "!--" ? o = ye : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = E) : (Ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = E) : o = be : o === E ? c[0] === ">" ? (o = i ?? T, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? E : c[3] === "\"" ? Se : xe) : o === Se || o === xe ? o = E : o === ye || o === be ? o = T : (o = E, i = void 0);
			let d = o === E && e[t + 1].startsWith("/>") ? " " : "";
			a += o === T ? n + ge : l >= 0 ? (r.push(s), n.slice(0, l) + me + n.slice(l) + b + d) : n + b + (l === -2 ? t : d);
		}
		return [ue(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, De = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
			if (this.el = e.createElement(l, r), A.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = A.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(me)) {
						let t = u[o++], n = i.getAttribute(e).split(b), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? ke : r[1] === "?" ? Ae : r[1] === "@" ? je : M
						}), i.removeAttribute(e);
					} else e.startsWith(b) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (Ce.test(i.tagName)) {
						let e = i.textContent.split(b), t = e.length - 1;
						if (t > 0) {
							i.textContent = y ? y.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], S()), A.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], S());
						}
					}
				} else if (i.nodeType === 8) if (i.data === he) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(b, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += b.length - 1;
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = x.createElement("template");
			return n.innerHTML = e, n;
		}
	}, Oe = class {
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
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
			A.currentNode = r;
			let i = A.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new j(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Me(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = A.nextNode(), a++);
			}
			return A.currentNode = x, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, j = class e {
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
			e = v(this, e, t), C(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== O && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? _e(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== k && C(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(ue(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new Oe(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = Te.get(e.strings);
			return t === void 0 && Te.set(e.strings, t = new De(e)), t;
		}
		k(t) {
			w(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(S()), this.O(S()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = fe(e).nextSibling;
				fe(e).remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, M = class {
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
			if (i === void 0) e = v(this, e, t, 0), a = !C(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = v(this, r[n + o], t, o), s === O && (s = this._$AH[o]), a ||= !C(s) || s !== this._$AH[o], s === k ? e = k : e !== k && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, ke = class extends M {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === k ? void 0 : e;
		}
	}, Ae = class extends M {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== k);
		}
	}, je = class extends M {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = v(this, e, t, 0) ?? k) === O) return;
			let n = this._$AH, r = e === k && n !== k || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== k && (n === k || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, Me = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			v(this, e);
		}
	}, Ne = {
		M: me,
		P: b,
		A: he,
		C: 1,
		L: Ee,
		R: Oe,
		D: _e,
		V: v,
		I: j,
		H: M,
		N: Ae,
		U: je,
		B: ke,
		F: Me
	}, Pe = de.litHtmlPolyfillSupport, Pe?.(De, j), (de.litHtmlVersions ??= []).push("3.3.3"), Fe = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new j(t.insertBefore(S(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), Ie, P, Le, Re = e((() => {
	le(), le(), N(), N(), Ie = globalThis, P = class extends _ {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let e = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= e.firstChild, e;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fe(t, this.renderRoot, this.renderOptions);
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
	}, P._$litElement$ = !0, P.finalized = !0, Ie.litElementHydrateSupport?.({ LitElement: P }), Le = Ie.litElementPolyfillSupport, Le?.({ LitElement: P }), (Ie.litElementVersions ??= []).push("4.2.2");
})), ze = e((() => {})), F = e((() => {
	le(), N(), Re(), ze();
}));
//#endregion
//#region src/common/helpers/actions.js
function Be(e, t = null) {
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
		case "call-service": {
			let [t, n] = (e.service || "").split(".");
			if (!t || !n) return;
			this.hass.callService(t, n, e.service_data || {});
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
			let r = Ve(e, t, n);
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
function Ve(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function He(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function Ue(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function We(e) {
	e.stopPropagation();
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction;
	this._handleAction(n, t);
}
function Ge(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction;
	this._handleAction(n, t);
}
function Ke(e) {
	if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return;
	e.stopPropagation();
	let t = this._config.navigate || { navigation_path: "/lovelace/home" };
	this._navigate(t.navigation_path);
}
function qe(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	let t = this._config.main_entity || this._config.entity;
	if (t) {
		let e = this._config.main_entity_tap_action || { action: "more-info" };
		if (e.action !== "none") {
			this._handleAction(e, t);
			return;
		}
	}
	let n = this._config.navigate || { navigation_path: "/lovelace/home" };
	this._navigate(n.navigation_path);
}
var Je = e((() => {}));
//#endregion
//#region src/common/helpers/colors.js
function Ye(e) {
	if (!e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return L(t) ? t : $e(t);
}
function Xe(e) {
	if (!e) return "rgba(var(--color-theme), 0.4)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.4)" : L(t) ? `color-mix(in srgb, transparent, ${t} 70%)` : I(t, 70);
}
function Ze(e) {
	if (!e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return L(t) ? `color-mix(in srgb, transparent, ${t} 20%)` : t === "theme" ? "rgba(var(--color-theme), 0.05)" : I(t, 20);
}
function Qe(e) {
	if (!e) return "rgba(var(--color-theme), 0.25)";
	let t = e.toString().trim();
	return L(t) ? `color-mix(in srgb, ${t} 25%, transparent)` : I(t, 25);
}
function $e(e) {
	let t = et(e);
	return t ? t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))` : "rgb(var(--color-theme))";
}
function I(e, t) {
	return `color-mix(in srgb, transparent, ${$e(e)} ${t}%)`;
}
function L(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function et(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
var R = e((() => {}));
//#endregion
//#region src/common/helpers/card-name.js
function tt(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.room_name) return e.room_name;
	if (e.status_name) return e.status_name;
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
var nt = e((() => {}));
//#endregion
//#region src/common/helpers/entities.js
function rt(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function it(e) {
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
var at = e((() => {}));
//#endregion
//#region src/common/helpers/icons.js
function ot(e, t) {
	let n = this._config.accent_color || "theme";
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function st(e) {
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
function ct(e) {
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
function lt(e, t = null) {
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
function ut(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function dt(e) {
	return e ? e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function z(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = `${e}::${n ? "forced" : "auto"}`, i = this.constructor.svgCache, a = i[r];
	return typeof a == "string" && a !== "loading" ? a : a === "loading" ? (mt(r, this), "") : (i[r] = "loading", mt(r, this), gt(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = pt(e, n), i[r] = e, ht(r);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete i[r], ht(r);
	}), "");
}
function ft(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function pt(e, t) {
	let n = e.replace(/width="[^"]*"/gi, "width=\"100%\"").replace(/height="[^"]*"/gi, "height=\"100%\"");
	return t ? n.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : n;
}
function mt(e, t) {
	t && (B[e] = B[e] || /* @__PURE__ */ new Set(), B[e].add(t));
}
function ht(e) {
	let t = B[e];
	t && (delete B[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function gt(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
var B, _t = e((() => {
	B = {};
}));
//#endregion
//#region src/common/helpers/long-press.js
function vt(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function yt() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function bt(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
var xt = e((() => {}));
//#endregion
//#region src/common/helpers/templates.js
function St(e, t) {
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
var Ct = e((() => {}));
//#endregion
//#region src/common/helpers/updates.js
function wt(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || e.has("_collapsed") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? Et(r, i) : !1;
}
function Tt(e) {
	return Object.keys(e || {}).some((e) => e.endsWith("_template"));
}
function Et(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
var Dt = e((() => {}));
//#endregion
//#region src/common/helpers/suggestions.js
function Ot(e = "") {
	return e.split(".")[0] || "";
}
function kt(e, t) {
	return e?.entities?.[t]?.area_id || "";
}
function At(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
var jt = e((() => {})), V, H = e((() => {
	V = {};
}));
//#endregion
//#region src/cards/room/helpers/lifecycle.js
function Mt(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	this._cardName = this._getCardName("Room");
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, i);
	let a = this._config.main_entity_icon, o = this._config.main_entity_icon_on, s = this._config.main_entity_icon_off, c = "mdi:sofa";
	r ? c = r.attributes?.icon || this._getDefaultDomainIcon(r.entity_id.split(".")[0], r) || "mdi:sofa" : n && this.hass?.areas?.[n] && (c = this.hass.areas[n].icon || "mdi:sofa");
	let l = i && o ? "main_entity_icon_on" : !i && s ? "main_entity_icon_off" : a ? "main_entity_icon" : "";
	this._icon = (i ? o : s) || a || c, this._iconSvgForceColor = l ? this._getSvgColorOverride(l) : !0;
	let u = [
		this._config.status1,
		this._config.status2,
		this._config.status3
	].filter(Boolean);
	this._statusText = u.map((e) => this.hass?.states[e]).map((e) => e ? this.formatState(e) : "—").join(" | "), this._buttonModels = Nt.call(this), this._curveButtonModels = Pt.call(this);
}
function Nt() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => Ft.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		getIconColor: zt,
		getBackgroundColor: Rt
	})).filter(Boolean);
}
function Pt() {
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
		let i = Ft.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			getIconColor: Vt,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function Ft(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = s == null ? this._getEntityActiveState(i) : s === !0 || s === "on", l = Lt.call(this, a, t, i, c), u = this._isImageIcon(l);
	return {
		entityId: t,
		holdAction: this._config?.[`${a}_hold_action`],
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, c) : "",
		icon: l,
		iconColor: r.getIconColor.call(this, a, i, c),
		iconPath: u ? this._resolveIconPath(l) : "",
		svgForceColor: It.call(this, a, c),
		isImage: u
	};
}
function It(e, t) {
	let n = this._config?.[`${e}_icon`], r = t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : n ? `${e}_icon` : "";
	return r ? this._getSvgColorOverride(r) : !0;
}
function Lt(e, t, n, r) {
	let i = this._config?.[`${e}_icon`], a = this._config?.[`${e}_icon_on`], o = this._config?.[`${e}_icon_off`], s = t.split(".")[0], c = this._getDefaultDomainIcon(s, n), l = n?.attributes?.icon || this.hass?.entities?.[t]?.icon;
	return (r ? a : o) || i || l || c || "mdi:help-circle";
}
function Rt(e, t, n) {
	if (n) return this._computeButtonBackground(Bt.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return L(r) ? `color-mix(in srgb, transparent, ${r} 90%)` : !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : I(r, 10);
}
function zt(e, t, n) {
	if (n) return this._computeFullColor(Bt.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return r.startsWith("rgba(") ? r : L(r) ? `color-mix(in srgb, transparent, ${r} 80%)` : I(r, 20);
}
function Bt(e, t) {
	let n = this._config[`${e}_on_color`] || "theme";
	return n === "light" ? this._getEntityColor(t) || this._config.accent_color || "theme" : n;
}
function Vt(e, t, n) {
	let r = this._config.accent_color || "theme";
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : L(r) ? n ? r : `color-mix(in srgb, ${r} 40%, transparent)` : n ? this._computeFullColor(r) : I(r, 40);
}
var Ht = e((() => {
	R();
})), Ut, Wt, Gt, Kt = e((() => {
	Ut = {
		ATTRIBUTE: 1,
		CHILD: 2,
		PROPERTY: 3,
		BOOLEAN_ATTRIBUTE: 4,
		EVENT: 5,
		ELEMENT: 6
	}, Wt = (e) => (...t) => ({
		_$litDirective$: e,
		values: t
	}), Gt = class {
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
})), U, W, qt = e((() => {
	N(), Kt(), U = class extends Gt {
		constructor(e) {
			if (super(e), this.it = k, e.type !== Ut.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
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
	}, U.directiveName = "unsafeHTML", U.resultType = 1, W = Wt(U);
})), G = e((() => {
	qt();
}));
//#endregion
//#region src/cards/room/renders/buttons.js
function Jt(e) {
	return e ? D`
      <button
        class="entity-button"
        style="background:${e.backgroundColor};"
        @click=${this._handleButtonClick}

        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
      >
        ${e.isImage ? D`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? W(this._getInlineSvg(e.iconPath, e.svgForceColor)) : ""}
              </div>
            ` : D`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
      </button>
    ` : null;
}
var Yt = e((() => {
	F(), G();
}));
//#endregion
//#region src/cards/room/renders/room-card.js
function Xt() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return D`
    <ha-card tabindex="0" @click=${this._handleTap}>
      <div class="container">
        <div class="content">

            <div class="header ${e.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._roomColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${this._statusText || ""}
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

          @click=${this._handleMainEntityTap}

          @pointerdown=${this._handleMainEntityPointerDown}

          @pointerup=${this._finishLongPress}
          @pointerleave=${this._cancelLongPress}
          @pointercancel=${this._cancelLongPress}
        >

          ${this._renderCurveButtons()}

          ${this._isImageIcon(this._icon) ? D`
                <div
                  class="main-image-icon"
                  style="color:${this._iconColor};"
                >
                  ${n ? W(n) : D`<img src=${t} alt="" />`}
                </div>
              ` : D`
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
var Zt = e((() => {
	F(), G();
})), Qt, $t, en, K, q, tn, nn, rn, an, on = e((() => {
	N(), {I: Qt} = Ne, $t = (e) => e, en = () => document.createComment(""), K = (e, t, n) => {
		let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
		if (n === void 0) n = new Qt(r.insertBefore(en(), i), r.insertBefore(en(), i), e, e.options);
		else {
			let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
			if (o) {
				let t;
				n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
			}
			if (t !== i || o) {
				let e = n._$AA;
				for (; e !== t;) {
					let t = $t(e).nextSibling;
					$t(r).insertBefore(e, i), e = t;
				}
			}
		}
		return n;
	}, q = (e, t, n = e) => (e._$AI(t, n), e), tn = {}, nn = (e, t = tn) => e._$AH = t, rn = (e) => e._$AH, an = (e) => {
		e._$AR(), e._$AA.remove();
	};
})), sn, cn, ln = e((() => {
	N(), Kt(), on(), sn = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		for (let i = t; i <= n; i++) r.set(e[i], i);
		return r;
	}, cn = Wt(class extends Gt {
		constructor(e) {
			if (super(e), e.type !== Ut.CHILD) throw Error("repeat() can only be used in text expressions");
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
			let i = rn(e), { values: a, keys: o } = this.dt(t, n, r);
			if (!Array.isArray(i)) return this.ut = o, a;
			let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
			for (; d <= f && p <= m;) if (i[d] === null) d++;
			else if (i[f] === null) f--;
			else if (s[d] === o[p]) c[p] = q(i[d], a[p]), d++, p++;
			else if (s[f] === o[m]) c[m] = q(i[f], a[m]), f--, m--;
			else if (s[d] === o[m]) c[m] = q(i[d], a[m]), K(e, c[m + 1], i[d]), d++, m--;
			else if (s[f] === o[p]) c[p] = q(i[f], a[p]), K(e, i[d], i[f]), f--, p++;
			else if (l === void 0 && (l = sn(o, p, m), u = sn(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = K(e, i[d]);
					q(t, a[p]), c[p] = t;
				} else c[p] = q(n, a[p]), K(e, i[d], n), i[t] = null;
				p++;
			} else an(i[f]), f--;
			else an(i[d]), d++;
			for (; p <= m;) {
				let t = K(e, c[m + 1]);
				q(t, a[p]), c[p++] = t;
			}
			for (; d <= f;) {
				let e = i[d++];
				e !== null && an(e);
			}
			return this.ut = o, nn(e, c), O;
		}
	});
})), un = e((() => {
	ln();
}));
//#endregion
//#region src/cards/room/renders/curve-buttons.js
function dn() {
	return D`
      <div class="curve-buttons">

        ${cn(this._curveButtonModels || [], (e, t) => t, (e) => e.empty ? D`
              <div class="curve-button pos-${e.position}"></div>
            ` : D`
            <button
              class="curve-button pos-${e.position}"
                @click=${this._handleCurveButtonClick}
                @pointerdown=${this._handleButtonPointerDown}

                @pointerup=${this._finishLongPress}
                @pointerleave=${this._cancelLongPress}
                @pointercancel=${this._cancelLongPress}

                .dataEntity=${e.entityId}
                .dataAction=${e.tapAction}
                .dataHoldAction=${e.holdAction}
            >
              ${e.isImage ? D`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${W(this._getInlineSvg(e.iconPath, e.svgForceColor))}
                    </div>
                  ` : D`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `)}

      </div>
    `;
}
var fn = e((() => {
	F(), un(), G();
})), pn, mn = e((() => {
	F(), pn = c`
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
})), hn, gn = e((() => {
	F(), hn = c`
  :host {
    display: block;
  }

  ha-card {
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
})), J, _n = e((() => {
	F(), J = c`
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
})), vn, yn = e((() => {
	F(), vn = c`
  .header.compressed {
    width: calc(100% - (var(--button-area-width) - 5px));
  }

  .button-column[style*="--button-count:4"] ~ .header.compressed {
    width: calc(100% - (var(--button-area-width) - 18px));
  }
`;
})), bn, xn = e((() => {
	F(), bn = c`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`;
})), Sn, Cn = e((() => {
	F(), Sn = c`
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
})), wn, Tn = e((() => {
	F(), wn = c`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`;
})), En, Dn = e((() => {
	F(), En = c`
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
`;
})), On, kn = e((() => {
	F(), On = c`
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
`;
})), An, jn = e((() => {
	F(), An = c`
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
})), Mn, Nn = e((() => {
	F(), Mn = c`
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
})), Pn, Fn = e((() => {
	F(), Pn = c`
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
    pointer-events: auto;
    z-index: 3;
  }
`;
})), In, Ln = e((() => {
	mn(), gn(), _n(), yn(), xn(), Cn(), Tn(), Dn(), kn(), jn(), Nn(), Fn(), In = [
		hn,
		pn,
		J,
		bn,
		vn,
		Pn,
		An,
		Mn,
		Sn,
		wn,
		En,
		On
	];
}));
//#endregion
//#region src/common/editor/helpers/icon.js
function Rn(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function zn(e) {
	return e ? e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Y(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = this._iconPickerKey === i, o = this._iconPickerTab || "ha", s = r && this._isImageIcon(r) ? this._resolveIconPath(r) : "", c = s && this._getInlineSvg ? this._getInlineSvg(s) : "";
	return D`
    <div class="field">
      <label>${e}</label>

      <div class="icon-input-row">

        <input
          .value=${r}
          placeholder=${n}
          @input=${(e) => this._handleConfigUpdate(t, e.target.value)}
        />

        <div
          class="icon-preview"
          title="Choose icon"
          @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), this._iconPickerKey = a ? "" : i, this._iconPickerTab = this._isImageIcon(r) ? "files" : "ha", a || this._loadLocalIconFiles?.(r), this.requestUpdate?.();
	}}
        >

          ${r ? this._isImageIcon(r) ? D`
                  <span class="preview-image-stack">
                    ${c ? D`
                          <span class="preview-svg">
                            ${W(c)}
                          </span>
                        ` : D`
                          <img
                            src=${s}
                            class="preview-image"
                            alt=""
                          />
                        `}
                  </span>
                ` : D`
                  <ha-icon
                    .icon=${r}
                  ></ha-icon>
                ` : D`
                <ha-icon
                  icon="mdi:image-outline"
                ></ha-icon>
              `}
        </div>

        ${a ? D`
              <div
                class="icon-popover"
                @click=${(e) => e.stopPropagation()}
              >
                <div class="icon-tabs">
                  <button
                    type="button"
                    class=${o === "ha" ? "active" : ""}
                    @click=${() => {
		this._iconPickerTab = "ha";
	}}
                  >
                    Icons
                  </button>
                  <button
                    type="button"
                    class=${o === "files" ? "active" : ""}
                    @click=${() => {
		this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
                  >
                    Files
                  </button>
                </div>

                ${o === "files" ? Hn.call(this, t, r) : Vn.call(this, t, r)}
              </div>
            ` : ""}

      </div>
    </div>
  `;
}
async function Bn(e = "") {
	let t = qn(e);
	this._localIconFilesLoading = !0, this.requestUpdate();
	let n = [t, ...await Wn()].filter(Boolean);
	this._localIconFiles = [...new Set(n)].sort(), this._localIconFilesLoading = !1, this.requestUpdate();
}
function Vn(e, t) {
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
function Hn(e, t) {
	let n = this._localIconFiles || [];
	return this._localIconFilesLoading ? D`
      <div class="icon-picker-note">Loading files...</div>
    ` : n.length ? D`
    <div class="file-icon-grid">
      ${n.map((n) => Un.call(this, e, n, t))}
    </div>
  ` : D`
      <div class="icon-picker-note">
        No files found. Add an icon manifest at
        <code>/local/icons/orbit-icons.json</code>
        or type the filename manually.
      </div>
    `;
}
function Un(e, t, n) {
	let r = this._resolveIconPath(t), i = this._getInlineSvg ? this._getInlineSvg(r) : "";
	return D`
    <button
      type="button"
      class=${n === t || n === r ? "file-icon-option active" : "file-icon-option"}
      title=${t}
      @click=${() => {
		this._handleConfigUpdate(e, t), this._iconPickerKey = "";
	}}
    >
      <span class="file-icon-preview">
        ${i ? D`${W(i)}` : D`
              <img src=${r} alt="" />
            `}
      </span>
      <span>${t}</span>
    </button>
  `;
}
async function Wn() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await Gn(), n = await Kn();
	return [
		...e,
		...t,
		...n
	].filter(Jn).map(qn);
}
async function Gn() {
	for (let e of [
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json",
		"/local/icons/manifest.json"
	]) try {
		let t = await fetch(e, { cache: "no-store" });
		if (!t.ok) continue;
		let n = await t.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r;
	} catch {}
	return [];
}
async function Kn() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function qn(e) {
	return e ? e.toString().split("?")[0].split("/").pop() : "";
}
function Jn(e) {
	return Rn(qn(e));
}
var Yn = e((() => {
	F(), G();
}));
//#endregion
//#region src/common/editor/helpers/inputs.js
function Xn(e, t, n) {
	return D`
      <div class="field">
        <label>${e}</label>

        <input
          .value=${this._config?.[t] || ""}
          placeholder=${n}
          @input=${(e) => this._handleInput(t, e)}
        />
      </div>
    `;
}
function Zn(e, t) {
	return D`
      <div class="field">
        <label>${e}</label>

        <input
          .value=${this._config?.[t] || ""}
          placeholder="states[entity.entity_id].attributes.percentage > 50"
          @input=${(e) => this._handleConfigUpdate(t, e.target.value)}
        />
      </div>
    `;
}
var Qn = e((() => {
	F();
}));
//#endregion
//#region src/common/editor/helpers/renders.js
function $n(e, t) {
	return D`
    <div
      class="section-header"
      @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), this._toggleSection(t);
	}}
    >
      <span>${e}</span>

      <span class="collapse-icon">
        ${this._collapsed[t] ? "+" : "−"}
      </span>
    </div>
  `;
}
function er(e, t) {
	return D`
    <div
      class="sub-section-header"
      @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), this._toggleSection(t);
	}}
    >
      <span>${e}</span>

      <span class="collapse-icon">
        ${this._collapsed[t] ? "+" : "−"}
      </span>
    </div>
  `;
}
function tr(e, t) {
	let n = this._config?.[t] || "";
	return nr.call(this, e, t, n, (e) => this._handleConfigUpdate(t, e));
}
function nr(e, t, n, r) {
	let i = this._colorPickerKey === t, a = this._colorPickerTab || "picker", o = rr(n);
	return D`
    <div class="field">
      <label>${e}</label>

      <div class="color-row">
        <input
          .value=${n}
          placeholder="green / blue / theme / light / #hex / rgb()"
          @input=${(e) => r(e.target.value)}
        />

        <div
          class="color-preview"
          style=${this._getColorStyle(n)}
          title="Choose colour"
          @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), this._colorPickerKey = i ? "" : t, this._colorPickerTab = o;
	}}
        >
        </div>

        ${i ? D`
              <div
                class="color-popover"
                @click=${(e) => e.stopPropagation()}
              >
                <div class="color-tabs">
                  <button
                    type="button"
                    class=${a === "picker" ? "active" : ""}
                    @click=${() => {
		this._colorPickerTab = "picker";
	}}
                  >
                    Picker
                    <input
                      class="tab-color-picker"
                      type="color"
                      .value=${this._getColorPickerValue(n)}
                      @input=${(e) => r(e.target.value)}
                      @change=${(e) => r(e.target.value)}
                    />
                  </button>
                  <button
                    type="button"
                    class=${a === "theme" ? "active" : ""}
                    @click=${() => {
		this._colorPickerTab = "theme";
	}}
                  >
                    Theme
                  </button>
                </div>

                ${a === "theme" ? D`
                      <div class="theme-colors">
                        ${cr.map((e) => D`
                            <button
                              type="button"
                              class="theme-color-option"
                              title=${e}
                              @click=${() => {
		r(e), this._colorPickerKey = "";
	}}
                            >
                              <span
                                class="theme-color-swatch"
                                style=${this._getColorStyle(e)}
                              ></span>
                              <span>${e}</span>
                            </button>
                          `)}
                      </div>
                    ` : D`
                      <input
                        class="native-color-picker"
                        type="color"
                        .value=${this._getColorPickerValue(n)}
                        @input=${(e) => r(e.target.value)}
                        @change=${(e) => r(e.target.value)}
                      />
                    `}
              </div>
            ` : ""}
      </div>
    </div>
  `;
}
function rr(e) {
	let t = e?.toString().trim();
	return t ? t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") ? "picker" : "theme" : "picker";
}
function ir() {
	return D`
    <div class="section">
      ${this._renderSectionHeader("Status Sensors", "status")}
      ${this._collapsed.status ? "" : D`
            ${this._renderEntity("Status 1", "status1")}
            ${this._renderEntity("Status 2", "status2")}
            ${this._renderEntity("Status 3", "status3")}
          `}
    </div>
  `;
}
function X(e, t, n) {
	let r = this._config?.[t], i = typeof n == "object" ? n : { action: n }, a = r && typeof r == "object" ? r : i;
	return D`
    <div class="field">
      <label>${e}</label>

      <select
        .value=${a.action || i.action}
        @change=${(e) => this._updateConfig({ [t]: { ...ar(e.target.value, a) } })}
      >
        <option value="toggle">toggle</option>
        <option value="more-info">more-info</option>
        <option value="navigate">navigate</option>
        <option value="call-service">call-service</option>
        <option value="popup">popup</option>
        <option value="none">none</option>
      </select>

      ${a.action === "navigate" ? D`
            <div class="inline-field">
              <span class="inline-label">path</span>

              <input
                .value=${a.navigation_path || ""}
                placeholder="/lovelace/home"
                @input=${(e) => this._updateConfig({ [t]: {
		...a,
		navigation_path: e.target.value
	} })}
              />
            </div>
          ` : ""}

      ${a.action === "call-service" ? D`

            <!-- SERVICE -->
            <div class="inline-field">
              <span class="inline-label">service</span>

              <input
                .value=${a.service || ""}
                placeholder="button.press"
                @input=${(e) => this._updateConfig({ [t]: {
		...a,
		service: e.target.value
	} })}
              />
            </div>

            <!-- ENTITY ID -->
            <div class="inline-field">
              <span class="inline-label">entity_id</span>

              <input
                .value=${a.service_data?.entity_id || ""}
                placeholder="button.hot_water_low"
                @input=${(e) => this._updateConfig({ [t]: {
		...a,
		service_data: {
			...a.service_data || {},
			entity_id: e.target.value
		}
	} })}
              />
            </div>

          ` : ""}

      ${a.action === "popup" ? D`
            <div class="inline-field">
              <span class="inline-label">title</span>

              <input
                .value=${a.popup_title || ""}
                placeholder="Security"
                @input=${(e) => this._updateConfig({ [t]: {
		...a,
		popup_title: e.target.value
	} })}
              />
            </div>

            <div class="inline-field">
              <span class="inline-label">content</span>

              <input
                .value=${typeof a.popup_content == "string" ? a.popup_content : a.popup_content ? JSON.stringify(a.popup_content) : ""}
                placeholder=""
                @input=${(e) => this._updateConfig({ [t]: {
		...a,
		popup_content: e.target.value
	} })}
              />
            </div>
          ` : ""}
    </div>
  `;
}
function ar(e, t) {
	let n = {
		...t,
		action: e
	};
	return e === "popup" ? {
		...n,
		popup_title: n.popup_title || "Security",
		popup_content: n.popup_content || {
			type: "vertical-stack",
			cards: [{
				type: "tile",
				entity: "alarm_control_panel.house_alarm",
				vertical: !0
			}]
		},
		style: n.style || "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;"
	} : n;
}
function or(e, t) {
	return D`
    <div class="field">
      <label>${e}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${{ entity: {} }}
          .value=${this._config?.[t] || ""}
          @value-changed=${(e) => this._handleConfigUpdate(t, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[t] ? D`
              <button
                type="button"
                class="clear-button"
                @click=${() => this._updateConfig({ [t]: "" })}
              >
                ✕
              </button>
            ` : ""}
      </div>
    </div>
  `;
}
function sr(e, t) {
	return D`
    <div class="field">
      <label>${e}</label>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ area: {} }}
        .value=${this._config?.[t] || ""}
        @value-changed=${(e) => this._updateConfig({ [t]: e.detail.value })}
      ></ha-selector>
    </div>
  `;
}
var cr, lr = e((() => {
	F(), cr = /* @__PURE__ */ "theme.red.green.yellow.amber.blue.purple.violet.grey.orange.gold.brown.primary-color.accent-color.state-icon-color.state-light-active-color.google-red.google-green.google-yellow.google-blue.google-violet.google-grey.color-red.color-green.color-yellow.color-amber.color-blue.color-purple.color-violet.color-grey.color-darkgrey.color-pink.color-orange.color-gold.color-brown".split(".");
}));
//#endregion
//#region src/common/editor/helpers/helpers.js
function ur(e) {
	this._collapsed = {
		...this._collapsed,
		[e]: !this._collapsed?.[e]
	}, this.requestUpdate("_collapsed");
}
function dr(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${$e(n)};` : "background-color: rgb(var(--color-theme));";
}
function fr(e) {
	let t = e?.toString().trim();
	return t && (gr(t) || _r(t) || pr(t)) || "#ffffff";
}
function pr(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = hr(n), i = n.startsWith("color-") ? "" : hr(`color-${n}`);
	return mr(r, t) || mr(i, t) || "";
}
function mr(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = gr(n);
	if (r) return r;
	let i = _r(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? pr(a[1], t) : "";
}
function hr(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function gr(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function _r(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return vr(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? vr(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function vr(e, t, n) {
	return `#${yr(e)}${yr(t)}${yr(n)}`;
}
function yr(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
var br = e((() => {
	F(), Yn(), _t(), R(), Qn(), lr();
}));
//#endregion
//#region src/editors/room/sections/room.js
function xr() {
	return D`
      <div class="section">
        ${this._renderSectionHeader("Room", "room")}

        ${this._collapsed.room ? "" : D`

              <!-- ROOM SETTINGS -->
              ${this._renderInput("Room Name", "room_name")}

              <!-- ROOM / CARD NAVIGATION -->
              <div class="field">
                <label>Room Navigation Path</label>

                <input
                  .value=${this._config?.navigate?.navigation_path || ""}
                  placeholder="/lovelace/home"
                  @input=${(e) => {
		this._updateConfig({ navigate: { navigation_path: e.target.value } });
	}}
                />
              </div>

              ${this._renderArea("Area", "area")}
              ${this._renderColor("Accent Color", "accent_color")}
              ${this._renderColor("Status Color", "status_color")}

              <!-- MAIN ENTITY -->
              ${this._renderEntity("Main Entity", "main_entity")}
              ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}

              ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}

              ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}

              ${this._config?.main_entity ? D`
                    ${this._renderActionSelector("Main Entity Action", "main_entity_tap_action", "more-info")}
                    ${this._renderActionSelector("Hold Action", "main_entity_hold_action", "none")}
                  ` : ""}

            `}
      </div>
    `;
}
var Sr = e((() => {
	F();
}));
//#endregion
//#region src/editors/room/sections/buttons.js
function Cr() {
	return D`
      <div class="section">
        ${this._renderSectionHeader("Buttons", "buttons")}

        ${this._collapsed.buttons ? "" : D`

              ${[
		1,
		2,
		3,
		4
	].map((e) => D`
                  <div class="sub-section">

                    ${this._renderSubSectionHeader(`Button ${e}`, `button${e}`)}

                    ${this._collapsed[`button${e}`] ? "" : D`

                          ${this._renderEntity("Entity", `button${e}`)}

                          ${this._renderColor("ON Color", `button${e}_on_color`)}

                          ${this._renderColor("OFF Color", `button${e}_off_color`)}

                          ${this._renderIconInput("Icon", `button${e}_icon`)}

                          ${this._renderIconInput("ON Icon", `button${e}_icon_on`)}

                          ${this._renderIconInput("OFF Icon", `button${e}_icon_off`)}

                          ${this._renderTemplateInput("State Template", `button${e}_state_template`)}

                          ${this._renderActionSelector("Tap Action", `button${e}_tap_action`)}

                          ${this._renderActionSelector("Hold Action", `button${e}_hold_action`, "more-info")}
                        `}

                  </div>
                `)}

            `}
      </div>
    `;
}
var wr = e((() => {
	F();
}));
//#endregion
//#region src/editors/room/sections/curve-buttons.js
function Tr() {
	return D`
      <div class="section">
        ${this._renderSectionHeader("Curve Buttons", "curve")}

        ${this._collapsed.curve ? "" : D`

              <!-- GLOBAL POSITION LOCK -->
              <div class="field">
                <label>Lock Curve Button Positions</label>

                <select
                  .value=${this._config?.curve_buttons_lock_position ? "true" : "false"}
                  @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.value === "true" })}
                >
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
                </select>
              </div>

              </div>

              <div class="curve-divider"></div>

              ${[
		1,
		2,
		3,
		4,
		5,
		6
	].map((e) => D`
                  <div class="sub-section">

                    ${this._renderSubSectionHeader(`Curve Button ${e}`, `curve${e}`)}

                    ${this._collapsed[`curve${e}`] ? "" : D`

                          ${this._renderEntity("Entity", `curve_button${e}`)}

                          ${this._renderIconInput("Icon", `curve_button${e}_icon`)}

                          ${this._renderIconInput("ON Icon", `curve_button${e}_icon_on`)}

                          ${this._renderIconInput("OFF Icon", `curve_button${e}_icon_off`)}

                          ${this._renderTemplateInput("State Template", `curve_button${e}_state_template`)}

                          ${this._renderActionSelector("Tap Action", `curve_button${e}_tap_action`, "more-info")}

                          ${this._renderActionSelector("Hold Action", `curve_button${e}_hold_action`, "none")}
                        `}

                  </div>
                `)}
            `}
      </div>
    `;
}
var Er = e((() => {
	F();
})), Dr, Or = e((() => {
	F(), Dr = c`
:host {
  display: block;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
}
`;
})), kr, Ar = e((() => {
	F(), kr = c`
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 14px;

  border-radius: 14px;

  background: var(--secondary-background-color);
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-bottom: 12px;
  margin-bottom: 12px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sub-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.curve-divider {
  height: 1px;

  margin: 4px 0 6px 0;

  background: rgba(255, 255, 255, 0.08);
}
`;
})), jr, Mr = e((() => {
	F(), jr = c`
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;

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

  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;

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
})), Nr, Pr = e((() => {
	F(), Nr = c`
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  opacity: 0.7;
}

input,
select {
  width: 100%;

  padding: 10px 12px;

  border: none;
  border-radius: 10px;

  background: var(--card-background-color);
  color: inherit;

  outline: none;
  box-sizing: border-box;
}

.editor-note {
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  font-size: 12px;
  line-height: 1.4;
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
})), Fr, Ir = e((() => {
	F(), Fr = c`
.entity-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  width: 100%;
}

.entity-picker {
  flex: 1;
  min-width: 0;
}

.entity-picker::part(root),
.entity-picker * {
  box-sizing: border-box;
}

.entity-selector {
  flex: 1;
  min-width: 0;
}

.entity-selector ha-selector {
  width: 100%;
  display: block;
}

.clear-button {
  flex: 0 0 42px;

  width: 42px;
  min-width: 42px;
  height: auto;

  border: none;
  border-radius: 10px;

  background: var(--card-background-color);
  color: inherit;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  line-height: 1;

  transition: background 0.2s ease;
}

.clear-button:hover {
  background: rgba(255, 255, 255, 0.14);
}
`;
})), Lr, Rr = e((() => {
	F(), Lr = c`
.color-row {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
}

.color-row > input {
  flex: 1;
}

.color-preview {
  position: relative;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  overflow: hidden;
}

.color-popover {
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  right: 0;
  width: min(280px, 100%);
  padding: 10px;
  border-radius: 12px;
  background: var(--card-background-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.color-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}

.color-tabs button,
.theme-color-option {
  border: 0;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
}

.color-tabs button {
  position: relative;
  padding: 7px 8px;
  font-size: 12px;
  overflow: hidden;
}

.color-tabs button.active {
  background: rgba(130, 177, 255, 0.22);
  color: #82b1ff;
}

.native-color-picker {
  display: block;
  width: 100%;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
}

.tab-color-picker {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.theme-colors {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  max-height: 230px;
  overflow: auto;
}

.theme-color-option {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  padding: 7px;
  font-size: 11px;
  text-align: left;
}

.theme-color-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-color-swatch {
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
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
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 10px;
  background: #000;
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
  color: white;
  display: flex;
  background: #000;
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
  border-radius: 12px;
  background: var(--card-background-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.icon-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}

.icon-tabs button {
  border: 0;
  border-radius: 9px;
  padding: 7px 8px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
  font-size: 12px;
}

.icon-tabs button.active {
  background: rgba(130, 177, 255, 0.22);
  color: #82b1ff;
}

.file-icon-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  max-height: 250px;
  overflow: auto;
}

.file-icon-option {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 7px;
  border: 0;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.file-icon-option.active {
  background: rgba(130, 177, 255, 0.22);
}

.file-icon-preview {
  flex: none;
  width: 24px;
  height: 24px;
  color: currentColor;
}

.file-icon-preview svg,
.file-icon-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.file-icon-preview img {
  filter: brightness(0) invert(1);
}

.file-icon-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-picker-note {
  padding: 10px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.76;
}

.icon-picker-note code {
  display: block;
  margin-top: 5px;
  overflow-wrap: anywhere;
}
`;
})), zr, Br = e((() => {
	F(), zr = c`
.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inline-label {
  width: 80px;
  min-width: 80px;

  font-size: 12px;
  opacity: 0.7;

  text-transform: lowercase;
}

.inline-field input {
  flex: 1;
}
`;
})), Vr, Hr = e((() => {
	Or(), Ar(), Mr(), Pr(), Ir(), Rr(), Br(), Vr = [
		Dr,
		kr,
		jr,
		Nr,
		Fr,
		Lr,
		zr
	];
})), Z, Q = e((() => {
	Z = {
		room: "0.6.18",
		status: "0.11.13",
		action: "0.4.14"
	};
})), Ur = /* @__PURE__ */ t((() => {
	F(), br(), Sr(), wr(), Er(), Hr(), H(), Q();
	var e = class extends P {
		static svgCache = V;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_collapsed: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._localIconFiles = [], this._localIconFilesLoading = !1, this._collapsed = {
				room: !1,
				status: !0,
				buttons: !0,
				curve: !0,
				button1: !0,
				button2: !0,
				button3: !0,
				button4: !0,
				curve1: !0,
				curve2: !0,
				curve3: !0,
				curve4: !0,
				curve5: !0,
				curve6: !0
			};
		}
		_getColorStyle(e) {
			return dr(e);
		}
		_getColorPickerValue(e) {
			return fr(e);
		}
		setConfig(e) {
			this._config = e || {};
		}
		_updateConfig(e) {
			this._config = {
				...this._config || {},
				...e
			}, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._config },
				bubbles: !0,
				composed: !0
			}));
		}
		_renderSectionHeader(e, t) {
			return $n.call(this, e, t);
		}
		_renderSubSectionHeader(e, t) {
			return er.call(this, e, t);
		}
		_toggleSection(e) {
			return ur.call(this, e);
		}
		_handleInput(e, t) {
			this._updateConfig({ [e]: t.target.value });
		}
		_renderInput(e, t, n = "") {
			return Xn.call(this, e, t, n);
		}
		_renderTemplateInput(e, t) {
			return Zn.call(this, e, t);
		}
		_handleConfigUpdate(e, t) {
			this._updateConfig({ [e]: t });
		}
		_renderColor(e, t) {
			return tr.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return nr.call(this, e, t, n, r);
		}
		_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
			return Y.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Bn.call(this, e);
		}
		_isImageIcon(e) {
			return Rn(e);
		}
		_resolveIconPath(e) {
			return zn(e);
		}
		_getInlineSvg(e) {
			return z.call(this, e, { forceColor: !0 });
		}
		_renderActionSelector(e, t, n) {
			return X.call(this, e, t, n);
		}
		_renderEntity(e, t) {
			return or.call(this, e, t);
		}
		_renderArea(e, t) {
			return sr.call(this, e, t);
		}
		_renderRoomSection() {
			return xr.call(this);
		}
		_renderStatusSection() {
			return ir.call(this);
		}
		_renderButtonsSection() {
			return Cr.call(this);
		}
		_renderCurvedButtonsSection() {
			return Tr.call(this);
		}
		render() {
			return D`
      <div class="wrapper">
        ${this._renderRoomSection()}
        ${this._renderStatusSection()}
        ${this._renderButtonsSection()}
        ${this._renderCurvedButtonsSection()}
        <div class="editor-version">
          Orbit Room Card v${Z.room}
        </div>
      </div>
    `;
		}
		static styles = [Vr, c`
      .editor-version {
        padding: 0 14px;
        font-size: 11px;
        opacity: 0.5;
        text-align: right;
      }
    `];
	};
	customElements.define("orbit-room-card-editor", e);
})), Wr = /* @__PURE__ */ t((() => {
	F(), Je(), R(), nt(), at(), _t(), xt(), Ct(), Dt(), jt(), H(), Ht(), Yt(), Zt(), fn(), Ln(), Ur(), Q();
	var e = class extends P {
		static svgCache = V;
		static get properties() {
			return {
				hass: {},
				_config: { type: Object },
				_cardName: { type: String },
				_statusText: { type: String },
				_icon: { type: String },
				_roomColor: { type: String },
				_statusColor: { type: String },
				_iconColor: { type: String },
				_circleColor: { type: String }
			};
		}
		static getConfigElement() {
			return document.createElement("orbit-room-card-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-room-card",
				accent_color: "blue",
				navigation_path: "/lovelace/home"
			};
		}
		getLayoutOptions() {
			return {
				grid_columns: 3,
				grid_min_columns: 2
			};
		}
		setConfig(e) {
			this._config = e, this._roomColor = this._computeFullColor(e.accent_color), this._statusColor = this._computeFullColor(e.status_color || e.accent_color), this._iconColor = this._computeIconColor(e.accent_color), this._circleColor = this._computeCircleColor(e.accent_color);
		}
		willUpdate(e) {
			return Mt.call(this, e);
		}
		shouldUpdate(e) {
			return wt.call(this, e, this._getRelevantEntities(), { hasTemplates: Tt(this._config) });
		}
		_handleAction(e, t = null) {
			return Be.call(this, e, t);
		}
		_navigate(e) {
			return He.call(this, e);
		}
		_toggleEntity(e, t, n = null) {
			return Ue.call(this, e, t, n);
		}
		_handleButtonClick(e) {
			return We.call(this, e);
		}
		_handleCurveButtonClick(e) {
			return Ge.call(this, e);
		}
		_handleTap(e) {
			return Ke.call(this, e);
		}
		_handleMainEntityTap(e) {
			return qe.call(this, e);
		}
		_handleMainEntityPointerDown(e) {
			return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
		}
		_handleButtonPointerDown(e) {
			let t = e.currentTarget;
			return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
		}
		_computeFullColor(e) {
			return Ye.call(this, e);
		}
		_computeIconColor(e) {
			return Xe.call(this, e);
		}
		_computeCircleColor(e) {
			return Ze.call(this, e);
		}
		_computeButtonBackground(e) {
			return Qe.call(this, e);
		}
		_getCardName(e = "Card") {
			return tt(this._config, this.hass, e);
		}
		formatState(e) {
			return rt(e);
		}
		_getEntityActiveState(e) {
			return it(e);
		}
		_getMainIconColor(e, t) {
			return ot.call(this, e, t);
		}
		_getEntityColor(e) {
			return st(e);
		}
		_getBinarySensorIcon(e) {
			return ct(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return lt.call(this, e, t);
		}
		_isImageIcon(e) {
			return ut(e);
		}
		_resolveIconPath(e) {
			return dt(e);
		}
		_getInlineSvg(e, t = !0) {
			return z.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e) {
			return ft(this._config, e);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_startLongPress(e, t, n) {
			return vt.call(this, e, t, n);
		}
		_cancelLongPress() {
			return yt.call(this);
		}
		_finishLongPress(e) {
			return bt.call(this, e);
		}
		_evaluateStateTemplate(e, t) {
			return St.call(this, e, t);
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
				this._config?.curve_button6
			];
		}
		_renderButtons(e) {
			return Jt.call(this, e);
		}
		_renderCurveButtons() {
			return dn.call(this);
		}
		render() {
			return Xt.call(this);
		}
		static styles = In;
	};
	customElements.define("orbit-room-card", e), window.customCards = window.customCards || [], window.customCards.push({
		type: "orbit-room-card",
		name: "Orbit Room Card",
		description: "Responsive room card",
		preview: !0,
		version: Z.room,
		getEntitySuggestion: n
	}), console.info(`%c ORBIT-ROOM-CARD %c Version ${Z.room}`, "color: orange; font-weight: bold; background: black;", "color: white; font-weight: bold; background: dimgray;");
	var t = new Set([
		"light",
		"fan",
		"climate",
		"media_player",
		"switch",
		"cover",
		"lock"
	]);
	function n(e, n) {
		let r = Ot(n);
		if (!t.has(r)) return null;
		let i = kt(e, n), a = {
			type: "custom:orbit-room-card",
			main_entity: n,
			accent_color: r === "light" ? "light" : "theme"
		};
		return i && (a.area = i), { config: a };
	}
}));
//#endregion
//#region src/cards/status/helpers/attributes.js
function $(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function Gr(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function Kr(e, t, n) {
	return n ? e.accent_on_color || $(t, "color") || "theme" : e.accent_off_color || "theme";
}
function qr(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if ([
		"",
		"0",
		"off",
		"false",
		"idle",
		"standby",
		"unknown",
		"unavailable",
		"none"
	].includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
function Jr(e, t) {
	let n = $(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return Gr(e) || r || "/lovelace/home";
}
var Yr = e((() => {}));
//#endregion
//#region src/common/helpers/zones.js
function Xr(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = Qr.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [Zr(e), e]))
	};
	return Qr.set(t, i), i;
}
function Zr(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
var Qr, $r = e((() => {
	Qr = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function ei(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	if (this._config.mode === "person") {
		ii.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = ti(this._config);
		this._statusItems = e.map((e) => ni.call(this, e, this._config)), ri.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.main_entity, n = ni.call(this, { entity: t }, this._config);
	this._statusItems = [n], ri.call(this, n);
}
function ti(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_on_color: e.accent_on_color,
		accent_off_color: e.accent_off_color,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_on: e.main_entity_icon_on,
		main_entity_icon_off: e.main_entity_icon_off,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		main_entity_icon_on_svg_color_override: e.main_entity_icon_on_svg_color_override,
		main_entity_icon_off_svg_color_override: e.main_entity_icon_off_svg_color_override,
		state_template: e.state_template,
		label_template: e.label_template,
		tap_action: e.tap_action,
		main_entity_tap_action: e.main_entity_tap_action,
		main_entity_hold_action: e.main_entity_hold_action
	}];
}
function ni(e, t = {}) {
	let n = e.entity || t.main_entity, r = n && this.hass ? this.hass.states[n] : null, i = {
		...t,
		...e,
		main_entity: n
	}, a = (i.mode === "icon_only" ? null : i.status_name) || $(r, "friendly_name") || n || "Status", o = i.state_template ? this._evaluateStateTemplate(i.state_template, n) : null, s = (i.label_template ? this._evaluateStateTemplate(i.label_template, n) : null) ?? ($(r, "label") || (r ? this.formatState(r) : "")), c = i.main_entity_icon, l = i.main_entity_icon_on, u = i.main_entity_icon_off, d = qr(r, (e) => this._getEntityActiveState(e), o), f = (d ? l : u) || c || $(r, "icon") || (r ? this._getDefaultDomainIcon(r.entity_id.split(".")[0], r) : "mdi:information-outline"), p = d && l ? "main_entity_icon_on" : !d && u ? "main_entity_icon_off" : c ? "main_entity_icon" : "", m = Kr(i, r, d), ee = Jr(i, r), te = this._computeFullColor(m), ne = this._computeFullColor(m), h = this._computeCircleColor(m), re = d ? this._computeFullColor(m) : this._computeIconColor(m);
	return {
		...e,
		entityId: n,
		cardName: a,
		statusText: s,
		icon: f,
		navigationPath: ee,
		nameColor: te,
		statusColor: ne,
		circleColor: h,
		iconColor: re,
		svgForceColor: p ? this._getSvgColorOverride(i, p) : !0
	};
}
function ri(e) {
	this._cardName = e.cardName || "Status", this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function ii() {
	let e = this._config.main_entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null;
	this._cardName = this._config.status_name || $(i, "friendly_name") || $(r, "friendly_name") || e || t || "Person";
	let o = (this._config.label_template ? this._evaluateStateTemplate(this._config.label_template, t) : null) ?? (r ? oi(r) : ""), s = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = s ? `${o} | ${s}` : o;
	let c = qr(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), l = Kr(this._config, r, c);
	this._personPicture = $(i, "entity_picture") || $(r, "entity_picture") || "", this._personZoneIcon = ai.call(this, r, i), this._personBattery1 = si.call(this, this._config.battery_entity_1), this._personBattery2 = si.call(this, this._config.battery_entity_2), this._icon = $(i, "icon") || $(r, "icon") || "mdi:account", this._navigationPath = Jr(this._config, r), this._nameColor = this._computeFullColor(l), this._statusColor = this._computeFullColor(l), this._circleColor = this._computeCircleColor(l), this._iconColor = c ? this._computeFullColor(l) : this._computeIconColor(l), this._iconSvgForceColor = !0;
}
function ai(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = Xr(this.hass), r = t?.entity_id;
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
function oi(e) {
	let t = e?.state;
	return t ? t === "home" ? "Home" : t === "not_home" ? "Away" : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function si(e) {
	let t = e && this.hass ? this.hass.states[e] : null;
	if (!t) return null;
	let n = Number(t.state), r = "green";
	return Number.isFinite(n) && (n <= 15 ? r = "red" : n <= 30 && (r = "amber")), {
		entityId: e,
		icon: t.attributes?.icon || "mdi:battery",
		color: this._computeFullColor(r)
	};
}
var ci = e((() => {
	Yr(), $r();
}));
//#endregion
//#region src/cards/status/renders/status-card.js
function li() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = mi(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
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
        ${n ? ui.call(this, t) : D`
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
          @contextmenu=${this._handleMainIconContextMenu}
        >
          ${e === "person" ? fi.call(this) : this._isImageIcon(this._icon) ? D`
                <div
                  class="main-image-icon"
                >
                  ${c ? W(c) : D`<img src=${s} alt="" />`}
                </div>
              ` : D`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
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
  `;
}
function ui(e) {
	return D`
    <div class="status-icon-grid">
      ${e.map((e, t) => di.call(this, e, t))}
    </div>
  `;
}
function di(e, t) {
	let n = mi(e.statusText), r = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", i = r ? this._getInlineSvg(r, e.svgForceColor) : "";
	return D`
    <div
      class="status-icon-item"
      style="
        --status-circle-color:${e.circleColor};
        --status-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleStatusItemClick(e, t)}
      @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
      @pointerup=${this._handleStatusItemPointerUp}
      @pointerleave=${this._handleStatusItemPointerCancel}
      @pointercancel=${this._handleStatusItemPointerCancel}
      @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
    >
      <div class="circle status-circle">
        ${this._isImageIcon(e.icon) ? D`
              <div class="main-image-icon">
                ${i ? W(i) : D`<img src=${r} alt="" />`}
              </div>
            ` : D`
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
    </div>
  `;
}
function fi() {
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

      ${pi.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? pi.call(this, "battery-1", this._personBattery1.icon, this._personBattery1.color, this._personBattery1.entityId) : ""}

      ${this._personBattery2 ? pi.call(this, "battery-2", this._personBattery2.icon, this._personBattery2.color, this._personBattery2.entityId) : ""}
    </div>
  `;
}
function pi(e, t, n, r = null) {
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
        <ha-icon .icon=${t}></ha-icon>
      </span>
    </span>
  `;
}
function mi(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
var hi = e((() => {
	F(), G();
})), gi, _i = e((() => {
	F(), gi = c`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.93 / 1;
  }

  ha-card.mode-icon_only.grouped {
    aspect-ratio: calc(var(--status-columns, 1) * 0.975) / var(--status-rows, 1);
  }

  ha-card.mode-icon_only.grouped.separate-cards {
    background: transparent;
    box-shadow: none;
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
    pointer-events: auto;
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
    display: grid;
    padding: 0;
  }

  .status-icon-grid {
    display: grid;
    grid-template-columns: repeat(var(--status-columns, 1), minmax(0, 1fr));
    grid-auto-rows: minmax(0, 1fr);
    gap: clamp(4px, 2cqw, 10px);
    width: 100%;
    height: 100%;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-grid {
    gap: clamp(3px, 1cqw, 6px);
  }

  .status-icon-item {
    background: var(--ha-card-background, var(--card-background-color));
    border-radius: 15px;
    container-type: size;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
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
`;
})), vi, yi = e((() => {
	mn(), gn(), _n(), _i(), vi = [
		hn,
		pn,
		J,
		gi
	];
}));
//#endregion
//#region src/editors/status/sections/status.js
function bi() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = t || n ? "more-info" : "navigate", i = this._config?.tap_action?.action || r, a = t || n ? i : "more-info";
	return D`
    <div class="section">
      <div class="field">
        <label>Mode</label>

        <select
          .value=${this._config?.mode || "standard"}
          @change=${(e) => this._updateConfig({ mode: e.target.value })}
        >
          <option value="standard">Standard</option>
          <option value="icon_only">Icon Only</option>
          <option value="person">Person</option>
        </select>
      </div>
    </div>

    ${t ? xi.call(this, {
		cardActionDefault: r,
		mainEntityActionDefault: a
	}) : D`
          <div class="section">
            ${n ? D`
                  ${this._renderEntity("Person Entity", "main_entity")}
                  ${this._renderEntity("Tracker Entity", "tracker_entity")}
                  ${this._renderEntity("ETA Entity", "eta_entity")}
                  ${this._renderEntity("Battery Entity 1", "battery_entity_1")}
                  ${this._renderEntity("Battery Entity 2", "battery_entity_2")}
                  ${this._renderColor("Accent ON Color", "accent_on_color")}
                  ${this._renderColor("Accent OFF Color", "accent_off_color")}
                ` : D`
                  ${this._renderInput("Status Name", "status_name")}
                  ${this._renderEntity("Main Entity", "main_entity")}
                  ${this._renderColor("Accent ON Color", "accent_on_color")}
                  ${this._renderColor("Accent OFF Color", "accent_off_color")}
                  ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}
                  ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}
                  ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}
                  ${this._renderInput("State Template", "state_template")}
                  ${this._renderInput("Label Template", "label_template")}
                `}

            ${this._config?.main_entity ? D`
                  ${this._renderActionSelector("Card Action", "tap_action", r)}
                  ${this._renderActionSelector("Main Entity Action", "main_entity_tap_action", a)}
                  ${this._renderActionSelector("Hold Action", "main_entity_hold_action", "none")}
                ` : ""}
          </div>
        `}
  `;
}
function xi({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {};
	return D`
    <div class="section">
      <div class="status-group-options">
        <label class="status-wrap-toggle">
          <input
            type="checkbox"
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		items_per_row: e.target.checked ? this._config?.items_per_row || 3 : this._config?.items_per_row
	})}
          />
          <span>Wrap</span>
        </label>

        ${n.length > 1 ? D`
              <label class="status-wrap-toggle">
                <input
                  type="checkbox"
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                />
                <span>Separate Cards</span>
              </label>

              <div class="status-editor-tools">
                <button
                  type="button"
                  class="status-tool-button"
                  title="Move left"
                  ?disabled=${r === 0}
                  @click=${() => this._moveStatusItem(r, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title="Move right"
                  ?disabled=${r === n.length - 1}
                  @click=${() => this._moveStatusItem(r, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title="Remove"
                  @click=${() => this._removeStatusItem(r)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>
              </div>
            ` : ""}
      </div>

      ${this._config?.wrap ? D`
            <div class="field">
              <label>Items Per Row</label>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.items_per_row || 3)}
                @input=${(e) => this._updateConfig({ items_per_row: Math.max(1, Number(e.target.value) || 1) })}
              />
            </div>
          ` : ""}

      <div class="status-tabs">
        ${n.map((e, t) => D`
          <button
            type="button"
            class="status-tab ${t === r ? "active" : ""}"
            @click=${() => this._selectStatusItem(t)}
          >
            ${t + 1}
          </button>
        `)}

        <button
          type="button"
          class="status-tab-add"
          @click=${() => this._addStatusItem()}
        >
          +
        </button>
      </div>

      <div class="field">
        <label>Main Entity</label>

        <div class="entity-row">
          <ha-selector
            class="entity-picker"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${i.entity || ""}
            @value-changed=${(e) => this._updateStatusItem(r, { entity: e.detail.value || "" })}
          ></ha-selector>

          ${i.entity ? D`
                <button
                  type="button"
                  class="clear-button"
                  @click=${() => this._updateStatusItem(r, { entity: "" })}
                >
                  ✕
                </button>
              ` : ""}
        </div>
      </div>

      ${Ci.call(this, "Accent ON Color", "accent_on_color", r, i)}
      ${Ci.call(this, "Accent OFF Color", "accent_off_color", r, i)}

      ${this._renderStatusItemIconInput("Main Entity Icon", "main_entity_icon", r)}
      ${this._renderStatusItemIconInput("Main Entity ON Icon", "main_entity_icon_on", r)}
      ${this._renderStatusItemIconInput("Main Entity OFF Icon", "main_entity_icon_off", r)}

      ${Si.call(this, "State Template", "state_template", r, i)}
      ${Si.call(this, "Label Template", "label_template", r, i)}

      ${i.entity ? D`
            ${this._renderStatusItemActionSelector("Card Action", "tap_action", r, e)}
            ${this._renderStatusItemActionSelector("Main Entity Action", "main_entity_tap_action", r, t)}
            ${this._renderStatusItemActionSelector("Hold Action", "main_entity_hold_action", r, "none")}
          ` : ""}
    </div>
  `;
}
function Si(e, t, n, r) {
	return D`
    <div class="field">
      <label>${e}</label>
      <input
        .value=${r[t] || ""}
        @input=${(e) => this._updateStatusItem(n, { [t]: e.target.value })}
      />
    </div>
  `;
}
function Ci(e, t, n, r) {
	return this._renderColorControl(e, `status-${n}-${t}`, r[t] || "", (e) => this._updateStatusItem(n, { [t]: e }));
}
var wi = e((() => {
	F();
})), Ti = /* @__PURE__ */ t((() => {
	F(), br(), wi(), Hr(), H(), Q();
	var e = class extends P {
		static svgCache = V;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_selectedStatusIndex: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._selectedStatusIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		_getColorStyle(e) {
			return dr(e);
		}
		_getColorPickerValue(e) {
			return fr(e);
		}
		setConfig(e) {
			this._config = e || {}, this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(e).length - 1);
		}
		_updateConfig(e) {
			let t = {
				...this._config || {},
				...e
			};
			Object.keys(t).forEach((e) => {
				t[e] === void 0 && delete t[e];
			}), this._config = t, this.dispatchEvent(new CustomEvent("config-changed", {
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
		_getStatusItems(e = this._config) {
			return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
				entity: e?.main_entity || "",
				accent_on_color: e?.accent_on_color || "",
				accent_off_color: e?.accent_off_color || "",
				main_entity_icon: e?.main_entity_icon || "",
				main_entity_icon_on: e?.main_entity_icon_on || "",
				main_entity_icon_off: e?.main_entity_icon_off || "",
				state_template: e?.state_template || "",
				label_template: e?.label_template || "",
				tap_action: e?.tap_action,
				main_entity_tap_action: e?.main_entity_tap_action,
				main_entity_hold_action: e?.main_entity_hold_action
			}];
		}
		_selectStatusItem(e) {
			this._selectedStatusIndex = e;
		}
		_addStatusItem() {
			let e = this._getStatusItems();
			this._selectedStatusIndex = e.length, this._updateConfig({
				main_entity: void 0,
				accent_on_color: void 0,
				accent_off_color: void 0,
				main_entity_icon: void 0,
				main_entity_icon_on: void 0,
				main_entity_icon_off: void 0,
				state_template: void 0,
				label_template: void 0,
				tap_action: void 0,
				main_entity_tap_action: void 0,
				main_entity_hold_action: void 0,
				entities: [...e, { entity: "" }]
			});
		}
		_removeStatusItem(e) {
			let t = this._getStatusItems();
			if (t.length <= 1) {
				this._updateConfig({
					main_entity: "",
					main_entity_icon: "",
					main_entity_icon_on: "",
					main_entity_icon_off: "",
					state_template: "",
					label_template: "",
					tap_action: void 0,
					main_entity_tap_action: void 0,
					main_entity_hold_action: void 0
				});
				return;
			}
			let n = t.filter((t, n) => n !== e);
			this._selectedStatusIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
		}
		_moveStatusItem(e, t) {
			let n = this._getStatusItems(), r = e + t;
			if (r < 0 || r >= n.length) return;
			let i = [...n], [a] = i.splice(e, 1);
			i.splice(r, 0, a), this._selectedStatusIndex = r, this._updateConfig({
				main_entity: void 0,
				accent_on_color: void 0,
				accent_off_color: void 0,
				main_entity_icon: void 0,
				main_entity_icon_on: void 0,
				main_entity_icon_off: void 0,
				state_template: void 0,
				label_template: void 0,
				tap_action: void 0,
				main_entity_tap_action: void 0,
				main_entity_hold_action: void 0,
				entities: i
			});
		}
		_updateStatusItem(e, t) {
			let n = this._getStatusItems(), r = {
				...n[e] || {},
				...t
			};
			if (Array.isArray(this._config?.entities)) {
				let t = [...n];
				t[e] = r;
				let i = { entities: t };
				t.length > 1 && (i.main_entity = void 0, i.accent_on_color = void 0, i.accent_off_color = void 0, i.main_entity_icon = void 0, i.main_entity_icon_on = void 0, i.main_entity_icon_off = void 0, i.state_template = void 0, i.label_template = void 0, i.tap_action = void 0, i.main_entity_tap_action = void 0, i.main_entity_hold_action = void 0), this._updateConfig(i);
				return;
			}
			this._updateConfig({
				main_entity: r.entity || "",
				accent_on_color: r.accent_on_color || "",
				accent_off_color: r.accent_off_color || "",
				main_entity_icon: r.main_entity_icon || "",
				main_entity_icon_on: r.main_entity_icon_on || "",
				main_entity_icon_off: r.main_entity_icon_off || "",
				state_template: r.state_template || "",
				label_template: r.label_template || "",
				tap_action: r.tap_action,
				main_entity_tap_action: r.main_entity_tap_action,
				main_entity_hold_action: r.main_entity_hold_action
			});
		}
		_renderInput(e, t, n = "") {
			return Xn.call(this, e, t, n);
		}
		_renderTemplateInput(e, t) {
			return Zn.call(this, e, t);
		}
		_renderColor(e, t) {
			return tr.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return nr.call(this, e, t, n, r);
		}
		_renderEntity(e, t) {
			return or.call(this, e, t);
		}
		_renderActionSelector(e, t, n) {
			return X.call(this, e, t, n);
		}
		_renderStatusItemActionSelector(e, t, n, r) {
			let i = {
				_config: this._getStatusItems()[n] || {},
				_updateConfig: (e) => this._updateStatusItem(n, e)
			};
			return X.call(i, e, t, r);
		}
		_renderArea(e, t) {
			return sr.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
			return Y.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Bn.call(this, e);
		}
		_renderStatusItemIconInput(e, t, n, r = "mdi:information-outline or icon.svg") {
			let i = {
				_config: this._getStatusItems()[n] || {},
				_iconPickerPrefix: `status-${n}-icon`,
				_isImageIcon: (e) => this._isImageIcon(e),
				_resolveIconPath: (e) => this._resolveIconPath(e),
				_getInlineSvg: (e) => this._getInlineSvg(e),
				_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
				requestUpdate: () => this.requestUpdate(),
				renderRoot: this.renderRoot,
				_handleConfigUpdate: (e, t) => this._updateStatusItem(n, { [e]: t })
			};
			return Object.defineProperties(i, {
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
				_localIconFilesLoading: {
					get: () => this._localIconFilesLoading,
					set: (e) => {
						this._localIconFilesLoading = e;
					}
				}
			}), Y.call(i, e, t, r);
		}
		_isImageIcon(e) {
			return Rn(e);
		}
		_resolveIconPath(e) {
			return zn(e);
		}
		_getInlineSvg(e) {
			return z.call(this, e, { forceColor: !0 });
		}
		_renderStatusSection() {
			return bi.call(this);
		}
		render() {
			return D`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          Orbit Status Card v${Z.status}
        </div>
      </div>
    `;
		}
		static styles = [Vr, c`
      .status-wrap-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 1;
      }

      .status-wrap-toggle input {
        width: auto;
        margin: 0;
      }

      .status-group-options {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .status-tabs {
        display: flex;
        align-items: end;
        gap: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        margin-bottom: 12px;
        overflow-x: auto;
      }

      .status-tab,
      .status-tab-add {
        border: none;
        background: transparent;
        color: inherit;
        min-width: 44px;
        height: 42px;
        padding: 0 12px;
        font: inherit;
        font-weight: 700;
        opacity: 0.6;
        cursor: pointer;
      }

      .status-tab.active {
        color: var(--primary-color);
        opacity: 1;
        border-bottom: 3px solid var(--primary-color);
      }

      .status-tab-add {
        margin-left: auto;
        font-size: 24px;
        opacity: 0.9;
      }

      .status-editor-tools {
        display: flex;
        gap: 8px;
        margin-left: auto;
        justify-content: flex-end;
      }

      .status-tool-button {
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 10px;
        background: var(--card-background-color);
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
        --mdc-icon-size: 22px;
      }

      .editor-version {
        padding: 0 14px;
        font-size: 11px;
        opacity: 0.5;
        text-align: right;
      }
    `];
	};
	customElements.define("orbit-status-card-editor", e);
})), Ei = /* @__PURE__ */ t((() => {
	F(), Je(), R(), at(), _t(), xt(), Ct(), Dt(), jt(), H(), ci(), hi(), yi(), Ti(), Q();
	var e = class extends P {
		static svgCache = V;
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
				let e = ti(this._config).length, t = n(this._config, e);
				return {
					grid_columns: Math.max(1, t),
					grid_min_columns: .5
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
			return ei.call(this, e);
		}
		shouldUpdate(e) {
			return wt.call(this, e, this._getRelevantEntities(), {
				hasTemplates: Tt(this._config),
				includeZones: this._config?.mode === "person"
			});
		}
		_handleAction(e, t = null) {
			return Be.call(this, e, t);
		}
		_handleTap(e) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityTap(e);
				return;
			}
			this._stopEvent(e), this._handleCardTapAction();
		}
		_isMainIconEvent(e) {
			if (e.composedPath().some((e) => e?.classList && (e.classList.contains("circle") || e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")))) return !0;
			let t = (this.shadowRoot?.querySelector(".status-circle"))?.getBoundingClientRect();
			return t ? e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom : !1;
		}
		_handleMainEntityTap(e) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._longPressTriggered) {
				this._longPressTriggered = !1, this._stopEvent(e);
				return;
			}
			this._stopEvent(e);
			let t = this._config.main_entity;
			if (!t) return;
			let n = this._getMainEntityTapAction();
			if (n) {
				this._handleAction(n, t);
				return;
			}
			this._handleCardTapAction();
		}
		_handleCardTapAction() {
			let e = this._getCardTapAction(), t = this._config.main_entity;
			if (e.action && e.action !== "navigate") {
				this._handleAction(e, t);
				return;
			}
			this._navigate(e.navigation_path || this._navigationPath || "/lovelace/home");
		}
		_handleStatusItemClick(e, t = 0) {
			if (this._statusItemLongPressTriggered) {
				this._statusItemLongPressTriggered = !1, this._stopEvent(e);
				return;
			}
			this._stopEvent(e);
			let n = this._getStatusItemEntityId(t);
			if (!n) return;
			let r = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t);
			r?.action !== "none" && this._handleAction(r?.action ? r : { action: "more-info" }, n);
		}
		_handleStatusItemPointerDown(e, t = 0) {
			this._stopEvent(e), this._clearStatusItemHoldTimer();
			let n = this._getStatusItemHoldAction(t);
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
			let n = this._getStatusItemHoldAction(t);
			n && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t)));
		}
		_navigate(e) {
			return He.call(this, e);
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
			return Ye.call(this, e);
		}
		_computeIconColor(e) {
			return Xe.call(this, e);
		}
		_computeCircleColor(e) {
			return Ze.call(this, e);
		}
		_getMainStateObj() {
			let e = this._config.main_entity;
			return e && this.hass ? this.hass.states[e] : null;
		}
		formatState(e) {
			return rt(e);
		}
		_getEntityActiveState(e) {
			return it(e);
		}
		_getBinarySensorIcon(e) {
			return ct(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return lt.call(this, e, t);
		}
		_isImageIcon(e) {
			return ut(e);
		}
		_resolveIconPath(e) {
			return dt(e);
		}
		_getInlineSvg(e, t = !0) {
			return z.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return ft(e, t);
		}
		_evaluateStateTemplate(e, t) {
			return St.call(this, e, t);
		}
		_getRelevantEntities() {
			return this._config?.mode === "icon_only" ? ti(this._config).map((e) => e.entity || e.main_entity) : [
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
		_getMainEntityHoldAction() {
			return t(this._config.main_entity_hold_action) ? this._config.main_entity_hold_action : null;
		}
		_getMainEntityTapAction() {
			let e = this._config.main_entity_tap_action;
			return e?.action === "none" ? null : e?.action ? e : this._isIconOnlyMode() || this._isPersonMode() ? null : { action: "more-info" };
		}
		_getCardTapAction() {
			let e = { action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate" }, t = this._config.tap_action;
			return t?.action ? t : e;
		}
		_getStatusItemCardTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.tap_action?.action ? t.tap_action : this._config.main_entity_tap_action?.action ? this._config.main_entity_tap_action : this._config.tap_action?.action ? this._config.tap_action : { action: "more-info" };
		}
		_getStatusItemMainEntityTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.main_entity_tap_action?.action && t.main_entity_tap_action.action !== "none" ? t.main_entity_tap_action : this._config.main_entity_tap_action?.action && this._config.main_entity_tap_action.action !== "none" ? this._config.main_entity_tap_action : this._getStatusItemCardTapAction(e);
		}
		_getStatusItemHoldAction(e = 0) {
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
			return n(this._config, e);
		}
		_getStatusRowCount(e = this._statusItems?.length || 1) {
			return r(this._config, e);
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
			return li.call(this);
		}
		static styles = vi;
	};
	function t(e) {
		return !!(e && e.action && e.action !== "none");
	}
	function n(e = {}, t = 1) {
		if (!e.wrap) return Math.max(1, t);
		let n = Number(e.items_per_row);
		return Math.max(1, Math.min(t, (Number.isFinite(n) ? Math.floor(n) : 3) || 1));
	}
	function r(e = {}, t = 1) {
		let r = n(e, t);
		return Math.max(1, Math.ceil(t / r));
	}
	customElements.define("orbit-status-card", e), window.customCards = window.customCards || [], window.customCards.push({
		type: "orbit-status-card",
		name: "Orbit Status Card",
		description: "Responsive status card",
		preview: !0,
		version: Z.status,
		getEntitySuggestion: a
	}), console.info(`%c ORBIT-STATUS-CARD %c Version ${Z.status}`, "color: orange; font-weight: bold; background: black;", "color: white; font-weight: bold; background: dimgray;");
	var i = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function a(e, t) {
		let n = Ot(t);
		if (n === "person") return { config: {
			type: "custom:orbit-status-card",
			mode: "person",
			main_entity: t
		} };
		if (i.has(n)) return null;
		let r = {
			label: "Standard",
			config: {
				type: "custom:orbit-status-card",
				mode: "standard",
				main_entity: t
			}
		};
		return At(e, t) ? [r, {
			label: "Icon Only",
			config: {
				type: "custom:orbit-status-card",
				mode: "icon_only",
				main_entity: t
			}
		}] : { config: r.config };
	}
}));
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function Di(e) {
	!e.has("_config") && !e.has("hass") || (this._actions = Oi(this._config).map((e) => ki.call(this, e)));
}
function Oi(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_color: e.accent_color,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action
	}];
}
function ki(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.accent_color || this._config.accent_color || "theme", i = Ai(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r), s = e.main_entity_icon ? "main_entity_icon" : e.icon ? "icon" : "", c = e.main_entity_icon || e.icon || n?.attributes?.icon || (n ? this._getDefaultDomainIcon(n.entity_id.split(".")[0], n) : "mdi:play-circle");
	return {
		...e,
		entityId: t,
		icon: c,
		iconColor: o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: s ? this._getSvgColorOverride(e, s) : !0
	};
}
function Ai(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
var ji = e((() => {}));
//#endregion
//#region src/cards/action/renders/action-card.js
function Mi() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t);
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
        ${e.map((e, t) => Ni.call(this, e, t))}
      </div>
    </ha-card>
  `;
}
function Ni(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "";
	return D`
    <div
      class="action-button ${e.isRunning ? "running" : ""}"
      role="button"
      tabindex="0"
      style="
        --action-card-background:${e.cardBackground};
        --action-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleTap(e, t)}
      @pointerdown=${(e) => this._handlePointerDown(e, t)}
      @pointerup=${this._handlePointerUp}
      @pointerleave=${this._handlePointerCancel}
      @pointercancel=${this._handlePointerCancel}
      @contextmenu=${(e) => this._handleContextMenu(e, t)}
    >
      <div class="circle action-circle">
        ${this._isImageIcon(e.icon) ? D`
              <div class="main-image-icon">
                ${r ? W(r) : D`<img src=${n} alt="" />`}
              </div>
            ` : D`
              <ha-icon
                class="main-icon"
                .icon=${e.icon}
              ></ha-icon>
            `}
      </div>
    </div>
  `;
}
var Pi = e((() => {
	F(), G();
})), Fi, Ii = e((() => {
	F(), gn(), _n(), Fi = [
		hn,
		J,
		c`
    ha-card {
      aspect-ratio: 0.93 / 1;
      border-radius: 15px;
    }

    ha-card.grouped {
      aspect-ratio: calc(var(--action-columns, var(--action-count, 1)) * 0.975) / var(--action-rows, 1);
    }

    ha-card.grouped.separate-cards {
      background: transparent;
      box-shadow: none;
    }

    .action-container {
      display: grid;
      grid-template-columns: repeat(var(--action-columns, var(--action-count, 1)), minmax(0, 1fr));
      grid-auto-rows: minmax(0, 1fr);
      align-items: center;
      gap: clamp(4px, 2cqw, 10px);
      padding: 0;
    }

    ha-card.grouped.separate-cards .action-container {
      gap: clamp(3px, 1cqw, 6px);
    }

    .action-button {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 15px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
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
function Li() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {};
	return D`
    <div class="section">
      <div class="action-group-options">
        <label class="action-wrap-toggle">
          <input
            type="checkbox"
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		actions_per_row: e.target.checked ? this._config?.actions_per_row || 3 : this._config?.actions_per_row
	})}
          />
          <span>Wrap</span>
        </label>

        ${e.length > 1 ? D`
              <label class="action-wrap-toggle">
                <input
                  type="checkbox"
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                />
                <span>Separate Cards</span>
              </label>

              <div class="action-editor-tools">
                <button
                  type="button"
                  class="action-tool-button"
                  title="Move left"
                  ?disabled=${t === 0}
                  @click=${() => this._moveActionItem(t, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title="Move right"
                  ?disabled=${t === e.length - 1}
                  @click=${() => this._moveActionItem(t, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title="Remove"
                  @click=${() => this._removeActionItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>
              </div>
            ` : ""}
      </div>

      ${this._config?.wrap ? D`
            <div class="field">
              <label>Actions Per Row</label>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.actions_per_row || 3)}
                @input=${(e) => this._updateConfig({ actions_per_row: Math.max(1, Number(e.target.value) || 1) })}
              />
            </div>
          ` : ""}

      <div class="action-tabs">
        ${e.map((e, n) => D`
          <button
            type="button"
            class="action-tab ${n === t ? "active" : ""}"
            @click=${() => this._selectActionItem(n)}
          >
            ${n + 1}
          </button>
        `)}

        <button
          type="button"
          class="action-tab-add"
          @click=${() => this._addActionItem()}
        >
          +
        </button>
      </div>

      <div class="field">
        <label>Main Entity</label>

        <div class="entity-row">
          <ha-selector
            class="entity-picker"
            .hass=${this.hass}
            .selector=${{ entity: { domain: [
		"scene",
		"script",
		"automation",
		"button",
		"input_button"
	] } }}
            .value=${n.entity || ""}
            @value-changed=${(e) => this._updateActionItem(t, { entity: e.detail.value || "" })}
          ></ha-selector>

          ${n.entity ? D`
                <button
                  type="button"
                  class="clear-button"
                  @click=${() => this._updateActionItem(t, { entity: "" })}
                >
                  ✕
                </button>
              ` : ""}
        </div>
      </div>

      ${this._renderColorControl("Accent Color", `action-${t}-accent_color`, n.accent_color || "", (e) => this._updateActionItem(t, { accent_color: e }))}

      ${this._renderActionItemIconInput("Main Entity Icon", "main_entity_icon", t)}

      ${n.entity ? D`
            ${this._renderActionItemActionSelector("Tap Action", "tap_action", t, Ri(n.entity))}
            ${this._renderActionItemActionSelector("Hold Action", "hold_action", t, "more-info")}
          ` : ""}
    </div>
  `;
}
function Ri(e) {
	let t = e?.split(".")[0];
	return t === "scene" ? {
		action: "call-service",
		service: "scene.turn_on",
		service_data: { entity_id: e }
	} : t === "script" ? {
		action: "call-service",
		service: "script.turn_on",
		service_data: { entity_id: e }
	} : t === "automation" ? {
		action: "call-service",
		service: "automation.trigger",
		service_data: { entity_id: e }
	} : t === "button" || t === "input_button" ? {
		action: "call-service",
		service: "button.press",
		service_data: { entity_id: e }
	} : { action: "toggle" };
}
var zi = e((() => {
	F();
})), Bi = /* @__PURE__ */ t((() => {
	F(), br(), zi(), Hr(), H(), Q();
	var e = class extends P {
		static svgCache = V;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_selectedActionIndex: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._selectedActionIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		setConfig(e) {
			this._config = e || {}, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(e).length - 1);
		}
		_updateConfig(e) {
			let t = {
				...this._config || {},
				...e
			};
			Object.keys(t).forEach((e) => {
				t[e] === void 0 && delete t[e];
			}), this._config = t, this.dispatchEvent(new CustomEvent("config-changed", {
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
				main_entity_icon: e?.main_entity_icon || "",
				tap_action: e?.tap_action,
				hold_action: e?.hold_action
			}];
		}
		_selectActionItem(e) {
			this._selectedActionIndex = e;
		}
		_addActionItem() {
			let e = this._getActionItems();
			this._selectedActionIndex = e.length, this._updateConfig({
				main_entity: void 0,
				accent_color: void 0,
				main_entity_icon: void 0,
				tap_action: void 0,
				hold_action: void 0,
				entities: [...e, { entity: "" }]
			});
		}
		_removeActionItem(e) {
			let t = this._getActionItems();
			if (t.length <= 1) {
				this._updateConfig({
					main_entity: "",
					main_entity_icon: "",
					tap_action: void 0,
					hold_action: void 0
				});
				return;
			}
			let n = t.filter((t, n) => n !== e);
			this._selectedActionIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
		}
		_moveActionItem(e, t) {
			let n = this._getActionItems(), r = e + t;
			if (r < 0 || r >= n.length) return;
			let i = [...n], [a] = i.splice(e, 1);
			i.splice(r, 0, a), this._selectedActionIndex = r, this._updateConfig({
				main_entity: void 0,
				accent_color: void 0,
				main_entity_icon: void 0,
				tap_action: void 0,
				hold_action: void 0,
				entities: i
			});
		}
		_updateActionItem(e, t) {
			let n = this._getActionItems(), r = {
				...n[e] || {},
				...t
			};
			if (Array.isArray(this._config?.entities)) {
				let t = [...n];
				t[e] = r;
				let i = { entities: t };
				t.length > 1 && (i.main_entity = void 0, i.accent_color = void 0, i.main_entity_icon = void 0, i.tap_action = void 0, i.hold_action = void 0), this._updateConfig(i);
				return;
			}
			this._updateConfig({
				main_entity: r.entity || "",
				accent_color: r.accent_color || "",
				main_entity_icon: r.main_entity_icon || "",
				tap_action: r.tap_action,
				hold_action: r.hold_action
			});
		}
		_getColorStyle(e) {
			return dr(e);
		}
		_getColorPickerValue(e) {
			return fr(e);
		}
		_renderActionSelector(e, t, n) {
			return X.call(this, e, t, n);
		}
		_renderActionItemActionSelector(e, t, n, r) {
			let i = {
				_config: this._getActionItems()[n] || {},
				_updateConfig: (e) => this._updateActionItem(n, e)
			};
			return X.call(i, e, t, r);
		}
		_renderColor(e, t) {
			return tr.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return nr.call(this, e, t, n, r);
		}
		_renderEntity(e, t) {
			return or.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
			return Y.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Bn.call(this, e);
		}
		_renderActionItemIconInput(e, t, n, r = "mdi:palette or icon.svg") {
			let i = {
				_config: this._getActionItems()[n] || {},
				_iconPickerPrefix: `action-${n}-icon`,
				_isImageIcon: (e) => this._isImageIcon(e),
				_resolveIconPath: (e) => this._resolveIconPath(e),
				_getInlineSvg: (e) => this._getInlineSvg(e),
				_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
				requestUpdate: () => this.requestUpdate(),
				renderRoot: this.renderRoot,
				_handleConfigUpdate: (e, t) => this._updateActionItem(n, { [e]: t })
			};
			return Object.defineProperties(i, {
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
				_localIconFilesLoading: {
					get: () => this._localIconFilesLoading,
					set: (e) => {
						this._localIconFilesLoading = e;
					}
				}
			}), Y.call(i, e, t, r);
		}
		_isImageIcon(e) {
			return Rn(e);
		}
		_resolveIconPath(e) {
			return zn(e);
		}
		_getInlineSvg(e) {
			return z.call(this, e, { forceColor: !0 });
		}
		_renderActionSection() {
			return Li.call(this);
		}
		render() {
			return D`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          Orbit Action Card v${Z.action}
        </div>
      </div>
    `;
		}
		static styles = [Vr, c`
      .action-tabs {
        display: flex;
        align-items: end;
        gap: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        margin-bottom: 12px;
        overflow-x: auto;
      }

      .action-group-options {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .action-wrap-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 1;
      }

      .action-wrap-toggle input {
        width: auto;
        margin: 0;
      }

      .action-tab,
      .action-tab-add {
        border: none;
        background: transparent;
        color: inherit;
        min-width: 44px;
        height: 42px;
        padding: 0 12px;
        font: inherit;
        font-weight: 700;
        opacity: 0.6;
        cursor: pointer;
      }

      .action-tab.active {
        color: var(--primary-color);
        opacity: 1;
        border-bottom: 3px solid var(--primary-color);
      }

      .action-tab-add {
        margin-left: auto;
        font-size: 24px;
        opacity: 0.9;
      }

      .action-editor-tools {
        display: flex;
        gap: 8px;
        margin-left: auto;
        justify-content: flex-end;
      }

      .action-tool-button {
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 10px;
        background: var(--card-background-color);
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
        --mdc-icon-size: 22px;
      }

      .editor-version {
        padding: 0 14px;
        font-size: 11px;
        opacity: 0.5;
        text-align: right;
      }
    `];
	};
	customElements.define("orbit-action-card-editor", e);
})), Vi = /* @__PURE__ */ t((() => {
	F(), Je(), R(), _t(), Dt(), jt(), H(), ji(), Pi(), Ii(), Bi(), Q();
	var e = class extends P {
		static svgCache = V;
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
			let e = Oi(this._config).length, n = t(this._config, e);
			return {
				grid_columns: Math.max(1, n * 1),
				grid_min_columns: .5
			};
		}
		setConfig(e) {
			this._config = e;
			let t = e.accent_color || "theme";
			this._iconColor = this._computeIconColor(t), this._cardBackground = this._computeCircleColor(t), this._isRunning = !1, this._actions = [];
		}
		willUpdate(e) {
			return Di.call(this, e);
		}
		shouldUpdate(e) {
			return wt.call(this, e, Oi(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: Tt(this._config) });
		}
		_handleTap(e, t = 0) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1, this._stopEvent(e);
				return;
			}
			this._stopEvent(e), this._handleAction(this._getTapAction(t), this._getActionEntityId(t));
		}
		_handlePointerDown(e, t = 0) {
			this._stopEvent(e), this._clearHoldTimer(), this._holdTimer = setTimeout(() => {
				this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
			}, 500);
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
			return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : n(this._getActionEntityId(e));
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
			let t = this._getActionColumnCount(e);
			return Math.max(1, Math.ceil(e / t));
		}
		_handleAction(e, t = null) {
			return Be.call(this, e, t);
		}
		_computeFullColor(e) {
			return Ye.call(this, e);
		}
		_computeIconColor(e) {
			return Xe.call(this, e);
		}
		_computeCircleColor(e) {
			return Ze.call(this, e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return lt.call(this, e, t);
		}
		_isImageIcon(e) {
			return ut(e);
		}
		_resolveIconPath(e) {
			return dt(e);
		}
		_getInlineSvg(e, t = !0) {
			return z.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return ft(e, t);
		}
		_clearHoldTimer() {
			this._holdTimer &&= (clearTimeout(this._holdTimer), null);
		}
		_stopEvent(e) {
			e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
		}
		render() {
			return Mi.call(this);
		}
		static styles = Fi;
	};
	function t(e = {}, t = 1) {
		if (!e.wrap) return Math.max(1, t);
		let n = Number(e.actions_per_row);
		return Math.max(1, Math.min(t, (Number.isFinite(n) ? Math.floor(n) : 3) || 1));
	}
	function n(e) {
		let t = e?.split(".")[0];
		return t === "scene" ? {
			action: "call-service",
			service: "scene.turn_on",
			service_data: { entity_id: e }
		} : t === "script" ? {
			action: "call-service",
			service: "script.turn_on",
			service_data: { entity_id: e }
		} : t === "automation" ? {
			action: "call-service",
			service: "automation.trigger",
			service_data: { entity_id: e }
		} : t === "button" || t === "input_button" ? {
			action: "call-service",
			service: "button.press",
			service_data: { entity_id: e }
		} : { action: "toggle" };
	}
	customElements.define("orbit-action-card", e), window.customCards = window.customCards || [], window.customCards.push({
		type: "orbit-action-card",
		name: "Orbit Action Card",
		description: "Compact scene, script, and automation launcher",
		preview: !0,
		version: Z.action,
		getEntitySuggestion: i
	}), console.info(`%c ORBIT-ACTION-CARD %c Version ${Z.action}`, "color: orange; font-weight: bold; background: black;", "color: white; font-weight: bold; background: dimgray;");
	var r = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function i(e, t) {
		return r.has(Ot(t)) ? { config: {
			type: "custom:orbit-action-card",
			main_entity: t
		} } : null;
	}
})), Hi = /* @__PURE__ */ t((() => {
	Wr(), Ei(), Vi();
}));
//#endregion
export default Hi();
