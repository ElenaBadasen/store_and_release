/* eslint-disable no-undef */
// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");

const delay = ms => new Promise(res => setTimeout(res, ms));

describe("StoreAndRelease", function () {
  it("test store and release", async function () {
    const StoreAndRelease = await ethers.getContractFactory("StoreAndRelease");
    const s = await StoreAndRelease.deploy();
    await s.deployed();
    console.log("StoreAndRelease deployed at:" + s.address);

    const setValue = await s.store("very test string", 20);
    await setValue.wait();
    await delay(21000);

    expect((await s.retrieve()).toString()).to.equal("very test string");
  });
});
