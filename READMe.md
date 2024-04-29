# NailCrafter's Studio
## NailCrafter's Studio is a tool to help beginner's plan out their nail designs before executing them. 

Follow the steps below to run the app:

1. Clone the repository https://github.com/haelyak/NailCraftersStudio.git
2. Download Node.js https://nodejs.org/en/download
3. Install Fabric.js using 
```$ npm install fabric --save```
4. Run the server using the command 
```node server/server.js```
5. Navigate to localhost:3000 using a web browser

You should see a screen with a nail in the middle. Now you can design your nail!

The default mode is drawing mode. 

In drawing mode you can:
- Use Clear Canvas button to return to a blank nail
- Use the Undo button to undo the last action done
- Use the Redo button to redo the last action undone

- Choose a brush using the mode dropdown
- Change the width of your brush using the slider
- Change the color of your paint using the color picker

- Upload images to design your nails

In select mode you can:
- Click on objects on the nail to move around or resize
- Use Clear Canvas button to return to a blank nail
- Use the Delete button to delete a selected object
- Use the Undo button to undo the last action done
- Use the Redo button to redo the last action undone
