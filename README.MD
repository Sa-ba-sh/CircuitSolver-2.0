# Circuit Solver  :))  ***Short your time, we open your answer***

[![Generic badge](https://img.shields.io/badge/python-3-<COLOR>.svg)](https://shields.io/)
[![Documentation Status](https://readthedocs.org/projects/ansicolortags/badge/?version=latest)](http://ansicolortags.readthedocs.io/?badge=latest)
[![PyPI license](https://img.shields.io/pypi/l/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/)
[![Open Source Love png1](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Generic badge](https://img.shields.io/badge/contributions%3F-welcome-<COLOR>.svg)](https://shields.io/)
![Profile views](https://gpvc.arturio.dev/Sa-ba-sh)

**Have you ever fed up of solving complicated circuits with lots of bridges and pillars ?**

*Fret Not!! You have then reached the right place, this is a computer aided software, that solves you any kind of resistive circuit instantly in no pain.*

## Features

* You can solve any kind of resistive circuit.
* This can solve complicated circuits with any type of controlled sources too. 
* Easy to handle user interface, as simple as filling a form.
* Images displyed for each type of the element to user for enterring the correct input.

## Working principle
We have algorithmically implemented the technique of ***Modified Nodal Analysis (MNA)*** for solving any kind of resistive circuit. MNA is an advanced version of the existing principle of nodal analysis, in which some changes are made so as to implement it using any computer program. This is our basic implementation of the complete project of a circuit solver. In this preliminary version we have just implemented the backend process of MNA. Here the user must do all the node planning and enter the correct inputs(number of elements, number of nodes, each element type and it's details) as prompted by the software. 

## Instructions
Computer is the foolest thing in the world, which blindly just processes the inputs that is being fed into it. Hence here are few basic instructions that must be followed while using this software. First, the user should themselves number all the individual nodes along with one of them being marked as the reference node and number all the other nodes. Once the prelimary inputs are enterred, the user should choose what kind of elements are present in the circuit. Following that, the user should enter the elementt's details adhering to the passive sign convention, for helping out the user images have beeen shown near the input boxes. The user should enter the inputs as per the image that is displayed. Once all these inputs are given the software processes it an displays the final output. If at all there is any error then there will be an alert stating the error, this could be due to some incorrect inputs given, so the user should validate the inputs again. If the issue still persist then the user could raise an issue stating the circuit diagram and we shall try to address it as soon as possible.

## Back-story
We are currently in our sophomore yearof study and have a course on electric circuits. When we first en-countered some large complicated circuits felt very hard to solve it by hand, since it involved large number of rigorous calcuations. So we just thought at that point of time that it would have been better if there were some software that would help us solve the circuit. So, we did a basic research of the avaialable softwares that help us to simulate the circuit. After our research we found that there are few such but their user interfaces aren't as good. In the similar way there are certain online tools that do provide solutions for some simple circuits without involving any controlled sources. After this research we came to knew about MNA (Modified Nodal Analysis) and its powerfull advantage being simpler to implement using a computer software, and then we started working from sratch on how to develop an end-end project, proposed a plan and then implemented it.

## Implementation
@Baladhinesh please fill this with the content of how you have implemented the coding part.

## Future Goals
Currently in this preliminary version, the user should do all the node planning and enter the input values, this basically reuires th user to draw the circuit initially on some piece of paper and then start implementing it. This is quite painfull job and hence we have decided to upgrade the software into a complete GUI enabledone, where the user has a freedom to design the circuit in real time and do nothing else, the system itself starts to process them(node planning and recognising inputs) and just displays the output.

## Contributions
We do welcome any kind of contributions, feel free to fork it and create a pull requests. Whenever you find any kind of bugs in the code or any optimization in the code feel free to contribute to us. 

## Disclaimer
This is a computer aided software and hence there is no gaurentee by the developers for ensuring the creditability of the results that the software outputs. Though the softare has been tested against a large number of custom inputs, there are situations where it can fail. If you come across any such problem, please feel free to rise a issue here or provide your feedback in the website and we will try to address the issue as soon as possible.
