function Node(data, left, right) {
   this.data = data;
   this.left = left;
   this.right = right;
   this.show = show;
}
function show() {
   return this.data;
}
function BST() {
   this.root = null;
   this.insert = insert;
   this.preOrder = preOrder;
   this.inOrder = inOrder;
   this.postOrder = postOrder;
}
var bst = new BST();
var nums = new Array(10,31,18,2,4,5);
function insert(data) {
   var n = new Node(data, null, null);
   if (this.root == null) {
      this.root = n;
   }
   else {
      var current = this.root;
      var parent; 
      while (true) {
         parent = current;
         if (data < current.data) {
            current = current.left;
            if (current == null) {
               parent.left = n;
               break;
            }
         }
         else {
            current = current.right;
            if (current == null) {
               parent.right = n;
               break;
            }
         }
      }
   }
}
function preOrder(node) {
   if (!(node == null)) {
      console.log(node.show() + " ");
      preOrder(node.left);
      preOrder(node.right);
   }
}
function inOrder(node) {
   if (!(node == null)) {
      inOrder(node.left);
      console.log(node.show() + " ");
      inOrder(node.right);
   }
}
function postOrder(node) {
   if (!(node == null)) {
      postOrder(node.left);
      postOrder(node.right);
      console.log(node.show() + " ");
   }
}
for(var i = 0; i < nums.length; i++) {
    bst.insert(nums[i]);
}