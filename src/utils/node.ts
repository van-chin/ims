// Node Unique ID
let uid = 0;

import {setAuthCache } from "@/utils/auth";

class Node {
  constructor(data, config, parentNode) {
    // console.log("Node -> constructor -> config", config)
      // console.log("Node -> constructor -> data", data)
    this.origin = data;
    // this.origin.label
    this.data = data;
    this.config = config;
    this.parent = parentNode || null;
    this.level = !this.parent ? 1 : this.parent.level + 1;
    this.uid = uid++;
    // this.childrens = new Node(this, config)

    this.initState();
    this.initChildren();

    // this.manualValues();
    // this.children = JSON.parse(JSON.stringify(this.children));
  }

  initState() {
    // console.info(`initState`)
    const { value: valueKey, label: labelKey,icon:iconKey,options } = this.config;
    // console.info(this.data);
    this.value = this.data[valueKey];
    this.label = this.data[labelKey];

    this.icon = this.data[iconKey];

    this[valueKey] = this.data[valueKey];
    this[labelKey] = this.data[labelKey];

    this.origin.label = this.data[labelKey];
    this.origin.value = this.data[valueKey];
    this.origin.level = this.level;
    this.origin.icon = this.data[iconKey];
    // this.origin.options = this.data[options];

    this.origin[valueKey] = this.data[valueKey];
    this.origin[labelKey] = this.data[labelKey];


    this.pathNodes = this.calculatePathNodes();

    this.path = this.pathNodes.map((node) => {

      return node.value;
    });
    this.pathLabels = this.pathNodes.map((node) => node.label);


  }

  calculatePathNodes() {

    const nodes = [this];
    let parent = this.parent;

    while (parent) {
      nodes.unshift(parent);
      parent = parent.parent;
    }



    return nodes;

  }

  initChildren() {
    // console.info(`initChildren`)

    const { config } = this;
    // value: valueKey, label: labelKey,
    const {  children: childrenKey,cachePrefix:cachePrefix } = config;

    const childrenData = this.data[childrenKey];
    this.hasChildren = Array.isArray(childrenData);

    if (this.hasChildren) {
      this.children = (childrenData || []).map((child) => {

        return new Node(child, config, this);
      });

    }

    const currentData =  this.pathNodes.map(node=>{

      return node.origin;
    })


    // if(this.value === 163) {
    //   console.info(`${cachePrefix}${this.value} 1==>`,currentData);
    // }


    setAuthCache(`${cachePrefix}${this.value}`,currentData);

    // let stringifyData = JSON.stringify(currentData);
    //
    // if(this.value === 163) {
    //   console.info(`${cachePrefix}${this.value} 2==> stringify`,stringifyData);
    // }
    //
    //
    //
    // localStorage.setItem(`${cachePrefix}${this.value}`,stringifyData);
    //
    // let parseData = localStorage.getItem(`${cachePrefix}${this.value}`);
    //
    // if(this.value === 163) {
    //   console.info(`${cachePrefix}${this.value} 3==> parseData`,parseData);
    // }




  }

  get isLeaf() {
    const { hasChildren } = this;



    return !hasChildren;
  }


}

export default Node;
