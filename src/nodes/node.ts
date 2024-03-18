import bodyParser from "body-parser";
import express from "express";
import { BASE_NODE_PORT } from "../config";
import { Value } from "../types";

export async function node(
  nodeId: number, // the ID of the node
  N: number, // total number of nodes in the network
  F: number, // number of faulty nodes in the network
  initialValue: Value, // initial value of the node
  isFaulty: boolean, // true if the node is faulty, false otherwise
  nodesAreReady: () => boolean, // used to know if all nodes are ready to receive requests
  setNodeIsReady: (index: number) => void // this should be called when the node is started and ready to receive requests
) {
  const node = express();
  node.use(express.json());
  node.use(bodyParser.json());
  const express = require('express');
const bodyParser = require('body-parser');

class Node {
    constructor(initialState) {
        this.state = { 
            killed: initialState.killed || false,
            x: initialState.x || null,
            decided: initialState.decided || null,
            k: initialState.k || null,
        };
        this.app = express();
        this.app.use(bodyParser.json());
        this.setupRoutes();
    }

    setupRoutes() {
        this.app.get('/status', (req, res) => {
            if (this.state.killed) {
                res.status(500).send('faulty');
            } else {
                res.status(200).send('live');
            }
        });

        this.app.get('/getState', (req, res) => {
            res.status(200).json(this.state);
        });

        this.app.post('/message', (req, res) => {
            const message = req.body;
            console.log('Received message:', message);
            // Add your logic here to handle the message according to the Ben-Or algorithm
            res.status(200).send({ message: 'Message received' });
        });

        this.app.get('/start', (req, res) => {
            // Implement the logic to start the Ben-Or algorithm
            console.log('Node started');
            res.status(200).send('Node started');
        });

        this.app.get('/stop', (req, res) => {
            this.state.killed = true;
            // Implement any cleanup or state reset necessary when stopping the node
            console.log('Node stopped');
            res.status(200).send('Node stopped');
        });
    }

    start(port) {
        this.app.listen(port, () => {
            console.log(`Node listening on port ${port}`);
        });
    }
}

module.exports = Node;

