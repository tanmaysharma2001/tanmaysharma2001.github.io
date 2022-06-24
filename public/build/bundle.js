
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Weather.svelte generated by Svelte v3.48.0 */

    const file$6 = "src\\Weather.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let h3;
    	let t0;
    	let t1;
    	let t2;
    	let h40;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let h41;
    	let t8;
    	let t9;
    	let t10;
    	let t11;
    	let t12;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t0 = text("Today's Weather: ");
    			t1 = text(/*commentElement*/ ctx[0]);
    			t2 = space();
    			h40 = element("h4");
    			t3 = text(/*dayHourElement*/ ctx[1]);
    			t4 = space();
    			t5 = text(/*humidityElement*/ ctx[2]);
    			t6 = text(" humidity");
    			t7 = space();
    			h41 = element("h4");
    			t8 = text("Temperature: ");
    			t9 = text(/*tempElement*/ ctx[3]);
    			t10 = text("°C Wind: ");
    			t11 = text(/*windElement*/ ctx[4]);
    			t12 = text(" km/h");
    			add_location(h3, file$6, 29, 4, 970);
    			add_location(h40, file$6, 30, 4, 1018);
    			add_location(h41, file$6, 31, 4, 1076);
    			attr_dev(div, "class", "quote-section");
    			add_location(div, file$6, 28, 0, 937);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    			append_dev(div, t2);
    			append_dev(div, h40);
    			append_dev(h40, t3);
    			append_dev(h40, t4);
    			append_dev(h40, t5);
    			append_dev(h40, t6);
    			append_dev(div, t7);
    			append_dev(div, h41);
    			append_dev(h41, t8);
    			append_dev(h41, t9);
    			append_dev(h41, t10);
    			append_dev(h41, t11);
    			append_dev(h41, t12);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*commentElement*/ 1) set_data_dev(t1, /*commentElement*/ ctx[0]);
    			if (dirty & /*dayHourElement*/ 2) set_data_dev(t3, /*dayHourElement*/ ctx[1]);
    			if (dirty & /*humidityElement*/ 4) set_data_dev(t5, /*humidityElement*/ ctx[2]);
    			if (dirty & /*tempElement*/ 8) set_data_dev(t9, /*tempElement*/ ctx[3]);
    			if (dirty & /*windElement*/ 16) set_data_dev(t11, /*windElement*/ ctx[4]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Weather', slots, []);
    	var urlOfAPI = "https://weatherdbi.herokuapp.com/data/weather/innopolis";
    	let commentElement;
    	let dayHourElement;
    	let humidityElement;
    	let tempElement;
    	let windElement;

    	function getData() {
    		fetch(urlOfAPI).then(response => {
    			return response.json();
    		}).then(data => {
    			const newData = data;

    			// !----- Important -----!
    			// Note sometimes this API crashes for unknow reasons. So please try later,
    			// or please contact me if it doesn't work.
    			// This code works fine.
    			// Thank you...!
    			$$invalidate(0, commentElement = newData.currentConditions.comment);

    			$$invalidate(1, dayHourElement = newData.currentConditions.dayhour);
    			$$invalidate(2, humidityElement = newData.currentConditions.humidity);
    			$$invalidate(3, tempElement = newData.currentConditions.temp.c);
    			$$invalidate(4, windElement = newData.currentConditions.wind.km);
    		});
    	}

    	getData();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Weather> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		urlOfAPI,
    		commentElement,
    		dayHourElement,
    		humidityElement,
    		tempElement,
    		windElement,
    		getData
    	});

    	$$self.$inject_state = $$props => {
    		if ('urlOfAPI' in $$props) urlOfAPI = $$props.urlOfAPI;
    		if ('commentElement' in $$props) $$invalidate(0, commentElement = $$props.commentElement);
    		if ('dayHourElement' in $$props) $$invalidate(1, dayHourElement = $$props.dayHourElement);
    		if ('humidityElement' in $$props) $$invalidate(2, humidityElement = $$props.humidityElement);
    		if ('tempElement' in $$props) $$invalidate(3, tempElement = $$props.tempElement);
    		if ('windElement' in $$props) $$invalidate(4, windElement = $$props.windElement);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [commentElement, dayHourElement, humidityElement, tempElement, windElement];
    }

    class Weather extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Weather",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\TopContainer.svelte generated by Svelte v3.48.0 */
    const file$5 = "src\\TopContainer.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let weather;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let br0;
    	let t2;
    	let br1;
    	let t3;
    	let br2;
    	let t4;
    	let br3;
    	let t5;
    	let h1;
    	let t7;
    	let h2;
    	let t8;
    	let u;
    	let t10;
    	let t11;
    	let img1;
    	let img1_src_value;
    	let t12;
    	let img2;
    	let img2_src_value;
    	let current;
    	weather = new Weather({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(weather.$$.fragment);
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			br0 = element("br");
    			t2 = space();
    			br1 = element("br");
    			t3 = space();
    			br2 = element("br");
    			t4 = space();
    			br3 = element("br");
    			t5 = space();
    			h1 = element("h1");
    			h1.textContent = "I'm Tanmay";
    			t7 = space();
    			h2 = element("h2");
    			t8 = text("a ");
    			u = element("u");
    			u.textContent = "pro";
    			t10 = text("grammer.");
    			t11 = space();
    			img1 = element("img");
    			t12 = space();
    			img2 = element("img");
    			attr_dev(img0, "class", "top-cloud");
    			if (!src_url_equal(img0.src, img0_src_value = /*src*/ ctx[0])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", /*alt*/ ctx[1]);
    			add_location(img0, file$5, 10, 4, 275);
    			add_location(br0, file$5, 11, 4, 318);
    			add_location(br1, file$5, 12, 4, 330);
    			add_location(br2, file$5, 13, 4, 342);
    			add_location(br3, file$5, 14, 4, 354);
    			add_location(h1, file$5, 15, 4, 366);
    			add_location(u, file$5, 16, 10, 397);
    			add_location(h2, file$5, 16, 4, 391);
    			attr_dev(img1, "class", "bottom-cloud");
    			if (!src_url_equal(img1.src, img1_src_value = /*src*/ ctx[0])) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", /*alt*/ ctx[1]);
    			add_location(img1, file$5, 17, 4, 426);
    			if (!src_url_equal(img2.src, img2_src_value = /*mountainImageSource*/ ctx[2])) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", /*mountainImageAlt*/ ctx[3]);
    			add_location(img2, file$5, 18, 4, 472);
    			attr_dev(div, "class", "top-container");
    			add_location(div, file$5, 7, 0, 223);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(weather, div, null);
    			append_dev(div, t0);
    			append_dev(div, img0);
    			append_dev(div, t1);
    			append_dev(div, br0);
    			append_dev(div, t2);
    			append_dev(div, br1);
    			append_dev(div, t3);
    			append_dev(div, br2);
    			append_dev(div, t4);
    			append_dev(div, br3);
    			append_dev(div, t5);
    			append_dev(div, h1);
    			append_dev(div, t7);
    			append_dev(div, h2);
    			append_dev(h2, t8);
    			append_dev(h2, u);
    			append_dev(h2, t10);
    			append_dev(div, t11);
    			append_dev(div, img1);
    			append_dev(div, t12);
    			append_dev(div, img2);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(weather.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(weather.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(weather);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TopContainer', slots, []);
    	let src = "./images/cloud.png";
    	let alt = "cloud-image";
    	let mountainImageSource = "images/mountain.png";
    	let mountainImageAlt = "mountain image";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Weather,
    		src,
    		alt,
    		mountainImageSource,
    		mountainImageAlt
    	});

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('alt' in $$props) $$invalidate(1, alt = $$props.alt);
    		if ('mountainImageSource' in $$props) $$invalidate(2, mountainImageSource = $$props.mountainImageSource);
    		if ('mountainImageAlt' in $$props) $$invalidate(3, mountainImageAlt = $$props.mountainImageAlt);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, alt, mountainImageSource, mountainImageAlt];
    }

    class TopContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TopContainer",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\Profile.svelte generated by Svelte v3.48.0 */

    const file$4 = "src\\Profile.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;
    	let t2;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "Hello.";
    			t2 = space();
    			p = element("p");
    			p.textContent = "My name is Tanmay and I am a Computer Science Student at Innopolis University. I am in ❤ with Web\r\n        Development.";
    			attr_dev(img, "class", "profile-image");
    			if (!src_url_equal(img.src, img_src_value = /*profileImageSrc*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*profileImageAlt*/ ctx[1]);
    			add_location(img, file$4, 5, 4, 136);
    			add_location(h2, file$4, 6, 4, 213);
    			attr_dev(p, "class", "intro");
    			add_location(p, file$4, 7, 4, 235);
    			attr_dev(div, "class", "profile");
    			add_location(div, file$4, 4, 0, 109);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, h2);
    			append_dev(div, t2);
    			append_dev(div, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Profile', slots, []);
    	let profileImageSrc = "images/tanmay.jfif";
    	let profileImageAlt = "tanmay";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Profile> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ profileImageSrc, profileImageAlt });

    	$$self.$inject_state = $$props => {
    		if ('profileImageSrc' in $$props) $$invalidate(0, profileImageSrc = $$props.profileImageSrc);
    		if ('profileImageAlt' in $$props) $$invalidate(1, profileImageAlt = $$props.profileImageAlt);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [profileImageSrc, profileImageAlt];
    }

    class Profile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Profile",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\SkillContainer.svelte generated by Svelte v3.48.0 */

    const file$3 = "src\\SkillContainer.svelte";

    function create_fragment$3(ctx) {
    	let hr0;
    	let t0;
    	let h20;
    	let t2;
    	let div2;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t3;
    	let h30;
    	let t5;
    	let p0;
    	let strong0;
    	let br0;
    	let t7;
    	let t8;
    	let div1;
    	let img1;
    	let img1_src_value;
    	let t9;
    	let h31;
    	let t11;
    	let p1;
    	let strong1;
    	let br1;
    	let t13;
    	let t14;
    	let hr1;
    	let t15;
    	let div3;
    	let h21;
    	let t17;
    	let h32;
    	let t19;
    	let p2;
    	let t21;
    	let a;

    	const block = {
    		c: function create() {
    			hr0 = element("hr");
    			t0 = space();
    			h20 = element("h2");
    			h20.textContent = "My Skills.";
    			t2 = space();
    			div2 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t3 = space();
    			h30 = element("h3");
    			h30.textContent = "Web Development";
    			t5 = space();
    			p0 = element("p");
    			strong0 = element("strong");
    			strong0.textContent = "Skills: HTML/CSS/JavaScript";
    			br0 = element("br");
    			t7 = text("I have a good\r\n            understanding of the web fundamentals work and I have been putting\r\n            them into my use since a long time.");
    			t8 = space();
    			div1 = element("div");
    			img1 = element("img");
    			t9 = space();
    			h31 = element("h3");
    			h31.textContent = "Software Development";
    			t11 = space();
    			p1 = element("p");
    			strong1 = element("strong");
    			strong1.textContent = "Skills: Java, C/C++, Python, Git Version Control.";
    			br1 = element("br");
    			t13 = text("I started learning to code when I was 12 years old becuase I\r\n            wanted to make my own video games. Over time, I have gained a wealth\r\n            of experience designing and developing mobile and web applications.");
    			t14 = space();
    			hr1 = element("hr");
    			t15 = space();
    			div3 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Get In Touch";
    			t17 = space();
    			h32 = element("h3");
    			h32.textContent = "Wanna hire me?";
    			t19 = space();
    			p2 = element("p");
    			p2.textContent = "Feel free to reach out to me any time. I prefer to talk over any of\r\n        these mediums.";
    			t21 = space();
    			a = element("a");
    			a.textContent = "CONTACT ME";
    			add_location(hr0, file$3, 2, 0, 31);
    			add_location(h20, file$3, 3, 0, 39);
    			attr_dev(img0, "class", "wd-image");
    			if (!src_url_equal(img0.src, img0_src_value = "images/web-link.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$3, 9, 8, 176);
    			add_location(h30, file$3, 10, 8, 243);
    			add_location(strong0, file$3, 12, 12, 294);
    			add_location(br0, file$3, 12, 56, 338);
    			add_location(p0, file$3, 11, 8, 277);
    			attr_dev(div0, "class", "skill-row");
    			add_location(div0, file$3, 8, 4, 143);
    			attr_dev(img1, "class", "sd-image");
    			if (!src_url_equal(img1.src, img1_src_value = "images/computer.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$3, 18, 8, 551);
    			add_location(h31, file$3, 19, 8, 618);
    			add_location(strong1, file$3, 21, 12, 674);
    			add_location(br1, file$3, 22, 13, 754);
    			add_location(p1, file$3, 20, 8, 657);
    			attr_dev(div1, "class", "skill-row");
    			add_location(div1, file$3, 17, 4, 518);
    			attr_dev(div2, "class", "flex-container");
    			add_location(div2, file$3, 7, 0, 109);
    			add_location(hr1, file$3, 29, 0, 1021);
    			add_location(h21, file$3, 31, 4, 1059);
    			add_location(h32, file$3, 32, 4, 1086);
    			attr_dev(p2, "class", "contact-message");
    			add_location(p2, file$3, 33, 4, 1115);
    			attr_dev(a, "class", "btn");
    			attr_dev(a, "href", "mailto:sharmatanmay617@gmail.com");
    			add_location(a, file$3, 37, 4, 1259);
    			attr_dev(div3, "class", "contact-me");
    			add_location(div3, file$3, 30, 0, 1029);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h20, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img0);
    			append_dev(div0, t3);
    			append_dev(div0, h30);
    			append_dev(div0, t5);
    			append_dev(div0, p0);
    			append_dev(p0, strong0);
    			append_dev(p0, br0);
    			append_dev(p0, t7);
    			append_dev(div2, t8);
    			append_dev(div2, div1);
    			append_dev(div1, img1);
    			append_dev(div1, t9);
    			append_dev(div1, h31);
    			append_dev(div1, t11);
    			append_dev(div1, p1);
    			append_dev(p1, strong1);
    			append_dev(p1, br1);
    			append_dev(p1, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, hr1, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h21);
    			append_dev(div3, t17);
    			append_dev(div3, h32);
    			append_dev(div3, t19);
    			append_dev(div3, p2);
    			append_dev(div3, t21);
    			append_dev(div3, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h20);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(hr1);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkillContainer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkillContainer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class SkillContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillContainer",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\MiddleContainer.svelte generated by Svelte v3.48.0 */
    const file$2 = "src\\MiddleContainer.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let profile;
    	let t;
    	let skillcontainer;
    	let current;
    	profile = new Profile({ $$inline: true });
    	skillcontainer = new SkillContainer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(profile.$$.fragment);
    			t = space();
    			create_component(skillcontainer.$$.fragment);
    			attr_dev(div, "class", "middle-container");
    			add_location(div, file$2, 4, 0, 127);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(profile, div, null);
    			append_dev(div, t);
    			mount_component(skillcontainer, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(profile.$$.fragment, local);
    			transition_in(skillcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(profile.$$.fragment, local);
    			transition_out(skillcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(profile);
    			destroy_component(skillcontainer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MiddleContainer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MiddleContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Profile, SkillContainer });
    	return [];
    }

    class MiddleContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MiddleContainer",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\BottomContainer.svelte generated by Svelte v3.48.0 */

    const file$1 = "src\\BottomContainer.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (19:8) {#each linksEles as link}
    function create_each_block(ctx) {
    	let a;
    	let t_value = /*link*/ ctx[1].label + "";
    	let t;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "class", "footer-link");
    			attr_dev(a, "href", /*link*/ ctx[1].href);
    			add_location(a, file$1, 19, 8, 449);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(19:8) {#each linksEles as link}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let p;
    	let each_value = /*linksEles*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			p = element("p");
    			p.textContent = "Made with ❤ - © Tanmay Sharma 2022";
    			attr_dev(div0, "class", "links");
    			add_location(div0, file$1, 17, 4, 385);
    			attr_dev(p, "class", "copyright");
    			add_location(p, file$1, 25, 4, 576);
    			attr_dev(div1, "class", "bottom-container");
    			add_location(div1, file$1, 16, 0, 349);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, p);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*linksEles*/ 1) {
    				each_value = /*linksEles*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BottomContainer', slots, []);

    	let linksEles = [
    		{
    			href: "https://www.linkedin.com/in/tanmaysharma2001/",
    			label: "LinkedIn"
    		},
    		{
    			href: "https://twitter.com/me_tanmay01",
    			label: "Twitter"
    		},
    		{
    			href: "https://www.instagram.com/me_tanmay01",
    			label: "Instagram"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BottomContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ linksEles });

    	$$self.$inject_state = $$props => {
    		if ('linksEles' in $$props) $$invalidate(0, linksEles = $$props.linksEles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [linksEles];
    }

    class BottomContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BottomContainer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.48.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let link0;
    	let link1;
    	let link2;
    	let t0;
    	let main;
    	let topcontainer;
    	let t1;
    	let middlecontainer;
    	let t2;
    	let bottomcontainer;
    	let current;
    	topcontainer = new TopContainer({ $$inline: true });
    	middlecontainer = new MiddleContainer({ $$inline: true });
    	bottomcontainer = new BottomContainer({ $$inline: true });

    	const block = {
    		c: function create() {
    			link0 = element("link");
    			link1 = element("link");
    			link2 = element("link");
    			t0 = space();
    			main = element("main");
    			create_component(topcontainer.$$.fragment);
    			t1 = space();
    			create_component(middlecontainer.$$.fragment);
    			t2 = space();
    			create_component(bottomcontainer.$$.fragment);
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "https://fonts.googleapis.com");
    			add_location(link0, file, 6, 1, 209);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "https://fonts.gstatic.com");
    			add_location(link1, file, 7, 1, 272);
    			attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&family=Sacramento&display=swap");
    			attr_dev(link2, "rel", "stylesheet");
    			add_location(link2, file, 8, 1, 332);
    			add_location(main, file, 14, 0, 489);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			append_dev(document.head, link2);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(topcontainer, main, null);
    			append_dev(main, t1);
    			mount_component(middlecontainer, main, null);
    			append_dev(main, t2);
    			mount_component(bottomcontainer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(topcontainer.$$.fragment, local);
    			transition_in(middlecontainer.$$.fragment, local);
    			transition_in(bottomcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(topcontainer.$$.fragment, local);
    			transition_out(middlecontainer.$$.fragment, local);
    			transition_out(bottomcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link0);
    			detach_dev(link1);
    			detach_dev(link2);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(topcontainer);
    			destroy_component(middlecontainer);
    			destroy_component(bottomcontainer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		TopContainer,
    		MiddleContainer,
    		BottomContainer
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: 'world'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
