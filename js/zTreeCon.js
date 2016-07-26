 /**
 *  author: Yang
 *  email: me@tecyang.com
 *  date: 2016年7月24日
 *  version: 0.0.1
 */
    //得到树中第一个rel为NodeType 的节点并选中
    function SelectFNodeByNodeType(Tree,NodeType){
	    var treeObj = $("#"+Tree).zTree.getZTreeObj(Tree);
		var result = null;
        var node = treeObj.getNodes();
        if (node.length > 0) {
           
            for (var i = 0; i < node.length; i++) {
                
                if (result == null) {
                    result = getFNodeByType(node[i], result, NodeType);
                } else {
                    break;
                }
            }
        }

        //2016年7月21日 新增判断 如果树找完未找到NodeType类型的节点 则返回null 所以调用处result需进行判断
        if(result!=null){
            var treeP = result.getParentNode();
            treeObj.selectNode(result, true);
            //treeObj.checkNode(result,true,true);
        }
        return result;
    }
    
    //获取全选节点
    function getFullCheckedNodes(Tree) {
        var FullCheckNodes= new Array();　
        var treeObj = $("#"+Tree).zTree.getZTreeObj(Tree);
        var node = treeObj.getCheckedNodes();
        
         if (node.length > 0) {
           
            for (var i = 0; i < node.length; i++) {
                var n = getNodeByCheckStateT(node[i]);
                if(n!=null)
                FullCheckNodes.push(n);
            }
        }
        console.log("全选节点");
        console.log(FullCheckNodes);
        return FullCheckNodes;
        
    }
    //获取半选节点 - 外部调用
    function getHalfCheckedNodes(Tree) {
        var HalfCheckNodes= new Array();　
        var treeObj = $("#"+Tree).zTree.getZTreeObj(Tree);
        var node = treeObj.getCheckedNodes();
        
         if (node.length > 0) {
           
            for (var i = 0; i < node.length; i++) {
                var n = getNodeByCheckStateNT(node[i]);
                if(n!=null)
                HalfCheckNodes.push(n);
            }
        }
        console.log("半选节点");
        console.log(HalfCheckNodes);
        return HalfCheckNodes;
    }

    //获取第一个某类型节点Id（非叶子节点）
    function getFNodeByType(treeNode, result,NodeType) {
    	
        if (result == null) {
            if (treeNode.isParent&&treeNode.rel!=NodeType) {//2016年7月14日 修改逻辑  因为要找的第一个节点不一定为叶子节点
                var childrenNodes = treeNode.children;
                if (childrenNodes.length > 0) {
                    for (var i = 0; i < childrenNodes.length; i++) {
                        if (result == null) {
                            //console.log("1"+childrenNodes[i].Name+childrenNodes[i].rel);
                            result = getFNodeByType(childrenNodes[i], result, NodeType);
                             
                        } else {
                            break;
                        }
                    }
                }
            }
            else {
                //console.log("2"+treeNode.rel+ NodeType);
                if (treeNode.rel == NodeType) {
                   
                    result = treeNode;
                    //console.log("3"+result.Name+result.rel+NodeType);
                }
            }
        }
        return result;
    }

/*      Check_Child_State说明
       //判断节点的选择状态（非叶子节点）
       // http://www.ztree.me/v3/api.php
        // setting.check.checkType = "checkbox"
        // treeNode.check_Child_State  勾选状态说明
        // -1  不存在子节点 或 子节点全部设置为 nocheck = true
        // 0   无 子节点被勾选
        // 1   部分 子节点被勾选
        // 2   全部 子节点被勾选  


        // setting.check.checkType = "radio"
        // treeNode.check_Child_State  勾选状态说明
        // -1  不存在子节点 或 子节点全部设置为 nocheck = true
        // 0   无 子节点被勾选
        // 2   有 子节点被勾选
*/
    //获取checked = true的check_Child_State状态为2节点
    //适用于checkbox
    function getNodeByCheckStateT(treeNode) {
        if (treeNode.isParent) {

            if(treeNode.check_Child_State==2){
                return treeNode;
            }else{
                return null;
            }
        }else{
            //子节点选中的一定为全选
            return treeNode;
        }
    }
    //获取checked = true的check_Child_State状态非2节点
    //适用于checkbox
    function getNodeByCheckStateNT(treeNode) {
        if (treeNode.isParent) {

            if(treeNode.check_Child_State==2){
                return null;
            }else{
                return treeNode;
            }
        }else{
            //子节点选中的一定为全选
            return null;
        }
    }