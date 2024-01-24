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
    try {
        await s.retrieve(); 
        throw new Error("Should not be here");
    } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).to.contain("Too soon");
    }
    try {
        await s.provideKey("123"); 
        throw new Error("Should not be here");
    } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).to.contain("Too soon");
    }
    await delay(21000);
    try {
        await s.retrieve(); 
        throw new Error("Should not be here");
    } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).to.contain("No key yet");
    }
    await s.provideKey("123"); 
    expect((await s.retrieve()).toString()).to.equal("very test string,123");
  });
});
