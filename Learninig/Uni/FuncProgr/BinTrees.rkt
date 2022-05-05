#lang racket
(define (entry tree) (car tree))

(define (left-branch tree) (cadr tree))

(define (right-branch tree) (caddr tree))

(define (make-tree entry left right)
  (list entry left right))

(define (element-of-set? x set)
	(cond ((null? set) false)
		((= x (entry set)) true)
		((< x (entry set))
			(element-of-set? x (left-branch set)))
		((> x (entry set))
			(element-of-set? x (right-branch set)))))

(define (adjoin-set x set)
	(cond ((null? set) (make-tree x '() '()))
		((= x (entry set)) set)
		((< x (entry set))
			(make-tree (entry set)
				(adjoin-set x (left-branch set))
				(right-branch set)))
		((> x (entry set))
				(make-tree (entry set)
				(left-branch set)
				(adjoin-set x (right-branch set))))))

;; (define (count-leaves x)
;; 	(cond ((null? x) 0)
;; 		((not (pair? x)) 1)
;; 		(else (+ (count-leaves (car x))
;; 			(count-leaves (cdr x))))
;; 	)
;; )
;;

;; (define lis '())
;; (adjoin-set  7 (adjoin-set 3 (adjoin-set 5 lis)))

( define (adjoin-set-list list_ tree)
	(if (null? list_) tree
		(adjoin-set-list (cdr list_) (adjoin-set (car list_) tree))
	  )
 )



(println "Задача 1.:") 
(define tree'())
(adjoin-set-list '(5 3 7) tree)

(println "Задача 2.:") 

(define (count-leaves x)
	  (cond ((and (null? (left-branch x)) (null? (right-branch x))) 1)
			((null? x) 0)
	(else	(+ (count-leaves (left-branch x)) (count-leaves (right-branch x))))
	)
  )

(define lst '())
(define tree_ (adjoin-set-list '(5 3 7 4 2 6 8) lst))
;; (count-leaves tree_)

tree_
;; (left-branch tree_)
;; (right-branch tree_)
(count-leaves tree_)

(println "Задача 3:")
(define lst__ '())
(define tree___ (adjoin-set-list '(5 3 7 4 2 6 8) lst__))
tree___

(define (depth x)
	(cond ((null? x) 0)
	(else (+ 1 (max (depth (left-branch x)) (depth (right-branch x))))
	  )
	)
  )

(define sus (adjoin-set-list '(1 2 3 4 5 6 7 8) '()))
(depth tree___)
sus
(depth sus)

(println "Задача 4:")
(define lst_ '())
(define tree__ (adjoin-set-list '(5 3 7 4 2 6 8) lst_))
tree__

(define (lr-travel-tree tree)
(if (null? tree) '()
(append (lr-travel-tree (left-branch tree)) (cons (entry tree) (lr-travel-tree (right-branch tree))))
)
)

(lr-travel-tree tree__)
